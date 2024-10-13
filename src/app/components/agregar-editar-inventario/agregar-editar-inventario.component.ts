import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Inventario } from '../../interfaces/inventario';
import { InventarioService } from '../../services/inventario.service';

@Component({
  selector: 'app-agregar-editar-inventario',
  standalone: true,
  imports: [NgFor, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './agregar-editar-inventario.component.html',
  styleUrl: './agregar-editar-inventario.component.css'
})
export class AgregarEditarInventarioComponent implements OnInit {
  form: FormGroup;
  id: number;
  operacion: string = 'agregar';


  constructor(private fb: FormBuilder, private _inventarioService:InventarioService, private aRouter: ActivatedRoute){


    this.form = this.fb.group({
      FechaIngreso: ['', Validators.required],
      FechaVenta: ['', Validators.required],
      CantidadIngreso: ['', Validators.required],
      CantidadVenta: ['', Validators.required],
      existencias: ['', Validators.required]


    })
    this.id = Number(this.aRouter.snapshot.paramMap.get('id'));
  }
    ngOnInit(): void {
      if(this.id != 0){
        this.operacion= 'editar';
        this.getInventario(this.id);
        
      }
    }

    getInventario(id:number){
      this._inventarioService.GetInventarioID(id).subscribe((data: Inventario) => {
        console.log(data);
        this.form.setValue({
          FechaIngreso: data.FechaIngreso,
          FechaVenta: data.FechaVenta,
          CantidadIngreso: data.CantidadIngreso,
          CantidadVenta: data.CantidadVenta,
          existencias: data.Existencias
        })
      })
    }



  addInventario(){
    const inventario: Inventario = {
      FechaIngreso: this.form.value.FechaIngreso,
      FechaVenta: this.form.value.FechaVenta,
      CantidadIngreso: this.form.value.CantidadIngreso,
      CantidadVenta: this.form.value.CantidadVenta,
      Existencias: this.form.value.existencias
    }

    if(this.id !==0){
      //es editar
      this._inventarioService.updateInventario(this.id, inventario).subscribe(() =>
        console.log('inventario actualizado')
    
    
      )
    }else{
      //agregar
      this._inventarioService.guardarProducto(inventario).subscribe(() =>{
        console.log(inventario);
      })
    }
    
  }

}
