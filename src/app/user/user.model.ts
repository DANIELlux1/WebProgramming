import { Tweet } from '../tweet/tweet.model';

export class User {

    public id: string;
    public userName: string;
    public email: string;
    public password: string;
    public name: string;
    public category: string;
    private _token: string; 
    private _tokenExpirationDate: Date;
    public deactivated: boolean;

    get token(){
        if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate)
        {
            return null;
        }

        return this._token;
    }
}