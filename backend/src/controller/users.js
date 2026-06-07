const UsersModel = require("../models/users");

const getAllUsers = async (req, res) => {
  try {
    const result = await UsersModel.getAllUsers();
    res.json({
      message: "GET users successfully",
      data: result.rows,
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
    const result = await UsersModel.getUserById(idUser);
    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.json({
      message: "Get user by id successfully",
      data: result.rows[0],
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
    const result = await UsersModel.createNewUser(body);
    res.status(201).json({
      message: "Create user successfully",
      data: result.rows[0],
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
    const result = await UsersModel.updateUser(body, idUser);
    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.json({
      message: "Update user successfully",
      data: result.rows[0],
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
    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.json({
      message: "Delete user successfully",
      data: result.rows[0],
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
