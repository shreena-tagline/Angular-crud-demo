import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './pages/client/client.component';

const routes: Routes = [
  {
    path: 'client', // child route path
    component: ClientComponent, // child route component that the router renders
  },
  { path: '', redirectTo: 'client', pathMatch: 'full' }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
