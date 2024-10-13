import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Inventario } from '../interfaces/inventario';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  private readonly _http = inject(HttpClient);
  private urlApi = 'http://localhost:3000/api/v1/inventario'

  constructor(private http:HttpClient) { }

  
      
  public getObtenerTodoInventario(): Observable<any>{
    var respuesta = this.http.get<any>(this.urlApi);
    console.log(respuesta);
    return respuesta;
  }

  public deleteInventario(id: number): Observable<void> {
    return this._http.delete<void>(`${this.urlApi}/${id}`);
  }

  public guardarProducto(inventario: Inventario): Observable<void>{
    return this._http.post<void>(this.urlApi, inventario)
  }

  public GetInventarioID(id: number): Observable<Inventario> {
    return this._http.get<Inventario>(`${this.urlApi}/${id}`);
  }

  public updateInventario(id:number, inventario: Inventario): Observable<void>{
    return this._http.put<void>(`${this.urlApi}/${id}`, inventario)
  }
}
