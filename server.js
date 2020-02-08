const app = require('./app');

const connectDB = require('./utils/connectDB');

// Connect to database
connectDB();

app.listen(process.env.PORT || 3000, () => {
  console.log(`App listening on ${process.env.PORT}`);
});
