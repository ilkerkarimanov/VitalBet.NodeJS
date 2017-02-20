import { IFeedSerializer, ISurrogateTransformer } from './Abstract';
import { Feed, Sport } from '../../Core/Models';
import { IFeedSurrogate } from './DataSurrogates';

export class FeedSerializer implements IFeedSerializer{
     
private _feedTransformer:ISurrogateTransformer<IFeedSurrogate, Feed>;     

constructor(feedTransformer: ISurrogateTransformer<IFeedSurrogate, Feed>) {
    this._feedTransformer = feedTransformer;
}
        SerializeFeed(content:IFeedSurrogate): Promise<Feed>{
            return this._feedTransformer.GetDeserializedObj(content);
        }

}