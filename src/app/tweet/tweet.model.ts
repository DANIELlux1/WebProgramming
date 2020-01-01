export class Tweet {

    public owner: string;
    public internship: string;
    public message: string;
    public imgPath: string;

    constructor(owner: string, message: string, imgPath?:string){
        this.owner = owner;
        this.message = message;
        this.imgPath = imgPath;
        this.internship = "Non set atm."
    }
}