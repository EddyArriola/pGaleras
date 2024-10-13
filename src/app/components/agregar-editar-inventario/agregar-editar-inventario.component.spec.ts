import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEditarInventarioComponent } from './agregar-editar-inventario.component';

describe('AgregarEditarInventarioComponent', () => {
  let component: AgregarEditarInventarioComponent;
  let fixture: ComponentFixture<AgregarEditarInventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarEditarInventarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarEditarInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
