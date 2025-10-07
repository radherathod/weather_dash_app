import React, { useLayoutEffect, useRef, useState, useMemo } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const LineChartWithToggle = ({ forecastData, isCelsius }) => {
  const chartRef = useRef(null);
  const rootRef = useRef(null);
  const [activeChart, setActiveChart] = useState("temperature");

  // Generate chart data from forecast
  const chartData = useMemo(() => {
    if (!forecastData?.hourly) return [];

    const datasets = {
      temperature: forecastData.hourly.map((hour, index) => ({
        hour: hour.time,
        value: hour.temp,
      })),
      humidity: forecastData.hourly.map((hour, index) => ({
        hour: hour.time,
        value: hour.humidity,
      })),
      precipitation: forecastData.hourly.map((hour, index) => ({
        hour: hour.time,
        value: hour.pop,
      })),
      wind: forecastData.hourly.map((hour, index) => ({
        hour: hour.time,
        value: hour.windSpeed,
      })),
    };

    return datasets[activeChart] || [];
  }, [forecastData, activeChart]);

  const getChartConfig = (type) => {
    const configs = {
      temperature: {
        title: "Temperature",
        color: am5.color(0xff6b35),
        unit: `°${isCelsius ? "C" : "F"}`,
        minValue: Math.min(...chartData.map((d) => d.value)) - 2,
        maxValue: Math.max(...chartData.map((d) => d.value)) + 2,
      },
      humidity: {
        title: "Humidity",
        color: am5.color(0x4ecdc4),
        unit: "%",
        minValue: 0,
        maxValue: 100,
      },
      precipitation: {
        title: "Precipitation",
        color: am5.color(0x45b7d1),
        unit: "%",
        minValue: 0,
        maxValue: 100,
      },
      wind: {
        title: "Wind Speed",
        color: am5.color(0x96ceb4),
        unit: "km/h",
        minValue: 0,
        maxValue: Math.max(...chartData.map((d) => d.value)) + 5,
      },
    };
    return configs[type] || configs.temperature;
  };

  useLayoutEffect(() => {
    if (!chartRef.current || chartData.length === 0) return;

    const root = am5.Root.new(chartRef.current);
    root.setThemes([am5themes_Animated.new(root)]);
    rootRef.current = root;

    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        layout: root.verticalLayout,
        paddingTop: 20,
        paddingBottom: 20,
      })
    );

    // Create Y-axis
    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {
          minGridDistance: 30,
        }),
        min: getChartConfig(activeChart).minValue,
        max: getChartConfig(activeChart).maxValue,
      })
    );

    yAxis.get("renderer").labels.template.setAll({
      fill: am5.color(0xffffff),
      fontSize: 11,
    });

    // Create X-axis
    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "hour",
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 50,
        }),
      })
    );

    xAxis.get("renderer").labels.template.setAll({
      fill: am5.color(0xffffff),
      fontSize: 11,
      rotation: -45,
      centerY: am5.p100,
      centerX: am5.p100,
    });

    xAxis.data.setAll(chartData);

    // Create series
    const series = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: activeChart,
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        categoryXField: "hour",
        stroke: getChartConfig(activeChart).color,
        fill: getChartConfig(activeChart).color,
      })
    );

    series.strokes.template.setAll({
      strokeWidth: 3,
    });

    series.fills.template.setAll({
      visible: true,
      fillOpacity: 0.2,
    });

    // Add bullets
    series.bullets.push(() => {
      return am5.Bullet.new(root, {
        sprite: am5.Circle.new(root, {
          radius: 4,
          fill: am5.color(0xffffff),
          stroke: getChartConfig(activeChart).color,
          strokeWidth: 2,
        }),
      });
    });

    series.data.setAll(chartData);

    // Add cursor
    chart.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        xAxis: xAxis,
        behavior: "none",
      })
    );

    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, [chartData, activeChart]);

  if (!forecastData) {
    return (
      <div className="w-full h-full flex flex-col p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-2xl font-bold">Weather Overview</h2>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-400">No data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white text-2xl font-bold">Weather Overview</h2>
        <div className="flex gap-2">
          {["temperature", "humidity", "precipitation", "wind"].map((type) => (
            <button
              key={type}
              onClick={() => setActiveChart(type)}
              className={`px-3 py-1 rounded-lg text-xs capitalize transition ${
                activeChart === type
                  ? "bg-cyan-400 text-black font-semibold"
                  : "bg-gray-600 text-white hover:bg-gray-500"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
      <div ref={chartRef} className="w-full h-[300px] rounded-lg"></div>
    </div>
  );
};

export default LineChartWithToggle;
