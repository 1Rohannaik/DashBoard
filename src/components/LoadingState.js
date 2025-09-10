const LoadingState = ({ gridLayout, gridConfig }) => {
  return (
    <div className="panel">
      <div className="panel-header">
        <span>Charts</span>
        <div className="panel-controls">
          <select className="select" disabled>
            <option>Loading...</option>
          </select>
          <select className="select" disabled>
            <option>Loading...</option>
          </select>
        </div>
      </div>
      <div className="panel-body">
        {gridLayout === "1x1" ? (
          <div className="chart-single-view">
            <div className="chart-single-container skeleton"></div>
          </div>
        ) : (
          <div className={`chart-grid grid-${gridLayout}`}>
            {Array(gridConfig.rows * gridConfig.cols)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="chart-container skeleton"></div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoadingState;
