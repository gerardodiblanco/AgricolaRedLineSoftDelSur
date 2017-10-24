import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaOpcionComponent } from './nueva-opcion.component';

describe('NuevaOpcionComponent', () => {
  let component: NuevaOpcionComponent;
  let fixture: ComponentFixture<NuevaOpcionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevaOpcionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaOpcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
