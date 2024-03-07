import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { paisSmall, frontera } from '../../interfaces/paises.interface';
import { PaisesService } from '../../services/paises.service';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-selectorpages',
  templateUrl: './selectorpages.component.html',
  styleUrl: './selectorpages.component.css'
})
export class SelectorPageComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group ({

    region:    ['', Validators.required ],
    pais:      ['', Validators.required ],
    fronteras: ['', Validators.required ]
    
  })

  //llenar selectores

  regiones: string[] = []
  paises: paisSmall[] = []
  fronteras : string[] = []

  //UI
  cargando: boolean = false

  constructor(private fb: FormBuilder,
              private ps: PaisesService) {}


  guardar() {
    console.log(this.miFormulario.value)
  }

  ngOnInit(): void {

    this.regiones = this.ps.regiones

    //Cuando cambie la region

    this.miFormulario.get('region')?.valueChanges
    .pipe(
      tap( (_) => {
        this.miFormulario.get('pais')?.reset('')
        this.cargando = true
      }),
      switchMap(region => this.ps.getPaisesPorRegion (region) )
    )
    .subscribe( paises => {
      this.paises = paises
      this.cargando = false
    })

    // Cuando cambia el pais

   this.miFormulario.get('pais')?.valueChanges
   .pipe (
      tap ( () => {
        this.fronteras = []
        this.miFormulario.get('fronteras')?.reset('')
        this.cargando = true
      }),
    switchMap (codigo => this.ps.getPaisesPorCodigo(codigo))
   )
   .subscribe( frontera => {
       this.fronteras = frontera?.borders || []
       this.cargando = false
   })
    
  }

}
