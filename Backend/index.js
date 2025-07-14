const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app'); // 👈 imported Express app

dotenv.config();

const PORT = process.env.PORT || 5000;

// Connect to MongoDB, then start server
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ MongoDB Connected');
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
})
.catch(err => console.error('❌ MongoDB Error:', err.message));
