import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { detalle } from '../interfaces/detalle';

@Injectable({
  providedIn: 'root'
})
export class DetalleVentaService {

  private readonly _http = inject(HttpClient);
  private urlApi = 'http://localhost:3000/api/v1/detalle-venta'

  constructor(private http:HttpClient) { }

  
      
  public getObtenerTodo(): Observable<any>{
    var respuesta = this.http.get<any>(this.urlApi);
    return respuesta;
  }

  public delete(id: number): Observable<void> {
    return this._http.delete<void>(`${this.urlApi}/${id}`);
  }

  public guardar(detalle: detalle): Observable<void>{
    return this._http.post<void>(this.urlApi, detalle)
  }

  public GetByID(id: number): Observable<detalle> {
    return this._http.get<detalle>(`${this.urlApi}/${id}`);
  }

  public update(id:number, detalle: detalle): Observable<void>{
    return this._http.put<void>(`${this.urlApi}/${id}`, detalle)
  }


}
