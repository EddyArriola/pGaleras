import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { VentasService } from '../../../services/ventas.service';
import { ToastrService } from 'ngx-toastr';
import { venta } from '../../../interfaces/venta';

@Component({
  selector: 'app-agregar-editar-ventas',
  standalone: true,
  imports: [NgFor,NgIf, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './agregar-editar-ventas.component.html',
  styleUrl: './agregar-editar-ventas.component.css'
})
export class AgregarEditarVentasComponent {


  
  form: FormGroup;
  id: number;
  operacion: string = 'agregar';


  constructor(private fb: FormBuilder, 
    private route: Router,
    private _VentasService: VentasService, 
    private aRouter: ActivatedRoute, 
    private toastr: ToastrService){


    this.form = this.fb.group({
      ClienteID: ['', Validators.required],
      DetalleID: ['', Validators.required]


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
      this._VentasService.GetByID(id).subscribe((data: venta) => {
        console.log(data);
        this.form.setValue({
          ClienteID: data.ClienteID,
          DetalleID: data.DetalleID
        })
      })
    }



  addTodo(){
    const Venta: venta = {
      ClienteID: this.form.value.ClienteID,
      FechaVenta: new Date(),
      DetalleID: this.form.value.DetalleID
    }

    if(this.id !==0){
      //es editar
      this._VentasService.update(this.id, Venta).subscribe(() =>
      this.toastr.success('la venta fue corregida', 'venta editada')
      
    
    
      )
    }else{
      //agregar
      this._VentasService.guardar(Venta).subscribe(() =>{
        console.log(Venta);
        this.toastr.success('la Venta fue agregado con exito', 'Venta agregado')
      })
    }
    this.route.navigate(['listadoVenta']);
    
  }





}
