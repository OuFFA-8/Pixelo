import { Injectable, PLATFORM_ID, Renderer2, RendererFactory2, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer: Renderer2;
  private colorTheme: 'light' | 'dark' = 'light';
  
  private platformId = inject(PLATFORM_ID);

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  initTheme() {
    if (isPlatformBrowser(this.platformId)) {
      this.colorTheme = localStorage.getItem('user-theme') as 'light' | 'dark' || 'light';
      this.updateBodyClass();
    }
  }

  toggleTheme() {
    this.colorTheme = this.colorTheme === 'light' ? 'dark' : 'light';
    
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('user-theme', this.colorTheme);
    }
    
    this.updateBodyClass();
  }
  
  isDarkMode() {
    return this.colorTheme === 'dark';
  }

  private updateBodyClass() {
    if (isPlatformBrowser(this.platformId)) {
      if (this.colorTheme === 'dark') {
        this.renderer.addClass(document.documentElement, 'dark');
      } else {
        this.renderer.removeClass(document.documentElement, 'dark');
      }
    }
  }
}