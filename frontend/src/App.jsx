import './App.css'
import Footer from './Components/Footer'
import Manager from './Components/Manager'
import Navbar from './Components/Navbar'

function App() {

  return (
    <div className="absolute -z-10 h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
      <Navbar />
      <div className='min-h-manager'>

      <Manager/>
      </div>
      <Footer />
    </div>
  )
}

export default App
