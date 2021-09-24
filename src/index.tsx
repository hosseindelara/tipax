import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ProviderContext from './context/ProviderContext';
import '../node_modules/react-toastify/dist/ReactToastify.css'
ReactDOM.render(
  <ProviderContext>
    <App />
  </ProviderContext> ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
