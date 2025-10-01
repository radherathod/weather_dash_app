import React, { useLayoutEffect, useRef, useState } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";

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

const OverviewChart = () => {
  const chartRef = useRef(null);
  const [activeTab, setActiveTab] = useState("Humidity");

  useLayoutEffect(() => {
    let root = am5.Root.new(chartRef.current);

    root.setThemes([am5.Theme.new(root)]);

    // Chart setup
    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        layout: root.verticalLayout,
      })
    );

    // X Axis
    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "month",
        renderer: am5xy.AxisRendererX.new(root, {
          minorGridEnabled: true,
        }),
      })
    );
    xAxis.data.setAll(datasets[activeTab]);

    // Y Axis
    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    // Line Series
    let series = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: activeTab,
        xAxis,
        yAxis,
        valueYField: "value",
        categoryXField: "month",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY}",
        }),
      })
    );

    series.strokes.template.setAll({
      strokeWidth: 3,
      stroke: am5.color(0x60a5fa), // Tailwind blue-400
    });

    series.fills.template.setAll({
      visible: true,
      fillOpacity: 0.1,
    });

    series.data.setAll(datasets[activeTab]);

    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, [activeTab]);

  return (
    <div className="w-full h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white text-xl font-bold">Overview</h2>
        <div className="flex space-x-2">
          {Object.keys(datasets).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 rounded-full text-sm ${
                activeTab === tab
                  ? "bg-blue-400 text-black font-semibold"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div ref={chartRef} className="flex-1 w-full h-[300px]" />
    </div>
  );
};

export default OverviewChart;
