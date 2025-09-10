import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

declare var $: any; // Declare jQuery

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.scss',
  // Add schemas property to allow custom elements like 'iconify-icon'
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OtpComponent implements OnInit, AfterViewInit, OnDestroy {

  // Propriétés du composant
  otpDigits: string[] = ['', '', '', '', '', ''];
  phoneNumber: string = '+33123456789'; // Numéro masqué par défaut
  remainingTime: number = 300; // 5 minutes en secondes
  isVerifying: boolean = false;
  isResending: boolean = false;
  verificationSuccess: boolean = false;
  errorMessage: string = '';
  
  private timer: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Component initialization logic
    this.startTimer();
    this.resetMessages();
    
    // Récupérer le numéro de téléphone depuis les paramètres de route si disponible
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state?.['phoneNumber']) {
      this.phoneNumber = navigation.extras.state['phoneNumber'];
    }
  }

  ngAfterViewInit(): void {
    // Initialize JavaScript components after view is ready
    this.initializeComponents();
  }

  ngOnDestroy(): void {
    // Nettoyer le timer
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  // Gestion de la saisie OTP
  onOtpInput(event: any, index: number): void {
    const value = event.target.value;
    
    // Permettre seulement les chiffres
    if (!/^\d?$/.test(value)) {
      event.target.value = '';
      this.otpDigits[index] = '';
      return;
    }

    this.otpDigits[index] = value;

    // Auto-focus sur le champ suivant
    if (value && index < 5) {
      const nextInput = event.target.parentElement.children[index + 1];
      if (nextInput) {
        nextInput.focus();
      }
    }

    // Réinitialiser les messages d'erreur
    this.errorMessage = '';
  }

  // Gestion des touches spéciales
  onKeyDown(event: KeyboardEvent, index: number): void {
    // Backspace pour revenir au champ précédent
    if (event.key === 'Backspace' && !this.otpDigits[index] && index > 0) {
      const prevInput = (event.target as HTMLElement).parentElement?.children[index - 1] as HTMLInputElement;
      if (prevInput) {
        prevInput.focus();
        this.otpDigits[index - 1] = '';
      }
    }
    
    // Flèches pour naviguer
    if (event.key === 'ArrowLeft' && index > 0) {
      const prevInput = (event.target as HTMLElement).parentElement?.children[index - 1] as HTMLInputElement;
      if (prevInput) prevInput.focus();
    }
    
    if (event.key === 'ArrowRight' && index < 5) {
      const nextInput = (event.target as HTMLElement).parentElement?.children[index + 1] as HTMLInputElement;
      if (nextInput) nextInput.focus();
    }
  }

  // Vérifier si l'OTP est complet
  isOtpComplete(): boolean {
    return this.otpDigits.every(digit => digit !== '');
  }

  // Soumission du formulaire
  onSubmit(): void {
    if (!this.isOtpComplete()) {
      this.errorMessage = 'Veuillez saisir le code complet à 6 chiffres.';
      return;
    }

    this.resetMessages();
    this.isVerifying = true;

    const otpCode = this.otpDigits.join('');
    console.log('Code OTP saisi:', otpCode);

    // Simulation de vérification
    setTimeout(() => {
      // Ici vous pouvez ajouter la logique de vérification OTP
      if (otpCode === '123456') { // Code de test
        this.verificationSuccess = true;
        this.isVerifying = false;
        
        // Redirection après succès
        setTimeout(() => {
          this.router.navigate(['/reset-password']);
        }, 2000);
      } else {
        this.errorMessage = 'Code OTP incorrect. Veuillez réessayer.';
        this.isVerifying = false;
        // Effacer les champs
        this.otpDigits = ['', '', '', '', '', ''];
      }
    }, 2000);
  }

  // Renvoyer le code OTP
  resendOtp(): void {
    this.isResending = true;
    this.resetMessages();

    // Simulation d'envoi
    setTimeout(() => {
      console.log('Nouveau code OTP envoyé au:', this.phoneNumber);
      this.isResending = false;
      this.remainingTime = 300; // Réinitialiser le timer
      this.startTimer();
      
      // Afficher un message de succès temporaire
      const successMsg = 'Nouveau code envoyé !';
      // Vous pouvez afficher ce message dans une toast ou alert
    }, 1500);
  }

  // Formater le temps restant
  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  // Démarrer le timer
  private startTimer(): void {
    this.timer = setInterval(() => {
      if (this.remainingTime > 0) {
        this.remainingTime--;
      } else {
        clearInterval(this.timer);
      }
    }, 1000);
  }

  // Réinitialiser les messages
  private resetMessages(): void {
    this.errorMessage = '';
    this.verificationSuccess = false;
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
    // Initialize theme-specific components for OTP page
    if (typeof window !== 'undefined' && (window as any).modernizeTheme) {
      (window as any).modernizeTheme.init();
    }
  }
}
