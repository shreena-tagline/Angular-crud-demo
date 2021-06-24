import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { AddEditClientComponent } from './home/pages/add-edit-client/add-edit-client.component';
// import { ClientComponent } from './home/pages/client/client.component';

// const routes: Routes = [
//   {
//     path: 'client',
//     component: ClientComponent, // this is the component with the <router-outlet> in the template
//     children: [
//       {
//         path: 'add', // child route path
//         component: AddEditClientComponent, // child route component that the router renders
//       },
//       {
//         path: 'edit/:id',
//         component: AddEditClientComponent, // another child route component that the router renders
//       },
//     ],
//   },
//   { path: '',   redirectTo: '/client', pathMatch: 'full' }
// ];

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
