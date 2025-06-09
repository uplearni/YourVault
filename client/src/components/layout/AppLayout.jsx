import {Navbar} from "../shared/Navbar";
import {Side} from "../shared/Side"

export default function AppLayout({ children }) {
   // console.log("AppLayout rendered");
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar/>

      <div className="flex flex-1 pt-16">
        <div className="w-1/5" />
      <Side/>
        <main className="flex-1 p-6 bg-gray-50 dark:bg-gray-800 min-h-[calc(100vh-64px)]">
          {children}
        </main>
      </div>
    </div>
  );
}
