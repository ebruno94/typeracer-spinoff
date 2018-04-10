import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  providers: [AuthService]
})
export class LandingPageComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }
  email: string;
  password: string;
  ngOnInit() {
  }

  login() {
    this.authService.login(this.email, this.password)
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

  logout() {
    this.authService.logout();
  }

}
