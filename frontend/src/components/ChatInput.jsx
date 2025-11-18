import { useState } from "react";
import { FaArrowRight, FaCamera } from "react-icons/fa";

const ChatInput = ({ onSend, loading }) => {
  const [value, setValue] = useState("");

  const handleSend = () => {
    if (!value.trim()) return;
    onSend(value);
    setValue("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const styles = {
    darkBrown: "bg-[#5E4032]",
    darkBrownText: "text-[#5E4032]",
    darkBrownBorder: "border-[#5E4032]",
    beigeBg: "bg-[#E8DCC6]",
    placeholderText: "placeholder-[#9C8E80]",
  };

  return (
    <div className="w-full flex items-center sticky top-0 right-o justify-center p-4">
      <div className="w-full max-w-3xl flex   items-center gap-2 sm:gap-4">
        <button
          type="button"
          className={`
            shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full 
            bg-darkBrown  text-[#F5F5F5] 
            flex items-center justify-center 
            hover:opacity-90 hover:scale-105 transition-all duration-200 shadow-sm
          `}
          aria-label="Upload image"
        >
          <FaCamera size={18} className="sm:w-5 sm:h-5" />
        </button>

        <div
          className={`
            flex-1 flex items-center 
            bg-additionBackground border-darkBrown border 
            rounded-full px-1 py-1 sm:py-1.5 pl-4 sm:pl-6 
            shadow-sm focus-within:shadow-md transition-shadow duration-200
          `}
        >
          <input
            type="text"
            placeholder="Введіть свій запит..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className={`
              flex-1 bg-transparent outline-none 
              text-darkBrown ${styles.placeholderText}
              text-sm sm:text-base font-medium
              min-w-0
            `}
          />

          <button
            onClick={handleSend}
            disabled={loading || !value.trim()}
            className={`
              shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full ml-2
              bg-darkBrown text-[#F5F5F5]
              flex items-center justify-center 
              hover:opacity-90 disabled:opacity-70 disabled:cursor-not-allowed
              transition-all duration-200
            `}
            aria-label="Send message"
          >
            {loading ? (
              <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-[#F5F5F5] border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <FaArrowRight size={14} className="sm:w-4 sm:h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
