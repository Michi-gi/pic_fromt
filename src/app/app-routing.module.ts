import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PictureComponent } from './picture/picture.component';
import { AccountComponent } from './account/account.component';
import { QueryComponent } from './query/query.component';

const routes: Routes = [
  { path: 'picture/:site/:id', component: PictureComponent },
  { path: 'account/:site/:id', component: AccountComponent },
  { path: 'query', component: QueryComponent },
  { path: '', redirectTo: 'query', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
