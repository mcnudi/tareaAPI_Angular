import { Component } from '@angular/core';
import { ListadoTareaComponent } from '../listado-tarea/listado-tarea.component';

@Component({
  selector: 'app-home',
  imports: [ListadoTareaComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
