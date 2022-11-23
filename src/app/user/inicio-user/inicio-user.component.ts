import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

export class User {
  nombre ?: String;
  email ?: String;
}

@Component({
  selector: 'app-inicio-user',
  templateUrl: './inicio-user.component.html',
  styleUrls: ['./inicio-user.component.css']
})
export class InicioUserComponent implements OnInit {

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
