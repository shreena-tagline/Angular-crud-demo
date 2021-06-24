import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './pages/client/client.component';
import { AddEditClientComponent } from './pages/add-edit-client/add-edit-client.component';

const routes: Routes = [
  // {
  //   path: 'client',
  //   component: ClientComponent, // this is the component with the <router-outlet> in the template
  // },
  {
    path: 'add', // child route path
    component: AddEditClientComponent, // child route component that the router renders
  },
  {
    path: 'edit/:id',
    component: AddEditClientComponent, // another child route component that the router renders
  },
  { path: '',   redirectTo: 'add', pathMatch: 'full' }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
