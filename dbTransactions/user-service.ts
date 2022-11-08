import { db } from '@/db/db';
import { Connection, In, Repository, DeleteResult } from 'typeorm';
import { Users } from '@/db/entities/Users';


class UserServiceClass {
  public userRepo: Repository<Users>;
  private conn: Connection;

  public getUsers = async (ids: number[]): Promise<Users[]> => {
    await this.connect();
    if (!ids.length) {
      return [];
    }
    return this.userRepo.find({ where: { id: In(ids) }, relations: ["users"] });
  };

  public getUserById = async (id: number): Promise<Users> => {
    await this.connect();
    return this.userRepo.findOne({ where: { id: id } });
  };

  public getAllUsers = async (size = 10, page = 1): Promise<[Users[], number]> => {
    await this.connect();
    let users = await this.userRepo.findAndCount(
      {
        skip: size * (page - 1),
        take: size,
        order: { id: "DESC" }
      }
    );
    users[1] = await this.userRepo.count();
    return users;
  };


  public insert = async (insertData: Partial<Users>): Promise<Users> => {
    await this.connect();
    const insertResult = await this.userRepo.insert(insertData);
    return this.userRepo.findOne(insertResult.identifiers[0].id);
  };

  public createUser = async (insertData: any): Promise<Users> => {
    await this.connect();
    const insertResult = await this.userRepo.insert(insertData);
    return this.userRepo.findOne(insertResult.identifiers[0].id);
  };

  public updateUser = async (id: number, updateData: any): Promise<Users> => {
    await this.connect();
    await this.userRepo.update(id, updateData);
    return this.userRepo.findOne(id);
  };

  public deleteDBUser = async (id: number): Promise<DeleteResult> => {
    await this.connect()
    try {
      let user = await this.userRepo.findOne({ where: { id: id } })
      await this.userRepo.update(id, user);
      let deleteResult = await this.userRepo.delete(id);
      if (deleteResult.affected == 1)
        return deleteResult
    } catch (e) {
      return null;
    }
  }

  private connect = async (): Promise<void> => {
    this.conn = await db.connect();
    if (!this.userRepo) {
      this.userRepo = this.conn.getRepository(Users);
    }
  };
}

export const UserService = new UserServiceClass();