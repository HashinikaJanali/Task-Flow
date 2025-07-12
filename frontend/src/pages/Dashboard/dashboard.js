import React, { useState, useEffect } from 'react';
import { 
  FaPlus, FaTrash, FaEdit, FaCheck, FaFilter, 
  FaSignOutAlt, FaUserCircle, FaArrowUp, FaArrowDown,
  FaHome, FaChartLine, FaChartPie, FaCalendarAlt, FaCog,
  FaBell, FaSun, FaMoon, FaSearch, FaBars, FaGithub, FaLinkedin, FaTwitter
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import API from '../../api';
import './dashboard.css';

// View Components
import Analytics from '../Analytics/Analytics';
import Reports from '../Reports/Reports';
import Calendar from '../Calendar/Calendar';
import Settings from '../Settings/Settings';

// Animation variants
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3 }
  },
  exit: { opacity: 0, y: -20 }
};

const statsVariants = {
  hover: {
    y: -5,
    boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
    transition: { duration: 0.3 }
  }
};

const DashboardHeader = ({ 
  user, 
  notifications, 
  handleLogout, 
  activeView, 
  toggleSidebar,
  darkMode,
  toggleDarkMode
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <motion.header 
      className="dashboard-header glass"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <div className="header-content">
        <div className="header-left">
          <motion.button 
            className="menu-toggle" 
            onClick={toggleSidebar}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaBars />
          </motion.button>
          <motion.h1 
            className="app-title"
            key={activeView}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeView === 'dashboard' && 'Welcome back, '}
            {activeView === 'analytics' && 'Analytics'}
            {activeView === 'reports' && 'Reports'}
            {activeView === 'calendar' && 'Calendar'}
            {activeView === 'settings' && 'Settings'}
       
          </motion.h1>
        </div>

        <div className="header-center">
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        <div className="header-right">
          <motion.button 
            className="theme-toggle"
            onClick={toggleDarkMode}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </motion.button>

          <motion.button 
            className="notification-btn"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaBell />
            {notifications > 0 && (
              <motion.span 
                className="badge"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                {notifications}
              </motion.span>
            )}
          </motion.button>
          
          <div className="user-profile">
            <FaUserCircle className="user-icon" />
          
          </div>
          
          <motion.button 
            onClick={handleLogout} 
            className="logout-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaSignOutAlt /> Logout
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
};

const DashboardFooter = () => {
  return (
    <motion.footer
      className="dashboard-footer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <div className="footer-content">
        <div className="footer-left">
          <p>© {new Date().getFullYear()} TaskFlow. All rights reserved.</p>
        </div>
        <div className="footer-center">
          <div className="social-links">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <FaGithub />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
          </div>
        </div>
        <div className="footer-right">
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
          <a href="/contact">Contact Us</a>
        </div>
      </div>
    </motion.footer>
  );
};

