import { FeedCrawlerObj as FeedCrawler, FeedIndexerObj as FeedIndexer } from '../DI';

export class IndexJob {
    public Run(): Promise<any>{
        return new Promise<any>((resolve, reject) => {
        this.Execute();
        var that = this;
        setInterval(function () {
            that.Execute();
        }, 60000);
        });
    }

    private Execute(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
        FeedCrawler.Crawl()
            .then((feed) => {
                FeedIndexer.Index(feed)
                    .then((status) => {
                        console.log({ 'Index job': 'ok' });
                    })
                    .catch((err) => {
                        console.log('Index job (error):' + err);
                    });
            })
            .catch((error) => {
                console.log('Index job (error):' + error);
            });
        });

    }
}

export default new IndexJob();