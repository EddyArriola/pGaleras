import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BarraProgresoComponent } from '../../../shared/barra-progreso/barra-progreso.component';
import {TipoHuevoService} from '../../../services/tipo-huevo.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listado-tipo',
  standalone: true,
  imports: [NgFor, NgIf, RouterModule, BarraProgresoComponent],
  templateUrl: './listado-tipo.component.html',
  styleUrl: './listado-tipo.component.css'
})
export class ListadoTipoComponent implements OnInit {
  

  constructor(private TipoHuevoService: TipoHuevoService, private routes: Router, private toastr: ToastrService ){this.cargarListado};
  public listadoTipo : any [] = [];
  loading: boolean = false;

  
  ngOnInit(): void{
    this.cargarListado();

  }

  cargarListado(){
    this.loading=true;
    this.TipoHuevoService.getObtenerTodo().subscribe(data => {
      this.listadoTipo = data;
      this.loading=false;
    })
  }

  delete(id: number){
    this.loading=true;
    this.TipoHuevoService.delete(id).subscribe(data => {
      this.cargarListado();
      this.toastr.warning('el tipo de huevo fue eliminado', 'Tipo eliminado');
    })

  }
  navigateToDestination() {
    this.routes.navigate(['/agregarTipoHuevo']);
  }


}
