import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import Home from './components/Home/Home';
import ExtendedImage from './components/Image/ExtendedImage';
import { FilterProvider } from './context/FilterContext';
import { ImageProvider } from './context/ImageContext';

function App() {
  return (
    <BrowserRouter>
    <ToastContainer />
    <ImageProvider>
    <FilterProvider>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/asset/:id' element={<ExtendedImage />} />
      </Routes> 
    </FilterProvider>     
    </ImageProvider>
    
    </BrowserRouter>
  );
}

export default App;
