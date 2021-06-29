import { Injectable, Output, EventEmitter } from '@angular/core';
import { ClientInfo, Status } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ClientInfoService {
  editClientInfo = new EventEmitter<ClientInfo>();
  deleteClientInfo = new EventEmitter<number>();
  onChangeStatusInfo = new EventEmitter<ClientInfo>();
  onSearch = new EventEmitter<any>();
  clientDetails: ClientInfo[] = [
    {
      clientName: 'jhon',
      status: 'I am available',
      id: 1
    },
    {
      clientName: 'Deo',
      status: 'I am available but not present',
      id: 2
    },
  ]

  status: Status[] = [
    { value: '0', viewValue: 'I am available' },
    { value: '1', viewValue: 'I am available but not present' },
    { value: '2', viewValue: 'I am in meeting' }
  ];



  constructor() { }

  getClientInfo() {
    return this.clientDetails
  }

  getClientStatus() {
    return this.status
  }
}
