import { Tweet } from '../tweet/tweet.model';

export class User {

    public email: string;
    public id: string;
    public userName: string;
    public name: string;
    public category: string;
    public internshipIDs: string[];
    public profilePic: string;
    public tweets: Tweet[];
    private _token: string; 
    private _tokenExpirationDate: Date;

    constructor() {

    }

    get token(){
        if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate)
        {
            return null;
        }

        return this._token;
    }
}