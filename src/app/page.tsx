import About from "../containers/About"
import Header from "../containers/Header"
import Skills from "../containers/Skills"
import Projects from "../containers/Projects"
import Contact from "../containers/Contact"
import Github from "../containers/Github"
import Wakatime from "../containers/Wakatime"

const page = () => {
  return (
    <div className="w-full min-h-svh md:py-[3vh] py-10 flex items-center justify-center">
      <div className="lg:w-[55rem] w-full lg:px-0 px-6 h-full flex flex-col gap-4">
        <Header />
        <About />
        <Skills />
        <Projects />
        <Contact />
        <div className="w-full flex items-center justify-between">
          <Wakatime />
          <Github />
        </div>
      </div>
    </div>
  )
}

export default page