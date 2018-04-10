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
  ngOnInit() {
  }

  login(username: string) {
    this.authService.login(this.email, this.password)
    this.authService.user.subscribe(snap=>{
      if (snap !== null) {
        console.log("routing");
        this.playerService.loginPlayer(snap.uid, username);
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
