const dbPool = require('../config/database')

const getAllUsers = () => {
    const SQLQuery = 'SELECT * FROM users ORDER BY id ASC';
    return dbPool.query(SQLQuery);
}

const getUserById = (idUser) => {
    const SQLQuery = 'SELECT id, name, email, address FROM users WHERE id = $1';
    return dbPool.query(SQLQuery, [idUser]);
}

const createNewUser = (body) => {
    const SQLQuery = 'INSERT INTO users (name, email, address) VALUES ($1, $2, $3) RETURNING *';
    return dbPool.query(SQLQuery, [body.name, body.email, body.address]);
}

const updateUser = (body, idUser) => {
    const SQLQuery = 'UPDATE users SET name = $1, email = $2, address = $3 WHERE id = $4 RETURNING *';
    return dbPool.query(SQLQuery, [body.name, body.email, body.address, idUser]);
}

const deleteUser = (idUser) => {
    const SQLQuery = 'DELETE FROM users WHERE id = $1 RETURNING *';
    return dbPool.query(SQLQuery, [idUser]);
}


module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser,
    getUserById,
}