import { Component, OnInit } from '@angular/core';
import { Productos } from './class/productos';
import { ContenidoService } from '../services/contenido.service';

@Component({
  selector: 'app-contenido',
  templateUrl: './contenido.component.html',
  styleUrls: ['./contenido.component.css']
})
export class ContenidoComponent implements OnInit {
  productos: Productos[];
  imagen: string;

  constructor(private contenidoService: ContenidoService) { }

  ngOnInit(): void {
    
    this.contenidoService.getProductos().subscribe(
      async (data:any) => {
        this.productos = data.response;        
      }
    );
  }
}
