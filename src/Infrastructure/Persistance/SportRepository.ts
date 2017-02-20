import { ISportRepository } from '../../Core/Domain';
import { Sport } from '../../Core/Models';
import { IMongoContext } from './Abstract';

export class SportRepository implements ISportRepository {

    private _context: IMongoContext;

    constructor(context: IMongoContext) {
        this._context = context;
    }

    public Save(entity: Sport): Promise<any> {
        var p = new Promise((resolve, reject) => {
            this._context.Db.collection('sports', function (error, sports_collection) {
                if (error) { reject(error); return; }
                sports_collection.insert(entity, function (error, sport) {
                    if (error) { reject(error); return; }
                    resolve(sport);
                });
            });


        });
        return p;
    };
    public Update(entity: Sport): Promise<any> {
        var p = new Promise((resolve, reject) => {
            this._context.Db.collection('sports', function (error, sports_collection) {
                if (error) { reject(error); }
                sports_collection.update(
                    { _id: entity.Id },
                    { "$push": entity },
                    function (error, sport) {
                        if (error) { reject(error); }
                        resolve(sport);
                    })
            });
        });
        return p;
    }
}