import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Colectivo } from '../models/colectivo';

@Injectable({
  providedIn: 'root'
})
export class ColectivoService {

  colectivoRouter: string = `http://localhost:25000/api`;

  constructor(private http: HttpClient) { }

  getColectivos() {
    const path = `${this.colectivoRouter}/`;
    return this.http.get<Colectivo[]>(path);
  }

  getColectivo(colectivoid: string) {
    const path = `${this.colectivoRouter}/${colectivoid}`;
    return this.http.get<Colectivo>(path);
  }

  addColectivo(newcolectivo: Colectivo) {
    const path = `${this.colectivoRouter}/new`;
    return this.http.post(path, newcolectivo);
  }


  deleteColectivo(colectivoid: string) {
    const path = `${this.colectivoRouter}/${colectivoid}`;
    return this.http.delete(path);
  }
}
