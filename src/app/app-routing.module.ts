import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { AddQuizComponent } from './components/add-quiz/add-quiz.component';
import { AuthButtonComponent } from './components/navbar/auth-button/auth-button.component';
import { LoginComponent } from './components/login/login.component';
import { SignupButtonComponent } from './components/navbar/signup-button/signup-button.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'addQuiz', component: AddQuizComponent},
  {path:'login', component: LoginComponent},
  {path:'signup', component: SignupFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
