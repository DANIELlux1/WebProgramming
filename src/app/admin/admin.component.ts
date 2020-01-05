import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor() { }

  internships = [{internship: "test1"}, {internship: "test2"} ,{internship: "test3"}]

  ngOnInit() {
  }

  onSubmit(pF: NgForm){
    console.log(pF.value.internship)
  }

}
