import { Match } from './Match';

export class Event{
    Id:number;
    Name:string;
    CategoryId:number;
    IsCategory:boolean;
    Matches:Match[];
    SportId:number;
}