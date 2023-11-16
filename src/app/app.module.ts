import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JobsListComponent } from './components/jobs-list/jobs-list.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { authGuard } from './services/guards/auth.guard';
import { ApplicantsListComponent } from './components/applicants-list/applicants-list.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    JobsListComponent,
    LoginComponent,
    UserInfoComponent,
    ApplicantsListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function tokenGetter() {
  return localStorage.getItem('token');
}
