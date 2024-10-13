import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { InventarioService } from '../../services/inventario.service';
import { RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-listado-inventario',
  standalone: true,
  imports: [NgFor, RouterLinkActive],
  templateUrl: './listado-inventario.component.html',
  styleUrl: './listado-inventario.component.css'
})
export class ListadoInventarioComponent {

  constructor(private inventarioServicio: InventarioService ){};

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
}
