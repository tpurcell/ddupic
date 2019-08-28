import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DdupicActionsComponent} from './ddupic-actions.component';

describe('DdupicActionsComponent', () => {
  let component: DdupicActionsComponent;
  let fixture: ComponentFixture<DdupicActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DdupicActionsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DdupicActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
