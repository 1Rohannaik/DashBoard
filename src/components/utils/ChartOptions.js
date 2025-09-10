//for create a chart functions

export const buildLineOption = (data, tokens) => {
  const monthlySales = Array.isArray(data?.monthlySales)
    ? data.monthlySales
    : [];

  return {
    animation: false,
    backgroundColor: "transparent",
    tooltip: {
      trigger: "axis",
      backgroundColor: tokens.bg,
      borderColor: tokens.border,
      textStyle: { color: tokens.text },
    },
    grid: {
      left: "8%",
      right: "8%",
      bottom: "15%",
      top: "10%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: monthlySales.map((item) => item.month || ""),
      axisLine: { lineStyle: { color: tokens.border } },
      axisLabel: {
        color: tokens.muted,
        fontSize: 12,
      },
    },
    yAxis: {
      type: "value",
      axisLine: { lineStyle: { color: tokens.border } },
      axisLabel: {
        color: tokens.muted,
        fontSize: 12,
      },
      splitLine: { lineStyle: { color: tokens.border } },
    },
    series: [
      {
        data: monthlySales.map((item) => item.sales || 0),
        type: "line",
        smooth: true,
        lineStyle: { width: 4, color: tokens.accent },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: tokens.accent + "59" },
              { offset: 1, color: tokens.accent + "00" },
            ],
          },
        },
        emphasis: { disabled: true },
        symbolSize: 8,
      },
    ],
  };
};

export const buildBarOption = (data, tokens) => {
  const revenueByCategory = Array.isArray(data?.revenueByCategory)
    ? data.revenueByCategory
    : [];

  return {
    animation: false,
    backgroundColor: "transparent",
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
      backgroundColor: tokens.bg,
      borderColor: tokens.border,
      textStyle: { color: tokens.text },
    },
    grid: {
      left: "8%",
      right: "8%",
      bottom: "15%",
      top: "10%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: revenueByCategory.map((item) => item.category || ""),
      axisLine: { lineStyle: { color: tokens.border } },
      axisLabel: {
        color: tokens.muted,
        fontSize: 12,
        rotate: window.innerWidth < 640 ? 45 : 0,
      },
    },
    yAxis: {
      type: "value",
      axisLine: { lineStyle: { color: tokens.border } },
      axisLabel: {
        color: tokens.muted,
        fontSize: 12,
      },
      splitLine: { lineStyle: { color: tokens.border } },
    },
    series: [
      {
        data: revenueByCategory.map((item) => item.revenue || 0),
        type: "bar",
        barWidth: "60%",
        itemStyle: {
          color: tokens.green,
          borderRadius: [6, 6, 0, 0],
        },
        emphasis: { disabled: true },
      },
    ],
  };
};

export const buildPieOption = (data, tokens) => {
  const demographics = Array.isArray(data?.demographics)
    ? data.demographics
    : [];
  const pieColors = Array.isArray(data?.pieColors)
    ? data.pieColors
    : ["#4f46e5", "#ef4444", "#f59e0b", "#14b8a6", "#22c55e"];

  const isMobile = window.innerWidth < 640;

  return {
    animation: false,
    backgroundColor: "transparent",
    tooltip: {
      trigger: "item",
      backgroundColor: tokens.bg,
      borderColor: tokens.border,
      textStyle: { color: tokens.text },
    },
    legend: {
      orient: "horizontal",
      bottom: "5%",
      textStyle: {
        color: tokens.text,
        fontSize: isMobile ? 10 : 12,
      },
    },
    series: [
      {
        type: "pie",
        radius: isMobile ? ["40%", "75%"] : ["45%", "80%"],
        center: ["50%", "45%"],
        data: demographics.map((item, index) => ({
          value: item.value || 0,
          name: item.name || "",
          itemStyle: {
            color: pieColors[index % pieColors.length],
            borderColor: tokens.bg,
            borderWidth: 3,
          },
        })),
        label: {
          color: tokens.text,
          fontSize: isMobile ? 11 : 13,
          fontWeight: 500,
        },
        labelLine: {
          lineStyle: { color: tokens.muted },
        },
        emphasis: { disabled: true },
      },
    ],
  };
};


/// for future if we want to add any types of graphs or chart we can just create a function and design the graph here
