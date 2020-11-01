import { Component, OnInit, HostListener } from '@angular/core';
import { productMock } from '../../mock/product';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {
  productMock = productMock;
  shoppingList;
  shoppingListTotal = 0;

  @HostListener('removeFromShoppingList', ['$event'])
  removeFromShoppingList(e) {
    const shoppingList = JSON.parse(window.sessionStorage.getItem('shoppingList'));
    const newShoppingList = shoppingList.filter(item => item.productId !== e.detail.productId);

    newShoppingList.length === 0
      ? window.sessionStorage.removeItem('shoppingList')
      : window.sessionStorage.setItem('shoppingList', JSON.stringify(newShoppingList));

    this.getShoppingList();
    this.getShoppingListTotal();
  }

  constructor() { }

  ngOnInit() {
    this.getShoppingList();
    this.getShoppingListTotal();
  }

  getShoppingList() {
    const shoppingListStorage = JSON.parse(window.sessionStorage.getItem('shoppingList'));
    this.shoppingList = !shoppingListStorage ? null : shoppingListStorage.map(item => {
      return {
        productId: item.productId,
        productTitle: productMock.find(product => product.productId === item.productId).productTitle,
        shortDescription: productMock.find(product => product.productId === item.productId).shortDescription,
        price: productMock.find(product => product.productId === item.productId).price,
        shoppingListAmount: item.amount
      };
    });
  }

  getShoppingListTotal() {
    this.shoppingListTotal = !this.shoppingList
      ? 0
      : this.shoppingList.map(item => item.price * item.shoppingListAmount).reduce((a, b) => a + b, 0);
  }

}
