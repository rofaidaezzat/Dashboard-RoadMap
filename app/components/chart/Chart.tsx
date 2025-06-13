// app/components/Chart.tsx
"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import type { ApexOptions } from "apexcharts";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const Chart = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const options: ApexOptions = {
    chart: {
      height: 300,
      type: "area",
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    stroke: {
      curve: "straight",
      width: 2,
    },
    grid: { strokeDashArray: 2 },
    fill: {
      type: "gradient",
      gradient: {
        type: "vertical",
        shadeIntensity: 1,
        opacityFrom: 0.1,
        opacityTo: 0.8,
        stops: [50, 100],
      },
    },
    xaxis: {
      categories: [
        "25 Jan 2023",
        "26 Jan 2023",
        "27 Jan 2023",
        "28 Jan 2023",
        "29 Jan 2023",
        "30 Jan 2023",
        "31 Jan 2023",
        "1 Feb 2023",
        "2 Feb 2023",
        "3 Feb 2023",
        "4 Feb 2023",
        "5 Feb 2023",
      ],
      labels: {
        style: {
          colors: "#9ca3af",
          fontSize: "13px",
          fontFamily: "Inter, ui-sans-serif",
          fontWeight: 400,
        },
        formatter: (value: string) => {
          if (typeof value !== "string") return "";
          const parts = value.split(" ");
          if (parts.length < 2) return value;
          return `${parts[0]} ${parts[1]}`;
        },
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        align: "left",
        style: {
          colors: "#9ca3af",
          fontSize: "13px",
          fontFamily: "Inter, ui-sans-serif",
          fontWeight: 400,
        },
        formatter: (val: number) =>
          val >= 1000 ? `${val / 1000}k` : val.toString(),
      },
    },
    tooltip: {
      y: {
        formatter: (val: number) =>
          val >= 1000 ? `${val / 1000}k` : val.toString(),
      },
    },
  };

  const series = [
    {
      name: "Visitors",
      data: [180, 51, 60, 38, 88, 50, 40, 52, 88, 80, 60, 70],
    },
  ];

  return (
    <div id="hs-single-area-chart">
      <ReactApexChart options={options} series={series} type="area" height={300} />
    </div>
  );
};

export default Chart;
