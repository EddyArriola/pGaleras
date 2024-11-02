import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComunicacionService {
  private refreshListadoSource = new Subject<void>();
  
  refreshListado$ = this.refreshListadoSource.asObservable();

  triggerRefresh() {
    this.refreshListadoSource.next();
  }
}
