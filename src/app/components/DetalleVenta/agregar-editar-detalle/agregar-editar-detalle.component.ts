import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DetalleVentaService } from '../../../services/detalle-venta.service';
import { ToastrService } from 'ngx-toastr';
import { detalle } from '../../../interfaces/detalle';

@Component({
  selector: 'app-agregar-editar-detalle',
  standalone: true,
  imports: [NgFor,NgIf, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './agregar-editar-detalle.component.html',
  styleUrl: './agregar-editar-detalle.component.css'
})
export class AgregarEditarDetalleComponent implements OnInit {

  
  form: FormGroup;
  id: number;
  operacion: string = 'agregar';


  constructor(private fb: FormBuilder, 
    private route: Router,
    private _detalleService: DetalleVentaService, 
    private aRouter: ActivatedRoute, 
    private toastr: ToastrService){


    this.form = this.fb.group({
      HuevoID: ['', Validators.required],
      cantidad: ['', Validators.required]


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
      this._detalleService.GetByID(id).subscribe((data: detalle) => {
        console.log(data);
        this.form.setValue({
          HuevoID: data.HuevoID,
          cantidad: data.cantidad
        })
      })
    }



  addTodo(){
    const detalle: detalle = {
      HuevoID: this.form.value.HuevoID,
      cantidad: this.form.value.cantidad
    }

    if(this.id !==0){
      //es editar
      this._detalleService.update(this.id, detalle).subscribe(() =>
      this.toastr.success('el detalle de venta fue corregido', 'detalle editado')
      
    
    
      )
    }else{
      //agregar
      this._detalleService.guardar(detalle).subscribe(() =>{
        console.log(detalle);
        this.toastr.success('el detalle de venta fue agregado con exito', 'detalle agregado')
      })
    }
    this.route.navigate(['listadoDetalle']);
    
  }




}
