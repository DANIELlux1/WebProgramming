import { Tweet } from '../tweet/tweet.model';

export class User {

    public email: string;
    public id: string;
    public password: string;
    public userName: string;
    public name: string;
    public category: string;
    public internshipIDs: string[];
    public profilePic: string;
    public tweets: Tweet[];
    private _token: string; 
    private _tokenExpirationDate: Date;

    constructor(id: string,
                email: string,
                password: string,
                userName: string,
                name: string,
                category: string,
                profilePic: string,
                tweets: Tweet[],
                internships?: string[]) {
                    
        this.id = id;
        this.email = email;
        this.userName = userName;
        this.name = name;
        this.category = category;
        this.profilePic = profilePic;
        this.tweets = tweets;
        this.internshipIDs = internships;
        this.password = password;
    }

    get token(){
        if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate)
        {
            return null;
        }

        return this._token;
    }
}