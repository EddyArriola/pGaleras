import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { GaleraService } from '../../../services/galera.service';
import { ToastrService } from 'ngx-toastr';
import { galera } from '../../../interfaces/galera';
import { ComunicacionService } from '../../../services/comunicacion.service';

@Component({
  selector: 'app-agregar-editar-galera',
  standalone: true,
  imports: [NgFor,NgIf, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './agregar-editar-galera.component.html',
  styleUrl: './agregar-editar-galera.component.css'
})
export class AgregarEditarGaleraComponent implements OnInit {

  
  
  form: FormGroup;
  id: number;
  operacion: string = 'agregar';


  constructor(private fb: FormBuilder, 
    private route: Router,
    private _galeraService:GaleraService, 
    private aRouter: ActivatedRoute, 
    private comunicacion: ComunicacionService,
    private toastr: ToastrService){


    this.form = this.fb.group({
      Nombre: ['', Validators.required],
      Capacidad: ['', Validators.required],
      Cantidad: ['', Validators.required],


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
      this._galeraService.GetByID(id).subscribe((data: galera) => {
        this.form.setValue({
          Nombre: data.Nombre,
          Capacidad: data.Capacidad,
          Cantidad: data.Cantidad
        })
      })
    }



  addTodo(){
    const galera: galera = {
          Nombre: this.form.value.Nombre,
          Capacidad: this.form.value.Capacidad,
          Cantidad: this.form.value.Cantidad
    }

    if(this.id !==0){
      //es editar
      this._galeraService.update(this.id, galera).subscribe(() =>{
      this.toastr.success('los datos de la galera fueron corregidos', 'galera editado');
      this.comunicacion.triggerRefresh();
      }
    
      )
    }else{
      //agregar
      this._galeraService.guardar(galera).subscribe(() =>{
        console.log(galera);
        this.toastr.success('la galera fue agregado con exito', 'galera agregado');
        this.comunicacion.triggerRefresh();
      })
    }
    this.route.navigate(['listadoGalera']);
    
  }






}
