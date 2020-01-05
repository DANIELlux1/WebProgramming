import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Subscription } from 'rxjs';
import { Internship } from 'src/app/internship/internship.model';

@Component({
  selector: 'app-manage-internship',
  templateUrl: './manage-internship.component.html',
  styleUrls: ['./manage-internship.component.css']
})
export class ManageInternshipComponent implements OnInit, OnDestroy {

  constructor(private dataS: DataStorageService) { }

  internships: Internship[];
  supervisors: string[] = [];
  isLoading = false;

  sub: Subscription;

  ngOnInit() {
    this.isLoading=true;
    this.dataS.fetchInternships().subscribe(interns => {

      this.internships = interns;

      this.sub = this.dataS.fetchUsers().subscribe(users => {
        users.forEach(element => {
          if(element.category === 'Supervisor')
          {
            this.supervisors.push(element.userName);
          }
        });
        this.isLoading = false;
      })
    })
    
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
    this.supervisors = [];
  }

}
