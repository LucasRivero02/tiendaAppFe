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

  getProductosPaginados(page: number, limit: number): Observable<any> {
  const url = `${this.baseUrl}${this.finUrlProducto}/paginated?page=${page}&limit=${limit}`;
  console.log('URL de productos paginados:', url);
  return this.http.get<any>(url, { headers: this.httpHeaders });
}
}