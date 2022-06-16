import './App.css';
import Compressor_ from './components/compressor/compressor';

function App() {
  return (
    <div className="App">
        <div className="_container">
          <div className="_container_content">
            <div className="_wrapper">
              <Compressor_ />
            </div>
          </div>
          <footer className='_footer'>
            <div className="_footer_top_border"></div>
            <p>Copyright &copy; by <a href="https://web.facebook.com/profile.php?id=100043143293016">Mevlan Meraj</a> || {`${new Date().getFullYear()}__💔`}</p>
          </footer>
        </div>

    </div>
  );
}

export default App;
