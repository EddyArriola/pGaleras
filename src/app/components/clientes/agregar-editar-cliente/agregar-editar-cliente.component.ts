import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ClienteService } from '../../../services/cliente.service';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from '../../../interfaces/cliente';
import { ComunicacionService } from '../../../services/comunicacion.service';

@Component({
  selector: 'app-agregar-editar-cliente',
  standalone: true,
  imports: [NgFor,NgIf, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './agregar-editar-cliente.component.html',
  styleUrl: './agregar-editar-cliente.component.css'
})
export class AgregarEditarClienteComponent implements OnInit{

  
  form: FormGroup;
  id: number;
  operacion: string = 'agregar';


  constructor(private fb: FormBuilder, 
    private route: Router,
    private _clienteService:ClienteService, 
    private aRouter: ActivatedRoute, 
    private comunicacion: ComunicacionService,
    private toastr: ToastrService){


    this.form = this.fb.group({
      Nombre: ['', Validators.required],
      Apellidos: ['', Validators.required],
      Direccion: ['', Validators.required],
      Email: ['', Validators.required],
      Telefono: ['', Validators.required]


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
      this._clienteService.GetByID(id).subscribe((data: Cliente) => {
        this.form.setValue({
          Nombre: data.Nombre,
          Apellidos: data.Apellidos,
          Direccion: data.Direccion,
          Email: data.Email,
          Telefono: data.Telefono
        })
      })
    }



  addTodo(){
    const Cliente: Cliente = {
      Nombre: this.form.value.Nombre,
      Apellidos: this.form.value.Apellidos,
      Direccion: this.form.value.Direccion,
      Email: this.form.value.Email,
      Telefono: this.form.value.Telefono,
    }

    if(this.id !==0){
      //es editar
      this._clienteService.update(this.id, Cliente).subscribe(() =>{
        this.toastr.success('el cliente fue corregido', 'cliente editado')
        this.comunicacion.triggerRefresh();
      }
      
      
    
    
      )
    }else{
      //agregar
      this._clienteService.guardar(Cliente).subscribe(() =>{
        this.toastr.success('el cliente fue agregado con exito', 'cliente agregado');
        this.comunicacion.triggerRefresh();
      })
    }
    this.route.navigate(['listadoCliente']);
    
  }




}
