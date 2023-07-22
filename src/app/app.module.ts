import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './components/main/home/home.component';
import { QuizComponent } from './components/main/quiz/quiz.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/main/sidebar/sidebar.component';
import { AddQuizComponent } from './components/main/add-quiz/add-quiz.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthButtonComponent } from './components/navbar/auth-button/auth-button.component';
import { SignupButtonComponent } from './components/navbar/signup-button/signup-button.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { JwtInterceptor } from './services/jwt.interceptor';
import { MainComponent } from './components/main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    QuizComponent,
    NavbarComponent,
    SidebarComponent,
    AddQuizComponent,
    AuthButtonComponent,
    SignupButtonComponent,
    LoginFormComponent,
    SignupFormComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
