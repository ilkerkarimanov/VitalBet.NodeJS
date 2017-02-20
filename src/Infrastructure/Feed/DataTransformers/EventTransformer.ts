import { ISurrogateTransformer } from '../abstract';
import { Event, Match } from '../../../core/models';
import { IEventSurrogate, IMatchSurrogate } from '../DataSurrogates';

export class EventTransformer implements ISurrogateTransformer<IEventSurrogate, Event>{

    private _matchTransformer: ISurrogateTransformer<IMatchSurrogate, Match>;

    constructor(matchTransformer: ISurrogateTransformer<IMatchSurrogate, Match>) {
        this._matchTransformer = matchTransformer;
    }

    GetDeserializedObj(data: IEventSurrogate): Promise<Event> {
        var p = new Promise((resolve, reject) => {
            var obj: Event = new Event();
            obj.Id = data.$.ID;
            obj.Name = data.$.Name;
            obj.CategoryId = data.$.CategoryId;
            obj.IsCategory = data.$.IsCategory;
            if (data.Match === undefined) { resolve(obj); return;}
            else {
                var props = data.Match.map((m) => {
                    return this._matchTransformer.GetDeserializedObj(m);
                });
                Promise.all(props).then((data) => {
                    obj.Matches = data;
                    resolve(obj);
                })
                .catch((err) => reject(err));
            }
        });
        return p;

    }
}