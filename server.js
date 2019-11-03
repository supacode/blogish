const app = require('./app');

const connectDB = require('./utils/connectDB');

// Connect to database
connectDB();

app.listen(process.env.PORT || 3000);
