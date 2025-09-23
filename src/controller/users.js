const UsersModel = require("../models/users");

const getAllUsers = async (req, res) => {
  try {
    const data = await UsersModel.getAllUsers();
    res.json({
      message: "GET users successfully",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error.message,
    });
  }
};

const getUserById = async (req, res) => {
  const { idUser } = req.params;
  try {
    const data = await UsersModel.getUserById(idUser);
    if (!data) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.json({
      message: "get user by id successfully",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error.message,
    });
  }
};

const createNewUser = async (req, res) => {
  const { body } = req;
  try {
    const newUser = await UsersModel.createUser(body);
    res.status(201).json({
      message: "create user successfully",
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  const { idUser } = req.params;
  const { body } = req;
  try {
    const updatedUser = await UsersModel.updateUser(idUser, body);
    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.json({
      message: "update user successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  const { idUser } = req.params;
  try {
    const result = await UsersModel.deleteUser(idUser);
    if (!result) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.json({
      message: "delete user successfully",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error.message,
    });
  }
};

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
  getUserById,
};
