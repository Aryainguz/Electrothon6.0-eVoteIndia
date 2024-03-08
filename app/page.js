import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Feature from './components/Feature'
import HowItWorks from './components/HowItWorks'
import NewSec from './components/NewSec'

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />

      <Feature />
      <HowItWorks />
      <NewSec />
    </div>
  );
}
