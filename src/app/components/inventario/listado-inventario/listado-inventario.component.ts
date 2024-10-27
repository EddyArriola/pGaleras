import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { InventarioService } from '../../../services/inventario.service';
import { RouterModule, Router} from '@angular/router';
import { BarraProgresoComponent } from '../../../shared/barra-progreso/barra-progreso.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listado-inventario',
  standalone: true,
  imports: [NgFor, NgIf, RouterModule, BarraProgresoComponent],
  templateUrl: './listado-inventario.component.html',
  styleUrl: './listado-inventario.component.css'
})
export class ListadoInventarioComponent implements OnInit {

  constructor(private inventarioServicio: InventarioService, private routes: Router, private toastr: ToastrService ){};
  public listadoInventario : any [] = [];
  loading: boolean = false;

  
  ngOnInit(): void{
    this.cargarListadoGaleras();

  }

  cargarListadoGaleras(){
    this.loading=true;
    this.inventarioServicio.getObtenerTodoInventario().subscribe(data => {
      this.listadoInventario = data;
      this.loading=false;
    })
  }

  deleteInventario(id: number){
    this.loading=true;
    this.inventarioServicio.deleteInventario(id).subscribe(data => {
      this.cargarListadoGaleras();
      this.toastr.warning('el producto fue eliminado', 'producto eliminado');
    })

  }
  navigateToDestination() {
    this.routes.navigate(['/agregarInventario']);
  }
}

