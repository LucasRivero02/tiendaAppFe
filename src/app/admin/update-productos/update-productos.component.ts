import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Productos } from 'src/app/contenido/class/productos';
import { ProductosService } from '../../services/productos.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-update-productos',
  templateUrl: './update-productos.component.html',
  styleUrls: ['./update-productos.component.css'],
})
export class UpdateProductosComponent implements OnInit {
  public productos: Productos;
  _id: string = '';
  archivo_1: string = '';
  archivo_2: string = '';
  archivo_3: string = '';
  archivo_4: string = '';
  archivo_5: string = '';
  descripcion: string = '';
  precio: number;

  public previsualizacion: string;

  constructor(
    private sanitizer: DomSanitizer,
    private service: ProductosService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.log('llego aca')
    const id_entrada = <string>this.activatedRoute.snapshot.params.id;
    if (id_entrada) {
      this.service.getProductoById(id_entrada).subscribe(
        async (data: any) => {
          this.productos = data.response;
          this.descripcion = data.response.descripcion;
          this.precio = data.response.precio;
          this.archivo_1 = data.response.archivo_1;
          this.archivo_2 = data.response.archivo_2;
          this.archivo_3 = data.response.archivo_3;
          this.archivo_4 = data.response.archivo_4;
          this.archivo_5 = data.response.archivo_5;
        },
        (err) => console.log(err)
      );
    }
  }

  actualizarProducto() {
    this.productos.descripcion = this.descripcion;
    this.productos.precio = this.precio;
    this.productos.archivo_1 = this.archivo_1;
    this.productos.archivo_2 = this.archivo_2;
    this.productos.archivo_3 = this.archivo_3;
    this.productos.archivo_4 = this.archivo_4;
    this.productos.archivo_5 = this.archivo_5;

    this.service
      .postUpdate(this.productos._id,this.productos)
      .subscribe(
        (data: any) => {
          Swal.fire({
            title: 'Actualiza Producto',
            text: `El producto ${this.descripcion} ha sido actualizado con exito!`,
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
