import { SportFinderObj as SportFinder } from '../DI';
import { Match } from '../../Core/Models';

export class MatchHub {

    public matches(socket: SocketIO.Socket): Promise<any> {
        var p = new Promise<any>((resolve, reject) =>{
        this.getMatches(socket);
        var that = this;
        setInterval(function () {
            that.getMatches(socket);
        }, 30000);
        });
        return p;

    }

    private getMatches(socket: SocketIO.Socket): Promise<any> {
        var p = new Promise<any>((resolve, reject) => {
        SportFinder.GetMatchesForNext24Hours(new Date())
            .then((result) => {
                socket.emit('matches', result);
            })
            .catch((error) => {
                console.error(error);
            });
        });
        return p;
    }
}

export default new MatchHub();