import { Component, OnInit } from '@angular/core';
import { User } from '../contenido/class/user';
import Swal from 'sweetalert2';
import { LoginService } from '../services/login.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user: User = new User()
  public errores: string[];
  constructor(
    private loginService: LoginService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
      localStorage.removeItem('auth_token');
     }

  ngOnInit(): void {
    
  }

  public login(): void{
    this.loginService.login(this.user)
      .subscribe(resp => {
        localStorage.setItem('auth_token', resp.token);
        localStorage.setItem('role', resp.rol);
        Swal.fire('Bienvenido', resp.message, 'success');
        this.router.navigate(['/inicio']);
      },
        err => {
          Swal.fire({
            title: 'Error',
            text: `${err.error.message}`,
            icon: 'warning',
            confirmButtonColor: '#4CAF50',
          })
        }
      );
  }
}
