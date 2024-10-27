import { Routes } from '@angular/router';
import { ListadoInventarioComponent } from './components/inventario/listado-inventario/listado-inventario.component';
import { AgregarEditarInventarioComponent } from './components/inventario/agregar-editar-inventario/agregar-editar-inventario.component';
import { InicioComponent } from './inicio/inicio.component';
import { ListadoTipoComponent } from './components/tipo-huevo/listado-tipo/listado-tipo.component';
import { AgregarEditarTipoComponent } from './components/tipo-huevo/agregar-editar-tipo/agregar-editar-tipo.component';
import { ListadoDetalleComponent } from './components/DetalleVenta/listado-detalle/listado-detalle.component';
import { AgregarEditarDetalleComponent } from './components/DetalleVenta/agregar-editar-detalle/agregar-editar-detalle.component';
import { ListadoVentasComponent } from './components/ventas/listado-ventas/listado-ventas.component';
import { AgregarEditarVentasComponent } from './components/ventas/agregar-editar-ventas/agregar-editar-ventas.component';
import { ListadoClienteComponent } from './components/clientes/listado-cliente/listado-cliente.component';
import { AgregarEditarClienteComponent } from './components/clientes/agregar-editar-cliente/agregar-editar-cliente.component';

export const routes: Routes = [

    { path: '', component: InicioComponent },
    //modulo de inventario
    { path: 'listadoInventario', component: ListadoInventarioComponent },
    { path: 'agregarInventario', component: AgregarEditarInventarioComponent, pathMatch:'full' },
    { path: 'editarInventario/:id', component: AgregarEditarInventarioComponent, pathMatch: 'full'},
    //modulo tipos de huevos
    { path: 'listadoTipoHuevo', component: ListadoTipoComponent },
    { path: 'agregarTipoHuevo', component: AgregarEditarTipoComponent },
    { path: 'editarTipoHuevo/:id', component: AgregarEditarTipoComponent },
    //modulo detalle de venta
    { path: 'listadoDetalle', component: ListadoDetalleComponent },
    { path: 'agregarDetalle', component: AgregarEditarDetalleComponent },
    { path: 'editarDetalle/:id', component: AgregarEditarDetalleComponent },
    //modulo de ventas
    { path: 'listadoVenta', component: ListadoVentasComponent },
    { path: 'agregarVenta', component: AgregarEditarVentasComponent },
    { path: 'editarVenta/:id', component: AgregarEditarVentasComponent },
    //modulo de cliente
    { path: 'listadoCliente', component: ListadoClienteComponent },
    { path: 'agregarCliente', component: AgregarEditarClienteComponent },
    { path: 'editarVenta/:id', component: AgregarEditarClienteComponent },
    { path: '**', redirectTo:'', pathMatch: 'full' }
];
