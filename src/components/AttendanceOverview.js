import React from "react";
import "../index.css";
import ChartPanel from "./ChartPanel";

const AttendanceOverview = () => {
  const stats = [
    { label: "Employees Present", value: 379 },
    { label: "On Weekly-Off", value: 53 },
    { label: "Completed Shift", value: "A(80/82)" },
    { label: "Ongoing Shift", value: "G,B(157/163)" },
    { label: "Pending Punchin", value: 6 },
    { label: "Upcoming Shift", value: "C(81)" },
  ];

  const shiftRoster = [
    { shift: "A", planned: 82, present: 80, missed: 2, coverage: "98%" },
    { shift: "B", planned: 82, present: 79, missed: 3, coverage: "96%" },
    { shift: "C", planned: 81, present: "-", missed: "-", coverage: "-" },
    { shift: "G", planned: 81, present: 78, missed: 3, coverage: "96%" },
    { shift: "G", planned: 81, present: 78, missed: 3, coverage: "96%" },
    { shift: "G", planned: 81, present: 78, missed: 3, coverage: "96%" },
    { shift: "C", planned: 81, present: "-", missed: "-", coverage: "-" },
    { shift: "G", planned: 81, present: 78, missed: 3, coverage: "96%" },
    { shift: "G", planned: 81, present: 78, missed: 3, coverage: "96%" },
    { shift: "C", planned: 81, present: "-", missed: "-", coverage: "-" },
    { shift: "G", planned: 81, present: 78, missed: 3, coverage: "96%" },
    { shift: "G", planned: 81, present: 78, missed: 3, coverage: "96%" },
  ];

  return (
    <div className="attendance-container">
      <div className="attendance-header">
        <h1>Attendance Overview</h1>
        <div className="filters">
          <select>
            <option>Date Selection</option>
            <option>Today</option>
            <option>This Week</option>
            <option>This Month</option>
          </select>
          <input type="date" />
          <button>Apply Filter</button>
        </div>
      </div>
      <div className="stats-grid">
        {stats.map((item, i) => (
          <div key={i} className="stat-card">
            <h2>{item.value}</h2>
            <p>{item.label}</p>
          </div>
        ))}
      </div>
      <div className="overview-row">
        <div className="echost echost-large">
          <ChartPanel />
        </div>

        <div className="card roster-side">
          <h3 className="mini-header">Shift Roster Summary (Today)</h3>
          <table className="shift-roster">
            <thead>
              <tr>
                <th>Shift</th>
                <th>Planned</th>
                <th>Present</th>
                <th>Missed</th>
                <th>Coverage</th>
              </tr>
            </thead>
            <tbody>
              {shiftRoster.map((row, i) => (
                <tr key={i}>
                  <td>{row.shift}</td>
                  <td>{row.planned}</td>
                  <td>{row.present}</td>
                  <td>{row.missed}</td>
                  <td>{row.coverage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AttendanceOverview;
