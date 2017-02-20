import { IFeedIndexer, ISportFinder, ISportRepository } from '../../Core/Domain';
import { Feed, Sport } from '../../Core/Models';

export class FeedIndexer implements IFeedIndexer {

    private _sportRepository: ISportRepository;
    private _sportFinder: ISportFinder;

    constructor(sportRepository: ISportRepository, sportFinder: ISportFinder) {
        this._sportFinder = sportFinder;
        this._sportRepository = sportRepository;
    }
    public Index(feed: Feed): Promise<any>{
        var p = new Promise<any>((resolve, reject) => {
            var proms: Promise<any>[] = [];
            feed.Sports.forEach((sport) => {
                this._sportFinder.Exists(sport.Id).then((exists)=>{
                    exists ? proms.push(this.UpdateSport(sport))
                    :  proms.push(this.AddSport(sport));
                })
                .catch((error) => reject(error));
            });
            Promise.all(proms).then((result) =>{
               resolve({status: 'done'});
            })
            .catch((err) =>{
                reject(err);
            });

        });
        return p;
    }

    private UpdateSport(entity: Sport): Promise<any>{
        return this._sportRepository.Update(entity)
    }

    private AddSport(entity: Sport): Promise<any>{
        return this._sportRepository.Save(entity)
    }

}