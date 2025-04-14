import { Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { ListadoTareaComponent } from './page/listado-tarea/listado-tarea.component';
import { FormularioTareaComponent } from './page/formulario-tarea/formulario-tarea.component';

export const routes: Routes = [
    {path: "", pathMatch:'full', redirectTo:'home'}, // Ruta por defecto
    {path: "home", component: HomeComponent },
    {path: "crearTarea", component: FormularioTareaComponent },
    {path: "listadoTarea", component: ListadoTareaComponent },
    {path:"**",component: HomeComponent }
];

