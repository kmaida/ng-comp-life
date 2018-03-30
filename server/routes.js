// Dependencies
const sort = require('immutable-sort');
// Data
const dinosaurs = require('./data/dinosaurs.json');

function randomDelay() {
  return Math.random() * 4000;
}

module.exports = function(app) {
  // API works (public)
  app.get('/api', (req, res) => {
    res.send('API works!');
  });

  // GET dinosaurs data (instant local)
  app.get('/api/dinosaurs', (req, res) => {
    res.send(dinosaurs);
  });

  // GET dinosaurs data
  app.get('/api/delay/dinosaurs', (req, res) => {
    setTimeout(() => {
      res.send(dinosaurs);
    }, randomDelay());
  });
};
