import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ClientInfo } from 'src/app/core';
import { ClientInfoService } from 'src/app/core/services/client-info.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  searchValue = {}

  @Input() info
  @Input() clientStatus
  @Output() onChangeStatusInfo = new EventEmitter<any>()

  clientDetails: ClientInfo[] = []
  constructor(private clientInfoService: ClientInfoService) { }

  ngOnInit(): void {
    this.clientDetails = this.clientInfoService.getClientInfo()
    this.clientStatus = this.clientInfoService.getClientStatus()


    this.clientInfoService.onSearch.subscribe(searchObj => {
      this.searchValue = searchObj
    })
  }

  onEdit(clientInfo) {
    this.clientInfoService.editClientInfo.emit(clientInfo);
  }
  onDelete(id) {
    this.clientInfoService.deleteClientInfo.emit(id);
  }

  onChangeStatus(status, info) {
    const updatedObj = {
      clientName: info.clientName,
      status: status,
      id: info.id
    }
    this.clientInfoService.onChangeStatusInfo.emit(updatedObj);
  }


}