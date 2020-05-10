const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');

const { catchErrors } = require('../handlers/errorHandlers');

// Do work here
router.get('/', catchErrors(storeController.getStores));
router.get('/stores', catchErrors(storeController.getStores));
router.get('/add', storeController.addStore);

router.post('/add',
  storeController.upload,
  catchErrors(storeController.resize),
  catchErrors(storeController.createStore)
);

router.post('/add/:id',
  storeController.upload,
  catchErrors(storeController.resize),
  catchErrors(storeController.updateStore)
);
router.get('/stores/:id/edit', catchErrors(storeController.editStore));
router.get('/store/:slug', catchErrors(storeController.getStoreBySlug));

router.get('/tags', catchErrors(storeController.getStoresByTag));
router.get('/tags/:tag', catchErrors(storeController.getStoresByTag));

module.exports = router;




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
