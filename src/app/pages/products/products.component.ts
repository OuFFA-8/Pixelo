import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/services/api.service';
import { Product } from '../../core/models/IProduct'; 

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {


  private api = inject(ApiService);

  private allProducts: Product[] = []; 
  public products: Product[] = [];      
  public searchTerm = '';               
  public selectedSort = 'Default';      
  public loading = true;

  public categories: string[] = [];
  public selectedCategory: string = 'All';

  ngOnInit(): void {
    this.loading = true; 
    this.api.getProducts().subscribe({
      next: (data) => {
        this.allProducts = data;
        this.products = data;
        
        const uniqueCategories = new Set(data.map(p => p.category));
        this.categories = ['All', ...uniqueCategories];

        this.loading = false; 
      },
      error: (err) => {
        this.loading = false;
      }
    });
  }

  onSelectCategory(category: string): void {
    this.selectedCategory = category;
    this.applyFiltersAndSort();
  }

  onSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchTerm = inputElement.value;
    this.applyFiltersAndSort();
  }

  onSort(sortOption: string): void {
    this.selectedSort = sortOption;
    this.applyFiltersAndSort();
  }

  private applyFiltersAndSort(): void {
    let filteredProducts = [...this.allProducts];

    if (this.selectedCategory !== 'All') {
      filteredProducts = filteredProducts.filter(product => 
        product.category === this.selectedCategory
      );
    }

    if (this.searchTerm) {
      filteredProducts = filteredProducts.filter(product =>
        product.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    if (this.selectedSort === 'Price: Low to High') {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (this.selectedSort === 'Price: High to Low') {
      filteredProducts.sort((a, b) => b.price - a.price);
    } else if (this.selectedSort === 'Name: A-Z') {
      filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
    }

    this.products = filteredProducts;
  }
}