import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  private baseUrl: string = environment.baseUrl;
  private finUrlAltaProducto: string = environment.finUrlAltaProducto;
  private finUrlBajaProducto: string = environment.finUrlBajaProducto;
  constructor(private http: HttpClient) {}

  public postRegister(body: any) {
    let direccion = this.baseUrl + this.finUrlAltaProducto;
    return this.http.post(direccion, body);
  }

  public postDelete(id: string) {
    let direccion = this.baseUrl + this.finUrlBajaProducto + '/' + id;
    return this.http.delete(direccion);
  }

  public getProductoById(id: string) {
    let direccion = this.baseUrl + this.finUrlBajaProducto + '/' + id;
    return this.http.get(direccion);
  }

  public postUpdate(id:string, body: any,){
    let direccion = this.baseUrl + this.finUrlAltaProducto + '/' + id;
    return this.http.put(direccion, body);
  }
}
