export interface ISurrogateTransformer<T, Y>{
    GetDeserializedObj(data:T):Promise<Y>
}