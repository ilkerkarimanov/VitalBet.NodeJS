import { ISurrogateTransformer } from '../abstract';
import { Match, Bet } from '../../../core/models';
import { IMatchSurrogate, IBetSurrogate } from '../DataSurrogates';

export class MatchTransformer implements ISurrogateTransformer<IMatchSurrogate, Match>{

    private _betTransformer: ISurrogateTransformer<IBetSurrogate, Bet>;

    constructor(betTransformer: ISurrogateTransformer<IBetSurrogate, Bet>) {
        this._betTransformer = betTransformer;
    }

    GetDeserializedObj(data: IMatchSurrogate): Promise<Match> {
        var p = new Promise((resolve, reject) => {

            var obj: Match = new Match();
            obj.Id = data.$.ID;
            obj.Name = data.$.Name;
            obj.MatchType = data.$.MatchType;
            obj.StartDate = new Date(data.$.StartDate);
            if (data.Bet === undefined) { resolve(obj); return;}
            else {
                var props = data.Bet.map((v) => {
                    return this._betTransformer.GetDeserializedObj(v);
                });
                Promise.all(props).then((data) => {
                    obj.Bets = data;
                    resolve(obj);
                })
                .catch((err) => reject(err));
            }
        });
        return p;

    }
}