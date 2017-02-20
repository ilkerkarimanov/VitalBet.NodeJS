import { Odd } from './Odd';

export class Bet{
    Id:number;
    Name:string;
    IsLive:boolean;
    Odds:Odd[];
    MatchId:number;
}