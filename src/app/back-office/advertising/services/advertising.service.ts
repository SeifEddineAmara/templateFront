import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Advertising } from '../models/advertising.model';

@Injectable()
export class AdvertisingService {
  constructor(private httpClient: HttpClient) {}

  getAllAdvertisings(): Observable<Advertising[]> {
    return this.httpClient.get<Advertising[]>(
      'http://localhost:8075/ImmoNexus/Advertising/get-AllAdvertising'
    );
  }

 
  private baseUrl = 'http://localhost:8075/ImmoNexus/Advertising/between-dates';

  getAdvertisingsBetweenDates(start: any, end: any): Observable<Advertising[]> {
    return this.httpClient.get<Advertising[]>(`${this.baseUrl}/${start}/${end}`);
  }

  deleteAdvertising(id: number): any {
    return this.httpClient.delete<Advertising[]>(
      `http://localhost:8075/ImmoNexus/Advertising/delete-Advertising-ById/${id}`
    );
  }

  // exportAdvertisingToPdf(id: number): any {
  //   return this.httpClient.get<Advertising[]>(
  //     `http://localhost:8075/ImmoNexus/Advertising/export-pdf/${id}`
  //   );
  // }
  exportAdvertisingToPdf(id: number) {
    return this.httpClient.get<any>(
      `http://localhost:8075/ImmoNexus/Advertising/export-pdf/${id}`,
      { responseType: 'blob' as 'json' }
    );
  }

  // addAdvertising1(ad: any): any {
  //   return this.httpClient.post<Advertising[]>(
  //     `http://localhost:8075/ImmoNexus/Advertising/add-Advertising`,
  //     ad
  //   );
  // }
  // addAdvertising(advertising: Advertising, file: Blob): Observable<any> {
  //   const formData: FormData = new FormData();
  //   formData.append('file', file);
  //   formData.append('advertising', JSON.stringify(advertising));

  //   return this.httpClient.post<any>('http://localhost:8075/ImmoNexus/Advertising/add-Advertising', formData);
  // }

  addAdvertising(advertising: Advertising, file: Blob): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('advertising', JSON.stringify(advertising));
    //  const constvalue={
    //   advertising : advertising,
    //   file:formData
    // }

    // console.log(constvalue)
    return this.httpClient.post<any>(
      'http://localhost:8075/ImmoNexus/Advertising/add-Advertisingg',
      formData
    );
  }

  updateAdvertising(ad: any): Observable<any> {
    return this.httpClient.put(
      'http://localhost:8075/ImmoNexus/Advertising/updateAdvertising',
      ad
    );
  }

  // getUserById(id: number): Observable<User> {
  //   return this.httpClient.get<User>(
  //     http://localhost:8080/user/getUser/${id}
  //   );
  // }

  // addUser(user: User): Observable<User> {
  //   return this.httpClient.post<User>(
  //     http://localhost:8080/user/addUser,
  //     user
  //   );
  // }

  // updateUser(user: User): Observable<User> {
  //   return this.httpClient.put(http://localhost:8080/user/update, user);
  // }

  // getUserByNom(nom: string): Observable<User> {
  //   return this.httpClient.get<User>(
  //     http://localhost:8080/user/getUserByNom/${nom}
  //   );
  // }

  // deleteUserById(id: number) {
  //    return this.httpClient.delete(
  //     http://localhost:8080/user/delete/${id}
  //   );
  // }
}
