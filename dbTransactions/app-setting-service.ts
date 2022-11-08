import { db } from '@/db/db';
import { Connection, Repository, DeleteResult } from 'typeorm';
import { AppSetting } from '@/db/entities/AppSetting';


class AppSettingServiceClass {
  public appSettingRepo: Repository<AppSetting>;
  private conn: Connection;

  public getAppSettings = async (): Promise<AppSetting[]> => {
    await this.connect();
    return this.appSettingRepo.find();
  };

  public getAppSettingById = async (key: string): Promise<AppSetting> => {
    await this.connect();
    return this.appSettingRepo.findOne({ where: { code: key } });
  };


  public insert = async (insertData: Partial<AppSetting>): Promise<AppSetting> => {
    await this.connect();
    const insertResult = await this.appSettingRepo.insert(insertData);
    return this.appSettingRepo.findOne(insertResult.identifiers[0].id);
  };

  public createAppSetting = async (insertData: any): Promise<AppSetting> => {
    await this.connect();
    const insertResult = await this.appSettingRepo.insert(insertData);
    return this.appSettingRepo.findOne(insertResult.identifiers[0].id);
  };

  public updateAppSetting = async (id: number, updateData: any): Promise<AppSetting> => {
    await this.connect();
    await this.appSettingRepo.update(id, updateData);
    return this.appSettingRepo.findOne(id);
  };

  public deleteAppSetting = async (id: number): Promise<DeleteResult> => {
    await this.connect()
    try {
      let user = await this.appSettingRepo.findOne({ where: { id: id } })
      await this.appSettingRepo.update(id, user);
      let deleteResult = await this.appSettingRepo.delete(id);
      if (deleteResult.affected == 1)
        return deleteResult
    } catch (e) {
      return null;
    }
  }

  private connect = async (): Promise<void> => {
    this.conn = await db.connect();
    if (!this.appSettingRepo) {
      this.appSettingRepo = this.conn.getRepository(AppSetting);
    }
  };
}

export const AppSettingService = new AppSettingServiceClass();