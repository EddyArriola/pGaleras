import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { InventarioService } from '../../services/inventario.service';
import { RouterModule, Router, provideRouter} from '@angular/router';
import { routes } from '../../app.routes';

@Component({
  selector: 'app-listado-inventario',
  standalone: true,
  imports: [NgFor, RouterModule],
  templateUrl: './listado-inventario.component.html',
  styleUrl: './listado-inventario.component.css'
})
export class ListadoInventarioComponent {

  constructor(private inventarioServicio: InventarioService, private routes: Router ){};


  public listadoInventario : any [] = [];

  
  ngOnInit(): void{
    this.cargarListadoGaleras();

  }

  cargarListadoGaleras(){
    this.inventarioServicio.getObtenerTodoInventario().subscribe(data => {
      this.listadoInventario = data;
      console.log("imprimir listado usuarios: ",  this.listadoInventario);
    })
  }

  deleteInventario(id: number){
    this.inventarioServicio.deleteInventario(id).subscribe(data => {
      this.cargarListadoGaleras();
    })

  }
  navigateToDestination() {
    this.routes.navigate(['/agregarInventario']);
  }
}

