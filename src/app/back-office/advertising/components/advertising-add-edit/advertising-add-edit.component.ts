import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Advertising } from '../../models/advertising.model';
import { AdvertisingService } from '../../services/advertising.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-advertising-add-edit',
  templateUrl: './advertising-add-edit.component.html',
  styleUrls: ['./advertising-add-edit.component.css'],
})
export class AdvertisingAddEditComponent implements OnInit {
  public advertisingForm!: FormGroup;
  public selectedAdvertising!: Advertising;
  public image!: string;

  selectedFile!: File;
  advertising!: Advertising;

  constructor(
    public dialogRef: MatDialogRef<AdvertisingAddEditComponent>,
    private router: Router,
    private cs: AdvertisingService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    this.initForm();
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.image = this.selectedFile.name;
  }

  initForm() {
    this.advertisingForm = new FormGroup({
      title: new FormControl(this.data ? this.data?.title : ''),
      description: new FormControl(this.data ? this.data?.description : ''),
      nbrVuesCible: new FormControl(this.data ? this.data?.nbrVuesCible : ''),
      coutParJour: new FormControl(this.data ? this.data?.coutParJour : ''),
      coutParVueCible: new FormControl(
        this.data ? this.data?.coutParVueCible : ''
      ),
      image: new FormControl(this.data ? this.data?.image : ''),
      endDate: new FormControl(this.data ? this.data?.endDate : ''),
      startDate: new FormControl(this.data ? this.data?.startDate : ''),
      socityName: new FormControl(this.data ? this.data?.socityName : ''),
    });
  }
  confirm() {
    this.dialogRef.close(this.advertisingForm.value);
  }

  save() {
    if (!this.data) {
      const advertising: any = {
        ...{ ...this.advertisingForm.value, ...{ image: this.image } },
      };

      console.log(advertising);
      console.log(this.selectedFile);

      this.cs.addAdvertising(advertising, this.selectedFile).subscribe({
        next: (Response) => {
          this.dialogRef.close(advertising);
          console.log(Response);
        },
        error: (error) => {
          console.log(Response);
          alert('error');
        },
        complete: () => {
          console.log('request completed');
        },
      });
    } else {
      const advertising: any = {
        ...{
          ...this.advertisingForm.value,
          ...{ image: this.image },
          ...{ idAd: this.data.idAd },
        },
      };

      this.cs.updateAdvertising(advertising).subscribe({
        next: (Response) => {
          this.dialogRef.close({advertising: advertising, type: 'update'});
          console.log(Response);
        },
        error: (error) => {
          console.log(Response);
          alert('error');
        },
        complete: () => {
          console.log('request completed');
        },
      });
    }
  }
}
