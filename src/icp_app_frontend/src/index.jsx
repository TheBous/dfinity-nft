import './app.css';

import React from "react";
import { createRoot } from "react-dom/client";
import App from './components/App';

const container = document.getElementById('app');
const root = createRoot(container); // React 18
root.render(<App />);