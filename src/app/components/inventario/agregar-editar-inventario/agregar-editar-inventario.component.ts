import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Inventario } from '../../../interfaces/inventario';
import { InventarioService } from '../../../services/inventario.service';
import { ToastrService } from 'ngx-toastr';
import { ComunicacionService } from '../../../services/comunicacion.service';

@Component({
  selector: 'app-agregar-editar-inventario',
  standalone: true,
  imports: [NgFor,NgIf, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './agregar-editar-inventario.component.html',
  styleUrl: './agregar-editar-inventario.component.css'
})
export class AgregarEditarInventarioComponent implements OnInit {
  form: FormGroup;
  id: number;
  operacion: string = 'agregar';


  constructor(private fb: FormBuilder, 
    private route: Router,
    private _inventarioService:InventarioService, 
    private aRouter: ActivatedRoute, 
    private comunicacion: ComunicacionService,
    private toastr: ToastrService){


    this.form = this.fb.group({
      Nombre: ['', Validators.required],
      HuevoID: ['', Validators.required],
      Existencias: ['', Validators.required]


    })
    this.id = Number(this.aRouter.snapshot.paramMap.get('id'));
  }
    ngOnInit(): void {
      if(this.id != 0){
        this.operacion= 'editarInventario';
        this.getInventario(this.id);
        
      }
    }

    getInventario(id:number){
      this._inventarioService.GetInventarioID(id).subscribe((data: Inventario) => {
        console.log(data);
        this.form.setValue({
          Nombre: data.Nombre,
          HuevoID: data.HuevoID,
          Existencias: data.Existencias
        })
      })
    }



  addInventario(){
    const inventario: Inventario = {
      Nombre: this.form.value.Nombre,
      HuevoID: this.form.value.HuevoID,
      Existencias: this.form.value.Existencias
    }

    if(this.id !==0){
      //es editar
      this._inventarioService.updateInventario(this.id, inventario).subscribe(() =>{
        console.log(inventario);
        this.toastr.success('el inventario fue corregido', 'inventario editado');
        this.comunicacion.triggerRefresh();
        }
      )
    }else{
      //agregar
      this._inventarioService.guardarProducto(inventario).subscribe(() =>{
        console.log(inventario);
        this.toastr.success('el inventario fue agregado con exito', 'inventario agregado');
        this.comunicacion.triggerRefresh();
      })
    }
    this.route.navigate(['/listadoInventario']);
    
  }

}
