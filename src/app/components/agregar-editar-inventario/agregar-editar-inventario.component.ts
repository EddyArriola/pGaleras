import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-agregar-editar-inventario',
  standalone: true,
  imports: [NgFor, RouterModule, ReactiveFormsModule],
  templateUrl: './agregar-editar-inventario.component.html',
  styleUrl: './agregar-editar-inventario.component.css'
})
export class AgregarEditarInventarioComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder){
    this.form = this.fb.group({
      name: ['', Validators.required],
      FechaIngreso: ['', Validators.required],
      FechaVenta: ['', Validators.required],
      CantidadIngreso: ['', Validators.required],
      CantidadVenta: ['', Validators.required],
      Existencias: ['', Validators.required],
      HuevosProduccion: [null, Validators]


    })
  }
    ngOnInit(): void {
      this.addInventario();
    }



  addInventario(){
    console.log('add inventario');
  }

}
