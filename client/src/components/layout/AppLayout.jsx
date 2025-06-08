import {Navbar} from "../shared/Navbar";
import {Side} from "../shared/Side"

export default function AppLayout({ children }) {
   // console.log("AppLayout rendered");
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar/>

      <div className="flex flex-1">
      <Side/>

        <main className="flex-1 p-4 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}
