import { Component, OnInit, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { AuthStateService } from 'src/app/services/auth-state.service';

import { MatDialog } from '@angular/material/dialog';
// import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';

//! se importa desde directives
import { MyErrorStateMatcher } from 'src/app/shared/directives/stateMatcher';

export interface DialogData {
  email: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  frmLogin: FormGroup;

  hide = true;
  errors: any = null;
  loading = false;
  clickEnviar: boolean = false;
  txtboton = 'Ingresar';
  viewReenviarEmail = false;

  emailAuth = null;
  acces_tokenAuth: any = null;

  matcher = new MyErrorStateMatcher();

  constructor(
    public fb: FormBuilder,
    private _snackBar: MatSnackBar, //notificacion
    public authService: AuthService,
    private token: TokenService,
    private authState: AuthStateService,
    private router: Router,
  ) {
    this.frmLogin = this.fb.group({
      email: ['',   [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ],],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/
          ),
          Validators.minLength(8),
          Validators.maxLength(30),
        ],
      ],
    });
  }

  ngOnInit(): void {}

  Ingresar(): any {
    this.loading = true;
    this.clickEnviar = true;
    this.txtboton = 'Enviando datos';

    this.authService.login(this.frmLogin.value).subscribe(
      (result) => {
        // guarda el token en un localstorage
        // descomentar
      this.saveToken(result);
      console.log(result);
      localStorage.setItem('rol',result['user']['rol'])

      if (localStorage.getItem('rol') =='Usuario') {
        console.log('usauooo')
        this.router.navigate(['user']);

      }
      if (localStorage.getItem('rol') =='SA') {
        console.log('SA')
        this.router.navigate(['user']);

      }


      },
      (error) => {
        this.errors = error;
        console.log('entrando errores xd');
        console.log(this.errors);

        if (this.errors.status == 401) {
          console.log('datos incorrectos');
          this.notificacionError();
        } 

        this.loading = false;
        this.clickEnviar = false;
        this.txtboton = 'Ingresar';
      },

      () => {
        // descomentar
        this.authState.setAuthState(true);

        this.loading = false;
        this.clickEnviar = false;
        this.txtboton = 'Ingresar';
        this.frmLogin.reset();

        Swal.fire({
          // position: 'top-end',
          icon: 'success',
          title: 'Accediendo..',
          showConfirmButton: false,
          timer: 1500
         })

      }
    );
  }

  // Handle response
  saveToken(data: any) {
    this.token.tokenStorage(data.access_token);
  }

  notificacionError() {
    this._snackBar.open(
      'Error',
      'El correo o contraseña que ingreso son incorrectos',
      {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      }
    );
  }

  


  get email() {
    return this.frmLogin.get('email');
  }

  get password() {
    return this.frmLogin.get('password');
  }

  getErrorMsjPassword() {
    return this.password?.hasError('required')
      ? 'Contraseña obligatoria'
      : this.password?.hasError('minlength')
      ? 'Debe tener al menos 8 carácteres.'
      : this.password?.hasError('maxlength')
      ? 'Debe tener máximo 30 carácteres.'
      : this.password?.hasError('pattern')
      ? '  Coloque al menos un número, una letra minúscula,1 mayúscula, 1 carácter especial y sin espacios en blanco.'
      : '';
  }


  getErrorMsjEmail() {
    return this.email?.hasError('required')
      ? 'Correo obligatorio'
      : this.email?.hasError('email')
      ? 'Ingrese un correo válido.'
      : this.email?.hasError('pattern')
      ? 'Ingrese un correo válido.'
      : '';
  }


}
