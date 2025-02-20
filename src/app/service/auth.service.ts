import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../user';
import { error } from 'console';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  headers: HttpHeaders | undefined;

  constructor() {

    const token = localStorage.getItem('mytoken');
    //console.log(token);

    this.headers = new HttpHeaders( 
      { Authorization: `Bearer ${token}`}
    );
  }

  #http = inject(HttpClient);

  private url = "https://localhost:7083/api/RegisterLogin";

  register(user:any) : Observable<any>
  {
    return this.#http.post(`${this.url}/register`,user);
  }


  login(user:any) : Observable<any>
  {
    return this.#http.post(`${this.url}/login`,user);
  }

  authData()
  {
    return this.#http.get(`${this.url}/data`, {headers: this.headers}).subscribe(
      {
        next:(data)=>console.log(data),
        error:(err)=>console.log(err)
      }
    );
  }

  getToken(){
    const token = localStorage.getItem('mytoken');
    return token;
  }

  isUserLoggedIn() : boolean
  {
    const token = localStorage.getItem('mytoken');
    if(token)
      return false;
    return true;
  }
  
  logOut(){
    localStorage.removeItem('mytoken');
    localStorage.removeItem('userRole');
  }

  userRole:string = '';

  role(role: any){
    this.userRole = role;
  }

  getUserRole(){
    return this.userRole;
  }
}
