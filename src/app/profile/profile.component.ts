import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../user/user.model';
import { ActivatedRoute, Params } from '@angular/router';
import { Tweet } from '../tweet/tweet.model';
import { DataStorageService } from '../shared/data-storage.service';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgForm } from '@angular/forms';

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
      this.filteredTweets = this.tweets;
    })

    this.subUser = this.dataS.userInfo.subscribe((user) => {
      this.user = user;
    })

    this.dataS.loadProfile(this.dataS.getToken())
    this.loaded=true;
  }

  onFilter(form: NgForm){
    let from = new Date(form.value.from)
    let to = new Date(form.value.to)
    
    this.filteredTweets = [];

    this.tweets.forEach(tweet => {
      let date = new Date(tweet.postDate)
      if(date >= from && date <= to)
      {
        this.filteredTweets.push(tweet);
      }
    });

    if(this.filteredTweets.length == 0)
    {
      this.filteredTweets = this.tweets;
    }
  }

  ngOnDestroy() {
    this.subTweet.unsubscribe();
    this.subUser.unsubscribe();
  }

}
