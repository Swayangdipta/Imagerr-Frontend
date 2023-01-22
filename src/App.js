import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import Home from './components/Home/Home';
import { FilterProvider } from './context/FilterContext';
import { ImageProvider } from './context/ImageContext';

function App() {
  return (
    <BrowserRouter>
    <ToastContainer />
    <FilterProvider>
    <ImageProvider>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>      
    </ImageProvider>
    </FilterProvider>
    </BrowserRouter>
  );
}

export default App;
