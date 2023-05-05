import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './front-office/home/home.component';
import { RentComponent } from './front-office/rent/rent.component';
import { BuyComponent } from './front-office/buy/buy.component';
import { LoginComponent } from './front-office/login/login.component';
import { SubmitComponent } from './front-office/submit/submit.component';
import { ContactComponent } from './front-office/contact/contact.component';
import { HomeBackComponent } from './back-office/home-back/home-back.component';
import { FrontOfficeComponent } from './front-office/front-office/front-office.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'user/home',
    pathMatch: 'full',
  },
  {
    path: 'admin',
    component: HomeBackComponent,
    children: [
      {
        path: 'advertising',
        loadChildren: () =>
          import('./back-office/advertising/advertising.module').then(
            (m) => m.AdvertisingModule
          ),
      },
    ],
  },

  {
    path: 'user',
    component: FrontOfficeComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'buy',
        component: BuyComponent,
      },
      {
        path: 'rent',
        component: RentComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'submit',
        component: SubmitComponent,
      },
    ],
  },

  //  {path: 'buy',component:BuyComponent},
  //  {path: 'rent',component:RentComponent},
  //  {path: 'login',component:LoginComponent},
  //  {path: 'submit',component:SubmitComponent},
  //  {path: 'contact',component:ContactComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
