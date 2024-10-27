import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { GallinasService } from '../../../services/gallinas-service.service';
import { ToastrService } from 'ngx-toastr';
import { gallina } from '../../../interfaces/gallinas';

@Component({
  selector: 'app-agregar-editar-gallinas',
  standalone: true,
  imports: [NgFor,NgIf, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './agregar-editar-gallinas.component.html',
  styleUrl: './agregar-editar-gallinas.component.css'
})
export class AgregarEditarGallinasComponent implements OnInit{
  
  
  form: FormGroup;
  id: number;
  operacion: string = 'agregar';


  constructor(private fb: FormBuilder, 
    private route: Router,
    private _gallinasService:GallinasService, 
    private aRouter: ActivatedRoute, 
    private toastr: ToastrService){


    this.form = this.fb.group({
      Nombre: ['', Validators.required],
      GaleraID: ['', Validators.required],
      FechaNacimiento: ['', Validators.required],
      FechaLlegada: ['', Validators.required]


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
      this._gallinasService.GetByID(id).subscribe((data: gallina) => {
        this.form.setValue({
          Nombre: data.Nombre,
          GaleraID: data.GaleraID,
          FechaNacimiento: data.FechaNacimiento,
          FechaLlegada: data.FechaLlegada
        })
      })
    }



  addTodo(){
    const gallina: gallina = {
      Nombre: this.form.value.Nombre,
          GaleraID: this.form.value.GaleraID,
          FechaNacimiento: new Date(this.form.value.FechaNacimiento),
          FechaLlegada: new Date(this.form.value.FechaLlegada)
    }

    if(this.id !==0){
      //es editar
      this._gallinasService.update(this.id, gallina).subscribe(() =>
      this.toastr.success('los datos de la gallina fueron corregidos', 'gallina editado')
      
    
    
      )
    }else{
      //agregar
      this._gallinasService.guardar(gallina).subscribe(() =>{
        console.log(gallina);
        this.toastr.success('la gallina fue agregado con exito', 'gallina agregado')
      })
    }
    this.route.navigate(['listadoGallina']);
    
  }





}
