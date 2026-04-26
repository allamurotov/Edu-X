import './landing.css';
import './landing2.css';
import './landing3.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import DashboardPreview from './components/DashboardPreview';
import TrustStats from './components/TrustStats';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

export default function Landing() {
  return (
    <div className="landing-root">
      <Navbar />
      <Hero />
      <About />
      <TrustStats />
      <Features />
      <HowItWorks />
      <DashboardPreview />
      <ContactForm />
      <Footer />
    </div>
  );
}
