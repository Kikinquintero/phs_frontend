import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Routes, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthStateService } from './services/auth-state.service';

import { TokenService } from './services/token.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuardGuard implements CanActivate {
  logueado: boolean;
 
 constructor(
   private _tokenService : TokenService,
  private auth: AuthStateService,
  private _router : Router     
        ){

 }
 
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      console.log('canActivate..')
      const isLogueado = this._tokenService.isLogueado();
      if(!isLogueado){
        this.cerrarSesion()
          void this._router.navigateByUrl('/login');
      }

      console.log('esta logueado:')
      console.log(isLogueado)
      return isLogueado
  }
  

 
  // Signout
  cerrarSesion() {
    this.auth.setAuthState(false);
    this._tokenService.removeToken();
    localStorage.removeItem('rol');
    this.logueado = false;
    // this._router.navigate(['login']);
  }


}
