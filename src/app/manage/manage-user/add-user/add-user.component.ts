import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit, OnDestroy {

  constructor(private dataS: DataStorageService, private router: Router){}

  isLoading = false;
  loginMode = true;

  success: {success}
  error: {error}

  subError: Subscription;
  subSuccess: Subscription;

  ngOnInit() {

    this.subError = this.dataS.error.subscribe(data => {
      this.success = undefined;
      this.error = data;
    })

    this.subSuccess = this.dataS.success.subscribe(data => {
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

  ngOnDestroy(){
    this.subError.unsubscribe();
    this.subSuccess.unsubscribe();
  }
}
