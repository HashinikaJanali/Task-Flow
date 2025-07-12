import React, { useState } from 'react';
import { 
  FaFilePdf, 
  FaFileExcel, 
  FaChartLine, 
  FaChartBar, 
  FaChartPie 
} from 'react-icons/fa';
import './Reports.css';

export default function Reports() {
  const [activeReport, setActiveReport] = useState('weekly');

  // Sample report data
  const reports = {
    weekly: {
      title: "Weekly Productivity Report",
      icon: <FaChartLine />,
      data: {
        tasksCompleted: 42,
        productivityScore: 78,
        focusHours: 28.5,
        completionRate: "85%",
        topDay: "Wednesday"
      }
    },
    monthly: {
      title: "Monthly Overview",
      icon: <FaChartBar />,
      data: {
        totalTasks: 187,
        completedTasks: 156,
        overdueTasks: 12,
        productivityTrend: "+15%",
        busiestWeek: "Week 2"
      }
    },
    project: {
      title: "Project Breakdown",
      icon: <FaChartPie />,
      data: {
        activeProjects: 5,
        completedProjects: 3,
        tasksByProject: {
          "Website Redesign": 28,
          "Mobile App": 42,
          "Marketing Campaign": 15,
          "Product Research": 9
        }
      }
    }
  };

  return (
    <div className="reports-container">
      <div className="reports-header">
        <h2>Task Reports</h2>
        <div className="report-tabs">
          {Object.keys(reports).map(report => (
            <button
              key={report}
              className={`tab-btn ${activeReport === report ? 'active' : ''}`}
              onClick={() => setActiveReport(report)}
            >
              {reports[report].icon}
              <span>{reports[report].title}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="report-content">
        <div className="report-header">
          <h3>
            {reports[activeReport].icon}
            {reports[activeReport].title}
          </h3>
          <div className="export-options">
            <button className="export-btn">
              <FaFilePdf /> Export as PDF
            </button>
            <button className="export-btn secondary">
              <FaFileExcel /> Export as Excel
            </button>
          </div>
        </div>

        <div className="report-data">
          {Object.entries(reports[activeReport].data).map(([key, value]) => (
            <div key={key} className="data-item">
              <div className="data-label">{formatLabel(key)}</div>
              <div className="data-value">
                {typeof value === 'object' ? (
                  <ul className="nested-list">
                    {Object.entries(value).map(([project, count]) => (
                      <li key={project}>
                        <span className="project-name">{project}</span>
                        <span className="project-count">{count} tasks</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  value
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Helper function to format labels
function formatLabel(label) {
  return label
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase());
}