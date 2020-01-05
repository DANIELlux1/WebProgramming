import { Component, OnInit, OnDestroy } from '@angular/core';
import { Internship } from '../internship.model';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-join-internship',
  templateUrl: './join-internship.component.html',
  styleUrls: ['./join-internship.component.css']
})
export class JoinInternshipComponent implements OnInit, OnDestroy {
  
  

  constructor(private dataS: DataStorageService) { }

  internships : Internship[];
  isLoading = false;
  token: string;

  sub: Subscription;

  student: {internship, userName}[]

  modifiedInternships: {internship: Internship, isStudent: boolean}[] = []

  checkIsStudent()
  {
    this.internships.forEach(intern => {
      let found = false;
        this.student.forEach(student => {
          if(student.internship === intern.title)
          {
            found = true;
            this.modifiedInternships.push({internship: intern, isStudent: true});
          }
        });

        if(!found)
        {
          this.modifiedInternships.push({internship: intern, isStudent: false});
        }
    });

    console.log(this.modifiedInternships)
  }

  ngOnInit() {
    this.token = this.dataS.getToken();

    this.sub = this.dataS.students.subscribe(data => {
      this.student = data;
      this.dataS.fetchInternships().subscribe(intern => {
        this.internships = intern;
        this.checkIsStudent();
        this.isLoading = false;
      })
    })

    this.isLoading = true;
    this.dataS.fetchStudent(this.token)

  }

  ngOnDestroy(){
    this.sub.unsubscribe();
    this.internships = undefined;
  }

}
