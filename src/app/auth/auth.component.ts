import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit{

  constructor(private authS: AuthService, private router: Router){}

  isLoading = false;
  loginMode = true;

  onSwitchMode(){
    this.loginMode = !this.loginMode;
  }

  ngOnInit(){
    this.authS.enterAuth();
  }

  onSubmit(form: NgForm){

    if(!form.valid)
    {
      return;
    }

    this.isLoading = true;
    const user = form.value.user;
    const pw = form.value.password;

    this.authS.login(user, pw)
  }
    

 
}
