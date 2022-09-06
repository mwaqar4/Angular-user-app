import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  user = {
    firstName: '',
    lastName: '',
    birthDate: '',
    email: '',
    photo: ''
  };
  submitted = false;
  message = ''

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.message = '';
  }

  saveUser(e): void {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if(e[0] === '' || e[1] === '' || e[2] === '' || e[3] === ''){
      this.message = "Please fill all the fields!"
    }
    else if( !e[3].match(mailformat) ){
      this.message = "Email format isn't correct"
    }
    else{
      this.message = ''
      const data = {
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        dob: this.user.birthDate,
        email: this.user.email,
        photo: this.user.photo
      };

        this.userService.create(data)
          .subscribe(
            response => {
              console.log(response);
              this.submitted = true;
            },
            error => {
              console.log(error);
            });
    }
  }

  newUser(): void {
    this.submitted = false;
    this.user = {
      firstName: '',
      lastName: '',
      birthDate: '',
      email: '',
      photo: ''
    };
  }

}
