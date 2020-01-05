import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tweet-post',
  templateUrl: './tweet-post.component.html',
  styleUrls: ['./tweet-post.component.css']
})
export class TweetPostComponent implements OnInit, OnDestroy {

  constructor(private dataS: DataStorageService) { }

  internships: {userName, internship}[];

  success: {success}
  error: {error}

  loading=false;

  successSub: Subscription;
  errorSub: Subscription;

  sub: Subscription;

  ngOnInit() {
    this.loading = true;
    this.errorSub = this.dataS.error.subscribe(data => {
      this.success = undefined;
      this.error = data;
    })

    this.successSub = this.dataS.success.subscribe(data => {
      this.success = data;
      this.error = undefined;
    })

    this.sub = this.dataS.students.subscribe(data => {
      this.internships = data;
      this.loading = false;
    })

    this.dataS.fetchStudent(this.dataS.getToken());
  }

  ngOnDestroy(){
    this.successSub.unsubscribe();
    this.errorSub.unsubscribe();
    this.sub.unsubscribe();
  }

  onSubmit(form: NgForm)
  {
    let message = form.value.message;
    let internship = form.value.internship;

    this.dataS.postMessage(this.dataS.getToken(), message, internship);
  }

}
