import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoHuevo } from '../interfaces/tipoHuevo';

@Injectable({
  providedIn: 'root'
})
export class TipoHuevoService {
  private readonly _http = inject(HttpClient);
  private urlApi = 'http://localhost:3000/api/v1/tipo-huevo'

  constructor(private http:HttpClient) { }

  
      
  public getObtenerTodo(): Observable<any>{
    var respuesta = this.http.get<any>(this.urlApi);
    return respuesta;
  }

  public delete(id: number): Observable<void> {
    return this._http.delete<void>(`${this.urlApi}/${id}`);
  }

  public guardar(TipoHuevo: TipoHuevo): Observable<void>{
    return this._http.post<void>(this.urlApi, TipoHuevo)
  }

  public GetByID(id: number): Observable<TipoHuevo> {
    return this._http.get<TipoHuevo>(`${this.urlApi}/${id}`);
  }

  public update(id:number, TipoHuevo: TipoHuevo): Observable<void>{
    return this._http.put<void>(`${this.urlApi}/${id}`, TipoHuevo)
  }

}
