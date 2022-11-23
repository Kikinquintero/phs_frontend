import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { MyErrorStateMatcher } from 'src/app/shared/directives/stateMatcher';
import { ValidatePassword } from 'src/app/shared/validators/password-validators';

// import { Registro } from 'src/app/interfaces/registro';      //importar la interfaz
// import { RegistroService } from 'src/app/services/registro.service';   //importar el servicio

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registrate',
  templateUrl: './registrate.component.html',
  styleUrls: ['./registrate.component.css'],
})
export class RegistrateComponent implements OnInit {
  // registro: Registro[] = [];
  paternPassword = '/^(?=D*d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/';
  frmRegistrate: FormGroup;

  hide = true;
  hide2 = true;
  errors: any = null;

  loading = false;
  clickEnviar: boolean = false;
  txtboton = 'Crear cuenta ';

  //!Se utiliza para el touched y el dirty
  matcher = new MyErrorStateMatcher();

  constructor(
    public fb: FormBuilder,
    private _snackBar: MatSnackBar, //notificacion
    private router: Router,
    public authService: AuthService
  ) {
    this.frmRegistrate = this.fb.group(
      {
        nombre: [
          '',
          [
            Validators.required,
            Validators.pattern('^[a-zA-Z ]*$'),
            Validators.minLength(3),
            Validators.maxLength(20),
          ],
        ],
        apellido: [
          '',
          [
            Validators.required,
            Validators.pattern('^[a-zA-Z ]*$'),
            Validators.minLength(3),
            Validators.maxLength(40),
          ],
        ],
        email: [
          '',
          [
            Validators.required,
            Validators.email,
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
          ],
        ],
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
        confirmarPassword: [
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
      },

      {
        validators: ValidatePassword.MatchPassword,
      }
    );
  }

  ngOnInit(): void {}

  Registrar(): any {
    this.loading = true;
    this.clickEnviar = true;
    this.txtboton = 'Enviando datos';
    this.authService.createUser(this.frmRegistrate.value).subscribe(
      (result) => {
        console.log(result)
      },
      (error) => {
        this.errors = error.error;
        // console.log('datos incorrectos');
        this.notificacionError();
        this.loading = false;
        this.clickEnviar = false;
        this.txtboton = 'Crear cuenta';
      },
      () => {
        Swal.fire({
          icon: 'success',
          title:
            'Se ha registrado correctamente.',
          showConfirmButton: false,
          timer: 3500,
        });
        this.loading = false;
        this.clickEnviar = false;
        this.txtboton = 'Crear cuenta';

        this.frmRegistrate.reset();
        // console.log('usuario registrado')
        this.router.navigate(['login']);
      }
    );
  }

  notificacionError() {
    this._snackBar.open(
      'Error',
      'No se pudo registrar. Por favor, vuelve a intentarlo.',
      {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      }
    );
  }

  get nombre() {
    return this.frmRegistrate.get('nombre');
  }
  get password() {
    return this.frmRegistrate.get('password');
  }
  get confirmarPassword() {
    return this.frmRegistrate.get('confirmarPassword');
  }
  get apellido() {
    return this.frmRegistrate.get('apellido');
  }
  get email() {
    return this.frmRegistrate.get('email');
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

  getErrorMsjConfirmarPassword() {
    return this.confirmarPassword?.hasError('required')
      ? 'Contraseña obligatoria'
      : this.confirmarPassword?.hasError('minlength')
      ? 'Debe tener al menos 8 carácteres.'
      : this.confirmarPassword?.hasError('maxlength')
      ? 'Debe tener máximo 30 carácteres.'
      : this.confirmarPassword?.hasError('pattern')
      ? '  Coloque al menos un número, una letra minúscula,1 mayúscula, 1 carácter especial y sin espacios en blanco.'
      : this.confirmarPassword?.hasError('MatchPassword')
      ? '  Las contraseñas no coinciden.'
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

  getErrorMsjApellido() {
    return this.apellido?.hasError('required')
      ? 'El apellido es obligatorio'
      : this.apellido?.hasError('minlength')
      ? 'Debe tener al menos 3 letras.'
      : this.apellido?.hasError('maxlength')
      ? 'Debe tener máximo 30 carácteres.'
      : this.apellido?.hasError('pattern')
      ? 'Solo debe ingresar letras.'
      : '';
  }

  getErrorMsjNombre() {
    return this.nombre?.hasError('required')
      ? 'El nombre es obligatorio'
      : this.nombre?.hasError('minlength')
      ? 'Debe tener al menos 3 letras.'
      : this.nombre?.hasError('maxlength')
      ? 'Debe tener máximo 30 carácteres.'
      : this.nombre?.hasError('pattern')
      ? 'Solo debe ingresar letras.'
      : '';
  }
}
