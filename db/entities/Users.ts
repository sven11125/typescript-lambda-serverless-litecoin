import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryColumn()
  public id: number;

  @Column({ nullable: true })
  public wallet_id: string

  @Column({ nullable: true })
  public wallet_address: string
}