exports.createUser = (req, res) => {
  res.status(201).json('created');
};

exports.getAllUsers = (req, res) => {
  res.status(200).json('ok');
};

exports.getUser = (req, res) => {
  res.status(200).json('ok');
};

exports.updateUser = (req, res) => {
  res.status(200).json('ok updated');
};
exports.deleteUser = (req, res) => {
  res.status(204).json(null);
};
