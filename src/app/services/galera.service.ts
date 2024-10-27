import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { galera } from '../interfaces/galera';

@Injectable({
  providedIn: 'root'
})
export class GaleraService {


  private readonly _http = inject(HttpClient);
  private urlApi = 'http://localhost:3000/api/v1/galeras'

  constructor(private http:HttpClient) { }

  
      
  public getObtenerTodo(): Observable<any>{
    var respuesta = this.http.get<any>(this.urlApi);
    return respuesta;
  }

  public delete(id: number): Observable<void> {
    return this._http.delete<void>(`${this.urlApi}/${id}`);
  }

  public guardar(galera: galera): Observable<void>{
    return this._http.post<void>(this.urlApi, galera)
  }

  public GetByID(id: number): Observable<galera> {
    return this._http.get<galera>(`${this.urlApi}/${id}`);
  }

  public update(id:number, galera: galera): Observable<void>{
    return this._http.put<void>(`${this.urlApi}/${id}`, galera)
  }



}
