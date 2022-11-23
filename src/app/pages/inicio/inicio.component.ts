import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  Observable, throwError } from 'rxjs';

import { Producto } from 'src/app/interfaces/producto'; 
import { NavigationEnd, Router } from '@angular/router';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  


  
  constructor(
                   private router: Router,
                   private _http: HttpClient) 
    { 


    }

  ngOnInit(): void {
  }

 










    
  }


