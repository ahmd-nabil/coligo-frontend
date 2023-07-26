import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupRequest } from 'src/app/model/signup-request.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {
  error = null;
  authenticated = false;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    if(this.authService.userSubject.getValue() != null) this.router.navigateByUrl('/');
  }
  
  signup(signUpForm : NgForm) {
    const signupRequest = new SignupRequest(
      signUpForm.form.value.first_name,
      signUpForm.form.value.last_name,
      signUpForm.form.value.email,
      signUpForm.form.value.password
    );

    this.authService.signup(signupRequest).subscribe({
      next: response => this.router.navigate(['/']),
      error: error => this.error = error
    });
  }
}
