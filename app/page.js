import ContactForm from './components/ContactForm'
import Feature from './components/Feature'
import Footer from './components/Footer'
import Hero from './components/Hero'
import HowItWorks from './components/HowItWorks'
import Navbar from './components/Navbar'
import NewSec from './components/NewSec'
import Faq from './components/Faq'

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />

      <Feature />
      <HowItWorks />
      <NewSec />
      <Faq />
      <ContactForm />
      <Footer />
    </div>
  );
}
