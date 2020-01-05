import { Component, OnInit } from '@angular/core';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-tweet-post',
  templateUrl: './tweet-post.component.html',
  styleUrls: ['./tweet-post.component.css']
})
export class TweetPostComponent implements OnInit {

  constructor(dataS: DataStorageService) { }

  Internships: string[];

  ngOnInit() {
  }

}
