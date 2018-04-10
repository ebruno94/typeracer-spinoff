import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  providers: [AuthService]
})
export class LandingPageComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }
  email;
  password;

  ngOnInit() {
  }

  login() {
    this.authService.login(this.email, this.password);
    this.email = this.password = '';
  }

  logout() {
    this.authService.logout();
  }

  goRegister(){
    this.router.navigate(['user','create']);
  }

  goUserDisplay(){
    this.router.navigate(['user','display'])
  }
}
