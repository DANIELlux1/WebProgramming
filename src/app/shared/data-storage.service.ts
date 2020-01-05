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
    public students= new Subject<{userName, internship}[]>();

    public error= new Subject<{error}>();
    public success= new Subject<{success}>();

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
            if(data[0])
            {
                this.userInfo.next(data[0])
                this.http.get<Tweet[]>("http://localhost:3000/tweet?user=" + data[0].userName).subscribe( (tweets) => {
                    this.tweetKeeper.next(tweets);
                })
            }
        })
        
    }

    loadHome(token: string){
        this.http.get<User[]>("http://localhost:3000/users?token=" + token)
        .subscribe(data => {
            if(data[0])
            {
                this.http.get<Tweet[]>("http://localhost:3000/loadHome?user=" + data[0].userName).subscribe( (tweets) => {
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
            return internships;
        }), catchError(errorRes => {
            this.router.navigate(["/error"])
            return throwError(errorRes);
        }));
    }

    fetchUsers(){
        return this.http.get("http://localhost:3000/users"
        ).pipe(map((data) => {
            const users: User[] = [];
            for(const value in data)
            {
                users.push({...data[value]});
            }
            return users;
        }), catchError(errorRes => {
            this.router.navigate(["/error"]);
            return throwError(errorRes);
        }));
    }

    joinInternship(token: string, internship: string){

        this.http.get<User[]>("http://localhost:3000/users?token=" + token)
        .subscribe(data => {
            console.log(data[0])
            if(data[0])
            {
                this.http.post("http://localhost:3000/join",{
                userName: data[0].userName,
                internship
                }).subscribe()
            }
        })
    }

    disableUser(userName, deactivated){
        this.http.patch("http://localhost:3000/disableUser", {userName, deactivated}).subscribe()
    }

    fetchStudent(token: string){
        this.http.get<User[]>("http://localhost:3000/users?token=" + token)
        .subscribe(data => {
            if(data[0])
            {
                this.http.get<{userName, internship}[]>("http://localhost:3000/student?user=" + data[0].userName).subscribe( (students) => {
                    this.students.next(students);
                })
            }
        })
    }

    switchUserCategory(user, category){
        this.http.patch("http://localhost:3000/switchCategory", {user, category}).subscribe();
    }

    addUser(userName, password, email, name){
        this.http.post<{error, success}>("http://localhost:3000/addUser", {userName, password, email, name}).subscribe( (data) => {
            if(data.error)
            {
                this.error.next(data.error);
            }
            else
            {
                this.success.next(data.success);
            }
        } );
    }

    postMessage(token, message, internship){

        console.log("Inside postMessage");

        this.http.get<User[]>("http://localhost:3000/users?token=" + token)
        .subscribe(data => {
            console.log(data);
            if(data[0])
            {
                console.log("Inside post Tweet");
                this.http.post<{success, error}>("http://localhost:3000/tweet", {userName: data[0].userName, message, internship}).subscribe( (res) => {
                    if(res.error){
                        this.error.next(res.error);
                        console.log("Oopsie doopsy", res.error);
                    }
                    else{
                        this.success.next(res.success);
                        console.log(res.success);
                    }
                })
            }
        })
    }

    addInternship(title, description, academic, local){
        this.http.post<{success,error}>("http://localhost:3000/addInternship", {title, description, academic, local}).subscribe( res => {
            if(res.error){
                this.error.next(res.error);
            }
            else{
                this.success.next(res.success);
            }
        })
    }
}