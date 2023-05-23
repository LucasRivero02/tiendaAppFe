import { Injectable } from '@angular/core';
import { of, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../contenido/class/user';
import swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private urlEndPoint: string = 'http://localhost:3030/api/v1/login/';
  private httpHeaders = new HttpHeaders({'Content-Type' : 'application/json'})
  constructor(private http: HttpClient, private router: Router) { }

  login(user: User): Observable<User> {
    return this.http.post(this.urlEndPoint, user, { headers: this.httpHeaders }).pipe(
      map((response: any) => response as User),
      
      catchError(e => {

        if (e.status == 400) {
          return throwError(e);
        } 

        console.error(e.error.mensaje);
        swal.fire('Error al buscar al usuario', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }
}
