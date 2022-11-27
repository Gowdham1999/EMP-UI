import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    // let userName = 'Gowdham'
    // let password = 'Gowdham1999#'
    // let encodedString = 'Basic ' + window.btoa(userName + ':' + password)

    let userName = this.authenticationService.getAuthenticatedUserName()
    let authToken = this.authenticationService.getAuthenticatedToken()

    if (authToken && userName) {
      req = req.clone({
        setHeaders: {
          Authorization: authToken
        }
      })
    }

    return next.handle(req)

  }


}
