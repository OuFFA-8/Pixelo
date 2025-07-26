import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ThemeService } from '../../core/services/theme.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  public cartService = inject(CartService);
  public themeService = inject(ThemeService);
  public cartItemCount = 0;

  ngOnInit(): void {

    this.cartService.cartItems$.subscribe(items => {
      this.cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    });
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  isDarkMode(): boolean {
    return this.themeService.isDarkMode();
  }

}