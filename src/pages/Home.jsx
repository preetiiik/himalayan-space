import Hero from '../components/Hero'
import About from '../components/About'
import MoonBanner from '../components/MoonBanner'
import Specialties from '../components/Specialties'
import Facts from '../components/Facts'
import Programs from '../components/Programs'
import Labs from '../components/Labs'
import Team from '../components/Team'
import Gallery from '../components/Gallery'
import ContactSection from '../components/ContactSection'
import CTA from '../components/CTA'

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <MoonBanner />
      <Specialties />
      <Facts />
      <Programs />
      <Labs />
      <Team />
      <Gallery />
      <ContactSection />
      <CTA />
    </>
  )
}
