import { useState } from "react";
import ChartModal from "./ChartModal";
import SingleChartView from "./SingleChartView";
import GridChartView from "./GridChartView";
import LoadingState from "./LoadingState";
import ErrorState from "../ErrorState";
import { useChartData } from "../hooks/useChartData";
import { useThemeTokens } from "../hooks/useThemeTokens";
import {
  buildLineOption,
  buildBarOption,
  buildPieOption,
  //functionName
} from "./utils/ChartOptions";

const ChartPanel = () => {
  const [selectedChart, setSelectedChart] = useState("line");
  const [gridLayout, setGridLayout] = useState("1x1");
  const [modalChart, setModalChart] = useState(null);

  const { data, loading, error, fetchData } = useChartData();
  const tokens = useThemeTokens();

  const getGridConfig = (layout) => {
    const configs = {
      "1x1": { rows: 1, cols: 1, charts: ["line"] },
      "1x2": { rows: 1, cols: 2, charts: ["line", "bar"] },
      "2x2": { rows: 2, cols: 2, charts: ["line", "bar", "pie", "line"] },
      "2x3": {
        rows: 2,
        cols: 3,
        charts: ["line", "bar", "pie", "line", "bar", "pie"],
      },
      "3x3": {
        rows: 3,
        cols: 3,
        charts: [
          "line",
          "bar",
          "pie",
          "line",
          "bar",
          "pie",
          "line",
          "bar",
          "pie",
        ],
      },
    };
    return configs[layout] || configs["1x1"];
  };

  const handleChartClick = (chartType) => {
    const chartOptions = {
      line: buildLineOption(data, tokens),
      bar: buildBarOption(data, tokens),
      pie: buildPieOption(data, tokens),
      //charttype
    };

    setModalChart({
      type: chartType,
      option: chartOptions[chartType],
    });
  };

  if (loading) {
    return (
      <LoadingState
        gridLayout={gridLayout}
        gridConfig={getGridConfig(gridLayout)}
      />
    );
  }

  if (error) {
    return <ErrorState error={error} onRetry={fetchData} />;
  }

  const chartOptions = {
    line: buildLineOption(data, tokens),
    bar: buildBarOption(data, tokens),
    pie: buildPieOption(data, tokens),
    //charttype
  };

  const gridConfig = getGridConfig(gridLayout);

  const commonProps = {
    selectedChart,
    gridLayout,
    chartOptions,
    onChartTypeChange: setSelectedChart,
    onGridLayoutChange: setGridLayout,
    onChartClick: handleChartClick,
  };

  return (
    <>
      {gridLayout === "1x1" ? (
        <SingleChartView {...commonProps} />
      ) : (
        <GridChartView {...commonProps} gridConfig={gridConfig} />
      )}

      {modalChart && (
        <ChartModal chart={modalChart} onClose={() => setModalChart(null)} />
      )}
    </>
  );
};

export default ChartPanel;
