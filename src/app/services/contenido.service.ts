import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Productos } from '../contenido/class/productos';
import { of, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ContenidoService {
  private baseUrl: string = environment.baseUrl;
  private finUrlProducto: string = environment.finUrlProducto;
  
  private httpHeaders = new HttpHeaders({'Content-Type' : 'application/json'})
  constructor(private http: HttpClient, private router: Router) { }

  getProductos(){
    let direccion = this.baseUrl + this.finUrlProducto;
    return this.http.get(direccion);
  }
}