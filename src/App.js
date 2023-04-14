import { CategorizedImageProvider } from './context/CategorizedImageContext';
import { FilterProvider } from './context/FilterContext';
import { ImageProvider } from './context/ImageContext';
import { SearchResultProvider } from './context/SearchResultContext';
import Routing from './Routing';

function App() {
  return (
    <CategorizedImageProvider>
      <SearchResultProvider>
        <ImageProvider>
          <FilterProvider>
            <Routing />
          </FilterProvider>
        </ImageProvider>
      </SearchResultProvider>
    </CategorizedImageProvider>
  );
}

export default App;
