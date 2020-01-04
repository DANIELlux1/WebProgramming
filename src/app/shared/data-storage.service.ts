import { Injectable } from '@angular/core';
import { Tweet } from '../tweet/tweet.model';
import { Internship } from '../internship/internship.model';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { User } from '../user/user.model';
import { throwError, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({providedIn: "root"})
export class DataStorageService{

    private token: string;

    public tweetKeeper= new Subject<Tweet[]>();
    public userInfo= new Subject<User>();

    setToken(token: string){
        this.token = token;
    }

    getToken(){
        return this.token;
    }

    constructor(private http: HttpClient, private router: Router) {}
    
    /*******************************************

                Server Communication

    ********************************************/

    loadProfile(token: string){

        this.http.get<User[]>("http://localhost:3000/users?token=" + token)
        .subscribe(data => {
            console.log(data[0])
            if(data[0])
            {
                this.userInfo.next(data[0])
                this.http.get<Tweet[]>("http://localhost:3000/tweet?user=" + data[0].userName).subscribe( (tweets) => {
                    console.log(tweets)
                    this.tweetKeeper.next(tweets);
                })
            }
        })
        
    }


    fetchInternships(){
        return this.http.get("http://localhost:3000/internship"
        ).pipe(map((data) => {
            const internships: Internship[] = [];
            for(const value in data)
            {
                internships.push({...data[value]});
            }
            console.log(internships)
            return internships;
        }), catchError(errorRes => {
            this.router.navigate(["/error"])
            return throwError(errorRes);
        }));
    }

    joinInternship(table: string, userName: string, internship: string){
        this.http.post("http://localhost:3000/join",{
            table,
            userName,
            internship
        }).subscribe()
    }

    joinInternshipV2(){
        this.http.post("http://localhost:3000/join",{
            table : "test",
            userName : "test",
            internship : "test"
        }).subscribe()
    }

    


}