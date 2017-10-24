import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcionesAtributoComponent } from './opciones-atributo.component';

describe('OpcionesAtributoComponent', () => {
  let component: OpcionesAtributoComponent;
  let fixture: ComponentFixture<OpcionesAtributoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpcionesAtributoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpcionesAtributoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
