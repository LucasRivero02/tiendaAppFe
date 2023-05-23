import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private baseUrl: string = environment.baseUrl;
  private finUrlRegister:string = environment.finUrlRegister;
  private finUrlLogin:string = environment.finUrlLogin;
  constructor(private http: HttpClient) { }

  public postRegister(body: any){
     let direccion = this.baseUrl + this.finUrlRegister;    
     return this.http.post(direccion, body);
  }
}