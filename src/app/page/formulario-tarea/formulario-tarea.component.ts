import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ITarea } from '../../interface/itarea';
import { ActivatedRoute, Router } from '@angular/router';
import { TareaServicioService } from '../../service/tarea-servicio.service';

@Component({
  selector: 'app-formulario-tarea',
  imports: [ReactiveFormsModule],
  templateUrl: './formulario-tarea.component.html',
  styleUrl: './formulario-tarea.component.css'
})
export class FormularioTareaComponent {

  route = inject(ActivatedRoute);
  routerN = inject(Router);
  tareaServ = inject(TareaServicioService);
  tareaForm: FormGroup;
  tarea: ITarea | null = null;


constructor(){
    this.tareaForm = new FormGroup({
      nombre: new FormControl(this.tarea?.nombre || null, []),
      descripcion: new FormControl(this.tarea?.descripcion || "", []),
      completada: new FormControl(this.tarea?.completada || "", []),
      fecha: new FormControl(this.tarea?.fecha || "", []),
      prioridad: new FormControl(this.tarea?.prioridad || "", []),
      
    }, [])
  }

  OnInit(){
    this.initForm();
  }

  getDataForm() {
    if (this.tareaForm.valid)
      this.tareaServ.insertarTarea(this.tareaForm.value);
}

initForm(){

  this.tareaForm = new FormGroup({
    nombre: new FormControl(this.tarea?.nombre || "", [Validators.required, this.textoValidator]),
    descripcion: new FormControl(this.tarea?.descripcion || "", [Validators.required,this.textoValidator ]),
    completada: new FormControl(this.tarea?.completada || "", [Validators.required]),
    fecha: new FormControl(this.tarea?.fecha || "", [Validators.required, ]),
    prioridad: new FormControl(this.tarea?.prioridad || "", []),
  }, [])


}
textoValidator(control: AbstractControl): any {
  return control.value.trim().length > 2
    ? null
    : { message: 'El texto debe tener más de 2 caracteres' };
}
}
/*export class FormUsuarioComponent {
  route = inject(ActivatedRoute);
  routerN = inject(Router);
  usuarioS = inject(UsuariosServiceService)
  userForm: FormGroup;
  user: IUser | null = null;

  id:string |null = "";
  title = "";

  constructor(){
    this.userForm = new FormGroup({
      _id: new FormControl(this.user?._id || null, []),
      nombre: new FormControl(this.user?.first_name || "", []),
      apellidos: new FormControl(this.user?.last_name || "", []),
      imagen: new FormControl(this.user?.image || "", []),
      email: new FormControl(this.user?.email || "", []),
      username: new FormControl(this.user?.username || "", []),
    }, [])
  }

  async getDataForm() {
    let response:IUser|any
    let nuevo = false;
    try{
    if (this.id){
      response = await this.usuarioS.update(this.userForm.value);
      nuevo = false;
    }
    else{
      response = await this.usuarioS.insert(this.userForm.value);
      nuevo = true;
    }
    if (response.username){
      if (!nuevo){
        await Swal.fire({
                    title: String(response.username +" ha sido actualizado"),
                    icon: 'success',
                    customClass: {
                    title: 'custom-title',
                  },
                  width:'400px'
                });
        this.routerN.navigate(['/home'])
      }
      else{
        await Swal.fire({
          title: String(response.username +" ha sido insertado"),
          icon: 'success',
          customClass: {
          title: 'custom-title',
        },
        width:'400px'
      });
        this.routerN.navigate(['/home'])
      }
    }else if (response.error){
      await Swal.fire({
        title: String(response.error),
        icon: 'error',
        customClass: {
        title: 'custom-title',
      },
      width:'400px'
    });
    }
  }catch(msg:any){
    console.error(msg);
  }
  }

  async ngOnInit() {
    //obtenemos el id que tiene la ruta
    this.id = this.route.snapshot.paramMap.get('_id');
    if (this.id) {
      try{
      const data = await this.usuarioS.getbyId(this.id);
      if (data && typeof this.user==='object' && 'error' in data){
        this.routerN.navigate(['/home/']);
        await Swal.fire(String(data.error),'','error');
        this.user = null
      }
      else{
        this.user = data as IUser;
      }

      this.title="Modificar Usuario";
      }catch(error: any){
        console.error("Error");

      }
    }
    else {
      this.title = 'Nuevo Usuario'
     }
     this.initForm();
  }

  initForm(){

    this.userForm = new FormGroup({
      _id: new FormControl(this.user?._id || null, []),
      nombre: new FormControl(this.user?.first_name || "", [Validators.required, this.textoValidator]),
      apellidos: new FormControl(this.user?.last_name || "", [Validators.required,this.textoValidator ]),
      imagen: new FormControl(this.user?.image || "", [Validators.required, this.imagenValidator]),
      email: new FormControl(this.user?.email || "", [Validators.required, this.mailValidator]),
      username: new FormControl(this.user?.username || "", [Validators.required, this.textoValidator]),
    }, [])


  }
  imagenValidator(control: AbstractControl): any {
    if (control.value.startsWith('https://')) return null;
    return { message: 'La imagen tiene que empezar por https://' };
  }

  textoValidator(control: AbstractControl): any {
    return control.value.trim().length > 2
      ? null
      : { message: 'El texto debe tener más de 2 caracteres' };
  }

  mailValidator(control: AbstractControl): any {
    const mailpattern =/^[a-z][a-zA-Z0-9._%+-]*[^.]@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
    const value = control.value.trim();

    if (!mailpattern.test(value)) {
      return { invalidEmail: true };
    }
    return null;
  }

  checkControl(controlName: string, errorName: string): boolean | undefined {
    return (
      this.userForm.get(controlName)?.hasError(errorName) &&
      this.userForm.get(controlName)?.touched
    );
  }
}*/