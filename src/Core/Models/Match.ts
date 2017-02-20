import { Bet } from './Bet';

export class Match{
    Id:number;
    Name:string;
    StartDate:Date;
    MatchType:string;
    Bets:Bet[];
    EventId:number;
}