import { useState } from "react";
import Sidebar from "../components/Sidebar";

const MainLayout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="h-screen w-screen bg-mainBackground font-montserrat text-darkBrown flex">
      <Sidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <main className="flex-1 flex flex-col">
        <header className="flex justify-between items-center py-4 px-5 flex-none">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="flex flex-col justify-center gap-1.5 w-8 h-8 cursor-pointer z-30"
          >
            <span className="block w-full h-0.5 bg-darkBrown rounded-full"></span>
            <span className="block w-3/4 h-0.5 bg-darkBrown rounded-full"></span>
          </button>
          <button className="bg-additionBackground px-6 py-2.5 rounded-full text-sm font-bold hover:opacity-90 transition">
            Оновити
          </button>
        </header>

        <div className="flex-1 flex flex-col p-4 bg-mainBackground">
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
