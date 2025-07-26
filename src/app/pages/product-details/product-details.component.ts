import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { CartService } from '../../core/services/cart.service';
import { Product } from '../../core/models/IProduct';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ] 
})
export class ProductDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private api = inject(ApiService);
  private cartService = inject(CartService);

  product: Product | undefined;
  loading = true;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.api.getProductById(+id).subscribe({
        next: (data) => {
          this.product = data;
          this.loading = false;
        },
        error: (err) => {
          this.loading = false;
        }
      });
    }
  }

  addProductToCart() {
    if (this.product) {
      this.cartService.addToCart(this.product);
    }
  }
}