import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobsListComponent } from './components/jobs-list/jobs-list.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserInfoComponent } from './components/user-info/user-info.component';

const routes: Routes = [
  { path: 'jobs-list', component: JobsListComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'lk', component: UserInfoComponent },
  { path: '', component: JobsListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
