import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserGuardGuard } from './user-guard.guard';



import { InicioUserComponent } from './user/inicio-user/inicio-user.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistrateComponent } from './pages/registrate/registrate.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { ChatComponent } from './user/chat/chat.component';


const routes: Routes = [
  // {path: '',pathMatch:'full', redirectTo:''},
    { path: '', component:LoginComponent},
    { path: 'login', component:LoginComponent},
    { path: 'registro', component:RegistrateComponent},
  
  
  
    // { path: 'vendedor', component:InicioVendedorComponent, canActivate: [UserGuardGuard],
    //    children:[
  
    //       { path: 'crear', component:CreateComponent, canActivate: [UserGuardGuard]},
    //        ]
    // },
  
  
  
    { path: 'user', component:InicioUserComponent, canActivate: [UserGuardGuard],
    children:[
  
      { path: 'perfil', component:PerfilComponent, canActivate: [UserGuardGuard]},
      { path: 'chat', component:ChatComponent, canActivate: [UserGuardGuard]},
    ]
   },
  

   { path: 'admin', component:InicioUserComponent, canActivate: [UserGuardGuard],
   children:[
 
     { path: 'perfil', component:PerfilComponent, canActivate: [UserGuardGuard]},
     { path: 'chat', component:ChatComponent, canActivate: [UserGuardGuard]},
   ]
  },
  
    // { path: 'profile', component:UserProfileComponent, canActivate: [UserGuardGuard]},
  
  
  
  
    { path: '**', component:InicioComponent},
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {
    static components = [
    ];
   }
  