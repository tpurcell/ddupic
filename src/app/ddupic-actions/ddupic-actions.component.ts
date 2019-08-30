import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

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
  ) {
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.ddupic = JSON.parse(data.ddupicActionResolverService);
    });
  }
}
