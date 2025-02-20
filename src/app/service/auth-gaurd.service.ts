import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root' //route,component
})
export class AuthGaurdService implements CanActivate {

  constructor() { }

  #authService = inject(AuthService);

  #router = inject(Router);

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    
    if(this.#authService.isUserLoggedIn())
    {
      alert("You r not allowed to View this Page!");
      this.#router.navigate(['login'], { queryParams: { retUrl: state.url}});
      //console.log(state.url);
      return false;
    }

    const userRole = this.#authService.getUserRole();
    if(route.data['role'] != userRole){
      alert('Access Denied! Admins Only');
      //if route role doesn't match with user role, navigates to unauthorized(error). 
      this.#router.navigate(['/not-authorized']);
    }

    return true;
  }
}
