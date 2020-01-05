import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/user/user.model';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit {

  constructor(private dataS: DataStorageService) { }

  users: User[] = []

  ngOnInit() {
    this.dataS.fetchUsers().subscribe(users => {
      this.users = users;
    })
  }

}
