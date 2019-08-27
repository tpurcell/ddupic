import {Component, OnInit} from '@angular/core';

import {DdupicService} from '../ddupic.service';

@Component({
  selector: 'app-list-ddupics',
  templateUrl: './list-ddupics.component.html',
  styleUrls: ['./list-ddupics.component.css']
})
export class ListDdupicsComponent implements OnInit {
  ddupics;

  constructor(
    private ddupicService: DdupicService,
  ) {
  }

  async ngOnInit() {
    this.ddupics = await this.ddupicService.listDdupics();
  }

}
