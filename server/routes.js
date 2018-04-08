// Data
const source = require('./data/dinosaurs.json');
let dinos = [...source];

function randomDelay() {
  return Math.random() * 3000;
}

module.exports = function(app) {
  // API works (public)
  app.get('/api', (req, res) => {
    res.send('API works!');
  });

  // GET dinosaurs data
  app.get('/api/dinosaurs', (req, res) => {
    res.send(dinos);
  });

  // GET dinosaurs data (delayed to simulate non-local environment)
  app.get('/api/delay/dinosaurs', (req, res) => {
    setTimeout(() => {
      res.send(dinos);
    }, randomDelay());
  });

  // POST mark dino as a favorite
  app.post('/api/fav', (req, res) => {
    const dinoName = req.body.name;
    const matchingDino = dinos.filter(d => d.name === dinoName)[0];

    if (!matchingDino) {
      res.status(404).send({error: `Cannot find a dinosaur called "${dinoName}"`});
    } else {
      matchingDino.favorite = true;
      res.send(matchingDino);
    }
  });
};
