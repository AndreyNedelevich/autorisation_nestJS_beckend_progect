import { Role } from 'src/roles/roles.model';

export interface ITokenPeyload {
  email: string;
  id: null;
  roles: Role[];
}
