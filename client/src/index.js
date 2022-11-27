import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from './store/store';
import { Provider} from  'react-redux'
import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import LandingPage from './components/LandingPage';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
  <Provider store={store}>
    <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/exTracker' element={<App />}/>
    </Routes>
  </Provider>
  </Router>
);

