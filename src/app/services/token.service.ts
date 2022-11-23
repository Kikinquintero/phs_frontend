import { Injectable } from '@angular/core';
import { Global } from '../global'; 

@Injectable({
  providedIn: 'root'
})

export class TokenService {

  // private apiURL = "http://localhost:8000/api/auth/";
  private _apiUrl = Global.apiUrl;

  private issuer = {
    login: this._apiUrl + 'api/auth/login',
    register: this._apiUrl + 'api/auth/newRegister',
    smsverificar:this._apiUrl + 'api/auth/smsverificar',
  }

  constructor() { }

  tokenStorage(token){
    localStorage.setItem('auth_token', token);
  }

  getToken(){
    return localStorage.getItem('auth_token');
  }

  // Verify the token
  isValidToken(){
     const token = this.getToken();

     if(token){
       const payload = this.payload(token);
       if(payload){
         return Object.values(this.issuer).indexOf(payload.iss) > -1 ? true : false;
       }
     } else {
        return false;
     }
  }

  payload(token) {
    const jwtPayload = token.split('.')[1];
    return JSON.parse(atob(jwtPayload));
  }

  // estado del token de usuario
  isLogueado() {
    return this.isValidToken();
  }

  // Elimina token
  removeToken(){
    localStorage.removeItem('auth_token');
  }

}