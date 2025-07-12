import React from 'react';
import { 
  FaChartLine, 
  FaChartBar, 
  FaChartPie,
  FaClock,
  FaSmile,
  FaLightbulb
} from 'react-icons/fa';
import { 
  Line, Bar, Pie, Doughnut 
} from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import './Analytics.css';

export default function Analytics({ tasks }) {
  // Calculate analytics data from tasks
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const pendingTasks = tasks.filter(task => task.status === 'pending').length;
  const completionRate = tasks.length ? Math.round((completedTasks / tasks.length) * 100) : 0;

  // Sample data for weekly trends
  const last7Days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const weeklyCompleted = [3, 5, 8, 6, 9, 4, 2];
  const weeklyCreated = [5, 7, 6, 8, 10, 5, 3];

  // Task duration distribution
  const taskTypes = ['Quick (<15min)', 'Medium (15-60min)', 'Long (>1hr)'];
  const taskTypeDistribution = [12, 18, 7];

  // Chart data configurations
  const lineChartData = {
    labels: last7Days,
    datasets: [
      {
        label: 'Tasks Completed',
        data: weeklyCompleted,
        borderColor: '#FF7A45',
        backgroundColor: 'rgba(255, 122, 69, 0.1)',
        tension: 0.3,
        fill: true
      },
      {
        label: 'Tasks Created',
        data: weeklyCreated,
        borderColor: '#636E72',
        backgroundColor: 'rgba(99, 110, 114, 0.1)',
        tension: 0.3,
        fill: true
      }
    ]
  };

  const barChartData = {
    labels: last7Days,
    datasets: [{
      label: 'Productivity Score',
      data: [65, 75, 85, 70, 90, 60, 50],
      backgroundColor: 'rgba(255, 122, 69, 0.7)',
      borderRadius: 4
    }]
  };

  const pieChartData = {
    labels: taskTypes,
    datasets: [{
      data: taskTypeDistribution,
      backgroundColor: [
        'rgba(255, 122, 69, 0.7)',
        'rgba(255, 122, 69, 0.5)',
        'rgba(255, 122, 69, 0.3)'
      ],
      borderWidth: 0
    }]
  };

  const doughnutChartData = {
    labels: ['Completed', 'Pending'],
    datasets: [{
      data: [completedTasks, pendingTasks],
      backgroundColor: [
        'rgba(0, 184, 148, 0.7)',
        'rgba(253, 203, 110, 0.7)'
      ],
      borderWidth: 0
    }]
  };

  // Chart options
  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 12,
          padding: 20
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          drawBorder: false
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  return (
    <div className="analytics-container">
      <div className="analytics-header">
        <h2>Performance Metrics</h2>
        <div className="time-filter">
          <select className="filter-select">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
          </select>
        </div>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-header">
            <FaChartLine className="metric-icon" />
            <h3>Tasks Completed</h3>
          </div>
          <div className="chart-container">
            <Line 
              data={lineChartData} 
              options={{
                ...commonOptions,
                plugins: {
                  legend: {
                    position: 'top',
                  }
                }
              }} 
            />
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <FaChartBar className="metric-icon" />
            <h3>Productivity Trend</h3>
          </div>
          <div className="chart-container">
            <Bar 
              data={barChartData} 
              options={commonOptions} 
            />
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <FaChartPie className="metric-icon" />
            <h3>Task Distribution</h3>
          </div>
          <div className="chart-container">
            <Pie 
              data={pieChartData} 
              options={commonOptions} 
            />
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <FaClock className="metric-icon" />
            <h3>Completion Rate</h3>
          </div>
          <div className="chart-container">
            <Doughnut 
              data={doughnutChartData} 
              options={{
                ...commonOptions,
                cutout: '70%'
              }} 
            />
            <div className="completion-rate">
              {completionRate}%
            </div>
          </div>
        </div>
      </div>

      <div className="insights-section">
        <h3>Key Insights</h3>
        <ul className="insights-list">
          <li>
            <FaLightbulb className="insight-icon" />
            <span>You're most productive on Wednesday afternoons</span>
          </li>
          <li>
            <FaSmile className="insight-icon" />
            <span>Completion rate has improved by 15% this month</span>
          </li>
          <li>
            <FaClock className="insight-icon" />
            <span>Complex tasks take 2.3x longer than estimated</span>
          </li>
        </ul>
      </div>
    </div>
  );
}