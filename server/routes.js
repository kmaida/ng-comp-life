// Data
const dinosaurs = require('./data/dinosaurs.json');

module.exports = function(app) {
  // API works (public)
  app.get('/api', (req, res) => {
    res.send('API works!');
  });

  // GET dinosaurs data (instant local)
  app.get('/api/dinosaurs', (req, res) => {
    res.send(dinosaurs);
  });

  // GET dinosaurs data (delayed to simulate non-local)
  app.get('/api/delay/dinosaurs', (req, res) => {
    setTimeout(() => {
      res.send(dinosaurs);
    }, Math.random() * 4000);
  });
};
