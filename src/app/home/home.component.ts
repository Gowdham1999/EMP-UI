import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { browserRefresh } from '../app.component';
import { AuthenticationService } from '../services/authentication.service';

import { BackendDataFetchService } from '../services/backend-data-fetch.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  browserRefresh: boolean | undefined;

  constructor(private router: Router,
    private _snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private authenticationService: AuthenticationService) { }

  userName: string | any;
  url = this.router.url;
  homePageUrl = true;

  ngOnInit(): void {
    console.log(this.url)
    this.userName = sessionStorage.getItem('userName');

    if (this.url === '/home') {
      this.homePageUrl = true;
    }
    else {
      this.homePageUrl = false;
    }

    // To route to login page on reload
    // this.browserRefresh = browserRefresh;
    // if (this.browserRefresh === true) {
    //   sessionStorage.removeItem('userName');
    //   this.router.navigate(['/'])
    // }
  }


  logout() {
    this.authenticationService.onLogout()
    this.openSnackBar();
  }

  openSnackBar() {
    this._snackBar.open('Successfully Logged Out', 'Ok', { duration: 1400 })
  }

  toDetails() {
    this.router.navigate(['employees'], { relativeTo: this.activatedRoute })
    this.homePageUrl = false;
  }

}
