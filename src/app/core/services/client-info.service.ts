import { Injectable } from '@angular/core';
import { ClientInfo, Status } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ClientInfoService {
  clientDetails:ClientInfo[] = [
    { clientName: 'jhon',
      status: 'I am avilable',
      id: 1
    },
    { clientName: 'Deo',
      status: 'I am not avilable',
      id: 2
    },
  ]


  status: Status[] = [
    {value: '0', viewValue: 'I am avilable'},
    {value: '1', viewValue: 'I am not avilable'},
    {value: '2', viewValue: 'I am in meeting'}
  ];
  constructor() { }

  getClientInfo(){
    return this.clientDetails
  }

  getClientStatus(){
    return this.status
  }
}
