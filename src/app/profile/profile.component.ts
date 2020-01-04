import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../user/user.model';
import { ActivatedRoute, Params } from '@angular/router';
import { Tweet } from '../tweet/tweet.model';
import { DataStorageService } from '../shared/data-storage.service';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  user: User;
  tweets: Tweet[];
  filteredTweets: Tweet[];
  loaded = false;
  subTweet : Subscription;
  subUser : Subscription;
  error = false;

  constructor(private dataS: DataStorageService,
              private route: ActivatedRoute) { }

  ngOnInit(){
    this.loaded = false;
    this.subTweet = this.dataS.tweetKeeper.subscribe((tweets) => {
      this.tweets = tweets;
    })

    this.subUser = this.dataS.userInfo.subscribe((user) => {
      this.user = user;
    })

    this.dataS.loadProfile(this.dataS.getToken())
    this.loaded=true;
  }

  ngOnDestroy() {
    this.subTweet.unsubscribe();
    this.subUser.unsubscribe();
  }

}
