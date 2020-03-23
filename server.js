const app = require('./app');

const connectDB = require('./utils/connectDB');

// Connect to database
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`App listening on ${process.env.PORT}`);
    });
  })
  .catch(err => {
    console.log(err);
  });
