import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Invoice } from './Invoice';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column()
  status: string;

  @Column()
  paymentMethod: string;

  @ManyToOne(() => Invoice, invoice => invoice.transactions)
  @JoinColumn()
  invoice: Invoice;
}
