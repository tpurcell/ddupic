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
  ddupicPath;
  needPath;

  constructor(
    private ddupicService: DdupicService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.newDdupicForm = this.formBuilder.group({
      ddupicName: ``
    });
  }

  ngOnInit() {
    this.needPath = true;
  }

  async onSelect() {
    this.ddupicPath = await this.ddupicService.selectDirectory();
    this.needPath = false;
  }

  async onSubmit(ddupicName) {
    await this.ddupicService.runDdupic(ddupicName, this.ddupicPath);
    await this.router.navigateByUrl('');
  }

}
