import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/IProduct';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  private apiUrl = 'https://fakestoreapi.com';

  getProducts() {
    return this.http.get<Product[]>(`${this.apiUrl}/products`);
  }

  getProductById(id: number) {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`);
  }
}
