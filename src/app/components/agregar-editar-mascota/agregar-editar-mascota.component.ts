import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Mascota } from '../../interfaces/mascota';
import { MascotaService } from '../../services/mascota.service';

@Component({
  selector: 'app-agregar-editar-mascota',
  templateUrl: './agregar-editar-mascota.component.html',
  styleUrl: './agregar-editar-mascota.component.css'
})

export class AgregarEditarMascotaComponent {
  loading : boolean = false;
  form : FormGroup;
  id : number;
  //Variable que modicará el título [Agregar o Editar]
  operacion : string = 'Agregar';

  //Construyendo objeto tipo grupo
  constructor(private fb : FormBuilder,
              private _mascotaService : MascotaService,
              private _snackBar: MatSnackBar,
              private router : Router,
              private aRoute : ActivatedRoute){
    this.form = this.fb.group({
      nombre : ['',Validators.required],
      raza   : ['',Validators.required],
      color  : ['',Validators.required],
      edad   : ['',Validators.required],
      peso   : ['',Validators.required]
    });

    this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit() : void{
    if(this.id != 0){
      this.operacion = 'Editar';
      this.obtenerMascota(this.id);
    }
  }

  //Pintar en input cuando se seleccione Mascota por su Id
  obtenerMascota(id : number){
    this.loading = true;
    this._mascotaService.getMascota(id).subscribe(data =>{
      this.form.setValue({
        nombre : data.nombre,
        raza : data.raza,
        color : data.color,
        edad : data.edad,
        peso: data.peso
      })
      this.loading = false;
    });
  }

  //Capturando data ingresada en inputs
  agregarEditarMascota(){
    const mascota : Mascota = {
      nombre : this.form.value.nombre,
      raza   : this.form.value.raza,
      color  : this.form.value.color,
      edad   : this.form.value.edad,
      peso   : this.form.value.peso,
    }
    //Condición para agregar y actualizar
    if(this.id !=0){
      mascota.id = this.id;
      this.editarMascota(this.id,mascota);
    }
    else{
      this.agregarMascota(mascota);
    }
  }

  //Actualizar Mascota
  editarMascota(id:number, mascota : Mascota){
    this.loading = true;
    this._mascotaService.updateMascota(id,mascota).subscribe(()=>{
      this.loading = false;
      this.mensajeExitoso('actualizada');
      this.router.navigate(['/listadoMascotas']);
    })
  }

  //Agregar Mascota - Enviamos objetos al backend 
  agregarMascota(mascota : Mascota){
    this._mascotaService.addMascota(mascota).subscribe(data=>{
      this.mensajeExitoso('registrada');
      this.router.navigate(['/listadoMascotas']);
    });
  }

  //Mensaje de operación realizada
  mensajeExitoso(text : string){
    this._snackBar.open(`La Mascota fue ${text} con éxito`, '',{
      duration : 3000,
      horizontalPosition : 'right'
    });
  }
}


