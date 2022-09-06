import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users: any;
  currentUser = null;
  currentIndex = -1;
  firstName = '';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.retrieveUsers();
  }

  retrieveUsers(): void {
    this.userService.getAll()
      .subscribe(
        data => {
          this.users = data.users;
          console.log("all Users: ",data.users);
        },
        error => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.retrieveUsers();
    this.currentUser = null;
    this.currentIndex = -1;
  }

  setActiveUser(user, index): void {
    this.currentUser = user;
    this.currentIndex = index;
  }

  searchUser(): void {
    this.userService.findByFirstName(this.firstName)
      .subscribe(
        data => {
          this.users = data.users;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
}
