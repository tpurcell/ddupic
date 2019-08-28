import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-ddupic-actions',
  templateUrl: './ddupic-actions.component.html',
  styleUrls: ['./ddupic-actions.component.css']
})
export class DdupicActionsComponent implements OnInit {
  ddupic;

  constructor(
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.ddupic = params.get('ddupic');
      console.warn(`#### action: ${this.ddupic}`);
    });
  }

}
