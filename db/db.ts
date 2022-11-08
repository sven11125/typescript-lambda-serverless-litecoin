import 'reflect-metadata';
import { Connection, ConnectionManager, getConnectionManager } from 'typeorm';
import { Users } from './entities/Users';
import { UserWallet } from './entities/UserWallet';
import { AppSetting } from './entities/AppSetting';
import CONFIG from '../config';


class Database {
  public connection: Connection;
  private connections: ConnectionManager;

  constructor() {
    this.connections = getConnectionManager();
  }

  public connect = async (): Promise<Connection> => {
    if (this.connection) {
      if (!this.connection.isConnected) {
        await this.connection.connect();
      }
      return this.connection;
    }
    const connection = this.connections.create({
      type: 'mysql',
      ...CONFIG.isLocal ? CONFIG.db.local : CONFIG.db[CONFIG.stage],
      entities: [Users, UserWallet, AppSetting],
    });
    await connection.connect();
    this.connection = connection;
    return connection;
  };

  public disconnectAll = async (): Promise<boolean> => {
    if (this.connection) {
      await this.connection.close();
      return true;
    }
    return false;
  };
}

export const db = new Database();
