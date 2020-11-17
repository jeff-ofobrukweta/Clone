import '../styles/index.scss';
import './http.js';
import './custom-dom.js';

if (process.env.NODE_ENV === 'development') {
  require('../index.html'); 
}


console.log('buycoin webpack starterkit');
