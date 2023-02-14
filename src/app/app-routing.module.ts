import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      useHash: true, // <- Indicar que se use el hash
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
