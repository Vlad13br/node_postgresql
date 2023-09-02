const db = require('../db')

class UserController {
  
  async createUser(req,res) {
 try {
      const { name, surname } = req.body;
      const newUser = await db.query(`INSERT INTO person (name, surname) VALUES ($1, $2) RETURNING *`, [name, surname]);
      res.json(newUser.rows[0]);
    } catch (error) {
      res.status(500).json({ error: 'Unable to create user' });
    }
  }
  
  async getAllUser(req,res) {
  try {
    const users = await db.query(`SELECT * FROM person`)
    res.json(users.rows)
  } catch (error) {
      res.status(500).json({ error: 'Unable to get users' });
  }
  }
  
  async getOneUser(req,res) {
  try {
    const id = req.params.id;
    const user = await db.query(`SELECT * FROM person where id = $1`, [id])
    res.json(user.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Unable to get user' });
  }
  }
  
async updateUser(req, res) {
  try {
    const { id, name, surname } = req.body;
    const updatedUser = await db.query(
      `UPDATE person SET name = $1, surname = $2 WHERE id = $3 RETURNING *`,
      [name, surname, id]
    );
    res.json(updatedUser.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Unable to update user' });
  }
}
  
  async deleteUser(req,res) {
   try {
    const id = req.params.id;
    const user = await db.query(`DELETE FROM person where id = $1`, [id])
    res.json(user.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Unable to delete user' });
  }
}

}

module.exports = new UserController()