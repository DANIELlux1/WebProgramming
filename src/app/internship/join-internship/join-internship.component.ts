import { Component, OnInit } from '@angular/core';
import { Internship } from '../internship.model';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-join-internship',
  templateUrl: './join-internship.component.html',
  styleUrls: ['./join-internship.component.css']
})
export class JoinInternshipComponent implements OnInit {

  constructor(private dataS: DataStorageService) { }

  internships : Internship[];
  isLoading = false;

  ngOnInit() {
    this.isLoading = true;
    /* this.dataS.fetchInternships().subscribe(data => {
      this.internships = data;
      this.isLoading = false
    }) */
  }

}
