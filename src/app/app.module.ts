import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthGuard } from '../app/guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { InicioComponent } from './inicio/inicio.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ContenidoComponent } from './contenido/contenido.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PublicacionComponent } from './admin/publicacion/publicacion.component';
import { ProductosComponent } from './admin/productos/productos.component';
import { HomeComponent } from './admin/home/home.component';
import { HomeProductosComponent } from './admin/home-productos/home-productos.component';
import { UpdateProductosComponent } from './admin/update-productos/update-productos.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent}, 
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'admin/home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'admin/productos', component: ProductosComponent, canActivate: [AuthGuard]},
  { path: 'admin/publicacion', component: PublicacionComponent, canActivate: [AuthGuard]},
  { path: 'admin/home-productos', component: HomeProductosComponent, canActivate: [AuthGuard]},
  { path: 'admin/update-productos/:id', component: UpdateProductosComponent, canActivate: [AuthGuard]},
  { path: '**', redirectTo: '/inicio', pathMatch: 'full' },
  
]


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    InicioComponent,
    HeaderComponent,
    FooterComponent,
    ContenidoComponent,
    SidebarComponent,
    PublicacionComponent,
    ProductosComponent,
    HomeComponent,
    HomeProductosComponent,
    UpdateProductosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
