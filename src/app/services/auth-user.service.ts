import { Injectable } from '@angular/core';
import { AuthUserInterface } from '../models/auth-user';

@Injectable({
  providedIn: 'root',
})
export class AuthUserService {
  user?: AuthUserInterface;
  addUser(data: AuthUserInterface) {
    this.user = data;
  }
  clearUser(): void {
    this.user = undefined;
  }
}