const DashboardView = ({ 
  tasks, title, setTitle, isLoading, error, 
  handleAdd, handleDelete, handleToggleComplete,
  filter, setFilter, sortConfig, requestSort,
  editingTask, setEditingTask, editText, setEditText, handleEditTask
}) => {
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const pendingTasks = tasks.filter(task => task.status === 'pending').length;

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.status === 'completed';
    if (filter === 'pending') return task.status === 'pending';
    return true;
  });

  return (
    <div className="dashboard-content">
      {/* Stats Cards */}
      <motion.div 
        className="stats-grid"
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.1 }}
      >
        <motion.div 
          className="stat-card"
          variants={statsVariants}
          whileHover="hover"
        >
          <div className="stat-icon total">
            <FaHome />
          </div>
          <h3>Total Tasks</h3>
          <h2>{tasks.length}</h2>
          <p>All your tasks</p>
        </motion.div>
        
        <motion.div 
          className="stat-card"
          variants={statsVariants}
          whileHover="hover"
        >
          <div className="stat-icon completed">
            <FaCheck />
          </div>
          <h3>Completed</h3>
          <h2>{completedTasks}</h2>
          <p>Good progress!</p>
        </motion.div>
        
        <motion.div 
          className="stat-card"
          variants={statsVariants}
          whileHover="hover"
        >
          <div className="stat-icon pending">
            <FaChartLine />
          </div>
          <h3>Pending</h3>
          <h2>{pendingTasks}</h2>
          <p>Tasks remaining</p>
        </motion.div>
        
        <motion.div 
          className="stat-card"
          variants={statsVariants}
          whileHover="hover"
        >
          <div className="stat-icon rate">
            <FaChartPie />
          </div>
          <h3>Completion Rate</h3>
          <h2>{tasks.length ? Math.round((completedTasks / tasks.length) * 100) : 0}%</h2>
          <p>Your efficiency</p>
        </motion.div>
      </motion.div>

      {/* Task Management Section */}
      <motion.div 
        className="dashboard-card glass"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="section-header">
          <h2>Task Management</h2>
          <div className="controls">
            <motion.div 
              className="filter-control"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaFilter className="filter-icon" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Tasks</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </motion.div>
            
            <div className="sort-controls">
              <motion.button 
                onClick={() => requestSort('title')}
                className={`sort-btn ${sortConfig.key === 'title' ? 'active' : ''}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Title {sortConfig.key === 'title' && (
                  sortConfig.direction === 'asc' ? <FaArrowUp /> : <FaArrowDown />
                )}
              </motion.button>
              <motion.button 
                onClick={() => requestSort('createdAt')}
                className={`sort-btn ${sortConfig.key === 'createdAt' ? 'active' : ''}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Date {sortConfig.key === 'createdAt' && (
                  sortConfig.direction === 'asc' ? <FaArrowUp /> : <FaArrowDown />
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Add Task Form */}
        <motion.form 
          onSubmit={handleAdd} 
          className="task-form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <input
            type="text"
            placeholder="Add a new task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="task-input"
          />
          <motion.button 
            type="submit" 
            className="add-btn"
            disabled={isLoading || !title.trim()}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {isLoading ? 'Adding...' : <><FaPlus /> Add Task</>}
          </motion.button>
        </motion.form>

        {/* Error Message */}
        {error && (
          <motion.div 
            className="error-message"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            {error}
          </motion.div>
        )}

        {/* Task List */}
        {isLoading ? (
          <motion.div 
            className="loading-spinner"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div 
              className="spinner"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            />
            <p>Loading your tasks...</p>
          </motion.div>
        ) : (
          <ul className="task-list">
            <AnimatePresence>
              {filteredTasks.length === 0 ? (
                <motion.div 
                  className="empty-state"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3>No tasks found</h3>
                  <p>
                    {filter === 'all' 
                      ? "You don't have any tasks yet. Add one above to get started!" 
                      : filter === 'completed' 
                        ? "You haven't completed any tasks yet" 
                        : "All your tasks are completed! Great job!"}
                  </p>
                </motion.div>
              ) : (
                filteredTasks.map(task => (
                  <motion.li 
                    key={task._id} 
                    className={`task-item ${task.status === 'completed' ? 'completed' : ''}`}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    layout
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="task-content">
                      <motion.button
                        onClick={() => handleToggleComplete(task._id)}
                        className="complete-btn"
                        aria-label={task.status === 'completed' ? 'Mark as pending' : 'Mark as completed'}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FaCheck className="check-icon" />
                      </motion.button>
                      
                      {editingTask === task._id ? (
                        <input
                          type="text"
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          onBlur={() => handleEditTask(task._id)}
                          onKeyPress={(e) => e.key === 'Enter' && handleEditTask(task._id)}
                          autoFocus
                          className="edit-input"
                        />
                      ) : (
                        <span 
                          className="task-text"
                          onDoubleClick={() => setEditingTask(task._id)}
                        >
                          {task.title}
                        </span>
                      )}
                    </div>
                    
                    <div className="task-actions">
                      <motion.button
                        onClick={() => setEditingTask(task._id)}
                        className="edit-btn"
                        aria-label="Edit task"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FaEdit />
                      </motion.button>
                      <motion.button
                        onClick={() => handleDelete(task._id)}
                        className="delete-btn"
                        aria-label="Delete task"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FaTrash />
                      </motion.button>
                    </div>
                  </motion.li>
                ))
              )}
            </AnimatePresence>
          </ul>
        )}
      </motion.div>
    </div>
  );
};

