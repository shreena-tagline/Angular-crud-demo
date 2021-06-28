// import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ClientInfo } from 'src/app/core';
import { ClientInfoService } from 'src/app/core/services/client-info.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {

  }

}
