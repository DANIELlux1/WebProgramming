export class Tweet {

    public tweetID: number;
    public message: string;
    public imgPath: string;
    public owner: string;
    public internshipID: string;
    public postDate: Date;
    

    constructor(owner: string, internship: string, message: string, imgPath?:string){
        this.owner = owner;
        this.message = message;
        this.imgPath = imgPath;
        this.internshipID = internship;
    }
}