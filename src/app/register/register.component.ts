import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms'
import { RouterLink } from '@angular/router';
import { title } from 'process';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  
  title = 'Register';

  registerForm !: FormGroup;

  fb = inject(FormBuilder);

  #authservice = inject(AuthService);

  pattern = "^[a-zA-Z0-9]+@[a-zA-Z0-9]+\\.[a-z]{2,}$";

  user = {
    username: '',
    email: '',
    password: '',
    role:''
  };

  ngOnInit(): void {

    this.registerForm = this.fb.group({
      username: ['', [ Validators.required,Validators.minLength(5),] ],
      email: ['', [ Validators.required, Validators.email, Validators.pattern(this.pattern)] ],
      password: ['', [ Validators.required, Validators.minLength(5)] ],
      role: ['', [ Validators.required]]
    });

    this.registerForm.valueChanges.subscribe(value => {
      Object.assign(this.user, value);
    })  

  }

  register(){

    if(this.registerForm.valid){

      Object.assign(this.user,this.registerForm.value);
      this.#authservice.register(this.user).subscribe({
        next: (res) => { alert("Registered Successfully"); console.log("Registered Successfully"); },
        error: (err) => console.log("Error")
      });
      this.registerForm.reset();
    }
  }

}
