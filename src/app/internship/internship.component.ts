import { Component, OnInit, Input } from '@angular/core';
import { Internship } from './internship.model';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-internship',
  templateUrl: './internship.component.html',
  styleUrls: ['./internship.component.css']
})
export class InternshipComponent implements OnInit {

  constructor(private dataS: DataStorageService) { }

  @Input() internship : Internship;

  ngOnInit() {}

  onJoin(){
    this.dataS.joinInternshipV2()
  }

}
