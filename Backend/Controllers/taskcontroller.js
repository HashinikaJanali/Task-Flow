const Task = require('../models/Task');

// Helper function for error handling
const handleError = (res, error, operation) => {
  console.error(`${operation} error:`, error.message);
  res.status(500).json({
    success: false,
    message: `Server Error (${operation})`,
    error: error.message
  });
};

// @desc    Create new task
// @route   POST /api/tasks
// @access  Private
exports.createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    // Validate input
    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title is required"
      });
    }

    const newTask = await Task.create({
      title,
      description: description || '',
      status: status || 'pending',
      user: req.user
    });

    res.status(201).json({
      success: true,
      data: newTask
    });
  } catch (error) {
    handleError(res, error, 'Create');
  }
};

// @desc    Get all tasks of logged-in user
// @route   GET /api/tasks
// @access  Private
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user }).sort('-createdAt');
    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  } catch (error) {
    handleError(res, error, 'Get');
  }
};

// @desc    Update a task by ID
// @route   PUT /api/tasks/:id
// @access  Private
exports.updateTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    // Find task belonging to this user
    let task = await Task.findOne({ _id: req.params.id, user: req.user });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    // Update fields
    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;

    const updatedTask = await task.save();
    
    res.status(200).json({
      success: true,
      data: updatedTask
    });
  } catch (error) {
    handleError(res, error, 'Update');
  }
};

// @desc    Delete a task by ID
// @route   DELETE /api/tasks/:id
// @access  Private
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ 
      _id: req.params.id, 
      user: req.user 
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully'
    });
  } catch (error) {
    handleError(res, error, 'Delete');
  }
};