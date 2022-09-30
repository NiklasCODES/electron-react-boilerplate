const express = require("express");
const { MongoClient } = require("mongodb");

const app = express()
const port = 3000

const {
    initCustomer,
    getCustomer,
    getAllCustomers,
    createCustomer,
    updateCustomer,
    deleteCustomer
} = require("./customers");
const {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
  deleteAllNotes
} = require('./notes');
const {
  getAllCodes,
  getCode,
  createCode,
  updateCode,
  deleteCode
} = require("./discount");
const {
  getPurchase,
  getAllPurchasesOfCustomer,
  createPurchase,
  updatePurchase,
  deletePurchase,
  deleteAllPurchases
} = require("./purchases");

const cors = require("cors");

var customerCollection: any = null;
var notesCollection: any = null;
var codesCollection: any = null;
var purchaseCollection: any = null;

const url = 'mongodb://localhost:27017';
const dbName = 'sternefutterdb-v1';
const client = new MongoClient(url);

app.use(express.json());
app.use(cors());

app.get('/', (_req: any, res: any) => {
  res.send('Hello World!')
});

app.get('/getCustomer/:id', async (req: any, res: any) => {
  const customer = await getCustomer(customerCollection, req.params.id);
  res.json(customer);
});

app.get('/getAllCustomers', async (_req: any, res: any) => {
  const customers = await getAllCustomers(customerCollection);
  res.json(customers);
})

app.post('/createCustomer', async (req: any, res: any) => {
  const customer = await createCustomer(req.body.customer, customerCollection);
  res.json(customer);
});

app.patch('/updateCustomer/:id', async (req: any, res: any) => {
  const customer = await updateCustomer(req.params.id ,req.body.update, customerCollection);
  res.json(customer);
});

app.delete('/deleteCustomer/:id', async (req: any, res: any) => {
  const customer = await deleteCustomer(req.params.id, customerCollection);
  await deleteAllNotes(req.params.id, notesCollection);
  res.json(customer);
});

app.get('/getNotes/:id', async (req: any, res: any) => {
  const notes = await getNotes(notesCollection, req.params.id);
  res.json(notes);
})

app.post('/createNote', async (req: any, res: any) => {
  const note = await createNote(req.body.note, notesCollection);
  res.json(note);
})

app.patch('/updateNote/:id', async (req: any, res: any) => {
  console.log(req.body.update);
  const note = await updateNote(req.params.id,req.body.update, notesCollection);
  console.log(note);
  res.json(note);
});

app.delete('/deleteNote/:id', async (req: any, res: any) => {
  const note = await deleteNote(req.params.id, notesCollection);
  res.json(note);
});

app.delete('/deleteAllNotes/:id', async (req: any, res: any) => {
  const note = await deleteAllNotes(req.params.id, notesCollection);
  res.json(note);
});

app.get('/getAllCodes', async (_req: any, res: any) => {
  const codes = await getAllCodes(codesCollection);
  res.json(codes);
})

app.get('/getCode/:id', async (req: any, res: any) => {
  const code = await getCode(req.params.id, codesCollection);
  res.json(code);
});

app.post('/createCode', async (req: any, res: any) => {
  const response = await createCode(req.body.code, codesCollection);
  res.json(response);
});

app.patch('/updateCode/:id', async (req: any, res: any) => {
  const response = await updateCode(req.params.id, req.body.update, codesCollection);
  res.json(response);
});

app.delete('/deleteCode/:id', async (req: any, res: any) => {
  const response = await deleteCode(req.params.id, codesCollection);
  res.json(response);
});

app.get('/getPurchase/:id', async (req: any, res: any) => {
  const purchase = await getPurchase(req.params.id, purchaseCollection);
  res.json(purchase);
});

app.get('/getPurchases/:id', async (req: any, res: any) => {
  const purchase = await getAllPurchasesOfCustomer(req.params.id, purchaseCollection);
  res.json(purchase);
});

app.post('/createPurchase', async (req: any, res: any) => {
  const response = await createPurchase(req.body.purchase, purchaseCollection);
  res.json(response);
});

app.patch('/updatePurchase/:id', async (req: any, res: any) => {
  const response = await updateCode(req.params.id, req.body.update, purchaseCollection);
  res.json(response);
});

app.delete('/deletePurchase/:id', async (req: any, res: any) => {
  const response = await deletePurchase(req.params.id, purchaseCollection);
  res.json(response);
});

app.delete('/deleteAllPurchases/:id', async (req: any, res: any) => {
  const note = await deleteAllPurchases(req.params.id, purchaseCollection);
  res.json(note);
});


app.listen(port, async () => {

    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    //return db.collection('customers');

    customerCollection = await db.collection("customers");
    notesCollection = await db.collection("notes");
    codesCollection = await db.collection("codes");
    purchaseCollection = await db.collection("purchases");
    console.log(`Example app listening on port ${port}`)
})