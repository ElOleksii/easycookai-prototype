import { BiBook, BiHistory } from "react-icons/bi";
import { PiCookingPotDuotone } from "react-icons/pi";
import { CiSettings } from "react-icons/ci";
import { useUser } from "../storage/UserContext";
import { supabase } from "../api/supabaseClient";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ isOpen, onClose }) => {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const { user } = useUser();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      onClose();
      setUser(null);
      navigate("/auth");
    }
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed top-0 left-0 h-full w-[75%] max-w-[300px] bg-additionBackground z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full text-darkBrown font-montserrat">
          <div className="p-6 border-b border-darkBrown/20 flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-mainBackground border border-darkBrown flex items-center justify-center shrink-0">
              <svg viewBox="0 0 24 24" className="w-8 h-8 fill-darkBrown">
                <path d="M12 2C9.5 2 7.5 3.5 7.5 6C7.5 7.5 8.5 8.5 9.5 9C9 11.5 7.5 12 7 12.5C7 12.5 5 14 5 16H19C19 14 17 12.5 17 12.5C16.5 12 15 11.5 14.5 9C15.5 8.5 16.5 7.5 16.5 6C16.5 3.5 14.5 2 12 2ZM7 17V18H17V17H7ZM12 3.5C13.5 3.5 14.5 4.5 14.5 6C14.5 7.5 13.5 8 12 8C10.5 8 9.5 7.5 9.5 6C9.5 4.5 10.5 3.5 12 3.5Z" />
              </svg>
            </div>
            <span className="font-bold text-sm break-words">{user?.email}</span>
          </div>

          <nav className="flex flex-col flex-1">
            <MenuItem
              icon={<BiBook />}
              text="Генерація"
              to="/"
              onClose={onClose}
            />
            <MenuItem
              disabled
              icon={<PiCookingPotDuotone />}
              text="Збережене"
            />
            <MenuItem disabled icon={<BiHistory />} text="Історія" />
            <MenuItem disabled icon={<CiSettings />} text="Налаштування" />

            {user && (
              <button
                onClick={handleLogout}
                className="flex items-center gap-4 px-6 py-4 mt-auto border-t border-darkBrown cursor-pointer transition text-left text-red-600 font-medium"
              >
                Вийти
              </button>
            )}
          </nav>
        </div>
      </div>
    </>
  );
};

const MenuItem = ({ icon, text, to, disabled = false, onClose }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (disabled) return;
    if (to) navigate(to);
    if (onClose) onClose();
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`flex items-center gap-4 px-6 py-4 border-b border-darkBrown/10 text-left transition
        ${
          disabled
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-black/5 active:bg-black/10 cursor-pointer"
        }`}
    >
      <span className="w-6 h-6 flex items-center justify-center">{icon}</span>
      <span className="font-medium text-sm">{text}</span>
    </button>
  );
};

export default Sidebar;
