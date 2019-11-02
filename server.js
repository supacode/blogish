const app = require('./app');

app.get('/', (req, res, next) => {
  res.send('Hello World');
});

app.listen(4000);
