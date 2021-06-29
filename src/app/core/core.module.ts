import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientInfoService } from './services/client-info.service';
import { AuthenticationService } from './services/authentication.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    ClientInfoService,
    AuthenticationService
  ],
})
export class CoreModule { }
