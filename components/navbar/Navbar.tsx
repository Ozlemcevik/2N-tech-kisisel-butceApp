import Home from "./Home"
import Rapor from "./Rapor"
import Gelir from "./Gelir"


const Navbar = async () => {
  
  return (
    <div className="flex items-center justify-between gap-3 md:gap-10 px-3 md:px:10 h-16 bg-gray-600 text-slate-100">
        <Home/>
        <Gelir/>
        <Rapor/>
    </div>
  )
}

export default Navbar