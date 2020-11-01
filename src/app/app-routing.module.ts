import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'product-list',
    loadChildren: () => import('../app/modules/product-list/product-list.module').then(m => m.ProductListModule)
  },
  {
    path: 'shopping-list',
    loadChildren: () => import('../app/modules/shopping-list/shopping-list.module').then(m => m.ShoppingListModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
