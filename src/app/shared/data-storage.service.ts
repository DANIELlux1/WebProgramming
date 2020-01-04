import { Injectable } from '@angular/core';
import { Tweet } from '../tweet/tweet.model';
import { Internship } from '../internship/internship.model';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { User } from '../user/user.model';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({providedIn: "root"})
export class DataStorageService{

    private currentUser: string;

    setUser(user: string){
        this.currentUser = user;
    }

    getUser(){
        return this.currentUser;
    }

    constructor(private http: HttpClient, private router: Router) {}
    
    /*******************************************

                Server Communication

    ********************************************/

    fetchTweets(subject: string, type: string){

        let querry = ""

        if(subject)
        {
            querry = "?user="+subject
        }

        return this.http.get("http://localhost:3000/tweet"+querry
        ).pipe(map((data) => {
            const twitterPosts: Tweet[] = [];
            for(const value in data)
            {
                twitterPosts.push({...data[value]});
            }

            return twitterPosts;
        }), catchError(errorRes => {
            this.router.navigate(["/error"])
            return throwError(errorRes);
        }));
    }

    fetchUser(user: string)
    {
        let query = "";
        if(user)
        {
            query = "users?user="+user;
        }
        return this.http.get("http://localhost:3000/"+query
        ).pipe(map((data) => {
            const users: User[] = [];
            for(const value in data)
            {
                users.push({...data[value]});
            }

            if(users.length == 1)
            {
                return users[0];
            }
            else if(users.length === 0)
            {
                return undefined;
            }
            else
            {
                return users;
            }
        }), catchError(errorRes => {
            this.router.navigate(["/error"])
            return throwError(errorRes);
        }));
    }

    


}