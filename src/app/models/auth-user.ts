import { Model } from './BaseModel';

export interface AuthUserInterface {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export class AuthUser extends Model<AuthUserInterface> {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
}
