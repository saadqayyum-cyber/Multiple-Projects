import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap';
import Hero from './components/Hero';
import FilterWithCards from './components/FilterWithCards';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';

function App() {

  return (
    <div className="App">
      <Hero />
      <FilterWithCards />
      <FaqSection />
      <Footer />
    </div>
  );
}

export default App;
