import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserWallet {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column()
  public user_id: number

  @Column({ length: 50 })
  public wallet_code: string

  @Column({ length: 150 })
  public address: string

  @Column()
  public created_at: number

  @Column()
  public updated_at: number

  @Column({ length: 30 })
  public status: string
}