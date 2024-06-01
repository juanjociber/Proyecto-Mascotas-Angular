import {AfterViewInit , Component, ViewChild } from '@angular/core';
import { Mascota } from '../../interfaces/mascota';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MascotaService } from '../../services/mascota.service';
import { error } from 'console';

// const listadoMascotas: Mascota[] = [
//   {nombre : 'Mike', edad: 5, raza : 'Golden', color:'Dorado',peso : 44},
//   {nombre : 'Milton', edad: 6, raza : 'Golden', color:'Dorado',peso : 37},
//   {nombre : 'Bartolo', edad: 3, raza : 'Dogo Argentino', color:'Blanco',peso : 60},
//   {nombre : 'Aquiles', edad: 5, raza : 'Ovejero Alemán', color:'Negro',peso : 67},
//   {nombre : 'Homero', edad: 1, raza : 'Labrador', color:'Negro',peso : 44},
//   {nombre : 'Mark', edad: 2, raza : 'Callejero', color:'Negro',peso : 25},
// ];

@Component({
  selector: 'app-listado-mascota',
  templateUrl: './listado-mascota.component.html',
  styleUrl: './listado-mascota.component.css'
})

export class ListadoMascotaComponent implements AfterViewInit {
  displayedColumns: string[] = ['nombre','edad','raza','color','peso','acciones'];
  dataSource = new MatTableDataSource<Mascota>;
  // ( listadoMascotas);
  loading : boolean = false;

  //Paginacion
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  //Ordenamiento
  @ViewChild(MatSort) sort!: MatSort;

  //Constuctor para poder utlizar el mensaje de aviso
  constructor(private _snackBar: MatSnackBar, private _mascotaService : MascotaService){

  }

  //Inicializando los métodos
  ngOnInit() : void{
    this.obtenerMascotas();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if(this.dataSource.data.length > 0){
      this.paginator._intl.itemsPerPageLabel ='Items por página';
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  obtenerMascotas(){
    this.loading = true;
    this._mascotaService.getMascotas().subscribe({
      next:(data) =>{
        this.loading=false;
        this.dataSource.data = data;
      } ,
      error : (e) => this.loading=false,
      complete: () => console.info('Completado')
    })
  }

  eliminarMascota(id : number){
    this.loading = true;
    this._mascotaService.deleteMascota(id).subscribe(()=>{
      this.mensajeExitoso();
      this.loading = false;
      //actualizando la grilla
      this.obtenerMascotas();
    });
  }

  mensajeExitoso(){
    this._snackBar.open('La Mascota fue eliminada con éxito', '',{
      duration : 3000,
      horizontalPosition : 'right'
    });
  }
}
