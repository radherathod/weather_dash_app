// components/OverviewChart.jsx
import React, { useLayoutEffect, useRef, useState, memo } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const datasets = {
  Humidity: [
    { month: "Jan", value: 25 },
    { month: "Feb", value: 18 },
    { month: "Mar", value: 35 },
    { month: "Apr", value: 55 },
    { month: "May", value: 60 },
    { month: "Jun", value: 65 },
    { month: "Jul", value: 58 },
    { month: "Aug", value: 62 },
    { month: "Sep", value: 75 },
    { month: "Oct", value: 90 },
    { month: "Nov", value: 80 },
    { month: "Dec", value: 70 },
  ],
  "UV Index": [
    { month: "Jan", value: 2 },
    { month: "Feb", value: 3 },
    { month: "Mar", value: 5 },
    { month: "Apr", value: 6 },
    { month: "May", value: 7 },
    { month: "Jun", value: 8 },
    { month: "Jul", value: 9 },
    { month: "Aug", value: 8 },
    { month: "Sep", value: 6 },
    { month: "Oct", value: 4 },
    { month: "Nov", value: 3 },
    { month: "Dec", value: 2 },
  ],
  Rainfall: [
    { month: "Jan", value: 45 },
    { month: "Feb", value: 30 },
    { month: "Mar", value: 55 },
    { month: "Apr", value: 65 },
    { month: "May", value: 75 },
    { month: "Jun", value: 95 },
    { month: "Jul", value: 100 },
    { month: "Aug", value: 88 },
    { month: "Sep", value: 70 },
    { month: "Oct", value: 60 },
    { month: "Nov", value: 50 },
    { month: "Dec", value: 40 },
  ],
  Pressure: [
    { month: "Jan", value: 1010 },
    { month: "Feb", value: 1012 },
    { month: "Mar", value: 1008 },
    { month: "Apr", value: 1015 },
    { month: "May", value: 1013 },
    { month: "Jun", value: 1011 },
    { month: "Jul", value: 1014 },
    { month: "Aug", value: 1016 },
    { month: "Sep", value: 1018 },
    { month: "Oct", value: 1015 },
    { month: "Nov", value: 1012 },
    { month: "Dec", value: 1010 },
  ],
};

const OverviewChart = memo(() => {
  const chartRef = useRef(null);
  const [activeTab, setActiveTab] = useState("Humidity");

  useLayoutEffect(() => {
    if (!chartRef.current) return;

    let root = am5.Root.new(chartRef.current);
    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        layout: root.verticalLayout,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
      })
    );

    // Create Y-axis
    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    yAxis.get("renderer").labels.template.setAll({
      fill: am5.color(0xffffff),
      fontSize: 11,
    });

    // Create X-axis
    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "month",
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 30,
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

    xAxis.data.setAll(datasets[activeTab]);

    // Create series
    let series = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: activeTab,
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        categoryXField: "month",
        stroke: am5.color(0x60a5fa),
        fill: am5.color(0x60a5fa),
        tooltip: am5.Tooltip.new(root, {
          labelText: "{categoryX}: {valueY}",
        }),
      })
    );

    series.strokes.template.setAll({
      strokeWidth: 3,
    });

    series.fills.template.setAll({
      visible: true,
      fillOpacity: 0.1,
    });

    // Add bullets
    series.bullets.push(() => {
      return am5.Bullet.new(root, {
        sprite: am5.Circle.new(root, {
          radius: 4,
          fill: am5.color(0xffffff),
          stroke: am5.color(0x60a5fa),
          strokeWidth: 2,
        }),
      });
    });

    series.data.setAll(datasets[activeTab]);

    // Add cursor
    chart.set("cursor", am5xy.XYCursor.new(root, {}));

    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, [activeTab]);

  const tabs = Object.keys(datasets);

  return (
    <div
      className="w-full h-full flex flex-col p-4"
      role="region"
      aria-labelledby="analytics-title"
    >
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <h2 className="text-white text-lg font-bold" id="analytics-title">
          Weather Analytics
        </h2>
        <div
          className="flex space-x-1 flex-wrap"
          role="tablist"
          aria-label="Analytics data selection"
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-2 py-1 rounded-lg text-xs transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                activeTab === tab
                  ? "bg-blue-400 text-black font-semibold"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
              role="tab"
              aria-selected={activeTab === tab}
              aria-controls="analytics-chart"
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div
        ref={chartRef}
        className="flex-1 w-full min-h-0 focus:outline-none"
        id="analytics-chart"
        role="tabpanel"
        aria-label={`${activeTab} analytics chart`}
        tabIndex={0}
      />
    </div>
  );
});

OverviewChart.displayName = "OverviewChart";

export default OverviewChart;
