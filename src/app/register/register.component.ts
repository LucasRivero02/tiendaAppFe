import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterService } from '../services/register.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email: string = '';
  name: string = '';
  password: string = '';
  validated: boolean = false;
  tituloOk:string = 'OK'
  textoOK:string = 'Resumen Generado correctamente';
  iconoOk:string = 'succes';
  tituloNoOk:string = 'Error';
  textoNoOk:string = 'Error al generar el resumen';
  iconoNoOk:string = 'error';
  errorName:string = 'El nombre de usuario es obligatorio';
  errorEmail: string = 'El email es obligatorio';
  errorPassword: string = 'El password es obligatorio';
  errorPasswordCorto: string = 'El email debe contener por lo menos 8 caracteres';

  constructor(
    private service: RegisterService,
    private router: Router,
    ) {
      this.email = '';
      this.name = '';
      this.password = '';
      this.validated = false; }

  ngOnInit(): void {
  }

  registrarUsuario(){
    if(this.validarCampos()){
      this.service.postRegister({email: this.email, name: this.name, password: this.password, validated: this.validated}).subscribe((data:any) =>{
        Swal.fire({
          title: 'Nuevo Usuario',
          text: `El usuario ${this.name} ha sido creado con exito!`,
          icon: 'success',
          confirmButtonColor: '#4CAF50',
        })
        this.router.navigate(['/login']);
      }, err => {
        Swal.fire({
          title: 'Error',
          text: `${err.error.message}`,
          icon: 'warning',
          confirmButtonColor: '#4CAF50',
        })
      })
    }
  }


  showModal(titulo:any, texto:any, icono:any){
    Swal.fire({
      'title':texto,
      'icon': icono
    })
  }

  validarCampos(){
    if (this.name.length == 0){
      this.showModal(this.tituloNoOk, this.errorName , this.iconoNoOk)
      return false
    }
    if (this.email.length == 0){
      this.showModal(this.tituloNoOk, this.errorEmail , this.iconoNoOk)
      return false
    }
    if (this.password.length == 0){
      this.showModal(this.tituloNoOk, this.errorPassword , this.iconoNoOk)
      return false
    }
    if (this.password.length < 8){
      this.showModal(this.tituloNoOk, this.errorPasswordCorto , this.iconoNoOk)
      return false
    }
    return true
  }
}
