// const Connection = require("mysql2/typings/mysql/lib/Connection");
const connection = require("./index");

const groupUsersDrinks = (rows) => {
  const users = {};
  const ids = new Set();
  rows.forEach(({id, name, ...drink}) => {
    if(users[id]) {
      users[id].drinks.push(drink);
    } else {
      users[id] = { id, name, drinks: [drink] };
    }
    ids.add(id);
  });
  return Array.from(ids).map(id => users[id]);
}

// async function getAllUsers() {
//   const [result] = await connection.query(
//     "SELECT u.id, u.name, d.id as drink_id, d.name as drink_name FROM users as u JOIN drinks as d on d.user_id = u.id ORDER BY u.id ASC;"
//   );
//   return groupUsersDrinks(result);
// }

async function getAllUsers() { // THIS THE RIGHT ONE
  const [result] = await connection.query("SELECT * FROM users;");
  return result;
}

async function findUserById(id) {
  const [[user]] = await connection.query(`SELECT * FROM users where id =?`, [id]);
  console.log('this is user in findUserById', user);
  return user;
}

async function insertUser ({name, api_key, phone, email, password}) {
  const [userData] = await connection
    .query('INSERT INTO users (name, api_key, phone, email, password) VALUES (?, ?, ?, ?, ?)',
    [name, api_key, phone, email, password]);
  return findUserById(userData.insertId);
}

async function editOneUser (id, update) { // this function works for both Put, and Patch
  user = findUserById(id);
  const editedUser = { ...user, ...update } // since findUserById() returns an object

  return editedUser;
}

async function deleteOneUser (id) {
  const [ack] = await connection.query('DELETE FROM users WHERE id =?', [id])
  console.log(`userId successfully removed userId ${id}`, ack);
  return `userId ${id}, successfully removed`;
}

module.exports = {
  getAllUsers,
  findUserById,
  insertUser,
  editOneUser,
  deleteOneUser
}