import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthUserService } from '../services/auth-user.service';
import { HttpClient } from '@angular/common/http';
import { AuthUserInterface } from '../models/auth-user';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authUserService: AuthUserService,
    private http: HttpClient,
    private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // console.log('route', route);
    const [{ path }] = route.url;
    return new Promise((resolve) => {
      const authUserId = localStorage.getItem('authUserId');
      if (authUserId && !this.authUserService.user) {
        this.http
          .get('http://localhost:7000/authUsers/get/' + authUserId)
          .toPromise()
          .then((response: any) => {
            this.authUserService.addUser(response);
            if (['auth'].includes(path)) {
              this.router.navigateByUrl('/dashboard');
            }
            resolve(true);
          })
          .catch(() => {
            localStorage.removeItem('authUserId');
            this.router.navigateByUrl('/');
            resolve(false);
          });
      } else if (!authUserId && !['auth', 'feedback'].includes(path)) {
        this.router.navigateByUrl('/');
        resolve(false);
      }
      resolve(true);
    });
  }
}
