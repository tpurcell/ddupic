import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NewDdupicComponent} from './new-ddupic.component';

describe('NewDdupicComponent', () => {
  let component: NewDdupicComponent;
  let fixture: ComponentFixture<NewDdupicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewDdupicComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDdupicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
