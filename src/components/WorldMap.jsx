import React, { useLayoutEffect, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";

const WorldMap = ({ currentCity, onCityClick }) => {
  const chartRef = useRef(null);

  useLayoutEffect(() => {
    if (!chartRef.current) return;

    let root = am5.Root.new(chartRef.current);

    root.setThemes([am5.Theme.new(root)]);

    // Create map chart
    let chart = root.container.children.push(
      am5map.MapChart.new(root, {
        projection: am5map.geoMercator(),
        paddingTop: 0,
        paddingBottom: 0,
      })
    );

    // Create polygon series
    let polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
        exclude: ["AQ"],
      })
    );

    polygonSeries.mapPolygons.template.setAll({
      tooltipText: "{name}",
      interactive: true,
      fill: am5.color(0x374151),
      stroke: am5.color(0x4b5563),
      strokeWidth: 0.5,
    });

    polygonSeries.mapPolygons.template.states.create("hover", {
      fill: am5.color(0x22c55e),
    });

    // Add click event
    polygonSeries.mapPolygons.template.events.on("click", (ev) => {
      const data = ev.target.dataItem?.dataContext;
      if (data && data.name) {
        onCityClick(data.name);
      }
    });

    // Point series for current city
    let pointSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));

    pointSeries.bullets.push(() => {
      let circle = am5.Circle.new(root, {
        radius: 8,
        fill: am5.color(0x3b82f6),
        stroke: am5.color(0xffffff),
        strokeWidth: 2,
        tooltipText: `Current: {name}`,
      });

      return am5.Bullet.new(root, {
        sprite: circle,
      });
    });

    pointSeries.data.push({
      name: currentCity,
    });

    chart.appear(1000, 100);

    const resizeObserver = new ResizeObserver(() => {
      root.resize();
    });
    resizeObserver.observe(chartRef.current);

    return () => {
      resizeObserver.disconnect();
      root.dispose();
    };
  }, [currentCity, onCityClick]);

  return (
    <div className="w-full h-full flex flex-col p-3">
      <h2 className="text-white text-lg font-bold mb-2">World Map</h2>
      <div
        ref={chartRef}
        className="w-full h-full rounded-xl bg-gray-700/30"
        style={{ minHeight: 0 }}
      />
    </div>
  );
};

export default WorldMap;
