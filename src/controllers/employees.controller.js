import { pool } from "../db.js";

async function index(req, res) {
  try {
    const employees = await pool.query("SELECT * FROM employees");
    res.send(employees[0]);
  } catch (error) {
    res
      .status(500)
      .send({ message: `Error showing employees, error: ${error.message}` });
  }
}

async function show(req, res) {
  const { id } = req.params;

  try {
    const employee = await pool.query("SELECT * FROM employees WHERE id = ?", [
      id,
    ]);
    res.send(employee[0]);
  } catch (error) {
    res
      .status(500)
      .send({ message: `Error showing employee, error: ${error.message}` });
  }
}

async function store(req, res) {
  const { name, salary } = req.body;
  try {
    const [rows] = await pool.query(
      "INSERT INTO employees (name, salary) VALUES (?, ?)",
      [name, salary]
    );
    res.send({ rows });
  } catch (error) {
    res
      .status(500)
      .send({ message: `Error saving employe, error: ${error.message}` });
  }
}

async function update(req, res) {
  const { id } = req.params;
  const { name, salary } = req.body;
  try {
    const [result] = await pool.query("UPDATE employees SET name = ?, salary = ? WHERE id = ?", [name, salary, id])
    res.send({result})
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .send({ message: `Error saving employe, error: ${error.message}` });
  }
}

async function destroy(req, res) {
  const { id } = req.params
  try{
    const [result] = await pool.query("DELETE FROM employees WHERE id = ?", [id])
    res.send({result})
  } catch (error){
    res
      .status(500)
      .send({ message: `Error deleting employee, error: ${error.message}` });
  }
}

export default {
  index,
  show,
  store,
  update,
  destroy,
};
