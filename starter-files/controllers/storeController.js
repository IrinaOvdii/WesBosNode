// exports.myMiddleware = (req, res, next) => {
//   req.name = 'Irina';
//   if(req.name === 'Irina') {
//     throw Error('That is a stupid name');
//   };
//   next();
// };
const mongoose = require('mongoose');
const Store = mongoose.model('Store');

exports.homePage = (req, res) => {
  // we use != in view to get html styles (layout.pug: p.flash__text!= message)
  // req.flash('error', 'Something <strong>Happened</strong>');

  // req.flash('info', 'Het is info');
  // req.flash('warning', 'Het is <strong>warning</strong>');
  // req.flash('success', 'Het is success');

  res.render('index');
};

exports.addStore = (req, res) => {
  res.render('editStore', {title: 'Add Store'});
};

exports.createStore = async (req, res) => {
  const store = await (new Store(req.body)).save();
  // const store = new Store(req.body);
  // await store.save();
  req.flash('success', `Successfully Created ${store.name}. Care to leave a review?`);
  res.redirect(`/store/${store.slug}`);
};

exports.getStores = async (req, res) => {
  // 1. Query the db for list of all Stores.
  const stores = await Store.find();
  res.render('stores', {title: 'Stores', stores: stores});
};

// exports.createStore = (req, res) => {
//   const store = new Store(req.body);
//   store
//     .save()
//     .then(store => {
//       res.json(store);
//     })
//     .catch(err => {
//       throw Error(err);
//     })
//   console.log('It worked');
// };
