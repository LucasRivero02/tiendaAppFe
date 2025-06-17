// import { Component, OnInit } from '@angular/core';
// import { Productos } from './class/productos';
// import { ContenidoService } from '../services/contenido.service';

// @Component({
//   selector: 'app-contenido',
//   templateUrl: './contenido.component.html',
//   styleUrls: ['./contenido.component.css']
// })
// export class ContenidoComponent implements OnInit {
//   productos: Productos[];
//   imagen: string;

//   constructor(private contenidoService: ContenidoService) { }

//   ngOnInit(): void {
    
//     this.contenidoService.getProductos().subscribe(
//       async (data:any) => {
//       console.log('data.response: ', JSON.stringify(data.response))
//         this.productos = data.response;        
//       }
//     );
//   }
// }
import { Component, OnInit } from '@angular/core';
import { Productos } from './class/productos';
import { ContenidoService } from '../services/contenido.service';

@Component({
  selector: 'app-contenido',
  templateUrl: './contenido.component.html',
  styleUrls: ['./contenido.component.css']
})
export class ContenidoComponent implements OnInit {
  productos: Productos[] = [];
  imagen: string;

  currentPage: number = 1;
  totalPages: number = 0;
  limit: number = 5; // Podés ajustar el tamaño de página

  constructor(private contenidoService: ContenidoService) {}

  ngOnInit(): void {
    this.cargarProductos(this.currentPage);
  }

  cargarProductos(page: number): void {
    this.contenidoService.getProductosPaginados(page, this.limit).subscribe({
      next: (data: any) => {
        console.log('data.response: ', data.response);
        this.productos = data.response;
        this.currentPage = data.currentPage;
        this.totalPages = data.totalPages;
      },
      error: (err) => {
        console.error('Error al obtener productos paginados:', err);
      }
    });
  }

  paginaAnterior(): void {
    if (this.currentPage > 1) {
      this.cargarProductos(this.currentPage - 1);
    }
  }

  paginaSiguiente(): void {
    if (this.currentPage < this.totalPages) {
      this.cargarProductos(this.currentPage + 1);
    }
  }
getPages(): number[] {
  const pages: number[] = [];
  const startPage = Math.max(this.currentPage - 2, 1);
  const endPage = Math.min(this.currentPage + 2, this.totalPages);

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return pages;
}

irAPagina(page: number): void {
  if (page !== this.currentPage) {
    this.cargarProductos(page);
  }
}
}
