

//Component imports
import App from './App.jsx';
import Store from './Redux/Store.js';
//css imports
import './index.css';
//Library import
import {Toaster} from 'react-hot-toast'
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';




ReactDOM.createRoot(document.getElementById('root')).render(
   <Provider store={Store}>
<BrowserRouter>
<App />
<Toaster/>
</BrowserRouter>

</Provider>





 

)
