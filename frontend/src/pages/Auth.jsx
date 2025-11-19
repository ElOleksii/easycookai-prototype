import { useState, useEffect } from "react";
import { FaApple, FaArrowLeft, FaGoogle } from "react-icons/fa";
import { supabase } from "../api/supabaseClient";
import EasyCookAILogo from "../assets/icons/easycooklogo.svg";
import { useUser } from "../storage/UserContext";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Input = ({ placeholder, type = "text", value, setValue }) => (
  <div className="relative group">
    <input
      type={type}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-additionBackground text-darkBrown font-montserrat py-4 px-6 rounded-2xl outline-none transition-all border border-transparent"
    />
    <style jsx>{`
      input::placeholder {
        color: #74512d;
        opacity: 0.7;
      }
      input:focus {
        box-shadow: 0 0 0 2px #74512d 40;
      }
    `}</style>
  </div>
);

const SocialButton = ({ icon, onClick }) => (
  <button
    onClick={onClick}
    className="w-12 cursor-pointer h-12 bg-additionBackground text-darkBrown rounded-full flex items-center justify-center shadow-sm  transition-transform"
  >
    {icon}
  </button>
);

export default function Auth() {
  const { user, loading } = useUser();
  const [currentView, setCurrentView] = useState("welcome");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [registerFirstName, setRegisterFirstName] = useState("");
  const [registerLastName, setRegisterLastName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");

  const navigate = useNavigate();

  const goBack = () => setCurrentView("welcome");

  useEffect(() => {
    if (!loading && user) {
      navigate("/", { replace: true });
    }
  }, [user, loading, navigate]);

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password: loginPassword,
    });
    if (error) toast.error(error.message);
  };

  const handleRegister = async () => {
    if (registerPassword !== registerConfirmPassword) {
      toast.error("Паролі не співпадають");
      return;
    }

    const { error } = await supabase.auth.signUp({
      email: registerEmail,
      password: registerPassword,
    });
    if (error) toast.error(error.message);
    else toast.success("Перевірте email для підтвердження");
  };

  const handleLoginWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) toast.error(error.message);
  };

  const WelcomeScreen = (
    <div className="flex flex-col items-center justify-center h-full w-full px-8 animate-in fade-in duration-500">
      <div className="mb-12 flex flex-col items-center">
        <div className="relative w-24 h-24 mb-4">
          <img
            src={"/icons/easycooklogo.svg"}
            alt="logo"
            className="w-full h-full"
          />
        </div>
        <h1 className="text-3xl text-darkBrown font-montserrat font-bold tracking-wide">
          EasyCookAI
        </h1>
      </div>

      <div className="w-full max-w-xs space-y-4">
        <button
          onClick={() => setCurrentView("login")}
          className="w-full cursor-pointer font-montserrat bg-darkBrown py-4 rounded-full text-[#FDF8EF] text-xl font-semibold shadow-lg hover:opacity-90 transition-opacity"
        >
          Вхід
        </button>

        <div className="flex items-center gap-4">
          <div className="h-[1px] border-brown flex-1 text-brown border-t opacity-30"></div>
          <span className="text-sm font-medium">або</span>
          <div className="h-[1px] border-brown flex-1 border-t opacity-30"></div>
        </div>

        <button
          onClick={() => setCurrentView("register")}
          className="w-full cursor-pointer bg-additionBackground text-darkBrown font-montserrat py-4 rounded-full text-xl font-semibold shadow-md hover:brightness-95 transition-all"
        >
          Реєстрація
        </button>
      </div>

      <div className="mt-8 flex gap-6">
        <SocialButton
          onClick={handleLoginWithGoogle}
          icon={<FaGoogle size={20} />}
        />
        <SocialButton icon={<FaApple size={24} />} />
      </div>
    </div>
  );

  const LoginScreen = (
    <div className="flex flex-col h-full w-full px-8 pt-12 animate-in slide-in-from-right duration-300">
      <div className="space-y-6 w-full max-w-xs mx-auto mt-10">
        <Input
          placeholder="Email"
          value={loginEmail}
          setValue={setLoginEmail}
        />
        <Input
          placeholder="Пароль"
          type="password"
          value={loginPassword}
          setValue={setLoginPassword}
        />

        <div className="flex justify-end pt-4">
          <button
            onClick={handleLogin}
            className="px-10 py-3 font-montserrat cursor-pointer bg-darkBrown rounded-full text-[#FDF8EF] text-lg font-bold shadow-lg hover:opacity-90 transition-transform active:scale-95"
          >
            Вхід
          </button>
        </div>
      </div>
    </div>
  );

  const RegisterScreen = (
    <div className="flex flex-col h-full w-full px-8 pt-12 animate-in slide-in-from-right duration-300">
      <div className="space-y-4 w-full max-w-xs mx-auto">
        <Input
          placeholder="Ім'я"
          value={registerFirstName}
          setValue={setRegisterFirstName}
        />
        <Input
          placeholder="Прізвище"
          value={registerLastName}
          setValue={setRegisterLastName}
        />
        <Input
          placeholder="Email"
          type="email"
          value={registerEmail}
          setValue={setRegisterEmail}
        />
        <Input
          placeholder="Пароль"
          type="password"
          value={registerPassword}
          setValue={setRegisterPassword}
        />
        <Input
          placeholder="Підтвердити пароль"
          type="password"
          value={registerConfirmPassword}
          setValue={setRegisterConfirmPassword}
        />

        <div className="flex justify-end pt-6">
          <button
            onClick={handleRegister}
            className="px-8 py-3 cursor-pointer bg-darkBrown font-montserrat rounded-full text-[#FDF8EF] text-lg font-bold shadow-lg hover:opacity-90 transition-transform active:scale-95"
          >
            Реєстрація
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-mainBackground w-full flex items-center justify-center font-sans">
      {currentView !== "welcome" && (
        <button
          onClick={goBack}
          className="absolute top-4 left-4 z-50 cursor-pointer text-darkBrown transition-transform"
        >
          <FaArrowLeft size={32} />
        </button>
      )}
      <div className="w-full h-full overflow-y-auto scrollbar-hide">
        {currentView === "welcome" && WelcomeScreen}
        {currentView === "login" && LoginScreen}
        {currentView === "register" && RegisterScreen}
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
