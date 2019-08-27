import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';

import {DdupicService} from '../ddupic.service';
import {Ddupic} from '../ddupic';


@Component({
  selector: 'app-new-ddupic',
  templateUrl: './new-ddupic.component.html',
  styleUrls: ['./new-ddupic.component.css']
})
export class NewDdupicComponent implements OnInit {
  ddupic: Ddupic;
  newDdupicForm;

  constructor(
    private ddupicService: DdupicService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.newDdupicForm = this.formBuilder.group({
      ddupicName: ``,
      ddupicPath: ``
    });
  }

  ngOnInit() {
  }

  onSubmit(ddupicData) {
    this.ddupicService.runDdupic(ddupicData.ddupicName, ddupicData.ddupicPath);
    this.router.navigateByUrl('');
  }
}
