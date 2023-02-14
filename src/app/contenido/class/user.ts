export type Roles = 'SUSCRIPTOR' | 'ADMIN';

export class User {
   name?: string;
   email:string;
   password:string;
   validated:boolean;
   message:string;
   token:string;
   rol:string;
}
