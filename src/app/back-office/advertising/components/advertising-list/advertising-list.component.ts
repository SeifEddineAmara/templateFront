import { Component, OnInit } from '@angular/core';
import { AdvertisingService } from '../../services/advertising.service';
import { Advertising } from '../../models/advertising.model';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AdvertisingAddEditComponent } from '../advertising-add-edit/advertising-add-edit.component';

@Component({
  selector: 'app-advertising-list',
  templateUrl: './advertising-list.component.html',
  styleUrls: ['./advertising-list.component.css'],
})
export class AdvertisingListComponent implements OnInit {
  public advertisingForm!: FormGroup;
  public advertisings!: Advertising[];
  selectedFile!: File;
  advertising: Advertising = new Advertising();

  start!: string;
  end!: string;
  constructor(
    private advertisingService: AdvertisingService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getAllAdvertising();
  }

  getAllAdvertising() {
    this.advertisingService.getAllAdvertisings().subscribe((data) => {
      this.advertisings = data;
    });
  }

  initForm() {
    this.advertisingForm = new FormGroup({
      start: new FormControl(),
      end: new FormControl(),
    });
  }

  
  getAdvertisingBetweenTwoDates() {
    this.start = this.advertisingForm.value.start;
    this.end = this.advertisingForm.value.end;

    this.advertisingService.getAdvertisingsBetweenDates(this.start, this.end).subscribe((data) => {
      this.advertisings = data;
    });
  }

  addAdvertising() {
    const dialogRef = this.dialog.open(AdvertisingAddEditComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.advertisings.push(result);
      }
    });
  }
  delete(idAd: number) {
    this.advertisingService.deleteAdvertising(idAd).subscribe(() => {
      const newlist = this.advertisings.filter((ad) => ad.idAd !== idAd);
      this.advertisings = newlist;
    });
  }

  // exportAdvertisingToPdf(idAd: number){
  //   this.advertisingService.exportAdvertisingToPdf(idAd).subscribe((response: any) => {
  //     // Créez un objet URL à partir du blob de réponse
  //     const url = window.URL.createObjectURL(response);
  
  //     // Créez un élément d'ancrage pour télécharger le PDF
  //     const anchor = document.createElement('a');
  //     anchor.download = 'advertising.pdf';
  //     anchor.href = url;
  
  //     // Ajoutez l'élément d'ancrage à la page et déclenchez un clic
  //     document.body.appendChild(anchor);
  //     anchor.click();
  
  //     // Supprimez l'élément d'ancrage et libérez l'URL objet
  //     document.body.removeChild(anchor);
  //     window.URL.revokeObjectURL(url);
  //   });
  // }
  
  exportAdvertisingToPdf(id: number) {
    this.advertisingService.exportAdvertisingToPdf(id).subscribe((data: any) => {
      const blob = new Blob([data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }
  


  updateAdvertising(advertising: Advertising) {
    const dialogRef = this.dialog.open(AdvertisingAddEditComponent, {
      width: '400px',
      data: advertising,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (!result.type) {
        this.advertisings.push(result);
      } else {
        console.log('');
        const index = this.advertisings.findIndex((key: any, value) => {
          return key.idAd == advertising.idAd;
        });
        this.advertisings[index] = {
          ...this.advertisings[index],
          ...result.advertising,
        };
      }
    });
  }
}
