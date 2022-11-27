import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogComponent } from '../dialog/dialog.component';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,
    private dialog: MatDialog,
    private authenticationService: AuthenticationService) { }

  userNameField: string = '';
  passwordField: string = '';

  loginForm!: FormGroup;

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'userName': new FormControl('', [Validators.min(5), Validators.max(12), Validators.required]),
      'password': new FormControl('', [Validators.min(8), Validators.max(15), Validators.required]),
    })
  }

  onLogin() {

    this.authenticationService.isAuthenticated(this.userNameField, this.passwordField).subscribe(
      {
        next: (data) => {
          console.log(data)
          this.router.navigate(['home'])
        },
        error: (err) => {
          console.log(err)

          this.dialog.open(DialogComponent, {
            data: {
              Title: 'Message',
              Content: 'Invalid Credentials',
              ButtonContent: 'Close',
              ShowButton: true,
            },
          });
        }
      }
    )
  }


}

export interface DialogData {
  Title: '',
  Content: ''
  ButtonContent: '',
  ShowButton: false
}
