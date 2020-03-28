// exports.myMiddleware = (req, res, next) => {
//   req.name = 'Irina';
//   if(req.name === 'Irina') {
//     throw Error('That is a stupid name');
//   };
//   next();
// };

exports.homePage = (req, res) => {
  res.render('index');
};

exports.addStore = (req, res) => {
  res.render('editStore', {title: 'Add Store'});
};

exports.createStore = (req, res) => {
  res.json(req.body);
};
