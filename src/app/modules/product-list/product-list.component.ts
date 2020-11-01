import { Component, OnInit, HostListener } from '@angular/core';
import { productMock } from '../../mock/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  productMock = productMock;

  @HostListener('addToShoppingList', ['$event'])
  addToShoppingList(e) {
    const productToAdd = e.detail;
    const shoppingList = JSON.parse(window.sessionStorage.getItem('shoppingList'));

    if (shoppingList) {
      const product = shoppingList.find(item => item.productId === productToAdd.productId);
      let newShoppingList;

      if (product) {
        // update amount
        newShoppingList = shoppingList.map(item =>
          item.productId === productToAdd.productId ? { ...item, amount: productToAdd.amount } : item
        );
      } else {
        // add to shopping list
        newShoppingList = [ ...shoppingList, productToAdd ];
      }

      window.sessionStorage.setItem('shoppingList', JSON.stringify(newShoppingList));

    } else {
      window.sessionStorage.setItem('shoppingList', JSON.stringify([e.detail]));
    }
  }

  constructor() { }

  ngOnInit() {

  }
}
