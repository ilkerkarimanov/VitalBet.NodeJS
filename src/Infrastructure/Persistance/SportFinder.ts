import { ISportFinder } from '../../Core/Domain';
import { Sport, Match } from '../../Core/Models';
import { IMongoContext } from './Abstract';
import * as moment from 'moment';

export class SportFinder implements ISportFinder {

    private _context: IMongoContext;

    constructor(context: IMongoContext) {
        this._context = context;
    }

    private EnsureIndexes() {
        this._context.Db.collection('sports', function (error, sports_collection) {
            if (error) { console.error(error); }
            sports_collection.createIndex(
                { 'Events.Matches.StartDate': 1 },
                function (err, result) {
                    console.log('Events.Matches.StartDate index ensured.');
                });
            sports_collection.createIndex(
                { 'Events': 1 },
                function (err, result) {
                    console.log('Events.Matches.Bets.Odds index ensured');
                });
            sports_collection.createIndex(
                { 'Events.Matches': 1 },
                function (err, result) {
                    console.log('Events.Matches.Bets.Odds index ensured');
                });
            sports_collection.createIndex(
                { 'Events.Matches.Bets': 1 },
                function (err, result) {
                    console.log('Events.Matches.Bets.Odds index ensured');
                });
            sports_collection.createIndex(
                { 'Events.Matches.Bets.Odds': 1 },
                function (err, result) {
                    console.log('Events.Matches.Bets.Odds index ensured');
                });
        });
    }

    public GetById(id: number): Promise<Sport> {
        var p = new Promise<Sport>((resolve, reject) => {
            this._context.Db.collection('sports', function (error, sports_collection) {
                if (error) { reject(error); return; }
                sports_collection.find({}, {}).toArray(function (error, sportColl) {
                    if (error) { reject(error); return; }
                    resolve(sportColl[0]);
                });
            });
        });
        return p;
    }

    public Exists(id: number): Promise<boolean> {
        var p = new Promise<boolean>((resolve, reject) => {
            this.GetById(id).then((result) => {
                if (result === undefined) resolve(false);
                else resolve(true);
            }).catch((error) => {
                reject(error);
            });
        });
        return p;
    }

    public GetMatchesForNext24Hours(startDate: Date): Promise<Match[]> {
        var p = new Promise<Match[]>((resolve, reject) => {
            this._context.Db.collection('sports', function (error, sports_collection) {
                if (error) { reject(error); return; }

                var endDate = new Date(startDate);
                endDate.setHours(startDate.getHours() + 24);
                
                sports_collection.aggregate([
                    {$match:{"Events.Matches.StartDate": { '$gte': startDate, '$lte': endDate}}}, //just precondition can be skipped
                    {$unwind:"$Events"},
                    {$unwind:"$Events.Matches"},
                    {$project: { 'Events.Matches.Bets': 0} },
                    {$match:{"Events.Matches.StartDate": { '$gte': startDate, '$lte': endDate}}},
                    {$group:{
                        _id:{id:"$_id"},
                        "Matches":{$push:"$Events.Matches"}
                    }}
                    ]).toArray(function (error, sportColl: any[]) {
                    if (error) { reject(error); return; }
                    var matches: Match[] = sportColl
                        .map((v) => { return v.Matches })
                        .reduce((x, y) => { return x.concat(y); }, [])
                        .sort((x: any,y: any) => {
                            return x.StartDate - y.StartDate;
                        })
                    resolve(matches);
                });
            });
        });
        return p;
    }

}