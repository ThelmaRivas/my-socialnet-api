const router = require("express").Router();

// Manage user routes (POST, GET, PUT, DELETE), friends (POST, DELETE)
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controllers/user-controller");

// /api/users
router.route("/").get(getAllUsers).post(createUser);

// /api/users/:userId/friends/:friendId
router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend);

// /api/users/:userId
router.route("/:userId").get(getUserById).put(updateUser).delete(deleteUser);

module.exports = router;
