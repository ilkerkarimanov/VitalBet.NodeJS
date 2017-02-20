import { FeedIndexer, FeedCrawler } from '../../Infrastructure/Index';
import { FeedClientObj as FeedClient } from './FeedRegistry';
import { SportRepositoryObj as SportRepository, SportFinderObj as SportFinder } from './PersistanceRegistry';

export let FeedCrawlerObj = new FeedCrawler(FeedClient);
export let FeedIndexerObj = new FeedIndexer(SportRepository, SportFinder);
