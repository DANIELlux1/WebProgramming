import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(private dataS: DataStorageService, private router: Router){}

  isLoading = false;
  loginMode = true;

  success: {success}
  error: {error}

  ngOnInit() {

    this.dataS.error.subscribe(data => {
      this.success = undefined;
      this.error = data;
    })

    this.dataS.success.subscribe(data => {
      this.success = data;
      this.error = undefined;
    })
  }

  onSubmit(form: NgForm){

    if(!form.valid)
    {
      return;
    }

    this.isLoading = true;
    const user = form.value.user;
    const password = form.value.password;
    const email = form.value.email;
    const name = form.value.name;

    this.dataS.addUser(user, password, email, name);
  }
}
