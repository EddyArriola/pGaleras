import { Component } from '@angular/core';
import { VentasService } from '../../../services/ventas.service';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgFor, NgIf } from '@angular/common';
import { BarraProgresoComponent } from '../../../shared/barra-progreso/barra-progreso.component';

@Component({
  selector: 'app-listado-ventas',
  standalone: true,
  imports: [NgFor, NgIf, RouterModule, BarraProgresoComponent],
  templateUrl: './listado-ventas.component.html',
  styleUrl: './listado-ventas.component.css'
})
export class ListadoVentasComponent {

  

  constructor(private VentasService: VentasService, private routes: Router, private toastr: ToastrService ){};
  public listadoVenta : any [] = [];
  loading: boolean = false;

  
  ngOnInit(): void{
    this.cargarListado();

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
