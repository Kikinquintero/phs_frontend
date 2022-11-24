import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA,NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { InicioComponent } from './pages/inicio/inicio.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistrateComponent } from './pages/registrate/registrate.component';

import { SharedModule } from './shared/shared.module';
import { SearchPipe } from './pipes/search.pipe';






// import { Ng7MatBreadcrumbModule } from "ng7-mat-breadcrumb";
// import { MatProgressButtonsModule } from 'mat-progress-buttons';
import { CookieService } from 'ngx-cookie-service';

import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { AuthInterceptor } from './services/auth.interceptor';
import { UserGuardGuard } from './user-guard.guard';

import { PerfilComponent } from './components/perfil/perfil.component';
import { InicioUserComponent } from './components/inicio-user/inicio-user.component';
import { ChatComponent } from './user/chat/chat.component';
import { InfoUsersComponent } from './components/info-users/info-users.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrateComponent,
    PerfilComponent,
    InicioUserComponent,
    ChatComponent,
    InfoUsersComponent,


    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule ,    //Importante contiene angular material y modulos
    // Ng7MatBreadcrumbModule,
    HttpClientModule,
    // MatProgressButtonsModule.forRoot()
  ],
  providers: [
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher},
    CookieService,
    UserGuardGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
