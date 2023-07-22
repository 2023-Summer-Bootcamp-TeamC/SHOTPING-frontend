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
              width: 450,
              height: 450,
              type: "pie",
            },
            labels: labels,
            responsive: [
              {
                breakpoint: 480,
                options: {
                  chart: {
                    width: 200,
                  },
                  legend: {
                    position: "bottom",
                  },
                },
              },
            ],
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

  return <div id="chart" ref={chartRef}></div>;
}
