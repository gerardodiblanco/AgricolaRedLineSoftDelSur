import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoAtributoComponent } from './nuevo-atributo.component';

describe('NuevoAtributoComponent', () => {
  let component: NuevoAtributoComponent;
  let fixture: ComponentFixture<NuevoAtributoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoAtributoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoAtributoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
