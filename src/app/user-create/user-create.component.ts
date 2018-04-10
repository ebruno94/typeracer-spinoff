import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css'],
  providers: [AuthService]
})
export class UserCreateComponent implements OnInit {
  //authService.user.uid
  userName: string;
  email: string;
  password: string;
  constructor(private authService: AuthService){

  }
  signup() {
    this.authService.signup(this.email, this.password);
    this.email = this.password = ''

  }
  ngOnInit(){}

}
