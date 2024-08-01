// const Knex = require("knex");
// const fs = require("fs");
// const pg = require("pg");
// import pg from "pg";
// import {Connector} from '@google-cloud/cloud-sql-connector';

// const {Pool} = pg;

// const connector = new Connector();
// const clientOpts = async () => {
//   await connector.getOptions({
//     //   instanceConnectionName: process.env.INSTANCE_CONNECTION_NAME,
//     instanceConnectionName:
//       "react-pirate-app-431121:us-central1:react-pirate-app-sql",
//     authType: "IAM",
//     ipType: 'PUBLIC'
//   });
// };
// clientOpts();

// const pool = new Pool({
//   ...clientOpts,
//   user: "postgres",
//   password: 'Password123',
//   database: "pirates",
//   max: 5
// });

// const express = require("express");
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize, Model, DataTypes } = require('sequelize');


app.use(cors())
app.use(express.json());
app.use(express.static("react-app/dist"));


// Create Sequelize instance
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

// Define User model
class User extends Model {}
User.init({
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING
}, { sequelize, modelName: 'user' });

// Sync models with database
sequelize.sync();

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

app.get('/seeds', async (req, res) => {


  const users = [
    { name: "John Doe", email: "john@example.com", password: "password1" },
    { name: "Jane Smith", email: "jane@example.com", password: "password2" },
    { name: "Mike Johnson", email: "mike@example.com", password: "password3" },
    { name: "Sarah Williams", email: "sarah@example.com", password: "password4" },
    { name: "David Brown", email: "david@example.com", password: "password5" }
  ];
  users.forEach(u => User.create(u));
  // const users = await User.findAll();
  res.json(users);
});

app.post('/users', async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});


// CRUD routes for User model
app.get('/users', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

app.get('/users/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id);
  res.json(user);
});

// app.get("/api/pirates", async (req, res) => {
//   await pool.query("INSERT INTO visits(created_at) VALUES(NOW())");
//   const { rows } = await pool.query(
//     "SELECT created_at FROM visits ORDER BY created_at DESC LIMIT 5"
//   );
//   console.table(rows); // prints the last 5 visits
//   res.send(rows);
// });

app.get("/api/pirates/:id", (req, res) => {
  const id = req.params.id;
  const pirate = getPirate(id);
  if (!pirate) {
    res.status(404).send(`Pirate ${id} not found`);
    return;
  } else {
    res.send({ data: pirate });
  }
});

function getPirate(id) {
  const pirates = [
    { id: 1, name: "Blackbeard", active: true, country: "England" },
    { id: 2, name: "Anne Bonny", active: true, country: "Ireland" },
    { id: 3, name: "Calico Jack", active: false, country: "England" },
    { id: 4, name: "Bartholomew Roberts", active: true, country: "Wales" },
    { id: 5, name: "Mary Read", active: false, country: "England" },
  ];
  return pirates.find((pirate) => pirate.id == id);
}

const port = process.env.PORT || 8080;
app.listen(port, async () => {
  // console.log("process.env: ", process.env);
  // await pool.query(`CREATE TABLE IF NOT EXISTS visits (
  //   id SERIAL NOT NULL,
  //   created_at timestamp NOT NULL,
  //   PRIMARY KEY (id)
  // );`);
  console.log(`Server started at ${port}`);
});