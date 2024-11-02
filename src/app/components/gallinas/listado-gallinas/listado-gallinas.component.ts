import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BarraProgresoComponent } from '../../../shared/barra-progreso/barra-progreso.component';
import { GallinasService } from '../../../services/gallinas-service.service';
import { ToastrService } from 'ngx-toastr';
import { ComunicacionService } from '../../../services/comunicacion.service';

@Component({
  selector: 'app-listado-gallinas',
  standalone: true,
  imports: [NgFor, NgIf, RouterModule, BarraProgresoComponent],
  templateUrl: './listado-gallinas.component.html',
  styleUrl: './listado-gallinas.component.css'
})
export class ListadoGallinasComponent implements OnInit {

  

  constructor(private gallinasService: GallinasService, 
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
    this.gallinasService.getObtenerTodo().subscribe(data => {
      this.listado = data;
      this.loading=false;
    })
  }

  delete(id: number){
    this.loading=true;
    this.gallinasService.delete(id).subscribe(data => {
      this.cargarListado();
      this.toastr.warning('la gallina fue eliminada', 'gallina eliminado');
    })

  }
  navigateToDestination() {
    this.routes.navigate(['/agregarGallina']);
  }



}
