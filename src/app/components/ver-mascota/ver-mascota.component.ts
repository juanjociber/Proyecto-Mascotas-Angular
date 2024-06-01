import { Component } from '@angular/core';
import { MascotaService } from '../../services/mascota.service';
import { ActivatedRoute } from '@angular/router';
import { Mascota } from '../../interfaces/mascota';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-ver-mascota',
  templateUrl: './ver-mascota.component.html',
  styleUrl: './ver-mascota.component.css'
})

export class VerMascotaComponent {
  id : number;
  mascota! : Mascota;
  loading : boolean = false;

  //Trabajando con pipe async
  //mascota$! : Observable<Mascota>

  constructor( private _mascotaService : MascotaService,
    private aRoute : ActivatedRoute){
      //obteniendo el Id
      this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
  }

  //Inicializando los métodos
  ngOnInit() : void{
    //this.mascota$ = this._mascotaService.getMascota(this.id);
    this.obtenerMascota();
  }

  obtenerMascota(){
    this.loading = true;
    this._mascotaService.getMascota(this.id).subscribe(data =>{
      this.mascota = data;
      this.loading = false;
    });
  }
}
