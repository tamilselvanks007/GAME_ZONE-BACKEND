import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";
import { productsRouter } from "./routes/products.js";
import bcrypt from "bcrypt";
dotenv.config();

// console.log(process.env.MONGO_URL);

const app = express();

const PORT = process.env.PORT;

// cors cancel node's self diffence mechanism
app.use(cors()); // it alows to use the same url for all the requests(.com)

// we need to tell node to the data which i come from the body is json data
// middileware -> intercept all requests -> converting body to json
app.use(express.json());

// const MONGO_URL = "mongodb://localhost";

const MONGO_URL = process.env.MONGO_URL;

async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Connected to MongoDB");
  return client;
}
export const client = await createConnection();

// Read Method (GET)
// creating a server for home page
app.get("/", (req, res) => {
  res.send("Welcome to GAME ZONE!🎮");
});

app.use("/products", productsRouter);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

async function genPassword(password) { // password is a string
  const salt = await bcrypt.genSalt(10); // 10 is the number of rounds
  const hashpassword = await bcrypt.hash(password, salt); // password is the string and salt is the number of rounds
  console.log({ salt, hashpassword });
}
genPassword("123456"); // 123456 is the password
