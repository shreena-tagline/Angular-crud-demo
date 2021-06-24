import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  @Input() info
  @Input() clientStatus
  @Output() editClientInfo = new EventEmitter<any>()
  @Output() onChangeStatusInfo = new EventEmitter<any>()
  constructor() { }

  ngOnInit(): void { }

  onEdit(clientInfo) {
    this.editClientInfo.emit(clientInfo);
  }

  onChangeStatus(status, info) {
    const updatedObj = {
      clientName: info.clientName,
      status: status,
      id: info.id
    }
    this.onChangeStatusInfo.emit(updatedObj);
  }

}
