import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../user/user.model';
import { ActivatedRoute, Params } from '@angular/router';
import { Tweet } from '../tweet/tweet.model';
import { DataStorageService } from '../shared/data-storage.service';
import { Subscription } from 'rxjs';

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
  sub : Subscription;
  error = false;

  constructor(private dataS: DataStorageService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(
      (params: Params) => {
        let id = params["id"];
        this.dataS.fetchUser(id).subscribe(data => {
          this.user = (<User>data);
          if(this.user)
          {
            this.dataS.fetchTweets(this.user.userName, "").subscribe(dataTweet => {
              this.tweets = dataTweet;
              this.loaded = true;
            })
          }
          else
          {
            this.error = true;
          }
        })
      }
    )
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
