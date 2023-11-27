import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { Transaction, Invoice } from '../models';

export const createTransaction = async (req: Request, res: Response) => {
  try {
    const { invoiceId, paymentMethod } = req.body;

    const invoiceRepository = getRepository(Invoice);
    const transactionRepository = getRepository(Transaction);

    const invoice = await invoiceRepository.findOne({ where: { id : invoiceId}});

    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    // Implement payment gateway integration and update transaction status accordingly

    const transaction = new Transaction();
    transaction.amount = invoice.amount;
    transaction.paymentMethod = paymentMethod;
    transaction.status = 'success'; // Update based on payment response
    transaction.invoice = invoice;


    await transactionRepository.save(transaction);

    // Update invoice status based on transactions
    invoice.status = 'PAID';
    await invoiceRepository.save(invoice);

    return res.status(200).json({ message: 'Transaction successful' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getAllTransaction = async (req: Request, res: Response) => {
  try {
    const transactionRepository = getRepository(Transaction);
    const transactions = await transactionRepository.find();
    return res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
