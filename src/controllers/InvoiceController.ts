import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { Invoice, User } from '../models';

export const createInvoice = async (req: Request, res: Response) => {
  try {
    const { amount, receiverId } = req.body;

    const invoiceRepository = getRepository(Invoice);
    const userRepository = getRepository(User);

    const receiver = await userRepository.findOne({ where : { id : receiverId }});

    if (!receiver) {
      return res.status(404).json({ message: 'Receiver not found' });
    }

    const invoice = new Invoice();
    invoice.amount = amount;
    invoice.receiver = receiver;
    invoice.status = 'UNPAID';
    await invoiceRepository.save(invoice);

    return res.status(201).json({ message: 'Invoice created successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getInvoices = async (req: Request, res: Response) => {
  try {
    const invoiceRepository = getRepository(Invoice);
    const invoices = await invoiceRepository.find();

    return res.status(200).json(invoices);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};