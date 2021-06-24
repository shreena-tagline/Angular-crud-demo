import { Component, OnInit } from '@angular/core';
import { ClientInfo, Status } from 'src/app/core';
import { ClientInfoService } from 'src/app/core/services/client-info.service';

@Component({
  selector: 'app-add-edit-client',
  templateUrl: './add-edit-client.component.html',
  styleUrls: ['./add-edit-client.component.scss']
})
export class AddEditClientComponent implements OnInit {
  clientName: string
  selectedStatus: string
  selectedViewValue: string
  clientDetails: ClientInfo[] = []
  filterRefObj: ClientInfo[] = []
  clientStatus: Status[] = []
  editedObj: ClientInfo
  btnText: string = "Add"

  constructor(private clientInfoService: ClientInfoService) { }

  ngOnInit(): void {
    this.filterRefObj = this.clientInfoService.getClientInfo()
    this.clientDetails = this.clientInfoService.getClientInfo()
    this.clientStatus = this.clientInfoService.getClientStatus()
  }

  onAddClienName(e) {
    this.clientName = e
  }

  onSelectedStatus(e: any) {
    this.selectedStatus = e.value
    this.selectedViewValue = this.clientStatus.find(status => status.value === e.value)['viewValue']
  }

  onAddClientDetail() {
    const clientInfoObj: ClientInfo = {
      clientName: this.clientName,
      status: this.selectedViewValue,
      id: this.clientDetails.length + 1
    }
    if (!this.editedObj) {
      this.clientDetails.push(clientInfoObj)
      this.resetInfo()
    } else {
      delete clientInfoObj["id"]
      this.updateClientInfo(clientInfoObj, this.editedObj.id)
      this.resetInfo()
    }
  }

  resetInfo() {
    this.clientName = ''
    this.selectedStatus = ''
    this.selectedViewValue = ''
  }

  onEditClientInfo(info: ClientInfo) {
    this.btnText = 'Update'
    this.editedObj = info
    this.clientName = info.clientName
    const statusValue = this.clientStatus.find(status => status.viewValue === info.status)['value']
    this.selectedStatus = statusValue
    this.selectedViewValue = info.status
  }

  onChangeStatusInfo(info: ClientInfo) {
    this.updateClientInfo(info)
  }

  updateClientInfo(editedObj, id?) {
    if (id) {
      const matchObjIndex = this.clientDetails.findIndex(obj => obj.id === id)
      this.clientDetails[matchObjIndex] = Object.assign(editedObj, { id: id })
    } else {
      const matchObjIndex = this.clientDetails.findIndex(obj => obj.id === editedObj.id)
      this.clientDetails[matchObjIndex] = Object.assign(editedObj)
    }
  }

  onSearch() {
    let filterObj: ClientInfo[]

    if (this.clientName && this.selectedViewValue) {
      console.log('onSearch======>called');
      const inputedClientName = this.clientName.toLocaleLowerCase().trim()
      filterObj = this.filterRefObj.filter(obj => {
        if (obj.clientName.toLocaleLowerCase().includes(inputedClientName) && obj.status.includes(this.selectedViewValue)) {
          return obj
        } else {
        }
      })
    } else if (this.clientName) {
      const inputedClientName = this.clientName.toLocaleLowerCase().trim()
      filterObj = this.filterBySearch('clientName', inputedClientName)
    } else if (this.selectedViewValue) {
      filterObj = this.filterBySearch('status', this.selectedViewValue)
    } else {
      filterObj = this.filterRefObj
    }
    this.clientDetails = filterObj
    console.log('filterObj', filterObj)

  }

  filterBySearch(keyName: string, searchValue: string) {
    return this.filterRefObj.filter(obj => {
      console.log('obj[keyName]', obj[keyName]);
      return keyName === 'clientName' ? obj[keyName].toLocaleLowerCase().includes(searchValue) : obj[keyName].includes(searchValue)
    })
  }

}
