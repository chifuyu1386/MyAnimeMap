import { ReactNode } from "react"
import Navbar from "../Navbar/Navbar"

type LayoutProps = {
  children: ReactNode
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050B18]">

      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-[-10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[120px]" />

        <div className="absolute right-[-10%] top-[30%] h-[450px] w-[450px] rounded-full bg-blue-500/15 blur-[120px]" />

        <div className="absolute bottom-[-15%] left-[30%] h-[500px] w-[500px] rounded-full bg-indigo-600/10 blur-[140px]" />
      </div>

      <Navbar />

      <main className="relative z-10">
        {children}
      </main>

    </div>
  )
}

export default Layout