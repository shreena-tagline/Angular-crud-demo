import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientInfo, Status } from 'src/app/core';
import { ClientInfoService } from 'src/app/core/services/client-info.service';

@Component({
  selector: 'app-add-edit-client',
  templateUrl: './add-edit-client.component.html',
  styleUrls: ['./add-edit-client.component.scss']
})
export class AddEditClientComponent implements OnInit {
  clientInfoForm!: FormGroup
  selectedStatus: string
  selectedViewValue: string
  clientDetails: ClientInfo[] = []
  clientStatus: Status[] = []
  editedObj: ClientInfo
  btnText: string = "Add"

  constructor(private clientInfoService: ClientInfoService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.clientDetails = this.clientInfoService.getClientInfo()
    this.clientStatus = this.clientInfoService.getClientStatus()


    this.clientInfoService.editClientInfo
      .subscribe(
        (editedObj: ClientInfo) => {
          this.btnText = 'Update'
          this.editedObj = editedObj
          const statusValue = this.clientStatus.find(status => status.viewValue === editedObj.status)['value']
          const editedPatchObj = {
            clientName: editedObj.clientName,
            status: statusValue
          }
          this.clientInfoForm.patchValue(editedPatchObj)
          this.selectedViewValue = editedObj.status
        }
      );

    this.clientInfoService.onChangeStatusInfo.subscribe(updatedObj => {
      this.updateClientInfo(updatedObj)
    })

    this.clientInfoService.deleteClientInfo.subscribe(id => {
      this.clientDetails.splice(this.clientDetails.findIndex(a => a.id === id), 1)
    })

    this.clientInfoForm = this.formBuilder.group({
      clientName: ['', Validators.required],
      status: ['', Validators.required],
    });

  }

  onSubmitClientDetail() {
    const clientInfoObj: ClientInfo = this.clientInfoForm.value
    const matchStatusObj = this.clientStatus.find(status => status.value === clientInfoObj.status)
    if (matchStatusObj) {
      clientInfoObj["status"] = matchStatusObj.viewValue
    }
    if (!this.editedObj) {
      clientInfoObj['id'] = this.clientDetails.length + 1
      this.clientDetails.push(clientInfoObj)
      this.resetInfo()
    } else {
      this.updateClientInfo(clientInfoObj, this.editedObj.id)
      this.resetInfo()
    }
  }

  resetInfo() {
    this.clientInfoForm.controls['clientName'].reset()
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
    const formValue = this.clientInfoForm.value
    if (formValue.status) {
      const searchStatus = this.clientStatus.find(status => status.value === formValue.status)['viewValue']
      const searchObj = {
        clientName: formValue.clientName,
        status: searchStatus
      }
      this.clientInfoService.onSearch.emit(searchObj);
    } else {
      this.clientInfoService.onSearch.emit(formValue);
    }

  }

}
