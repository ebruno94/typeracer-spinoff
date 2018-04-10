import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css'],
  providers: [AuthService]
})
export class UserCreateComponent implements OnInit {

  constructor(private authService: AuthService){

  }
  signup() {
    this.authService.signup(this.email, this.password);
    this.email = this.password = ''
  }
  ngOnInit(){}

}
