import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { Productos } from '../../contenido/class/productos';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductosComponent implements OnInit {
  public productos: Productos = new Productos();
  public previsualizacion: string;
  archivo_1: string = '';
  archivo_2: string = '';
  archivo_3: string = '';
  archivo_4: string = '';
  archivo_5: string = '';
  nombreArchivo_1: string = '';
  nombreArchivo_2: string = '';
  nombreArchivo_3: string = '';
  nombreArchivo_4: string = '';
  nombreArchivo_5: string = '';
  descripcion: string = '';
  precio: number;
  constructor(
    private sanitizer: DomSanitizer,
    private service: ProductosService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  registrarProducto() {
    this.service
      .postRegister({
        descripcion: this.descripcion,
        precio: this.precio,
        archivo_1: this.archivo_1,
        archivo_2: this.archivo_2,
        archivo_3: this.archivo_3,
        archivo_4: this.archivo_4,
        archivo_5: this.archivo_5,
      })
      .subscribe(
        (data: any) => {
          Swal.fire({
            title: 'Nuevo Producto',
            text: `El producto ${this.descripcion} ha sido creado con exito!`,
            icon: 'success',
            confirmButtonColor: '#4CAF50',
          });
          this.router.navigate(['/admin/home-productos']);
        },
        (err) => {
          Swal.fire({
            title: 'Error',
            text: `${err.error.message}`,
            icon: 'warning',
            confirmButtonColor: '#4CAF50',
          });
        }
      );
  }

  capturarFileOrig(event: any): any {
    const archivoCapturado = event.target.files[0];
    const archivoCapturadoNombre = event.target.files[0].name;
    
    this.extraerBase64(archivoCapturado).then((imagen: any) => {
      this.previsualizacion = imagen.base;

      switch (true) {
        case this.archivo_1.length === 0:
          this.archivo_1 = imagen.base;
          this.nombreArchivo_1 = event.target.files[0].name;
          break;
        case this.archivo_2.length === 0:
          this.archivo_2 = imagen.base;
          this.nombreArchivo_2 = event.target.files[0].name;
          break;
        case this.archivo_3.length === 0:
          this.archivo_3 = imagen.base;
          this.nombreArchivo_3 = event.target.files[0].name;
          break;
        case this.archivo_4.length === 0:
          this.archivo_4 = imagen.base;
          this.nombreArchivo_4 = event.target.files[0].name;
          break;
        case this.archivo_5.length === 0:
          this.archivo_5 = imagen.base;
          this.nombreArchivo_5 = event.target.files[0].name;
          break;
      }
    });
  }

  capturarFile(event: any, archivo: number): any {
    const archivoCapturado = event.target.files[0];
    const archivoCapturadoNombre = event.target.files[0].name;

    this.extraerBase64(archivoCapturado).then((imagen: any) => {
      this.previsualizacion = imagen.base;

      switch (archivo) {
        case 1:
          this.archivo_1 = imagen.base;
          break;
        case 2:
          this.archivo_2 = imagen.base;
          break;
        case 3:
          this.archivo_3 = imagen.base;
          break;
        case 4:
          this.archivo_4 = imagen.base;
          break;
        case 5:
          this.archivo_5 = imagen.base;
          break;
      }
    });
  }

  extraerBase64 = async ($event: any) =>
    new Promise((resolve) => {
      try {
        const unsafeImg = window.URL.createObjectURL($event);
        const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
        const reader = new FileReader();
        reader.readAsDataURL($event);

        reader.onload = () => {
          resolve({
            base: reader.result,
          });
        };
        reader.onerror = (error) => {
          resolve({
            base: null,
          });
        };
      } catch (e) {
        return null;
      }
      return null;
    });
}
