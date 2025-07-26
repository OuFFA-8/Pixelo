import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path: '',
        loadComponent: () => import('./pages/home/home.component').then(c => c.HomeComponent)
    },

    {
        path: 'products',
        loadComponent: () => import('./pages/products/products.component').then(c => c.ProductsComponent)
    },
    {
        path: 'products/:id',
        loadComponent: () => import('./pages/product-details/product-details.component').then(c => c.ProductDetailsComponent)
    },
    {
        path: 'cart',
        loadComponent: () => import('./pages/cart/cart.component').then(c => c.CartComponent)
    },

    { path: '**', redirectTo: '' }
];
