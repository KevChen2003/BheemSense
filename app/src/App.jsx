import './App.css'
import Heatmap from './Heatmap';
import Navbar from './NavBar';
import Footbar from './Footbar';

function App() {

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', height:'100vh', width: '100vw' }}>
        {/* top navbar */}
        <Navbar />

        <div style={{ flexGrow: 1, backgroundColor: "#fff" }}>
          <Heatmap />
        </div>

        <Footbar />
      </div>
    </>
  )
}

export default App
