import {Navbar} from "../shared/Navbar";
import {Side} from "../shared/Side"

export default function AppLayout({ children }) {
   // console.log("AppLayout rendered");
  return (
        <div className="min-h-screen flex flex-col">
    <Navbar/>

    <div className="flex  flex-1">
    <Side/>
        
    <main className="flex-1 p-6 pt-16 ml-0 md:ml-[20%] "//pt-16 ensure the main content start below the navbar height
          role="main"
          aria-label="Main Content">
          {children}
    </main>
    </div>
    </div>
  );
}
