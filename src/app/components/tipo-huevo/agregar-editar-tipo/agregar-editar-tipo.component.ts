import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TipoHuevoService } from '../../../services/tipo-huevo.service';
import { ToastrService } from 'ngx-toastr';
import { TipoHuevo } from '../../../interfaces/tipoHuevo';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-agregar-editar-tipo',
  standalone: true,
  imports: [NgFor,NgIf, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './agregar-editar-tipo.component.html',
  styleUrl: './agregar-editar-tipo.component.css'
})
export class AgregarEditarTipoComponent implements OnInit {
  
  form: FormGroup;
  id: number;
  operacion: string = 'agregar';


  constructor(private fb: FormBuilder, 
    private route: Router,
    private _TipoService:TipoHuevoService, 
    private aRouter: ActivatedRoute, 
    private toastr: ToastrService){


    this.form = this.fb.group({
      Nombre: ['', Validators.required],
      Precio: ['', Validators.required],
      Descripcion: ['', Validators.required]


    })
    this.id = Number(this.aRouter.snapshot.paramMap.get('id'));
  }
    ngOnInit(): void {
      if(this.id != 0){
        this.operacion= 'editar';
        this.getTodo(this.id);
        
      }
    }

    getTodo(id:number){
      this._TipoService.GetByID(id).subscribe((data: TipoHuevo) => {
        console.log(data);
        this.form.setValue({
          Nombre: data.Nombre,
          Precio: data.Precio,
          Descripcion: data.Descripcion
        })
      })
    }



  addTodo(){
    const TipoHuevo: TipoHuevo = {
      Nombre: this.form.value.Nombre,
      Precio: this.form.value.Precio,
      Descripcion: this.form.value.Descripcion
    }

    if(this.id !==0){
      //es editar
      this._TipoService.update(this.id, TipoHuevo).subscribe(() =>
      this.toastr.success('el tipo fue corregido', 'Tipo de huevo editado')
      
    
    
      )
    }else{
      //agregar
      this._TipoService.guardar(TipoHuevo).subscribe(() =>{
        console.log(TipoHuevo);
        this.toastr.success('el tipo de huevo fue agregado con exito', 'TipoHuevo agregado')
      })
    }
    this.route.navigate(['listadoTipoHuevo']);
    
  }



}
