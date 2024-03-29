import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { frontera, paisSmall } from '../interfaces/paises.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  private baseUrl : string = 'https://restcountries.com/v2'

  private _regiones: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']

  get regiones(): string[] {
    return [...this._regiones]
  }
  constructor(private http: HttpClient) {}

  getPaisesPorRegion (region:string) : Observable <paisSmall[]> {

    const url:string = `${this.baseUrl}/region/${region}?fields=alpha3Code&fields=name`
    return this.http.get<paisSmall[]>(url)
  }

  getPaisesPorCodigo (codigo:string): Observable<frontera | null> {

    if (!codigo) {
      return of (null)
    }
    const url = `${this.baseUrl}/alpha/${codigo}`
    return this.http.get<frontera>(url)
  }
}
