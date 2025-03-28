import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
// Import our CSS file with Tailwind directives
import './index.css';
// Import enhanced UI styles with special effects
import './theme/enhanced-styles.css';
// Import additional animations and effects
import './theme/animations.css';
import App from './App';
import store from './store';
// Import the alert service for initialization
import './services/alertService';
// Import custom theme provider
import { ThemeProvider } from './theme/ThemeContext';
// Import UI effects initializer
import initializeEffects from './theme/applyEffects';

// Theme configuration moved to src/theme/index.js

// Initialize UI effects
initializeEffects();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);