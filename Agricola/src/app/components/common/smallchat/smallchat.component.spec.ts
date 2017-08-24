import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallchatComponent } from './smallchat.component';

describe('SmallchatComponent', () => {
  let component: SmallchatComponent;
  let fixture: ComponentFixture<SmallchatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmallchatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmallchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
