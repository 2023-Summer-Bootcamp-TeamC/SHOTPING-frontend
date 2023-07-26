import React, { useEffect, useRef, useState } from "react";
import ApexCharts from "apexcharts";
import axios from "axios";

/* 메인모달 왼쪽에 뜨는 차트 */

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
            series: [
              {
                data: series,
              },
            ],
            chart: {
              type: "bar",
              height: 450,
              width: 400,
            },
            plotOptions: {
              bar: {
                barHeight: "100%",
                distributed: true,
                horizontal: true,
                dataLabels: {
                  position: "bottom",
                },
              },
            },
            colors: ["#ff0099", "#ff9900", "#ffe500", "#00ff66", "#33001f"],
            dataLabels: {
              enabled: false,
              textAnchor: "start",
              style: {
                colors: ["#000"],
              },

              offsetX: 0,
              dropShadow: {
                enabled: false,
              },
            },
            stroke: {
              width: 1,
              colors: ["#fff"],
            },
            xaxis: {
              categories: labels,
            },
            yaxis: {
              labels: {
                show: false,
              },
            },
            tooltip: {
              theme: "dark",
              x: {
                show: false,
              },
              y: {
                title: {
                  formatter: function () {
                    return "";
                  },
                },
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

  return <div id="chart" ref={chartRef} className={chartContainerStyle}></div>;
}
