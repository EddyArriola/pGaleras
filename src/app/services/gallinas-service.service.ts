import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { gallina } from '../interfaces/gallinas';

@Injectable({
  providedIn: 'root'
})
export class GallinasService {

  private readonly _http = inject(HttpClient);
  private urlApi = 'http://localhost:3000/api/v1/gallinas'

  constructor(private http:HttpClient) { }

  
      
  public getObtenerTodo(): Observable<any>{
    var respuesta = this.http.get<any>(this.urlApi);
    return respuesta;
  }

  public delete(id: number): Observable<void> {
    return this._http.delete<void>(`${this.urlApi}/${id}`);
  }

  public guardar(gallina: gallina): Observable<void>{
    return this._http.post<void>(this.urlApi, gallina)
  }

  public GetByID(id: number): Observable<gallina> {
    return this._http.get<gallina>(`${this.urlApi}/${id}`);
  }

  public update(id:number, gallina: gallina): Observable<void>{
    return this._http.put<void>(`${this.urlApi}/${id}`, gallina)
  }


}
