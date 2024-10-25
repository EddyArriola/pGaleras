import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DetalleVentaService } from '../../../services/detalle-venta.service';
import { Router, RouterModule } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { BarraProgresoComponent } from '../../../shared/barra-progreso/barra-progreso.component';

@Component({
  selector: 'app-listado-detalle',
  standalone: true,
  imports: [NgFor, NgIf, RouterModule, BarraProgresoComponent],
  templateUrl: './listado-detalle.component.html',
  styleUrl: './listado-detalle.component.css'
})
export class ListadoDetalleComponent {
  
  

  constructor(private DetalleVentaService: DetalleVentaService, private routes: Router, private toastr: ToastrService ){};
  public listadoDetalle : any [] = [];
  loading: boolean = false;

  
  ngOnInit(): void{
    this.cargarListado();

  }

  cargarListado(){
    this.loading=true;
    this.DetalleVentaService.getObtenerTodo().subscribe(data => {
      this.listadoDetalle = data;
      this.loading=false;
    })
  }

  delete(id: number){
    this.loading=true;
    this.DetalleVentaService.delete(id).subscribe(data => {
      this.cargarListado();
      this.toastr.warning('el detalle fue eliminado', 'Detalle eliminado');
    })

  }
  navigateToDestination() {
    this.routes.navigate(['/agregarDetalle']);
  }




}
