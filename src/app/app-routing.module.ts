import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { AddQuizComponent } from './components/add-quiz/add-quiz.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'addQuiz', component:AddQuizComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
