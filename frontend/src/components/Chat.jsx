import { useState, useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { generateRecipes } from "../api/recipes";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const sendPrompt = async (text) => {
    setMessages((prev) => [...prev, { sender: "user", text }]);
    setLoading(true);

    try {
      const res = await generateRecipes(text);

      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: res.message },
        ...res.recipes.map((r) => ({ sender: "ai", text: r })),
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "Помилка сервера" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 flex flex-col gap-3 scrollbar-custom">
        {messages.map((msg, i) => (
          <ChatMessage key={i} sender={msg.sender} text={msg.text} />
        ))}
        {loading && <ChatMessage sender="ai" text="Готую рецепти..." />}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex-none">
        <ChatInput onSend={sendPrompt} loading={loading} />
      </div>
    </div>
  );
};

export default Chat;
