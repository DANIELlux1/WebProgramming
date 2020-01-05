import { Component, OnInit, Input } from '@angular/core';
import { Internship } from 'src/app/internship/internship.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-internship-item',
  templateUrl: './internship-item.component.html',
  styleUrls: ['./internship-item.component.css']
})
export class InternshipItemComponent implements OnInit {

  constructor() { }

  @Input() internship: Internship;
  @Input() supervisors: string[];

  ngOnInit() {
  }

  onSubmit(form: NgForm){

  }

}
