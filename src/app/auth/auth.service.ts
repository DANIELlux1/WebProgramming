import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { pipe, throwError, BehaviorSubject, Subject } from 'rxjs';
import * as shajs from 'sha.js';
import { DataStorageService } from '../shared/data-storage.service';


@Injectable({providedIn: "root"})
export class AuthService{

    inAuth = new Subject<boolean>();
    error = new Subject<{error}>();
    isAdmin = new Subject<boolean>();
    isA: boolean;
    isLoggedIn = new Subject<boolean>();


    getAdmin(){
        return this.isA;
    }

    enterAuth()
    {
        this.isA = false;
        this.inAuth.next(true);
        this.isAdmin.next(false);
        
    }

    constructor(private http: HttpClient, private router:Router, private dataS: DataStorageService){}

    gen(){
        let chars = "abcdefghijklmnopqrstuvwxyz123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        let x = ""

        for (let i = 0; i < 16; i++)
        {
            x += chars.charAt(Math.random()*chars.length);
        }

        return x;
    }

    login(userName: string, pw: string){

        let x = this.gen();

        this.http.get<{date}>("http://localhost:3000/login?userName=" + userName + "&x=" + x).subscribe(d => {

            let password = shajs("sha256").update(x + pw + d.date).digest('hex');

            this.http.post<{token, error, special}>("http://localhost:3000/login", {userName, password}).subscribe( (data) => {
                if(data.error){

                }
 
                else{
                    if(data.special)
                    {
                        this.isAdmin.next(true);
                        this.isA = true;
                    }
                    this.isLoggedIn.next(true);
                    this.dataS.setToken(data.token);
                    this.inAuth.next(false);
                    this.router.navigate(["/home"]);
                }
            }
            )
        })
    }

    logout(){
        console.log("logout req send.")
        this.http.patch("http://localhost:3000/logout", {token: this.dataS.getToken()}).subscribe((data) => {
            this.router.navigate(["/auth"]);
        })
    }

}