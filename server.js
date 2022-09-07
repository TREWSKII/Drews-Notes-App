const express = require('express');
const routes = require('./routes/index.js');
const apijs = require('./routes/apiRoutes');
const htmljs = require('./routes/htmlRoutes');
const app = express();
const PORT = process.env.PORT || 3001;


// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
// app.use('/', htmljs);
// app.use('/api', apijs);
app.use('/', routes);


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
