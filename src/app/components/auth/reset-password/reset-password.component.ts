import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, AfterViewInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

declare var $: any; // Declare jQuery

// Interface pour les données de reset password
interface ResetData {
  newPassword: string;
  confirmPassword: string;
}

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
  // Add schemas property to allow custom elements like 'iconify-icon'
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ResetPasswordComponent implements OnInit, AfterViewInit {

  // Données du formulaire de reset
  resetData: ResetData = {
    newPassword: '',
    confirmPassword: ''
  };

  // Variables d'état
  isResetting: boolean = false;
  resetSuccess: boolean = false;
  errorMessage: string = '';
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  passwordStrength: number = 0;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Component initialization logic
    this.resetMessages();
  }

  ngAfterViewInit(): void {
    // Initialize JavaScript components after view is ready
    this.initializeComponents();
  }

  // Basculer la visibilité du mot de passe
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  // Basculer la visibilité de la confirmation du mot de passe
  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  // Vérifier si les mots de passe correspondent
  passwordsMatch(): boolean {
    return this.resetData.newPassword === this.resetData.confirmPassword;
  }

  // Vérifier la longueur minimale
  hasMinLength(): boolean {
    return this.resetData.newPassword.length >= 8;
  }

  // Vérifier la présence de majuscules
  hasUpperCase(): boolean {
    return /[A-Z]/.test(this.resetData.newPassword);
  }

  // Vérifier la présence de minuscules
  hasLowerCase(): boolean {
    return /[a-z]/.test(this.resetData.newPassword);
  }

  // Vérifier la présence de chiffres
  hasNumber(): boolean {
    return /\d/.test(this.resetData.newPassword);
  }

  // Vérifier la présence de caractères spéciaux
  hasSpecialChar(): boolean {
    return /[!@#$%^&*(),.?":{}|<>]/.test(this.resetData.newPassword);
  }

  // Calculer la force du mot de passe
  checkPasswordStrength(): void {
    let strength = 0;
    const password = this.resetData.newPassword;

    if (password.length >= 8) strength += 20;
    if (password.length >= 12) strength += 10;
    if (this.hasUpperCase()) strength += 20;
    if (this.hasLowerCase()) strength += 20;
    if (this.hasNumber()) strength += 20;
    if (this.hasSpecialChar()) strength += 10;

    this.passwordStrength = Math.min(strength, 100);
  }

  // Obtenir la classe CSS pour la barre de progression
  getPasswordStrengthClass(): string {
    if (this.passwordStrength < 30) return 'bg-danger';
    if (this.passwordStrength < 60) return 'bg-warning';
    if (this.passwordStrength < 80) return 'bg-info';
    return 'bg-success';
  }

  // Obtenir le texte de force du mot de passe
  getPasswordStrengthText(): string {
    if (this.passwordStrength < 30) return 'Faible';
    if (this.passwordStrength < 60) return 'Moyen';
    if (this.passwordStrength < 80) return 'Bon';
    return 'Excellent';
  }

  // Obtenir la classe CSS pour le texte de force
  getPasswordStrengthTextClass(): string {
    if (this.passwordStrength < 30) return 'text-danger fw-bold';
    if (this.passwordStrength < 60) return 'text-warning fw-bold';
    if (this.passwordStrength < 80) return 'text-info fw-bold';
    return 'text-success fw-bold';
  }

  // Soumission du formulaire
  onSubmit(): void {
    this.resetMessages();

    // Validation des critères
    if (!this.hasMinLength()) {
      this.errorMessage = 'Le mot de passe doit contenir au moins 8 caractères.';
      return;
    }

    if (!this.hasUpperCase() || !this.hasLowerCase() || !this.hasNumber()) {
      this.errorMessage = 'Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre.';
      return;
    }

    if (!this.passwordsMatch()) {
      this.errorMessage = 'Les mots de passe ne correspondent pas.';
      return;
    }

    this.isResetting = true;

    // Simulation de reset password
    setTimeout(() => {
      console.log('Reset password pour:', this.resetData);
      
      // Ici vous pouvez ajouter la logique de reset password via API
      // Pour l'instant, on simule un succès
      this.resetSuccess = true;
      this.isResetting = false;
      
      // Redirection vers login après succès
      setTimeout(() => {
        this.router.navigate(['/login'], {
          state: { 
            message: 'Mot de passe réinitialisé avec succès. Vous pouvez maintenant vous connecter.',
            type: 'success'
          }
        });
      }, 2000);
      
    }, 2000); // Simulation de 2 secondes de traitement
  }

  // Réinitialiser les messages
  private resetMessages(): void {
    this.errorMessage = '';
    this.resetSuccess = false;
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
    // Initialize theme-specific components for reset password page
    if (typeof window !== 'undefined' && (window as any).modernizeTheme) {
      (window as any).modernizeTheme.init();
    }
  }
}
