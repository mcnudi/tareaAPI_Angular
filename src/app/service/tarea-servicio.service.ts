import { inject, Injectable } from '@angular/core';
import { ITarea } from '../interface/itarea';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TareaServicioService {
  http = inject(HttpClient);
  url = "http://localhost:8081/api/tareas";

  constructor() { }

  insertarTarea(tarea: ITarea): Promise<ITarea> {
    return lastValueFrom(this.http.post<ITarea>(`${this.url}/crear`, tarea));
  }

  listarTareas(): Promise<ITarea[]>{
    return lastValueFrom(this.http.get<ITarea[]>(`${this.url}/listadoT`));
  }
 
  listarTareasPorFinalizar():Promise<ITarea[]>{
    return lastValueFrom(this.http.get<ITarea[]>(`${this.url}/listadoCaducar`));
  }
}

