import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input('product') product: Product
  @Input('show-actions') showActions = true
  @Input('shopping-cart') shoppingCart

  constructor(private cartService: ShoppingCartService) {

  }
  ngOnInit(): void {

  }

  addToCart() {
    this.cartService.addToCart(this.product)
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product)
  }

  getQuantity() {
    if (this.shoppingCart) {

      const item = this.shoppingCart[this.product.key]
      //console.log('item', item)
      return item ? item.quantity : 0
    }
    return 110

  }


}
