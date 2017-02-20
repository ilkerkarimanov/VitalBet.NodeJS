import { IOddSurrogate } from '../DataSurrogates';
import { ISurrogateTransformer } from '../abstract';
import { Odd } from '../../../core/models';


export class OddTransformer implements ISurrogateTransformer<IOddSurrogate, Odd>{
    
    GetDeserializedObj(data:IOddSurrogate): Promise<Odd>{
        var p = new Promise((resolve, reject) => {
            var obj:Odd = new Odd();
            obj.Id = data.$.Id;
            obj.Name = data.$.Name;
            obj.Value = data.$.Value;
            obj.SpecialBetValue = data.$.SpecialBetValue;
            resolve(obj);
        }); 
        return p;
    }
}