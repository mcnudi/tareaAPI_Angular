import { Component, inject } from '@angular/core';
import { TareaServicioService } from '../../service/tarea-servicio.service';
import { ITarea } from '../../interface/itarea';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-listado-tarea',
  imports: [UpperCasePipe, DatePipe],
  templateUrl: './listado-tarea.component.html',
  styleUrl: './listado-tarea.component.css'
})
export class ListadoTareaComponent {
  tareas:ITarea[]=[];

  servicioT = inject(TareaServicioService);
  ruta = inject(ActivatedRoute);
  ruta1:String = "";
  titulo:String="";

  async ngOnInit(){
   this.ruta1 = this.ruta.snapshot.url.join('/')
  if (this.ruta1==="listadoTarea"){
    this.tareas = await this.servicioT.listarTareas();
    
  }
   else if (this.ruta1==="home"){
    this.tareas = await this.servicioT.listarTareasPorFinalizar();
    this.titulo = "Tareas al Límite!!";
   }
}
}
