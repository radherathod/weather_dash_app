import React, { useLayoutEffect, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";

const WorldMap = () => {
  const chartRef = useRef(null);

  useLayoutEffect(() => {
    if (!chartRef.current) return;

    let root = am5.Root.new(chartRef.current);

    root.setThemes([am5.Theme.new(root)]);

    // Create map chart
    let chart = root.container.children.push(
      am5map.MapChart.new(root, {
        projection: am5map.geoMercator(),
        wheelY: "none", // disable zoom on scroll
        panX: "none",
        panY: "none",
      })
    );

    // Create polygon series
    let polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
        exclude: ["AQ"], // hide Antarctica
      })
    );

    polygonSeries.mapPolygons.template.setAll({
      tooltipText: "{name}",
      interactive: true,
      fill: am5.color(0x4b5563), // Tailwind gray-700
      stroke: am5.color(0xffffff),
    });

    polygonSeries.mapPolygons.template.states.create("hover", {
      fill: am5.color(0x22c55e), // Tailwind green-500
    });

    chart.appear(1000, 100);

    // 🔑 Handle container resize so map always fills grid cell
    const resizeObserver = new ResizeObserver(() => {
      root.resize();
    });
    resizeObserver.observe(chartRef.current);

    return () => {
      resizeObserver.disconnect();
      root.dispose();
    };
  }, []);

  return (
    <div
      ref={chartRef}
      className="w-full h-full rounded-xl"
      style={{ minHeight: 0 }}
    />
  );
};

export default WorldMap;
