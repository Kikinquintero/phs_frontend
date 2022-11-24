import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from "../services/token.service";
import { AuthStateService } from './auth-state.service';
import { tap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService,
    private authStateService: AuthStateService,
    public router: Router
    ) { }

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


    return next.handle(req).pipe(
      tap(
        () => {},
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            console.log('Error: ' + err.status);
            // if (err.status !== 401) {
            //   return;
            // }
            if (err.status == 401) {
              this.cerrarSesion();
            }

            // if (err.status == 400) {
            //   this.router.navigate(['error400']);
            // }
            // if (err.status == 500) {
            //   this.router.navigate(['error500']);
            // }

            return;
          }
        }
      )
    );
  }

  cerrarSesion() {
    this.authStateService.setAuthState(false);
    this.tokenService.removeToken();
    Swal.fire({
      // position: 'top-end',
      icon: 'warning',
      title: 'La sesión ha expirado!',
      text: 'Por favor vuelve ha iniciar sesión!',
      showConfirmButton: false,
      timer: 1500,
    });
    this.router.navigate(['login']);
  }
}
