import {Sport, Match} from '../Models';

export interface ISportFinder{
    GetById(id: number): Promise<Sport>;
    Exists(id: number): Promise<boolean>;
    GetMatchesForNext24Hours(startDate: Date): Promise<Match[]>;
}