export default function Dashboard() {
  const [activeView, setActiveView] = useState('dashboard');
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' });
  const [editingTask, setEditingTask] = useState(null);
  const [editText, setEditText] = useState('');
  const [user, setUser] = useState({ name: 'User', email: '' });
  const [notifications, setNotifications] = useState(3);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get('/users/me');
        setUser(res.data);
      } catch (err) {
        console.error('Failed to fetch user:', err);
        // Handle unauthorized or other errors
        if (err.response?.status === 401) {
          handleLogout();
        }
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (activeView === 'dashboard') {
      fetchTasks();
    }
  }, [activeView, sortConfig]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const fetchTasks = async () => {
    setIsLoading(true);
    setError('');
    try {
      const res = await API.get('/tasks');
      const sortedTasks = [...res.data.data].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
      setTasks(sortedTasks);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch tasks');
      if (err.response?.status === 401) {
        handleLogout();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Task title cannot be empty');
      return;
    }

    setIsLoading(true);
    try {
      const res = await API.post('/tasks', {
        title,
        description: '',
        status: 'pending'
      });
      setTasks([res.data.data, ...tasks]);
      setTitle('');
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add task');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    
    try {
      await API.delete(`/tasks/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete task');
    }
  };

  const handleToggleComplete = async (id) => {
    try {
      const taskToUpdate = tasks.find(task => task._id === id);
      const res = await API.put(`/tasks/${id}`, {
        status: taskToUpdate.status === 'completed' ? 'pending' : 'completed'
      });
      setTasks(tasks.map(task => 
        task._id === id ? res.data.data : task
      ));
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update task');
    }
  };

  const handleEditTask = async (id) => {
    if (!editText.trim()) {
      setError('Task title cannot be empty');
      return;
    }

    try {
      const res = await API.put(`/tasks/${id}`, { title: editText });
      setTasks(tasks.map(task => 
        task._id === id ? res.data.data : task
      ));
      setEditingTask(null);
      setEditText('');
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to edit task');
    }
  };

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleUserUpdate = (updatedUser) => {
    setUser(prev => ({
      ...prev,
      ...updatedUser
    }));
  };

  const renderActiveView = () => {
    switch (activeView) {
      case 'analytics':
        return <Analytics tasks={tasks} />;
      case 'reports':
        return <Reports tasks={tasks} />;
      case 'calendar':
        return <Calendar tasks={tasks} />;
      case 'settings':
        return <Settings user={user} onUpdateUser={handleUserUpdate} darkMode={darkMode} setDarkMode={setDarkMode} />;
      default:
        return (
          <DashboardView 
            tasks={tasks}
            title={title}
            setTitle={setTitle}
            isLoading={isLoading}
            error={error}
            handleAdd={handleAdd}
            handleDelete={handleDelete}
            handleToggleComplete={handleToggleComplete}
            filter={filter}
            setFilter={setFilter}
            sortConfig={sortConfig}
            requestSort={requestSort}
            editingTask={editingTask}
            setEditingTask={setEditingTask}
            editText={editText}
            setEditText={setEditText}
            handleEditTask={handleEditTask}
          />
        );
    }
  };

  return (
    <div className={`dashboard-container ${darkMode ? 'dark-mode' : ''}`}>
      {/* Sidebar */}
      <motion.div 
        className={`sidebar glass ${sidebarOpen ? 'open' : 'closed'}`}
        initial={{ x: -100, opacity: 0 }}
        animate={{ 
          x: sidebarOpen ? 0 : -100,
          opacity: sidebarOpen ? 1 : 0.5,
          width: sidebarOpen ? '280px' : '80px'
        }}
        transition={{ duration: 0.5, type: 'spring' }}
      >
        <div className="logo">TaskFlow</div>
        <nav>
          <ul>
            <motion.li 
              className={activeView === 'dashboard' ? 'active' : ''}
              onClick={() => setActiveView('dashboard')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaHome /> {sidebarOpen && <span>Dashboard</span>}
            </motion.li>
            <motion.li 
              className={activeView === 'analytics' ? 'active' : ''}
              onClick={() => setActiveView('analytics')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaChartLine /> {sidebarOpen && <span>Analytics</span>}
            </motion.li>
            <motion.li 
              className={activeView === 'reports' ? 'active' : ''}
              onClick={() => setActiveView('reports')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaChartPie /> {sidebarOpen && <span>Reports</span>}
            </motion.li>
            <motion.li 
              className={activeView === 'calendar' ? 'active' : ''}
              onClick={() => setActiveView('calendar')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaCalendarAlt /> {sidebarOpen && <span>Calendar</span>}
            </motion.li>
            <motion.li 
              className={activeView === 'settings' ? 'active' : ''}
              onClick={() => setActiveView('settings')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaCog /> {sidebarOpen && <span>Settings</span>}
            </motion.li>
          </ul>
        </nav>
      </motion.div>

      {/* Main Content */}
      <div className="main-content">
        <DashboardHeader 
          user={user}
          notifications={notifications}
          handleLogout={handleLogout}
          activeView={activeView}
          toggleSidebar={toggleSidebar}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />

        {renderActiveView()}

        <DashboardFooter />
      </div>
    </div>
  );
}