const app = require('./app');

const connectDB = require('./utils/connectDB');

// Connect to database
connectDB()
  .then(() => {
    console.log(`Connected to ${process.env.DB}`);
    app.listen(process.env.PORT || 3000, () => {
      console.log(`App listening on ${process.env.PORT}`);
    });
  })
  .catch(err => {
    console.log(err);
  });
