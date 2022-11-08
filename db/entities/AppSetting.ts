import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class AppSetting {
  @PrimaryColumn()
  public id: number;

  @Column({ length: 100 })
  public code: string

  @Column('text')
  public value: string

  @Column()
  public created_at: number

  @Column()
  public updated_at: number
}