import { Component, OnInit } from '@angular/core';
import { Tweet } from '../tweet/tweet.model';
import { DataStorageService } from '../shared/data-storage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  sub : Subscription;

  constructor(private dataS: DataStorageService) { }

  tweets: Tweet[];
  loaded = false;

  ngOnInit() {
    
      /* this.sub = this.dataS.fetchTweets("", "").subscribe(dataTweet => {
        this.tweets = dataTweet;
        this.loaded = true;
      }) */
     
  }

  ngOnDestroy() {
    //this.sub.unsubscribe();
  }

}
