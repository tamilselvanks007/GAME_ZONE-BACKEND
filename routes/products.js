import express from "express";
import {
  createManyProducts,
  createOneProduct,
  deleteManyProductsByProductType,
  deleteOneProductById,
  readAllProducts,
  readProductsById,
  readProductsByProductType,
  updateManyProductsByProductType,
  updateOneProductById,
} from "../helper.js";

const router = express.Router(); // we need to create a router object to use the router method in express

// Create Method (POST)
// creating a server for create one product
router.post("/", async (req, res) => {
  const data = req.body;
  const product = await createOneProduct(data); // create one product
  res.send(product);
});

// creating a server for create all products by product type
router.post("/more", async (req, res) => {
  const data = req.body;
  const product = await createManyProducts(data); // create many products
  res.send(product);
});

// Read Method (GET)
// creating a server for read all products
router.get("/", async (req, res) => {
  const product = await readAllProducts(); // read all products
  res.send(product);
});

// creating a server for read products by its type
router.get("/:productType", async (req, res) => {
  const { productType } = req.params;
  const product = await readProductsByProductType(productType); // read all products by its type
  res.send(product);
});

// creating a server for read product by id
router.get("/details/:id", async (req, res) => {
  const { id } = req.params;
  const product = await readProductsById(id); // read all products by its id
  res.send(product);
});

// Update Method (PUT)
// creating a server for update product Details
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const change = req.body;
  const product = await updateOneProductById(id, change); // update one product by its id
  res.send(product);
});

// creating a server for update all product details by product type
router.put("/details/:productType", async (req, res) => {
  const { productType } = req.params;
  const change = req.body;
  const product = await updateManyProductsByProductType(productType, change); // update all products by its type
  res.send(product);
});

// Delete Method (DELETE)
// creating a server for delete product by id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const product = await deleteOneProductById(id); // delete one product by its id
  res.send(product);
});

// creating a server for delete all products by product type
router.delete("/details/:productType", async (req, res) => {
  const { productType } = req.params;
  const product = await deleteManyProductsByProductType(productType); // delete all products by its type
  res.send(product);
});

export const productsRouter = router;
