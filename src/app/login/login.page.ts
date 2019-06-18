import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Routes, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginUser: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) { }

  users = [
    {
      user: "user1",
      pass: "admin"
    },
    {
      user: "user2",
      pass: "admin"
    }

  ];

  ngOnInit() {
    if(sessionStorage.loginUser){
      this.router.navigate(['/here-map']);
    }

    this.loginUser = this.fb.group({
      user: ['', Validators.required],
      pass: ['', Validators.required]
    });

   
  }

  login() {
    // console.log('login', this.loginUser);
    const existUser = this.users.find((user:any) => {      
      
      return ((user.user === this.loginUser.value.user) && (user.pass === this.loginUser.value.pass));
    });
    if (existUser) {
      console.log('exist user', this.loginUser.value.user);
      //TODO cambiar a localstorage
      sessionStorage.loginUser = true;
      this.router.navigate(['/here-map']);

    } else {
      console.log('usuario o contraseña incorrecta');

    }
  }

  logout(){
    sessionStorage.loginUser = false;
  }

}
