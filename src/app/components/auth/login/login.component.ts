import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, AfterViewInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

declare var $: any; // Declare jQuery

// Interface pour les données de login
interface LoginData {
  username: string;
  password: string;
  rememberDevice: boolean;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  // Add schemas property to allow custom elements like 'iconify-icon'
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LoginComponent implements OnInit, AfterViewInit {

  // Données du formulaire de login
  loginData: LoginData = {
    username: '',
    password: '',
    rememberDevice: false
  };

  // État pour afficher/masquer le mot de passe
  showPassword: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Component initialization logic
    this.loadSavedCredentials();
  }

  ngAfterViewInit(): void {
    // Initialize JavaScript components after view is ready
    this.initializeComponents();
    this.setupPasswordToggle();
  }

  // Méthode pour basculer l'affichage du mot de passe
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    const toggleButton = document.querySelector('#togglePassword iconify-icon') as HTMLElement;
    
    if (passwordInput) {
      passwordInput.type = this.showPassword ? 'text' : 'password';
    }
    
    if (toggleButton) {
      toggleButton.setAttribute('icon', this.showPassword ? 'solar:eye-closed-linear' : 'solar:eye-linear');
    }
  }

  // Configuration du bouton de basculement du mot de passe
  private setupPasswordToggle(): void {
    setTimeout(() => {
      const toggleButton = document.getElementById('togglePassword');
      if (toggleButton) {
        toggleButton.addEventListener('click', () => this.togglePasswordVisibility());
      }
    }, 100);
  }

  // Charger les identifiants sauvegardés
  private loadSavedCredentials(): void {
    const rememberDevice = localStorage.getItem('velosi_remember_device');
    const savedUsername = localStorage.getItem('velosi_username');
    
    if (rememberDevice === 'true' && savedUsername) {
      this.loginData.username = savedUsername;
      this.loginData.rememberDevice = true;
    }
  }

  // Méthode pour gérer la soumission du formulaire
  onSubmit(): void {
    console.log('Tentative de connexion Velosi ERP:', this.loginData);
    
    // Validation des champs
    if (!this.loginData.username || !this.loginData.password) {
      this.showAlert('Veuillez remplir tous les champs obligatoires', 'warning');
      return;
    }

    // Validation du format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.loginData.username)) {
      this.showAlert('Veuillez entrer une adresse email valide', 'warning');
      return;
    }

    // Simulation d'une connexion (remplacer par votre service d'authentification)
    this.simulateLogin();
  }

  // Simulation de connexion
  private simulateLogin(): void {
    // Afficher un indicateur de chargement
    this.showAlert('Connexion en cours...', 'info');
    
    // Simuler un délai de connexion
    setTimeout(() => {
      // Simulation d'une connexion réussie
      this.showAlert('Connexion réussie ! Redirection...', 'success');
      
      // Sauvegarder la session si "Se souvenir" est coché
      if (this.loginData.rememberDevice) {
        localStorage.setItem('velosi_remember_device', 'true');
        localStorage.setItem('velosi_username', this.loginData.username);
      }
      
      // Redirection vers le dashboard
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 1500);
    }, 2000);
  }

  // Méthode pour afficher des alertes
  private showAlert(message: string, type: 'success' | 'warning' | 'info' | 'error'): void {
    // Vous pouvez remplacer ceci par votre système de notification préféré
    const alertClass = `alert-${type === 'error' ? 'danger' : type}`;
    
    // Créer un élément d'alerte temporaire
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert ${alertClass} alert-dismissible fade show position-fixed`;
    alertDiv.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    alertDiv.innerHTML = `
      <strong>${type === 'success' ? 'Succès!' : type === 'warning' ? 'Attention!' : type === 'info' ? 'Information' : 'Erreur!'}</strong>
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(alertDiv);
    
    // Supprimer l'alerte après 5 secondes
    setTimeout(() => {
      if (alertDiv.parentNode) {
        alertDiv.parentNode.removeChild(alertDiv);
      }
    }, 5000);
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
        
        // Initialize theme-specific components for login
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
    // Initialize theme-specific components for login page
    if (typeof window !== 'undefined' && (window as any).modernizeTheme) {
      (window as any).modernizeTheme.init();
    }
  }
}
