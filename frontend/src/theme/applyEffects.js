/**
 * Utility functions to apply special UI effects to DOM elements
 * This enhances the UI with sparkle, shine, and glow effects
 */

// Apply sparkle effect to elements
export const applySparkleEffect = () => {
    // Add sparkle class to buttons and interactive elements
    const buttons = document.querySelectorAll('.MuiButton-root, .MuiIconButton-root, .btn-primary, .btn-secondary');
    buttons.forEach(button => {
      button.classList.add('sparkle');
      button.classList.add('button-3d');
    });
  
    // Add shimmer text effect to headings
    const headings = document.querySelectorAll('h1, h2, .section-title');
    headings.forEach(heading => {
      heading.classList.add('shimmer-text');
    });
  };
  
  // Apply glow border effect to cards and containers
  export const applyGlowEffect = () => {
    // Add glow border to cards
    const cards = document.querySelectorAll('.MuiCard-root, .card, .feature-card, .stat-card, .testimonial-card');
    cards.forEach(card => {
      card.classList.add('glow-border');
      card.classList.add('stardust');
    });
  
    // Add floating effect to icons
    const icons = document.querySelectorAll('.MuiSvgIcon-root, .feature-icon');
    icons.forEach(icon => {
      icon.classList.add('float-icon');
    });
  };
  
  // Apply ripple effect to interactive elements
  export const applyRippleEffect = () => {
    const interactiveElements = document.querySelectorAll('.MuiButton-root, .MuiIconButton-root, .btn-primary, .btn-secondary');
    interactiveElements.forEach(element => {
      element.classList.add('ripple');
    });
  };
  
  // Initialize all effects
  export const initializeEffects = () => {
    // Wait for DOM to be fully loaded
    window.addEventListener('DOMContentLoaded', () => {
      applySparkleEffect();
      applyGlowEffect();
      applyRippleEffect();
    });
  };
  
  export default initializeEffects;