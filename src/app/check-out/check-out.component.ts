import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';
import { Subscription } from 'rxjs';
import { OrderService } from '../order.service';
import { AuthService } from '../auth.service';
import { Order } from '../models/order';
import { Router } from '@angular/router';

@Component({
  selector: 'check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {

  shipping = {}
  cart: ShoppingCart
  userId: string
  cartSubscription: Subscription
  userSubscription: Subscription


  constructor(
    private shoppingCartService: ShoppingCartService,
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router
    ) { }

  async ngOnInit() {
    let cart$ = await this.shoppingCartService.getCart()
    this.cartSubscription = cart$.subscribe(cart => this.cart = cart)
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid)
  }

  async placeOrder() {

    let order = new Order(this.userId, this.shipping, this.cart)
    let result = await this.orderService.placeOrder(order)
    this.router.navigate(['/order-success', result.key])

  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe()
    this.userSubscription.unsubscribe()
  }
}
