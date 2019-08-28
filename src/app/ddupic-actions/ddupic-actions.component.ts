import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {DdupicService} from '../ddupic.service';
import {Ddupic} from '../ddupic';

@Component({
  selector: 'app-ddupic-actions',
  templateUrl: './ddupic-actions.component.html',
  styleUrls: ['./ddupic-actions.component.css']
})
export class DdupicActionsComponent implements OnInit {
  ddupicName = '';
  ddupic: Ddupic;

  constructor(
    private route: ActivatedRoute,
    private ddupicService: DdupicService,
  ) {
    this.route.paramMap.subscribe(params => {
      this.ddupicName = params.get('ddupicName');
      console.warn(`#### action: ${this.ddupicName}`);
    });
    this.ddupicService.readDdupic(this.ddupicName).then(readDdupic => {
      this.ddupic = JSON.parse(readDdupic);
      console.warn(`#### got: ${JSON.stringify(this.ddupic)}`);
    });
  }

  async ngOnInit() {
  }

}
