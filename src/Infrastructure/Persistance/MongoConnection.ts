import { IMongoConnection } from './Abstract';

export class MongoConnection implements IMongoConnection{
    public Host: any = 'localhost';
    public Port: number = 27017;
    public DbName: string = 'vitalbet-Db';
}