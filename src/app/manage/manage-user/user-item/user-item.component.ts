import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/user/user.model';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {

  constructor(private dataS: DataStorageService) { }

  @Input() user: User;

  categories = ["Student", "Supervisor"];
  
  ngOnInit() {
  }

  onDisable(){
    this.user.deactivated = !this.user.deactivated;
    this.dataS.disableUser(this.user.userName, this.user.deactivated ? '1' : '0');
  }

  onSubmit(pF: NgForm){
    let category = pF.value.category;
    this.user.category = category;
    
    this.dataS.switchUserCategory(this.user.userName, category);
  }

}
