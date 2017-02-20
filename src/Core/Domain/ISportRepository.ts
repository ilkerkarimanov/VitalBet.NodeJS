import { Sport } from '../Models';

export interface ISportRepository{
    Save(entity: Sport): Promise<any>;
    Update(entity: Sport): Promise<any>;
}