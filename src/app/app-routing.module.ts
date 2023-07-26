import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/main/home/home.component';
import { AddQuizComponent } from './components/main/add-quiz/add-quiz.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { MainComponent } from './components/main/main.component';
import { authGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path:'', component: MainComponent, 
    canActivateChild: [authGuard],
    children: [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path:'addQuiz', component: AddQuizComponent}
  ]},
  {path:'login', component: LoginFormComponent},
  {path:'signup', component: SignupFormComponent},
  {path:'**', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
