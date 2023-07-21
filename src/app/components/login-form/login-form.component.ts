import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit{
  authenticated = false;
  error = null;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    if(this.authService.isAuthenticated()) this.router.navigate(['/']);
  }

  login(loginForm: NgForm) {
    let email = loginForm.form.value.email;
    let password = loginForm.form.value.password;
    this.authService.login(email, password).subscribe
    ({
      next: () => this.router.navigate(['/']),
      error: error => {
        this.error = error.error; console.log(error);}
    });
  }
}
