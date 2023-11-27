import 'reflect-metadata';
import express from 'express';
import { createConnection } from 'typeorm';

import * as userController from './controllers/UserController';
import * as invoiceController from './controllers/InvoiceController';
import * as transactionController from './controllers/TransactionController';
import * as healthCheckController from './controllers/HealthCheckController';
import { Invoice, User, Transaction } from './models';
// import {  } from './middleware/AuthMiddleware';

const app = express();
const port = 3000;

app.use(express.json());

const connectionOptions: any = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  entities: [Invoice, User, Transaction],
  synchronize: true,
  logging: true,
};

createConnection(connectionOptions).then(async connection => {
  console.log('PostGres Db connected');
  // Health check API
  app.get('/health', healthCheckController.checkAppHealth);

  // User APIs
  app.post('/api/users', userController.createUser);
  app.get('/api/users', userController.getAllUsers);
  app.get('/api/users/:id', userController.getUserById);

  // Invoices APIs
  app.post('/api/invoices', invoiceController.createInvoice);
  app.get('/api/invoices', invoiceController.getInvoices);

  // Transaction based APIs
  app.post('/api/transactions', transactionController.createTransaction);
  app.get('/api/transactions', transactionController.getAllTransaction);

  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
}).catch(error => console.log('TypeORM connection error: ', error));