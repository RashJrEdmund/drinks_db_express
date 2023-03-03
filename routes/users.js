var express = require('express');
const {
  getAllUsers,
  findUserById,
  insertUser,
  deleteOneUser,
  editOneUser
} = require('../database/users');

var router = express.Router();

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const users = await getAllUsers();
  res.send(users);
});

router.post('/', async function(req, res, next) {
  const newUser = await insertUser(req.body);
  res.send(newUser);
});

router.get('/:id', async function(req, res, next) {
  const user = await findUserById(+req.params.id);
  res.send(user);
});

router.put('/:id', async function(req, res, next) {
  const overWrittenUser = await editOneUser(+req.params.id, req.body);
  res.send(overWrittenUser);
});

router.patch('/:id', async function(req, res, next) {
  const editedUser = await editOneUser(+req.params.id, req.body);
  res.send(editedUser);
});

router.delete('/:id', function(req, res, next) {
  const results = deleteOneUser(+req.params.id);
  res.send(results);
});

module.exports = router;
