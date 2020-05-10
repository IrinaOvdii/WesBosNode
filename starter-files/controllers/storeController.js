// exports.myMiddleware = (req, res, next) => {
//   req.name = 'Irina';
//   if(req.name === 'Irina') {
//     throw Error('That is a stupid name');
//   };
//   next();
// };
const mongoose = require('mongoose');
const Store = mongoose.model('Store');
const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');

const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter: function(req, file, next) {
    const isPhoto = file.mimetype.startsWith('image/');
    if(isPhoto) {
      next(null, true);
    } else {
      next({ message: 'That filetype isn\'t allowed!'}, false);
    }
  }
};

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

exports.upload = multer(multerOptions).single('photo');

exports.resize = async (req, res, next) => {
  // check if there is no new file to resize
  if(!req.file) {
    next();
    return;
  }
  const extension = req.file.mimetype.split('/')[1];
  req.body.photo = `${uuid.v4()}.${extension}`;
  // now we start doing resize:
  const photo = await jimp.read(req.file.buffer);
  await photo.resize(800, jimp.AUTO);
  await photo.write(`./public/uploads/${req.body.photo}`);
  next();

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

exports.editStore = async (req, res) => {
  const store = await Store.findOne({ _id: req.params.id});
  res.render('editStore', {title: `Edit store ${store.name}`, store});
};

exports.updateStore = async (req, res) => {
  req.body.location.type = 'Point';
  const store = await Store.findOneAndUpdate({_id: req.params.id}, req.body,
    {
    new: true,
    runValidators: true
  }).exec();
  req.flash('success', `Successfully updated <strong>${store.name}</strong>. <a href="/stores/${store.slug}">View store</a>`);
  res.redirect(`/stores/${store._id}/edit`)
};

exports.getStoreBySlug = async (req, res, next) => {
  const store = await Store.findOne({slug: req.params.slug});
  if(!store) return next(); // if there is no store with this slug we go to 'next' step
  res.render('store', {store, title: store.name});
};

exports.getStoresByTag = async (req, res) => {
  const tag = req.params.tag;
  const tagQuery = tag || { $exists: true };
  
  const tagsPromise = Store.getTagsList();
  const storesPromise = Store.find({ tags: tagQuery });
  const result = await Promise.all([tagsPromise, storesPromise]);

  var tags = result[0];
  var stores = result[1];
  // or we can call like this:
  // const [tags, stores] = await Promise.all([tagsPromise, storesPromise]);
  res.render('tag', {tags, title: 'Tags', tag, stores});
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
