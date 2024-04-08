import './App.css';
import Products from './Products';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Products />
    </Provider>
  );
}

export default App;
