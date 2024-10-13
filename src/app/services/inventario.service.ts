import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
  getInventario(id: number): Observable<any> {
    return this.http.get(`${this.urlApi}/${id}`);
  }
}
