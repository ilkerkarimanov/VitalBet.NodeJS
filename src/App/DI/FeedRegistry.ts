import { FeedClient, FeedSerializer  } from '../../Infrastructure/Feed';
import { FeedTransformer ,SportTransformer, EventTransformer, MatchTransformer, BetTransformer, OddTransformer  } from '../../Infrastructure/Feed/DataTransformers';
import { IFeedClient } from '../../Core/Domain';

    var oddTransformer = new OddTransformer();
    var betTransformer = new BetTransformer(oddTransformer);
    var matchTransformer = new MatchTransformer(betTransformer);
    var eventTransformer = new EventTransformer(matchTransformer);
    var sportTransformer = new SportTransformer(eventTransformer);
    var feedTransformer = new FeedTransformer(sportTransformer);

    var serializer = new FeedSerializer(feedTransformer);
    export let FeedClientObj = new FeedClient(serializer);