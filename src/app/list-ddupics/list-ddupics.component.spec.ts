import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ListDdupicsComponent} from './list-ddupics.component';

describe('ListDdupicsComponent', () => {
  let component: ListDdupicsComponent;
  let fixture: ComponentFixture<ListDdupicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListDdupicsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDdupicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
