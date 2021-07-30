const express = require('express');
const people = require('./routes/people');
const auth = require('./routes/auth');
const app = express();

// static assetts
app.use(express.static('./methods-public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/people', people);
app.use('/login', auth);

app.listen(5000, () => {
  console.log('Server is listening on port 5000...');
});
