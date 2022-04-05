import { client } from "./index.js";

export async function deleteManyProductsByProductType(productType) {
  return await client
    .db("equipments")
    .collection("products")
    .deleteMany({ productType: productType });
}

export async function deleteOneProductById(id) {
  return await client
    .db("equipments")
    .collection("products")
    .deleteOne({ id: id });
}

export async function updateManyProductsByProductType(productType, change) {
  return await client
    .db("equipments")
    .collection("products")
    .updateMany({ productType: productType }, { $set: change });
}

export async function updateOneProductById(id, change) {
  return await client
    .db("equipments")
    .collection("products")
    .updateOne({ id: id }, { $set: change });
}

export async function readProductsById(id) {
  return await client
    .db("equipments")
    .collection("products")
    .findOne({ id: id });
}

export async function readProductsByProductType(productType) {
  return await client
    .db("equipments")
    .collection("products")
    .find({ productType: productType })
    .toArray();
}

export async function readAllProducts() {
  return await client.db("equipments").collection("products").find().toArray();
}

export async function createManyProducts(data) {
  return await client.db("equipments").collection("products").insertMany(data);
}

export async function createOneProduct(data) {
  return await client.db("equipments").collection("products").insertOne(data);
}
