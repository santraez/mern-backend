const UserModel = require('../models/User');
const { validateData } = require('../helpers/user');
const path = require('path');
const fs = require('fs');

const postUser = (req, res) => {
  const user = req.body;
  try {
    validateData(user);
  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid data'
    });
  };
  const newUser = new UserModel(user);
  newUser.save((err, data) => {
    if (err || !data) {
      return res.status(400).json({
        status: 'error',
        message: 'Error creating user'
      });
    };
    return res.status(200).json({
      status: 'success',
      message: 'User created successfully',
      user: data
    });
  });
};

const postUserImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      status: 'error',
      message: 'No file uploaded'
    });
  };
  const extension = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
  if (extension !== 'jpg' && extension !== 'jpeg' && extension !== 'png') {
    return fs.unlink(req.file.path, (err) => {
      res.status(400).json({
        status: 'error',
        message: 'Invalid image extension'
      });
    });
  };
  const { id } = req.params;
  const updatedUser = UserModel.findOneAndUpdate({ _id: id }, { image: req.file.filename }, { new: true });
  updatedUser.exec((err, data) => {
    if (err || !data) {
      return res.status(400).json({
        status: 'error',
        message: 'Error updating user'
      });
    };
    return res.status(200).json({
      status: 'success',
      message: 'Image uploaded successfully',
      file: req.file
    });
  });
};

const getUsers = (req, res) => {
  const { nro } = req.params;
  const users = UserModel.find({});
  if (nro) {
    users.limit(parseInt(nro));
  };
  users.sort({ date: -1 });
  users.exec((err, data) => {
    if (err || !data) {
      return res.status(404).json({
        status: 'error',
        message: 'Error getting users'
      });
    };
    return res.status(200).json({
      status: 'success',
      message: 'Users retrieved successfully',
      amount: data.length,
      users: data
    });
  });
};

const getByUserId = (req, res) => {
  const { id } = req.params;
  const user = UserModel.findById(id);
  user.exec((err, data) => {
    if (err || !data) {
      return res.status(404).json({
        status: 'error',
        message: 'Error getting user'
      });
    };
    return res.status(200).json({
      status: 'success',
      message: 'User retrieved successfully',
      user: data
    });
  });
};

const getUserImage = (req, res) => {
  const { name } = req.params;
  const imagePath = './src/media/images/' + name;
  fs.stat(imagePath, (err, data) => {
    if (data) {
      return res.status(200).sendFile(
        path.resolve(imagePath)
      );
    };
    return res.status(404).json({
      status: 'error',
      message: 'Image not found'
    });
  });
};

const searchUsers = (req, res) => {
  const { str } = req.params;
  const users = UserModel.find({ '$or': [
    { 'name': { '$regex': str, '$options': 'i' } },
    { 'email': { '$regex': str, '$options': 'i' } }
  ] });
  users.sort({ date: -1 });
  users.exec((err, data) => {
    if (err || !data || data.length <= 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Error searching users'
      });
    };
    return res.status(200).json({
      status: 'success',
      message: 'Users retrieved successfully',
      amount: data.length,
      users: data
    });
  });
};


const putUser = (req, res) => {
  const { id } = req.params;
  const user = req.body;
  try {
    validateData(user);
  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid data'
    });
  };
  const updatedUser = UserModel.findOneAndUpdate({ _id: id }, user, { new: true });
  updatedUser.exec((err, data) => {
    if (err || !data) {
      return res.status(400).json({
        status: 'error',
        message: 'Error updating user'
      });
    };
    return res.status(200).json({
      status: 'success',
      message: 'User updated successfully',
      user: data
    });
  });
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  const user = UserModel.findOneAndDelete({ _id: id });
  user.exec((err, data) => {
    if (err || !data) {
      return res.status(404).json({
        status: 'error',
        message: 'Error deleting user'
      });
    };
    return res.status(200).json({
      status: 'success',
      message: 'User deleted successfully',
      user: data
    });
  });
};

module.exports = {
  postUser,
  postUserImage,
  getUsers,
  getByUserId,
  getUserImage,
  searchUsers,
  putUser,
  deleteUser
};