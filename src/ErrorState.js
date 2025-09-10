const ErrorState = ({ error, onRetry }) => {
  return (
    <div className="panel">
      <div className="panel-header">
        <span>Charts</span>
        <div className="panel-controls">
          <select className="select" disabled>
            <option>Error</option>
          </select>
          <select className="select" disabled>
            <option>Error</option>
          </select>
        </div>
      </div>
      <div className="panel-body">
        <div className="error-message">{error}</div>
        <button className="btn btn-primary" onClick={onRetry}>
          Retry
        </button>
      </div>
    </div>
  );
};

export default ErrorState;
