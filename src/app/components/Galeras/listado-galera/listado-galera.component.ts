import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BarraProgresoComponent } from '../../../shared/barra-progreso/barra-progreso.component';
import { GaleraService } from '../../../services/galera.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listado-galera',
  standalone: true,
  imports: [NgFor, NgIf, RouterModule, BarraProgresoComponent],
  templateUrl: './listado-galera.component.html',
  styleUrl: './listado-galera.component.css'
})
export class ListadoGaleraComponent implements OnInit{


  

  constructor(private GaleraService: GaleraService, private routes: Router, private toastr: ToastrService ){};
  public listado : any [] = [];
  loading: boolean = false;

  
  ngOnInit(): void{
    this.cargarListado();

  }

  cargarListado(){
    this.loading=true;
    this.GaleraService.getObtenerTodo().subscribe(data => {
      this.listado = data;
      this.loading=false;
    })
  }

  delete(id: number){
    this.loading=true;
    this.GaleraService.delete(id).subscribe(data => {
      this.cargarListado();
      this.toastr.warning('la galera fue eliminada', 'galera eliminado');
    })

  }
  navigateToDestination() {
    this.routes.navigate(['/agregarGalera']);
  }




}
