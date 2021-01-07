import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { ProductService } from '../productservice';
import { AuthenticationService } from './authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private service: ProductService //private authenticationService: AuthenticationService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    //const user = this.authenticationService.userValue;
    if (localStorage.getItem('token') != null) {
      let roles = route.data['permittedRoles'] as Array<string>;
      if (roles) {
        if (roles) {
          if (this.service.roleMatch(roles)) return true;
          else {
            this.router.navigate(['/forbidden']);
          }
        }
      }
      return true;
    }
    // not logged in so redirect to login page with the return url
    else
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: state.url },
      });
    return false;
  }
}

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  canActivate(route: ActivatedRouteSnapshot) {
    const user = this.authenticationService.userValue;
    if (route.data.roles && route.data.roles.indexOf(user.role) === -1) {
      this.router.navigate(['/unauthorized']);
      return false;
    }
    return true;
  }
}
