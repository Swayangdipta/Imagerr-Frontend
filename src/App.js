import { FilterProvider } from './context/FilterContext';
import { ImageProvider } from './context/ImageContext';
import Routing from './Routing';

function App() {
  return (
    <ImageProvider>
      <FilterProvider>
        <Routing />
      </FilterProvider>
    </ImageProvider>
  );
}

export default App;
