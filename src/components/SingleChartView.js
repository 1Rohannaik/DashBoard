import EChart from "./EChart";

const SingleChartView = ({
  selectedChart,
  gridLayout,
  chartOptions,
  onChartTypeChange,
  onGridLayoutChange,
  onChartClick,
}) => {
  return (
    <div className="panel">
      <div className="panel-header">
        <span>Charts</span>
        <div className="panel-controls">
          <select
            className="select"
            value={selectedChart}
            onChange={(e) => onChartTypeChange(e.target.value)}
          >
            <option value="line">Line</option>
            <option value="bar">Bar</option>
            <option value="pie">Pie</option>
          </select>
          <select
            className="select"
            value={gridLayout}
            onChange={(e) => onGridLayoutChange(e.target.value)}
          >
            <option value="1x1">1×1</option>
            <option value="1x2">1×2</option>
            <option value="2x2">2×2</option>
            <option value="2x3">2×3</option>
          </select>
        </div>
      </div>
      <div className="panel-body">
        <div className="chart-single-view">
          <div
            className="chart-single-container"
            onClick={() => onChartClick(selectedChart)}
          >
            <EChart
              className="chart-single"
              option={chartOptions[selectedChart]}
            />
            <div className="chart-overlay">
              <span className="chart-title">{selectedChart.toUpperCase()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleChartView;
