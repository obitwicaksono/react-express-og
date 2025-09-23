const express = require("express");
const router = express.Router();
const UserController = require("../controller/users");

router.post("/", UserController.createNewUser);
router.get("/", UserController.getAllUsers);
router.get("/:idUser", UserController.getUserById);
router.patch("/:idUser", UserController.updateUser);
router.delete("/:idUser", UserController.deleteUser);

module.exports = router;