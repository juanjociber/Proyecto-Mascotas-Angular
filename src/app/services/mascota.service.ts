import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Mascota } from '../interfaces/mascota';

@Injectable({
  providedIn: 'root'
})

export class MascotaService {
  private myAppUrl : string = environment.endpoint;
  private myApiUrl : string = 'api/Mascota/';

  //Inyectando clase para conexion
  constructor(private http : HttpClient ) { }

  //Listar Mascotas
  getMascotas() : Observable<Mascota[]>{
    return this.http.get<Mascota[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  //Lista Mascota por Id
  getMascota(id : number) : Observable<Mascota> {
    return this.http.get<Mascota>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  //Eliminar Mascota
  deleteMascota(id:number) : Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }

  addMascota(mascota : Mascota) : Observable<Mascota>{
    return this.http.post<Mascota>(`${this.myAppUrl}${this.myApiUrl}`,mascota);   
  }

  updateMascota(id:number,mascota:Mascota) : Observable<void>{
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`,mascota)
  }

}
