import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit { 

  constructor() { }

  ngOnInit(): void {
  }

  public get loggedIn(): boolean {
    return (localStorage.getItem('auth_token') !== null)
  }

  public get roleAdmin(): boolean {
    return (localStorage.getItem('role') === 'admin' )
  }

  public logout(): void{
    localStorage.removeItem('auth_token');
    localStorage.removeItem('role');
  }  
}
