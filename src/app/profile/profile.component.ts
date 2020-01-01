import { Component, OnInit } from '@angular/core';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;
  id: string;

  constructor(private userS: UserService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params["id"];
        this.user = this.userS.getUser(this.id);
      }
    )
  }

}
