import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {DdupicService} from '../ddupic.service';

@Component({
  selector: 'app-new-ddupic',
  templateUrl: './new-ddupic.component.html',
  styleUrls: ['./new-ddupic.component.css']
})
export class NewDdupicComponent implements OnInit {
  newDdupicForm = this.formBuilder.group({
    ddupicName: ['', Validators.required],
  });
  ddupicPath = '';

  constructor(
    private ddupicService: DdupicService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
  }

  ngOnInit() {
  }

  async onSelect() {
    this.ddupicPath = await this.ddupicService.selectDirectory();
    console.warn(this.ddupicPath);
  }

  async onSubmit() {
    const name = this.newDdupicForm.value.ddupicName;
    await this.ddupicService.runDdupic(name, this.ddupicPath);
    await this.router.navigateByUrl('');
  }

  formValid() {
    return this.ddupicPath && this.newDdupicForm.valid;
  }
}
