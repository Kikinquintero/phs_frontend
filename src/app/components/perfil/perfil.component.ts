import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';

export class User {
  nombre ?: String;
  email ?: String;
}

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  UserProfile ?: User;

  constructor(
    public authService: AuthService
  ) {
    this.authService.profileUser().subscribe((data:any) => {
      this.UserProfile = data;
    })
  }

  ngOnInit(): void {
  }

}
