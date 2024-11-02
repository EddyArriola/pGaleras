import { Component, OnInit } from '@angular/core';
import { VentasService } from '../../../services/ventas.service';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgFor, NgIf } from '@angular/common';
import { BarraProgresoComponent } from '../../../shared/barra-progreso/barra-progreso.component';
import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { ComunicacionService } from '../../../services/comunicacion.service';

@Component({
  selector: 'app-listado-ventas',
  standalone: true,
  imports: [NgFor, NgIf, RouterModule, BarraProgresoComponent],
  providers:[{provide: DATE_PIPE_DEFAULT_OPTIONS, useValue:{dateformat:"longDate"}}],
  templateUrl: './listado-ventas.component.html',
  styleUrl: './listado-ventas.component.css'
})
export class ListadoVentasComponent implements OnInit {

  

  constructor(private VentasService: VentasService,
  private routes: Router, 
  private toastr: ToastrService,
  private comunicacion: ComunicacionService ){};
  public listadoVenta : any [] = [];
  loading: boolean = false;

  
  ngOnInit(): void{
    this.cargarListado();
    this.comunicacion.refreshListado$.subscribe(()=>{
      this.cargarListado();
    });

  }

  cargarListado(){
    this.loading=true;
    this.VentasService.getObtenerTodo().subscribe(data => {
      this.listadoVenta = data;
      this.loading=false;
    })
  }

  delete(id: number){
    this.loading=true;
    this.VentasService.delete(id).subscribe(data => {
      this.cargarListado();
      this.toastr.warning('la venta fue eliminada', 'venta eliminada');
    })

  }
  navigateToDestination() {
    this.routes.navigate(['/agregarVenta']);
  }



}
