import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { venta } from '../interfaces/venta';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  private readonly _http = inject(HttpClient);
  private urlApi = 'http://localhost:3000/api/v1/ventas'

  constructor(private http:HttpClient) { }

  
      
  public getObtenerTodo(): Observable<any>{
    var respuesta = this.http.get<any>(this.urlApi);
    return respuesta;
  }

  public delete(id: number): Observable<void> {
    return this._http.delete<void>(`${this.urlApi}/${id}`);
  }

  public guardar(venta: venta): Observable<void>{
    return this._http.post<void>(this.urlApi, venta)
  }

  public GetByID(id: number): Observable<venta> {
    return this._http.get<venta>(`${this.urlApi}/${id}`);
  }

  public update(id:number, venta: venta): Observable<void>{
    return this._http.put<void>(`${this.urlApi}/${id}`, venta)
  }


}
