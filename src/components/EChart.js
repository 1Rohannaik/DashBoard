import { useEffect, useRef } from "react";
import * as echarts from "echarts";

const EChart = ({ option, className }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const resizeTimeout = useRef(null);

  const debounce = (func, wait) => {
    return (...args) => {
      clearTimeout(resizeTimeout.current);
      resizeTimeout.current = setTimeout(() => func.apply(this, args), wait);
    };
  };

  const resizeChart = debounce(() => {
    if (chartInstance.current) {
      chartInstance.current.resize({ animation: { duration: 0 } });
    }
  }, 50);

  useEffect(() => {
    if (chartRef.current && !chartInstance.current) {
      chartInstance.current = echarts.init(chartRef.current, null, {
        renderer: "canvas",
      });

      // ResizeObserver for container size changes
      const resizeObserver = new ResizeObserver(resizeChart);
      resizeObserver.observe(chartRef.current);

      // Window resize listener
      window.addEventListener("resize", resizeChart);

      return () => {
        resizeObserver.disconnect();
        window.removeEventListener("resize", resizeChart);
        if (chartInstance.current) {
          chartInstance.current.dispose();
          chartInstance.current = null;
        }
      };
    }
  }, []);

  useEffect(() => {
    if (chartInstance.current && option) {
      chartInstance.current.setOption(option, true);

      // Schedule a microtask resize to avoid layout jumps
      Promise.resolve().then(() => {
        if (chartInstance.current) {
          chartInstance.current.resize({ animation: { duration: 0 } });
        }
      });
    }
  }, [option]);

  return <div ref={chartRef} className={className} />;
};

export default EChart;
