import { ISportRepository, ISportFinder } from '../../Core/Domain';
import { MongoConnection, MongoContext, SportFinder, SportRepository } from '../../Infrastructure/Persistance';


var mongoConn = new MongoConnection();
var mongoCtx = new MongoContext(mongoConn);
export let SportRepositoryObj = new SportRepository(mongoCtx);
export let SportFinderObj = new SportFinder(mongoCtx);
