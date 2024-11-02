import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BarraProgresoComponent } from '../../../shared/barra-progreso/barra-progreso.component';
import { ClienteService } from '../../../services/cliente.service';
import { ToastrService } from 'ngx-toastr';
import { ComunicacionService } from '../../../services/comunicacion.service';

@Component({
  selector: 'app-listado-cliente',
  standalone: true,
  imports: [NgFor, NgIf, RouterModule, BarraProgresoComponent],
  templateUrl: './listado-cliente.component.html',
  styleUrl: './listado-cliente.component.css'
})
export class ListadoClienteComponent implements OnInit{

  
  

  constructor(private clienteService: ClienteService, 
    private routes: Router,
    private toastr: ToastrService,
    private comunicacion: ComunicacionService
    ){};
  public listado : any [] = [];
  loading: boolean = false;

  
  ngOnInit(): void{
    this.cargarListado();
    this.comunicacion.refreshListado$.subscribe(()=>{
      this.cargarListado();
    });

  }

  cargarListado(){
    this.loading=true;
    this.clienteService.getObtenerTodo().subscribe(data => {
      this.listado = data;
      this.loading=false;
    })
  }

  delete(id: number){
    this.loading=true;
    this.clienteService.delete(id).subscribe(data => {
      this.cargarListado();
      this.toastr.warning('el cliente fue eliminado', 'cliente eliminado');
    })

  }
  navigateToDestination() {
    this.routes.navigate(['/agregarCliente']);
  }





}
