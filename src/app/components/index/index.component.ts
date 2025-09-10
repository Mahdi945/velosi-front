import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, AfterViewInit } from '@angular/core';
import { RouterModule } from '@angular/router';

declare var $: any; // Declare jQuery

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss',
  // Add schemas property to allow custom elements like 'iconify-icon'
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IndexComponent implements OnInit, AfterViewInit {

  ngOnInit(): void {
    // Component initialization logic
  }

  ngAfterViewInit(): void {
    // Initialize JavaScript components after view is ready
    this.initializeComponents();
  }

  private initializeComponents(): void {
    // Hide preloader first
    this.hidePreloader();
    
    // Initialize components that require DOM to be ready
    setTimeout(() => {
      // Initialize theme components
      if (typeof $ !== 'undefined') {
        // Initialize sidebar
        this.initializeSidebar();
        
        // Initialize other components
        this.initializeBootstrapComponents();
        
        // Initialize theme-specific components
        this.initializeThemeComponents();
      }
    }, 200);
  }

  private hidePreloader(): void {
    // Hide the preloader with fade animation
    setTimeout(() => {
      const preloader = document.querySelector('.preloader') as HTMLElement;
      if (preloader) {
        preloader.classList.add('fade-out');
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 300);
      }
    }, 500);
  }

  private initializeSidebar(): void {
    // Sidebar initialization logic
    $('.sidebartoggler').on('click', function () {
      $('.left-sidebar').toggleClass('active');
      $('.main-wrapper').toggleClass('active');
    });

    // Initialize mobile sidebar
    $('.mobile-sidebartoggler').on('click', function () {
      $('.left-sidebar').addClass('show');
    });

    $('.close-btn').on('click', function () {
      $('.left-sidebar').removeClass('show');
    });
  }

  private initializeBootstrapComponents(): void {
    // Initialize Bootstrap tooltips and other components
    if (typeof $ !== 'undefined') {
      if ($.fn.tooltip) {
        $('[data-bs-toggle="tooltip"]').tooltip();
      }
      if ($.fn.popover) {
        $('[data-bs-toggle="popover"]').popover();
      }
    }
  }

  private initializeThemeComponents(): void {
    // Initialize theme-specific components
    if (typeof window !== 'undefined' && (window as any).modernizeTheme) {
      (window as any).modernizeTheme.init();
    }
  }
}
