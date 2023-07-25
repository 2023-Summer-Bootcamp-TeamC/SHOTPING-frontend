import React, { useEffect, useRef, useState } from "react";
import ApexCharts from "apexcharts";
import axios from "axios";

interface ChartData {
  product_name: string;
  product_price: number;
  product_buy: number;
  image_url: string;
}

export default function Chart() {
  const chartRef = useRef(null);
  const [isChartRendered, setChartRendered] = useState(false);

  useEffect(() => {
    if (!isChartRendered && chartRef.current) {
      axios
        .get("/api/v1/popular")
        .then((response) => {
          const chartData: ChartData[] = response.data;
          const labels = chartData.map((data: ChartData) => data.product_name);
          const series = chartData.map((data: ChartData) => data.product_buy);

          const options = {
            series: series,
            chart: {
              width: 500,
              height: 500,
              type: "polarArea",
            },
            labels: labels,
            colors: ["#ff0099", "#ff9900", "#ffe500", "#00ff66", "#33001f"],
            fill: {
              opacity: 1,
            },
            stroke: {
              width: 1,
              colors: undefined,
            },
            yaxis: {
              show: false,
            },
            legend: {
              position: "bottom",
            },
            plotOptions: {
              polarArea: {
                rings: {
                  strokeWidth: 0,
                },
                spokes: {
                  strokeWidth: 0,
                },
              },
            },
            theme: {
              monochrome: {
                enabled: false,
                shadeTo: "light",
                shadeIntensity: 0.6,
              },
            },
          };

          const chart = new ApexCharts(chartRef.current, options);
          chart.render();

          setChartRendered(true);
        })
        .catch((error) => {
          console.log("차트 데이터 가져오기 실패");
          console.log(error);
        });
    }
  }, [isChartRendered]);

  const chartContainerStyle = "relative";

  return (
    <div id="chart" ref={chartRef} className={chartContainerStyle}>
      {/* 레이블 숨기기 */}
    </div>
  );
}
