import Topbar from './MainPageComponents/Topbar';
import Line3 from './MainPageComponents/Line3';
import ClientToggle from './MainPageComponents/ClientToggle';
import Searchbar from './MainPageComponents/Searchbar';

function App() {
  return (
    <div className="App">
      <Topbar/>
      <Searchbar/>
      <Line3/>
      <svg width="1104" height="4" viewBox="0 0 1104 4" fill="none" xmlns="http://www.w3.org/2000/svg" style = {{paddingLeft: '330px', paddingBottom: '20px'}}>
      <path d="M0 2L1104 2.35158" stroke="#C4C4C4" stroke-opacity="0.5" stroke-width="2.08177"/>
      </svg>
      <ClientToggle/>
    </div>
  );
}

export default App;
