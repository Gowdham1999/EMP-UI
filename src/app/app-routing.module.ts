import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SaveEmployeeComponent } from './save-employee/save-employee.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },

  {
    // path: 'home/:userName', component: HomeComponent, canActivate: [AuthGuardService], children: [
    path: 'home', component: HomeComponent, canActivate: [AuthGuardService], children: [

      { path: 'employees', component: EmployeeDetailsComponent },

      { path: 'employees/:id', component: SaveEmployeeComponent }

    ]
  },

  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
