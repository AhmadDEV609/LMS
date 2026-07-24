import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthContextProvider } from './contextApi/AuthContext.jsx'
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { BrowserRouter } from "react-router-dom";
const stripePromise = loadStripe(
  "pk_test_51TbJliHg2EZ9VXgrMpXULhLUOo0FQ5y9Rdt7n3teqmqb6tKsvhpL0N7o8rqWX73XScVzLintWcI8FD7bPJPJuOcp00Y9DAkhVX"
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Elements stripe={stripePromise}>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </Elements>
    </BrowserRouter>
  </StrictMode >,
)
