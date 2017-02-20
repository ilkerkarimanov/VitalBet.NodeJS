import { IFeedClient } from '../../core/domain';
import { Feed } from '../../core/models';
import { IFeedSurrogate, ISportSurrogate } from './datasurrogates';
import { IFeedSerializer } from './Abstract';

var httpClient = require('node-httpclient');
var parseString = require('xml2js').parseString;

export class FeedClient implements IFeedClient {

    private _feedSerializer: IFeedSerializer;
    constructor(feedSerializer: IFeedSerializer) {  
        this._feedSerializer = feedSerializer;      
    }

    public RetrieveSportsFeed(): Promise<Feed> {
        var p = new Promise<Feed>((resolve, reject) => {
            var that = this;
            var feed = new Feed();
            httpClient.ajax({
                url: 'http://vitalbet.net/sportxml',
                type: 'GET',
                success: function (data, status) {
                    parseString(data, function (err, result) {
                        if (err) reject(err);
                        resolve(that.MapResponse(result.XmlSports));
                    });
                },
                error: function (error) {
                    reject(error);
                }
            });
        });
        return p;
    }

    private MapResponse(data: IFeedSurrogate): Promise<Feed> {
            return this._feedSerializer.SerializeFeed(data);
    }
}