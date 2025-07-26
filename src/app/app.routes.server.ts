import { RenderMode, ServerRoute } from '@angular/ssr';
import { Routes } from '@angular/router';


export const serverRoutes: ServerRoute[] = [
   {
    path: 'products/:id',
    renderMode: RenderMode.Server, 
  },
  {
    path: 'cart',
    renderMode: RenderMode.Server, 
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];

