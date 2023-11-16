import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicantsListComponent } from './components/applicants-list/applicants-list.component';
import { JobsListComponent } from './components/jobs-list/jobs-list.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { authGuard } from './services/guards/auth.guard';
import { roleGuard } from './services/guards/role.guard';

const routes: Routes = [
  {
    path: 'applicants-list',
    component: ApplicantsListComponent,
    canActivate: [authGuard]
  },
  {
    path: 'jobs-list',
    component: JobsListComponent,
    canActivate: [authGuard]
  },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'lk', component: UserInfoComponent },
  {
    path: '',
    component: JobsListComponent,
    canActivate: [authGuard, roleGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
