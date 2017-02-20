import { ISurrogateTransformer } from '../abstract';
import { Bet, Odd } from '../../../core/models';
import { IBetSurrogate, IOddSurrogate } from '../datasurrogates';

export class BetTransformer implements ISurrogateTransformer<IBetSurrogate, Bet>{

    private _oddTransformer: ISurrogateTransformer<IOddSurrogate, Odd>;

    constructor(oddTransformer: ISurrogateTransformer<IOddSurrogate, Odd>) {
        this._oddTransformer = oddTransformer;
    }

    GetDeserializedObj(data: IBetSurrogate): Promise<Bet> {
        var p = new Promise((resolve, reject) => {
            var obj: Bet = new Bet();
            obj.Id = data.$.ID;
            obj.Name = data.$.Name;
            obj.IsLive = data.$.IsLive;
            if (data.Odd === undefined) { resolve(obj); return; }
            else {
                var props = data.Odd.map((v) => {
                    return this._oddTransformer.GetDeserializedObj(v);
                });
                Promise.all(props).then((data) => {
                    obj.Odds = data;
                    resolve(obj);
                })
                .catch((err) => reject(err));
            }

        });
        return p;
    }
}