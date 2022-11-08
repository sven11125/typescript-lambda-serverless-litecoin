import { db } from '@/db/db';
import { Connection, Repository, DeleteResult } from 'typeorm';
import { UserWallet } from '@/db/entities/UserWallet';


class UserWalletServiceClass {
  public userWalletRepo: Repository<UserWallet>;
  private conn: Connection;

  public getUserWalletByAccount = async (account: string): Promise<UserWallet> => {
    await this.connect();
    return this.userWalletRepo.findOne({ where: { wallet_code: account } });
  };


  public insert = async (insertData: Partial<UserWallet>): Promise<UserWallet> => {
    await this.connect();
    const insertResult = await this.userWalletRepo.insert(insertData);
    return this.userWalletRepo.findOne(insertResult.identifiers[0].id);
  };

  public createUserWallet = async (insertData: any): Promise<UserWallet> => {
    await this.connect();
    const insertResult = await this.userWalletRepo.insert(insertData);
    return this.userWalletRepo.findOne(insertResult.identifiers[0].id);
  };

  public updateUserWallet = async (id: number, updateData: any): Promise<UserWallet> => {
    await this.connect();
    await this.userWalletRepo.update(id, updateData);
    return this.userWalletRepo.findOne(id);
  };

  public deleteUserWallet = async (id: number): Promise<DeleteResult> => {
    await this.connect()
    try {
      let user = await this.userWalletRepo.findOne({ where: { id: id } })
      await this.userWalletRepo.update(id, user);
      let deleteResult = await this.userWalletRepo.delete(id);
      if (deleteResult.affected == 1)
        return deleteResult
    } catch (e) {
      return null;
    }
  }

  private connect = async (): Promise<void> => {
    this.conn = await db.connect();
    if (!this.userWalletRepo) {
      this.userWalletRepo = this.conn.getRepository(UserWallet);
    }
  };
}

export const UserWalletService = new UserWalletServiceClass();