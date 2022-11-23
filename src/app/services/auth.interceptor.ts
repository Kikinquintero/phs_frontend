import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from "../services/token.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

      const accessToken = this.tokenService.getToken();

      const tokenlogin = localStorage.getItem('token_login');

      // req = req.clone({
      //     setHeaders: {
      //         Authorization: "Bearer " + accessToken
      //     }
      // });

    

      if(accessToken){
        req = req.clone({
          setHeaders: {
              Authorization: "Bearer " + accessToken
          }
      });
      // console.log('interceptor auth')
    }else{
      if(tokenlogin){
        req = req.clone({
          setHeaders: {
              Authorization: "Bearer " + tokenlogin
          }
      });
      // console.log('interceptor token_login')
    }
    }




      return next.handle(req);
  }
}