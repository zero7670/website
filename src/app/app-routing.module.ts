import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';
import { TaxesTableComponent } from './taxes-table/taxes-table.component';

const routes: Routes = [
  {path:'', component: LoginComponent},
  {path:'Taxes', component:TaxesTableComponent},
  {path:'Products',component:ProductsComponent},
  {path: 'Logout', component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
