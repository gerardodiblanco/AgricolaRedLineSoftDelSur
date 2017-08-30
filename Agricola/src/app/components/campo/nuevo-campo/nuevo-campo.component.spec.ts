import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoCampoComponent } from './nuevo-campo.component';

describe('NuevoCampoComponent', () => {
  let component: NuevoCampoComponent;
  let fixture: ComponentFixture<NuevoCampoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoCampoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoCampoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
