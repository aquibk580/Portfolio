import Header from '@/components/Header';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <div className="bg-Mytheme text-white min-h-screen">
      <Header />
      <main className="md:px-8 px-5 py-8 md:my-0 pt-28 md:pt-32">
        <About /> 
        <Projects />
        <Skills />
        <Contact />
      </main>
      <footer className="flex justify-center gap-8 py-4">
        <a href="https://github.com/aquibk580" target="_blank" rel="noopener noreferrer">
          <img src="/github-icon.png" alt="GitHub" className="w-8 h-8" />
        </a>
        <a href="https://www.linkedin.com/in/aquib-khan-42966b292/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer">
          <img src="/LinkedIn-icon.png" alt="LinkedIn" className="w-8 h-8" />
        </a>
        <a href="https://x.com/Aquib_K_" target="_blank" rel="noopener noreferrer">
          <img src="/twitter-icon.png" alt="Twitter" className="w-8 h-8" />
        </a>
      </footer>
    </div>
  );
}
