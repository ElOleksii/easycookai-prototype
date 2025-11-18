import MainLayout from "./MainLayout";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import Chat from "../components/Chat";

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <MainLayout>
      <Sidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <div className="flex-1 flex flex-col">
        <h1 className="text-center text-4xl font-extrabold py-4 flex-none">
          Почнемо готувати
        </h1>
        <Chat />
      </div>
    </MainLayout>
  );
};

export default Home;
