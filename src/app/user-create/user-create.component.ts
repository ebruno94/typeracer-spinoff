import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router'

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
  constructor(private authService: AuthService, private router: Router){

  }
  signup() {
    this.authService.signup(this.email, this.password)
    this.authService.user.subscribe(snap=>{
      if (snap !== null) {
        console.log("routing");
        this.router.navigate(['user', 'display', snap.uid])
      } else {
        console.log("failed to route");
      }
    })
    this.email = this.password = ''

  }
  ngOnInit(){}

}
