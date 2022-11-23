import { Component, OnInit } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Router } from '@angular/router'
import Swal from 'sweetalert2'

import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MyErrorStateMatcher } from 'src/app/shared/directives/stateMatcher'

import { ContactoService } from 'src/app/services/contacto.service'
import { Contacto } from 'src/app/interfaces/contacto'
@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css'],
})
export class ContactoComponent implements OnInit {
  panelOpenState = false
  frmContacto: FormGroup
  loading = false
  hide = true
  successdata!: Response
  errors = null

  matcher = new MyErrorStateMatcher()

  constructor(
    public fb: FormBuilder,
    private _contactoService: ContactoService,
    private _snackBar: MatSnackBar, //notificacion
    private router: Router,
  ) {
    this.frmContacto = this.fb.group({
      nombre: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z ]*$'),
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      telefono: [
        '',
        [
          Validators.required,
          Validators.pattern('[0-9]{10}'),
          Validators.minLength(10),
          Validators.maxLength(12),
        ],
      ],
      comentario: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z ]*$'),
          Validators.minLength(1),
          Validators.maxLength(250),
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
    })
  }

  ngOnInit(): void {
  }

  Registrar(): any {
    this._contactoService.create(this.frmContacto.value).subscribe(
      result => {
      },
      error => {
              this.errors = error.error;
              this.notificacionError();
      },() => {
          Swal.fire({
          icon: 'success',
          title: 'Mensaje enviado con éxito',
          showConfirmButton: false,
          timer: 1500
         })
        this.frmContacto.reset()
      }
    );
  }

  notificacionError() {
    this._snackBar.open(
      'Error',
      'Hubo un error',
      {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      },
    )
  }

  get nombre() {
    return this.frmContacto.get('nombre')
  }
  get telefono() {
    return this.frmContacto.get('telefono')
  }
  get comentario() {
    return this.frmContacto.get('comentario')
  }
  get email() {
    return this.frmContacto.get('email')
  }

  getErrorMsjComentario() {
    return this.comentario?.hasError('required')
      ? 'Comentario obligatorio'
      : this.comentario?.hasError('minlength')
      ? 'Debe tener al menos 1 letra.'
      : this.comentario?.hasError('maxlength')
      ? 'Debe tener máximo 250 carácteres.'
      : this.comentario?.hasError('pattern')
      ? '  Coloque solamente letras'
      : ''
  }

  getErrorMsjTelefono() {
    return this.telefono?.hasError('required')
      ? 'Telefono obligatoria'
      : this.telefono?.hasError('minlength')
      ? 'Debe tener al menos 10 carácteres.'
      : this.telefono?.hasError('maxlength')
      ? 'Debe tener máximo 12 carácteres.'
      : this.telefono?.hasError('pattern')
      ? '  Coloque un número de teléfono válido.'
      : ''
  }

  getErrorMsjEmail() {
    return this.email?.hasError('required')
      ? 'Correo obligatorio'
      : this.email?.hasError('email')
      ? 'Ingrese un correo válido.'
      : this.email?.hasError('pattern')
      ? 'Ingrese un correo válido.'
      : ''
  }

  getErrorMsjNombre() {
    return this.nombre?.hasError('required')
      ? 'El nombre es obligatorio'
      : this.nombre?.hasError('minlength')
      ? 'Debe tener al menos 3 letras.'
      : this.nombre?.hasError('maxlength')
      ? 'Debe tener máximo 30 carácteres.'
     : ''
  }
}
