import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Colectivo } from '../../models/colectivo';
import { ColectivoService } from '../../services/colectivo.service';
@Component({
  selector: 'app-colectivo',
  templateUrl: './colectivo.component.html',
  styleUrls: ['./colectivo.component.css']
})
export class ColectivoComponent implements OnInit {
  colectivoList: Colectivo[]; //To store
  selectedColectivo: Colectivo;

  visibleSelectedColectivo = false;

  addColectivoForm = new FormGroup({
    colectivoNameInput: new FormControl('', [
      Validators.required,
      Validators.min(2),
    ]),
    colectivoDescriptionInput: new FormControl('', [
      Validators.required,
      Validators.min(5),
    ]),
    colectivoVacunaInput: new FormControl('', [
      Validators.required,
      Validators.min(1),
    ]),
    
  });

  deleteColectivoForm = new FormGroup({
    colectivoNameDelete: new FormControl('', [
      Validators.required,
      Validators.min(2),
    ]),
    colectivoDescriptionDelete: new FormControl('', [
      Validators.required,
      Validators.min(4),
    ]),
    colectivoVacunaDelete: new FormControl('', [
      Validators.required,
      Validators.min(1),
    ]), 

  });

  constructor(private colectivoService: ColectivoService) { }

  ngOnInit(): void {
    this.getColectivos();
  }

  public getColectivos() {
    this.colectivoList = []; //To reset the List
    this.selectedColectivo = new Colectivo(); //To reset 

    this.colectivoService.getColectivos().subscribe((res) => {
      this.colectivoList = res as Colectivo[];
      console.log(res);
    });
  }

  public getColectivo(i: number) {
    this.visibleSelectedColectivo = false;

    let selectedColectivoId = this.colectivoList[i]._id;

    this.colectivoService.getColectivo(selectedColectivoId).subscribe((res) => {
      this.selectedColectivo = res as Colectivo;
    });

    this.visibleSelectedColectivo = true;
  }

  public addColectivo() {
    let newcolectivo = new Colectivo();
    newcolectivo.name = this.addColectivoForm.get('colectivoNameInput').value;
    newcolectivo.description = this.addColectivoForm.get(
      'colectivoDescriptionInput'
    ).value;
    newcolectivo.vacuna = this.addColectivoForm.get('colectivoVacunaInput').value;
    

    this.colectivoService.addColectivo(newcolectivo).subscribe((res) => {
      let addedcolectivo = res as Colectivo;
      if (
        addedcolectivo.name == newcolectivo.name &&
        addedcolectivo.description == newcolectivo.description
      )
        alert(`Colectivo ${addedcolectivo.name} created successfully`);
      else alert(`Could not create the Colectivo`);
    });
  }

  public deleteColectivo() {
    this.colectivoService.deleteColectivo(this.selectedColectivo._id).subscribe((res) => {
        let deletedcolectivo = res as Colectivo;
        alert(`Colectivo  deleted successfully`);
        if (
          deletedcolectivo.name ==
            this.deleteColectivoForm.get('colectivoNameDelete').value &&
          deletedcolectivo.description ==
            this.deleteColectivoForm.get('colectivoDescriptionDelete').value &&
          deletedcolectivo.vacuna ==
            this.deleteColectivoForm.get('colectivoVacunaDelete').value
            
        )
        alert(`Colectivo  deleted successfully`);
        else alert(`Could not delete the Colectivo`);
      });
  }

}
