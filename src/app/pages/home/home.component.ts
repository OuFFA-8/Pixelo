import { Component, OnInit, inject, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { Product } from '../../core/models/IProduct';
import { ProductsComponent } from "../products/products.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})
export class HomeComponent implements OnInit {
  private api = inject(ApiService);
  public featuredProducts: Product[] = [];
  public loading = true;

  ngOnInit(): void {
    this.api.getProducts().subscribe({
      next: (data) => {
        this.featuredProducts = data.slice(0, 3);
        this.loading = false;
      },
      error: (err) => { 
        this.loading = false;
      }
    });
  }
}