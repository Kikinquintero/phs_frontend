import { Component } from '@angular/core';
import { Router } from '@angular/router';

// import { Router } from '@angular/router';
// import { TokenService } from 'src/app/services/token.service';
// import { AuthStateService } from 'src/app/services/auth-state.service';

import { AuthStateService } from './services/auth-state.service';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'modasjenl';

  logueado: boolean;

  rutaLogueado= '';
   

  
  constructor( 

    private auth: AuthStateService,
    public token: TokenService,
    public router: Router,
  
    )
{
  this.rutaLogueado = localStorage.getItem('route');
}

public allProduct = [];
public filterData:any = [];

ngOnInit() {
  this.auth.userAuthState.subscribe(val => {
      this.logueado = val;
      if(this.logueado==true){
        this.cerrarSesion
      }
  });



}




// Signout
cerrarSesion() {
  this.auth.setAuthState(false);
  this.token.removeToken();
  // this.logueado = false;
  localStorage.removeItem('rol');
  this.router.navigate(['login']);
}


}


