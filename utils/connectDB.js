const mongoose = require('mongoose');

const connectDB = async () => {
  await mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  });
};

module.exports = connectDB;
