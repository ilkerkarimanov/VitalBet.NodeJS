import { Feed } from '../../../core/models';

export interface IFeedSerializer{
    SerializeFeed(content:any):Promise<Feed>;
}