import { IMongoContext, IMongoConnection } from './Abstract';
import mongodb = require('mongodb');

export class MongoContext implements IMongoContext{
    public Server: any;
    public Db: any;

    constructor(conn: IMongoConnection) {
        this.Server = new mongodb.Server(conn.Host, conn.Port, {auto_reconnect: true});
        this.Db = new mongodb.Db(conn.DbName, this.Server, { w: 1 });
        this.Db.open(function() {});
    }
}