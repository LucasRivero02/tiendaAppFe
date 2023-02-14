import { Component, OnInit } from '@angular/core';
import { Productos } from '../../contenido/class/productos';
import { ContenidoService } from '../../services/contenido.service';
import { ProductosService } from '../../services/productos.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-home-productos',
  templateUrl: './home-productos.component.html',
  styleUrls: ['./home-productos.component.css'],
})
export class HomeProductosComponent implements OnInit {
  imagen: string;
  searchText: any;

  public productos: Productos;

   updateproducto: Productos={
     _id: '',
     descripcion: '',
     precio: 0,
     archivo_1: '',
     archivo_2: '',
     archivo_3: '',
     archivo_4: '',
     archivo_5: '',
     toLowerCase: function (): void {
       throw new Error('Function not implemented.');
     }
   };


  public previsualizacion: string;
  _id:string = '';
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
  updateProduct: boolean = false;
  constructor(
    private contenidoService: ContenidoService,
    private sanitizer: DomSanitizer,
    private productoservice: ProductosService,
    private service: ProductosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  borrarProducto(id: any) {
    Swal.fire({
      title: 'Atencion',
      text: 'Esta seguro que quiere borrar',
      showCancelButton: true,
      confirmButtonText: 'Borrar',
      confirmButtonColor: '#4CAF50',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.productoservice.postDelete(id).subscribe(
          (data: any) => {
            this.eliminoConExito();
          },
          (err) => {
            this.eliminoError(`${err.error.message}`);
          }
        );
      } else if (result.isDenied) {
        this.noElimino();
      }
    });
  }

  cargarProducto(id:string) {
      this.service.getProductoById(id).subscribe(
        async (data: any) => {
          this.updateproducto = data.response;
          this.updateProduct = true;
          this.descripcion = data.response.descripcion;
          this.precio = data.response.precio;
          this.archivo_1 = data.response.archivo_1;
          this.archivo_2 = data.response.archivo_2;
          this.archivo_3 = data.response.archivo_3;
          this.archivo_4 = data.response.archivo_4;
          this.archivo_5 = data.response.archivo_5;
          this._id = data.response._id;
        },
        (err) => console.log('error')
      );
  } 

  actualizarProducto() {
    this.updateproducto.descripcion = this.descripcion;
    this.updateproducto.precio = this.precio;
    this.updateproducto.archivo_1 = this.archivo_1;
    this.updateproducto.archivo_2 = this.archivo_2;
    this.updateproducto.archivo_3 = this.archivo_3;
    this.updateproducto.archivo_4 = this.archivo_4;
    this.updateproducto.archivo_5 = this.archivo_5;
    this.updateproducto._id = this._id;

    this.service
      .postUpdate(this._id, this.updateproducto)
      .subscribe(
        (data: any) => {
          Swal.fire({
            title: 'Actualiza Producto',
            text: `El producto ${this.descripcion} ha sido actualizado con exito!`,
            icon: 'success',
            confirmButtonColor: '#4CAF50',
          });
          this.cargarProductos();
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

  cargarProductos(){
      this.contenidoService.getProductos().subscribe(async (data: any) => {
      this.productos = data.response;
    });
  }
// funciones de mensajes
  eliminoConExito(){
    Swal.fire({
      title: 'Atencion',
      text: `El producto ha sido eliminado con exito!`,
      icon: 'success',
      confirmButtonColor: '#4CAF50',
    }).then((result) => {
      if (result.isConfirmed) {
        location.reload();
      }
    })
  }

  eliminoError(errorText:any){
    Swal.fire({
      title: 'Error',
      text: errorText,
      icon: 'warning',
      confirmButtonColor: '#4CAF50',
    });
  }

  noElimino(){
    Swal.fire('No se borro nada', '', 'info');
  }

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
          this.ngOnInit();
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

