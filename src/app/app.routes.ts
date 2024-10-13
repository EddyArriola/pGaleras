import { Routes } from '@angular/router';
import { ListadoInventarioComponent } from './components/listado-inventario/listado-inventario.component';
import { AgregarEditarInventarioComponent } from './components/agregar-editar-inventario/agregar-editar-inventario.component';

export const routes: Routes = [

    { path: '', component: ListadoInventarioComponent },
    { path: 'agregarInventario', component: AgregarEditarInventarioComponent, pathMatch:'full' },
    { path: 'editar/:id', component: AgregarEditarInventarioComponent, pathMatch: 'full'},
    { path: '**', redirectTo:'', pathMatch: 'full' }
];
