import React, { useLayoutEffect, useRef, useState } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const LineChartWithToggle = () => {
  const chartRef = useRef(null);
  const rootRef = useRef(null);
  const [activeChart, setActiveChart] = useState("humidity");

  // Expanded datasets with more points (twice per month)
  const datasets = {
    humidity: [
      { month: "Jan", value: 40 },
      { month: "Feb", value: 35 },
      { month: "Mar", value: 50 },
      { month: "Apr", value: 55 },
      { month: "May", value: 60 },
      { month: "Jun", value: 65 },
      { month: "Jul", value: 55 },
      { month: "Aug", value: 50 },
      { month: "Sep", value: 70 },
      { month: "Oct", value: 90 },
      { month: "Nov", value: 75 },
      { month: "Dec", value: 60 },
    ],
    uv: [
      { month: "Jan", value: 20 },
      { month: "Feb", value: 30 },
      { month: "Mar", value: 25 },
      { month: "Apr", value: 40 },
      { month: "May", value: 50 },
      { month: "Jun", value: 60 },
      { month: "Jul", value: 55 },
      { month: "Aug", value: 45 },
      { month: "Sep", value: 50 },
      { month: "Oct", value: 65 },
      { month: "Nov", value: 55 },
      { month: "Dec", value: 30 },
    ],
    rainfall: [
      { month: "Jan", value: 10 },
      { month: "Feb", value: 15 },
      { month: "Mar", value: 20 },
      { month: "Apr", value: 30 },
      { month: "May", value: 50 },
      { month: "Jun", value: 80 },
      { month: "Jul", value: 90 },
      { month: "Aug", value: 70 },
      { month: "Sep", value: 60 },
      { month: "Oct", value: 40 },
      { month: "Nov", value: 20 },
      { month: "Dec", value: 15 },
    ],
    pressure: [
      { month: "Jan", value: 1000 },
      { month: "Feb", value: 1005 },
      { month: "Mar", value: 1010 },
      { month: "Apr", value: 1008 },
      { month: "May", value: 1015 },
      { month: "Jun", value: 1020 },
      { month: "Jul", value: 1018 },
      { month: "Aug", value: 1012 },
      { month: "Sep", value: 1010 },
      { month: "Oct", value: 1005 },
      { month: "Nov", value: 1008 },
      { month: "Dec", value: 1012 },
    ],
  };

  useLayoutEffect(() => {
    const root = am5.Root.new(chartRef.current);
    root.setThemes([am5themes_Animated.new(root)]);
    rootRef.current = root;

    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        layout: root.verticalLayout,
      })
    );

    // X axis
    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "month",
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 25,
        }),
      })
    );

    xAxis.get("renderer").labels.template.setAll({
      fill: am5.color(0xffffff), // white text
      fontSize: 10, // smaller font
    });

    // Y axis
    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    yAxis.get("renderer").labels.template.setAll({
      fill: am5.color(0xffffff), // white text
      fontSize: 10, // smaller font
    });

    // Line series
    const series = chart.series.push(
      am5xy.SmoothedXLineSeries.new(root, {
        name: activeChart,
        xAxis,
        yAxis,
        valueYField: "value",
        categoryXField: "month",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{categoryX}: {valueY}",
        }),
      })
    );

    series.strokes.template.setAll({
      strokeWidth: 2,
      stroke: am5.color(0x00ffff),
    });

    // Circle bullets
    series.bullets.push(() =>
      am5.Bullet.new(root, {
        sprite: am5.Circle.new(root, {
          radius: 3,
          fill: am5.color(0x00ffff),
          stroke: am5.color(0x000000),
        }),
      })
    );

    series.data.setAll(datasets[activeChart]);
    xAxis.data.setAll(datasets[activeChart]);

    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, [activeChart]);

  return (
    <div className="w-full h-full flex flex-col p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white text-2xl font-bold">Overview</h2>
        <div className="flex gap-2">
          {["humidity", "uv", "rainfall", "pressure"].map((type) => (
            <button
              key={type}
              onClick={() => setActiveChart(type)}
              className={`px-3 py-1 rounded-lg text-xs ${
                activeChart === type
                  ? "bg-cyan-400 text-black"
                  : "bg-gray-600 text-white"
              }`}
            >
              {type.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
      <div ref={chartRef} className="w-full h-[300px] rounded-lg"></div>
    </div>
  );
};

export default LineChartWithToggle;
