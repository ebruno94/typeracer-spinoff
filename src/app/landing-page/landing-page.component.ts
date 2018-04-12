import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import { Router } from '@angular/router';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  providers: [AuthService, PlayerService ]
})
export class LandingPageComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private playerService: PlayerService) { }
  email: string;
  password: string;
  username: string;
  ngOnInit() {
    this.authService.user.subscribe(user =>{
      this.playerService.loginPlayer(user.uid, this.username);
    })
  }

  login(username: string) {
    this.authService.login(this.email, this.password)
    this.authService.user.subscribe(snap=>{
      if (snap !== null) {
        this.username = username;
        this.playerService.loginPlayer(snap.uid, username);
      }
    })
    this.email = this.password = ''
  }

  logout() {
    this.authService.logout();
  }

}
