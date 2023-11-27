import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from './User';
import { Transaction } from './Transaction';

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column()
  status: string;

  @ManyToOne(() => User, user => user.invoices)
  @JoinColumn()
  receiver: User;

  @OneToMany(() => Transaction, transaction => transaction.invoice)
  @JoinColumn()
  transactions: Transaction[];
}
