import {Navbar} from "../shared/Navbar";
import {Side} from "../shared/Side"

export default function AppLayout({ children }) {
   // console.log("AppLayout rendered");
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar/>

      <div className="flex  pt-16">
        <div className="w-1/5" />
      <Side/>
        <main className="pt-16 ml-[20%] p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
