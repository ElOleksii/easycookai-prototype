const ChatMessage = ({ sender, text }) => {
  const isUser = sender === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}>
      <div
        className={`p-3 rounded-2xl max-w-[80%] whitespace-pre-line ${
          isUser
            ? "bg-darkBrown text-mainBackground rounded-br-none"
            : "bg-additionBackground text-darkBrown rounded-bl-none"
        }`}
      >
        {text}
      </div>
    </div>
  );
};

export default ChatMessage;
