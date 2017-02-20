import { ISurrogateTransformer } from '../Abstract';
import { Feed, Sport } from '../../../Core/Models';
import { ISportSurrogate, IFeedSurrogate } from '../DataSurrogates';

export class FeedTransformer implements ISurrogateTransformer<IFeedSurrogate, Feed> {

    private _sportTransformer: ISurrogateTransformer<ISportSurrogate, Sport>;

    constructor(sportTransformer: ISurrogateTransformer<ISportSurrogate, Sport>) {
        this._sportTransformer = sportTransformer;
    }
    GetDeserializedObj(data: IFeedSurrogate): Promise<Feed> {
        var p = new Promise((resolve, reject) => {
            var obj: Feed = new Feed();
            if (data.Sport === undefined) { resolve(obj); return;}
            else {
                var props = data.Sport.map((v) => {
                    return this._sportTransformer.GetDeserializedObj(v);
                });
                Promise.all(props).then((data) => {
                    obj.Sports = data;
                    resolve(obj);
                }).catch((error) => {reject(error);});
            }
        });
        return p;

    }

}