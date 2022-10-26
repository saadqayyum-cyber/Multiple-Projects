import 'bootstrap/dist/css/bootstrap.min.css';

import Team from './Team';
import NavBar from './Navbar';
import Footer from './Footer';
import Sky from './Cloud';
import Collection from './Collection';
import CollectionStory from './CollectionStory';
import CollectionMapping from './CollectionMapping';
import CollectionCountdown from './CollectionCountdown';
import CollectionDescription from './CollectionDescription';

import { useContent } from './utils/contentfulUtils';

function App() {
  const { loading } = useContent();

  return (
    !loading && (
      <>
        <NavBar />
        <Sky />
        <CollectionDescription />
        <CollectionStory />
        <Collection />
        <CollectionCountdown />
        <CollectionMapping />
        <Team />
        <Footer />
      </>
    )
  );
}

export default App;
