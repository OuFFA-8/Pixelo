import { RouterOutlet } from '@angular/router';
import { ThemeService } from './core/services/theme.service';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { Component, OnInit, inject } from '@angular/core';
import { FooterComponent } from "./layouts/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  private themeService = inject(ThemeService);
  ngOnInit(): void {
    this.themeService.initTheme();
  }
}