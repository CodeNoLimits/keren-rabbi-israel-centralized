import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Register Service Worker only in production, disable in development
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
} else {
  // In development, unregister any existing service workers to prevent cache issues
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(registrations => {
      registrations.forEach(registration => {
        registration.unregister();
        console.log('SW unregistered for development');
      });
    });
  }
}

createRoot(document.getElementById("root")!).render(<App />);
