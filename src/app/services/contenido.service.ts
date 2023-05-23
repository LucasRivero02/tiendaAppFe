import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Productos } from '../contenido/class/productos';
import { of, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ContenidoService {
  private urlEndPoint: string = 'http://localhost:3030/api/v1/producto/';
  private httpHeaders = new HttpHeaders({'Content-Type' : 'application/json'})
  constructor(private http: HttpClient, private router: Router) { }

  getProductos(){
    return this.http.get(this.urlEndPoint);
  }
}