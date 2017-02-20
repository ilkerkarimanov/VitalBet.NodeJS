import { ISurrogateTransformer } from '../abstract';
import { Sport, Event } from '../../../core/models';
import { ISportSurrogate, IEventSurrogate } from '../DataSurrogates';

export class SportTransformer implements ISurrogateTransformer<ISportSurrogate, Sport>{

    private _eventTransformer: ISurrogateTransformer<IEventSurrogate, Event>;

    constructor(eventTransformer: ISurrogateTransformer<IEventSurrogate, Event>) {
        this._eventTransformer = eventTransformer;
    }

    GetDeserializedObj(data: ISportSurrogate): Promise<Sport> {
        var p = new Promise((resolve, reject) => {
            var obj: Sport = new Sport();
            obj.Id = data.$.ID;
            obj.Name = data.$.Name;
            if (data.Event === undefined) { resolve(obj); return;}
            else {
                var props = data.Event.map((v) => {
                    return this._eventTransformer.GetDeserializedObj(v);
                });
                Promise.all(props).then((data) => {
                    obj.Events = data;
                    resolve(obj);
                })
                .catch((err) => reject(err));
            }
        });
        return p;

    }
}