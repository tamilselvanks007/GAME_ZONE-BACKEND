import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

// console.log(process.env.MONGO_URL);

const app = express();

const PORT = process.env.PORT;

app.use(cors()); // enable cors

app.use(express.json()); // for parsing application/json

// const MONGO_URL = "mongodb://localhost";

const MONGO_URL = process.env.MONGO_URL;

async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Connected to MongoDB");
  return client;
}
const client = await createConnection();

// Create Method (POST)
// creating a server for create one product
app.post("/products", async (req, res) => {
  const data = req.body;
  const product = await client
    .db("equipments")
    .collection("products")
    .insertOne(data);
  res.send(product);
});

// creating a server for create all products by product type
app.post("/products/more", async (req, res) => {
  const data = req.body;
  const product = await client
    .db("equipments")
    .collection("products")
    .insertMany(data);
  res.send(product);
});

// Read Method (GET)
// creating a server for home page
app.get("/", (req, res) => {
  res.send("Welcome to GAME ZONE!🎮");
});

// creating a server for raed all products
app.get("/products", async (req, res) => {
  const product = await client
    .db("equipments")
    .collection("products")
    .find()
    .toArray();
  res.send(product);
});

// creating a server for read products by its type
app.get("/products/:productType", async (req, res) => {
  const { productType } = req.params;
  const product = await client
    .db("equipments")
    .collection("products")
    .find({ productType: productType })
    .toArray();
  res.send(product);
});

// creating a server for read product by id
app.get("/products/details/:id", async (req, res) => {
  const { id } = req.params;
  const product = await client
    .db("equipments")
    .collection("products")
    .findOne({ id: id });
  res.send(product);
});

// Update Method (PUT)
// creating a server for update product Details
app.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  const change = req.body;
  const product = await client
    .db("equipments")
    .collection("products")
    .updateOne({ id: id }, { $set: change });
  res.send(product);
});

// creating a server for update all product details by product type
app.put("/products/details/:productType", async (req, res) => {
  const { productType } = req.params;
  const change = req.body;
  const product = await client
    .db("equipments")
    .collection("products")
    .updateMany({ productType: productType }, { $set: change });
  res.send(product);
});

// Delete Method (DELETE)
// creating a server for delete product by id
app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await client
    .db("equipments")
    .collection("products")
    .deleteOne({ id: id });
  res.send(product);
});

// creating a server for delete all products by product type
app.delete("/products/details/:productType", async (req, res) => {
  const { productType } = req.params;
  const product = await client
    .db("equipments")
    .collection("products")
    .deleteMany({ productType: productType });
  res.send(product);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
