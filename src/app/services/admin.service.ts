import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Global } from '../global'; 
import { TypeUsers } from '../interfaces/typeUsers';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private _apiUrl = Global.apiUrl+"api/auth/get-users";
  httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/json'
     })
  }

  constructor(private httpClient: HttpClient) { }

  getAllTypeUsers(): Observable<TypeUsers[]> {
    
   return this.httpClient.get<TypeUsers[]>(this._apiUrl)
   .pipe(
    //  catchError(this.errorHandler)
   )
 }
}


