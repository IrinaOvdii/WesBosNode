const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');

// Do work here
router.get('/', storeController.homePage);
router.get('/add', storeController.addStore);
router.post('/add', storeController.createStore);

// router.get('/', (req, res) => {
  // const irina = {name: "Irina", age: 33, location: "Duinvoetstraat, Almere"};
  // res.json(irina);
  // res.send('Hey! It works!!!**');
  // res.send(req.query.name);
  // res.json(req.query);
  // res.render('hello', {
  //   name: "irina",
  //   age: 33,
  //   location: "Almere",
  //   title: "MegaIra"
  // });
// });

// router.get('/reverse/:name/:age', (req, res) => {
//   const reverse = [...req.params.name].reverse().join(' ');
//   res.send(reverse);
//
// });

module.exports = router;
