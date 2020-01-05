import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-internship',
  templateUrl: './add-internship.component.html',
  styleUrls: ['./add-internship.component.css']
})
export class AddInternshipComponent implements OnInit, OnDestroy {

  constructor(private dataS: DataStorageService) { }

  supervisors: string[] = [];
  isLoading = false;

  success: {success}
  error: {error}

  sub: Subscription;

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

      this.sub = this.dataS.fetchUsers().subscribe(users => {
        users.forEach(element => {
          if(element.category === 'Supervisor')
          {
            this.supervisors.push(element.userName);
          }
        });
        this.isLoading = false;
      })
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
    this.subError.unsubscribe();
    this.subSuccess.unsubscribe();
    this.supervisors = [];
  }

  onSubmit(form: NgForm)
  {
    
    this.dataS.addInternship(form.value.title,
                             form.value.description,
                             form.value.academic,
                             form.value.local)
  }

}
