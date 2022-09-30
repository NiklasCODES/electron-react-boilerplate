import { Collection, MongoClient, ObjectId } from "mongodb";
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'sternefutterdb-v1';

export interface CustomerType {
  _id: string;
  customer_name: string;
  pet_name: string;
  pet_art: string;
  amount: number;
}

export async function initCustomer() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  return db.collection('customers');
  //return customerObjects.toArray();
  // the following code examples can be pasted here...

}

//interface CustomerType {
  //id: number;
  //customer_name: string;
  //pet_name: string;
  //pet_art: string;
  //pet_amount: number;
//}

export function test(data: any) {
  console.log(data);
  console.log("test.");
}

//async function getAllCustomers(collection: Collection<Document>): Array<CustomerType> {
export async function getAllCustomers(collection: any) {
  const customerResponse = await collection.find({});
  const customers = await customerResponse.toArray();
  return customers;
}

//async function getCustomer(collection: Collection<Document>, id: number): Array<CustomerType> {
export async function getCustomer(collection: any, id: string) {
  const customerResponse = await collection.findOne({ _id: new ObjectId(id)});
  return customerResponse;
}

function validateCustomerObject(customer: any) {
  if(customer.customer_name == undefined) {
    console.log("No Customer Creation! Name is missing!");
    return false;
  } if(customer.pet_name == undefined) {
    console.log("No Customer Creation! Pet Name is missing!");
    return false;
  } if(customer.pet_art == undefined) {
    console.log("No Customer Creation! Pet Art is missing!");
    return false;
  } if(customer.amount == undefined) {
    console.log("No Customer Creation! Amount is missing!");
    return false;
  }
  return true;
}

validateCustomerObject({});

export async function createCustomer(customer: Omit<CustomerType, "_id">, collection: Collection) {
  return await collection.insertOne(customer);
}

export async function updateCustomer(id: string, dataToUpdate: any, collection: Collection) {
  return await collection.updateOne({ _id: new ObjectId(id)}, {
    $set: {
      ...dataToUpdate
    },
  });
}

export async function deleteCustomer(id: string, collection: Collection) {
  return await collection.deleteOne({ _id: new ObjectId(id)});
}

async function main() {
  //const collection = await initCustomer();
  //const customers = await getCustomer(collection, "Max Mustermann");
  //const allCustomers = await customers.toArray();
  //console.log(customers);
}

main();