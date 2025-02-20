import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { CommonModule } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  title = 'Login';

  loginForm!: FormGroup;

  fb = inject(FormBuilder);
  #authservice = inject(AuthService);
  #route = inject(ActivatedRoute);
  #router = inject(Router);

  user = {
    UserName:'',
    Password:'',
    Role:''
  };

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      UserName: ['', [ Validators.required,Validators.minLength(5),] ],
      Password: ['', [ Validators.required, Validators.minLength(5)] ],
      Role: ['', [Validators.required]]
    });
    
    this.loginForm.valueChanges.subscribe(value => {
      Object.assign(this.user, value);
    });

   // console.log(this.#route.snapshot.queryParams['retUrl']);
  }

  login(){

    if(this.loginForm.valid){

      Object.assign(this.user,this.loginForm.value);
      this.#authservice.login(this.user).subscribe({
        next: (res : any) => { //console.log(res)
          if(res.token) { 
              //set user role and token in local storage. 
              localStorage.setItem('userRole',res.user.role); 
              localStorage.setItem('mytoken', res.token);
              alert("Login Successfully"), 
              console.log("Login Successful")

              //clear the login form after login successsful
              this.loginForm.reset();

              const role = this.getRole();
              this.#authservice.role(role);

              //take the route component from url used before login.
              const retUrl = this.#route.snapshot.queryParams['retUrl'] || '/';
              //console.log(retUrl);
              this.#router.navigateByUrl(retUrl);
              if(this.#authservice.isUserLoggedIn()){
                //after login success navigates to url. 
                this.#router.navigateByUrl(retUrl);
              }
            }
            else{
              alert("Invalid Token");
            }
        },
        error: (err) => { alert("Invalid User or Pass"); console.log("Error") }
      });
    }
    else{
      console.log("Form is Invalid");
    }
  }

  authorize(){
    this.#authservice.authData();
  }

  logOut(){
    this.#authservice.logOut();
    alert('Logout Successful');
  }

  getRole():any{
    const role =  localStorage.getItem('userRole');
    return role;
  }
}
