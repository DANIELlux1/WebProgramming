import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(private authS: AuthService, private router: Router){}

  isLoading = false;
  loginMode = true;

  ngOnInit() {
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
