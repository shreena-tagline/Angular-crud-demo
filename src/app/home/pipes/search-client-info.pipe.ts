import { Pipe, PipeTransform } from '@angular/core';
import { ClientInfo } from 'src/app/core';

@Pipe({
  name: 'searchClientInfo'
})
export class SearchClientInfoPipe implements PipeTransform {

  transform(clientInfoArray: ClientInfo[], searchValue: any): unknown {
    let filterObj: ClientInfo[]
    if (searchValue.clientName && searchValue.status) {
      const inputtedClientName = searchValue.clientName.toLocaleLowerCase().trim()

      filterObj = clientInfoArray.filter(obj => {
        if (obj.clientName.toLocaleLowerCase().includes(inputtedClientName) && obj.status.includes(searchValue.status)) {
          return obj
        } else {
        }
      })
    } else if (searchValue.clientName) {
      const inputtedClientName = searchValue.clientName.toLocaleLowerCase().trim()
      filterObj = this.filterBySearch(clientInfoArray, 'clientName', inputtedClientName)
    } else if (searchValue.status) {
      filterObj = this.filterBySearch(clientInfoArray, 'status', searchValue.status)
    } else {
      filterObj = clientInfoArray
    }
    return filterObj;
  }
  filterBySearch(clientInfoArray, keyName: string, searchValue: string) {
    return clientInfoArray.filter(obj => {
      return keyName === 'clientName' ? obj[keyName].toLocaleLowerCase().includes(searchValue) : obj[keyName].includes(searchValue)
    })
  }
}
