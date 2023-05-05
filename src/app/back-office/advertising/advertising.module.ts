import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdvertisingRoutingModule } from './advertising-routing.module';
import { AdvertisingListComponent } from './components/advertising-list/advertising-list.component';
import { AdvertisingAddEditComponent } from './components/advertising-add-edit/advertising-add-edit.component';
import { AdvertisingComponent } from './advertising.component';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MatNativeDateModule,
} from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { AdvertisingService } from './services/advertising.service';
import { HttpClientModule } from '@angular/common/http';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@NgModule({
  declarations: [
    AdvertisingListComponent,
    AdvertisingAddEditComponent,
    AdvertisingComponent,
  ],
  imports: [
    CommonModule,
    AdvertisingRoutingModule,
    MatCardModule,
    MatTableModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatDialogModule,
    HttpClientModule
  ],
  providers: [
    MatDatepickerModule,
    AdvertisingService,
    MatNativeDateModule,
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ],
})
export class AdvertisingModule {}
