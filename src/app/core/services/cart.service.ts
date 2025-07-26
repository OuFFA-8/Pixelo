import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../models/IProduct'; 

export interface CartItem extends Product {
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private platformId = inject(PLATFORM_ID);
  private toastr = inject(ToastrService);

  private cartItems = new BehaviorSubject<CartItem[]>([]);
  public readonly cartItems$ = this.cartItems.asObservable();

  constructor() {
    this.loadCartFromLocalStorage();
  }

  addToCart(product: Product): void {
    const currentItems = this.cartItems.getValue();
    const existingItem = currentItems.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      currentItems.push({ ...product, quantity: 1 });
    }

    this.updateCart(currentItems);
    this.toastr.success(product.title, 'Added to Cart!', {
      closeButton: true,
      progressBar: true,
    });
  }

  increaseQuantity(productId: number): void {
    const currentItems = this.cartItems.getValue();
    const item = currentItems.find(i => i.id === productId);
    if (item) {
      item.quantity++;
      this.updateCart(currentItems);
    }
  }

  decreaseQuantity(productId: number): void {
    let currentItems = this.cartItems.getValue();
    const itemIndex = currentItems.findIndex(i => i.id === productId);

    if (itemIndex > -1) {
      if (currentItems[itemIndex].quantity > 1) {
        currentItems[itemIndex].quantity--;
        this.updateCart(currentItems);
      } else {
        this.removeFromCart(productId);
      }
    }
  }

  removeFromCart(productId: number): void {
    const updatedItems = this.cartItems.getValue().filter(item => item.id !== productId);
    this.updateCart(updatedItems);
  }

  clearCart(): void {
    this.updateCart([]);
  }

  private updateCart(items: CartItem[]): void {
    this.cartItems.next(items);
    this.saveCartToLocalStorage();
  }

  private loadCartFromLocalStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        this.cartItems.next(JSON.parse(storedCart));
      }
    }
  }

  private saveCartToLocalStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('cart', JSON.stringify(this.cartItems.getValue()));
    }
  }
}