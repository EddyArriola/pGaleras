import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../interfaces/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private readonly _http = inject(HttpClient);
  private urlApi = 'http://localhost:3000/api/v1/cliente'

  constructor(private http:HttpClient) { }

  
      
  public getObtenerTodo(): Observable<any>{
    var respuesta = this.http.get<any>(this.urlApi);
    return respuesta;
  }

  public delete(id: number): Observable<void> {
    return this._http.delete<void>(`${this.urlApi}/${id}`);
  }

  public guardar(cliente: Cliente): Observable<void>{
    return this._http.post<void>(this.urlApi, cliente)
  }

  public GetByID(id: number): Observable<Cliente> {
    return this._http.get<Cliente>(`${this.urlApi}/${id}`);
  }

  public update(id:number, cliente: Cliente): Observable<void>{
    return this._http.put<void>(`${this.urlApi}/${id}`, cliente)
  }


}
