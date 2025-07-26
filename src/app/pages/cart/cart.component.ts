import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService, CartItem } from '../../core/services/cart.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  private cartService = inject(CartService);

  public cartItems$!: Observable<CartItem[]>;
  public subtotal$!: Observable<number>;
  public totalItems$!: Observable<number>;

  ngOnInit(): void {
    this.cartItems$ = this.cartService.cartItems$;

    this.subtotal$ = this.cartItems$.pipe(
      map(items => items.reduce((sum, item) => sum + (item.price * item.quantity), 0))
    );

    this.totalItems$ = this.cartItems$.pipe(
      map(items => items.reduce((sum, item) => sum + item.quantity, 0))
    );
  }

  increase(productId: number): void {
    this.cartService.increaseQuantity(productId);
  }

  decrease(productId: number): void {
    this.cartService.decreaseQuantity(productId);
  }

  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
  }
}