import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, AfterViewInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

declare var $: any; // Declare jQuery

// Interface pour les données de récupération
interface ForgotData {
  email: string;
}

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss',
  // Add schemas property to allow custom elements like 'iconify-icon'
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ForgetPasswordComponent implements OnInit, AfterViewInit {

  // Données du formulaire de récupération
  forgotData: ForgotData = {
    email: ''
  };

  // Variables d'état
  isLoading: boolean = false;
  emailSent: boolean = false;
  errorMessage: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Component initialization logic
    this.resetMessages();
  }

  ngAfterViewInit(): void {
    // Initialize JavaScript components after view is ready
    this.initializeComponents();
  }

  // Méthode pour gérer la soumission du formulaire
  onSubmit(): void {
    this.resetMessages();
    this.isLoading = true;

    // Validation de l'email
    if (!this.forgotData.email || !this.isValidEmail(this.forgotData.email)) {
      this.errorMessage = 'Veuillez saisir une adresse email valide.';
      this.isLoading = false;
      return;
    }

    // Vérification du domaine Velosi (optionnel)
    if (!this.forgotData.email.includes('@velosi.')) {
      this.errorMessage = 'Veuillez utiliser votre adresse email professionnelle Velosi.';
      this.isLoading = false;
      return;
    }

    // Simulation d'envoi d'email
    setTimeout(() => {
      console.log('Demande de récupération pour:', this.forgotData.email);
      
      // Ici vous pouvez ajouter la logique d'envoi d'email/SMS
      // Pour l'instant, on simule un succès et redirige vers OTP
      this.emailSent = true;
      this.isLoading = false;
      
      // Redirection vers la page OTP après 2 secondes
      setTimeout(() => {
        this.router.navigate(['/otp'], { 
          state: { 
            email: this.forgotData.email,
            fromForgotPassword: true 
          } 
        });
      }, 2000);
      
    }, 2000); // Simulation de 2 secondes de traitement
  }

  // Validation de l'email
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  // Réinitialiser les messages
  private resetMessages(): void {
    this.errorMessage = '';
    this.emailSent = false;
  }

  private initializeComponents(): void {
    // Hide preloader first
    this.hidePreloader();
    
    // Initialize components that require DOM to be ready
    setTimeout(() => {
      // Initialize theme components
      if (typeof $ !== 'undefined') {
        // Initialize Bootstrap components
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
    // Initialize theme-specific components for forgot password page
    if (typeof window !== 'undefined' && (window as any).modernizeTheme) {
      (window as any).modernizeTheme.init();
    }
  }
}
