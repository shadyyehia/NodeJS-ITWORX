const express = require('express');
const debug = require('debug')('app:productsRouter');
const { MongoClient, ObjectID } = require('mongodb');



const productsRouter = express.Router();

productsRouter.route('/').get((req, res) => {
  const url =
    'mongodb+srv://shadyyehia:1ssssss1@shadycluster.hkpem.mongodb.net/?retryWrites=true&w=majority';
  const dbName = 'myDB';

  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(url);
      debug('Connected to the mongo DB');

      const db = client.db(dbName);

      const products = await db.collection('Product').find().toArray();

      res.render('products', { products: products });
    } catch (error) {
      debug(error.stack);
    }
    client.close();
  })();
});

productsRouter.route('/:id').get((req, res) => {
  const id = req.params.id;
  const url =
    'mongodb+srv://shadyyehia:1ssssss1@shadycluster.hkpem.mongodb.net/?retryWrites=true&w=majority';
  const dbName = 'myDB';

  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(url);
      debug('Connected to the mongo DB');

      const db = client.db(dbName);

      const product = await db
        .collection('Product')
        .findOne({ _id: new ObjectID(id) });

      res.render('product', {
        product: product,
      });
    } catch (error) {
      debug(error.stack);
    }
    client.close();
  })();
});

module.exports = productsRouter;
