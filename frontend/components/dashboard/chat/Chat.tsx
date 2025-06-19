import { Chat, User } from "@/api/type";
import React, { useEffect, useRef, useState } from "react";
import { FiMenu } from "react-icons/fi"; // React Icon for the sidebar toggle

interface ChatInterfaceProps {
  mode: "admin" | "user";
  currentUserId: number;
  partners: {
    partner: User;
    lastMessage: string;
    sentAt: string;
  }[];
  selectedUser?: User;
  onSelectUser: (user: User) => void;
  messages: Chat[];
  onSendMessage: (text: string) => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  mode,
  currentUserId,
  partners,
  selectedUser,
  onSelectUser,
  messages,
  onSendMessage,
}) => {
  const [messageText, setMessageText] = useState("");
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isAdmin = mode === "admin";

  const handleSend = () => {
    if (messageText.trim()) {
      onSendMessage(messageText.trim());
      setMessageText("");
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  }, [messages]);

  return (
    <div className="flex h-[100dvh] text-white bg-[#111827]">
      {isAdmin && (
        <>
          <div className="absolute top-4 left-4 md:hidden z-20">
            <button
              onClick={() => setShowMobileSidebar(!showMobileSidebar)}
              className="p-2 bg-gray-800 rounded-md hover:bg-gray-700"
            >
              <FiMenu size={20} />
            </button>
          </div>

          <div
            className={`fixed inset-y-0 left-0 w-64 bg-[#1f2937] border-r border-gray-800 z-10 transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0 ${
              showMobileSidebar ? "translate-x-0" : "-translate-x-full md:block"
            }`}
          >
            <div className="flex items-center gap-2 px-4 py-4 border-b border-gray-700">
              <img src="/logo.png" alt="Logo" className="w-6 h-6" />
              <span className="font-bold text-lg">Support</span>
            </div>

            <div className="overflow-y-auto h-[93%]">
              {partners.map(({ partner, lastMessage, sentAt }) => (
                <div
                  key={partner.id}
                  onClick={() => {
                    onSelectUser(partner);
                    setShowMobileSidebar(false);
                  }}
                  className={`cursor-pointer px-4 py-3 hover:bg-gray-700 ${
                    selectedUser?.id === partner.id ? "bg-gray-700" : ""
                  }`}
                >
                  <div className="font-semibold">{partner.name}</div>
                  <div className="text-sm text-gray-400 truncate">
                    {lastMessage}
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(sentAt).toLocaleTimeString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <div
        className={`flex flex-col h-full w-full ${
          !isAdmin
            ? "max-w-2xl mx-auto border border-gray-700 rounded-lg shadow-lg"
            : ""
        }`}
      >
        <div className="flex items-center justify-between border-b border-gray-800 px-4 py-3 bg-[#1f2937]">
          <div className="flex items-center gap-2">
            {!isAdmin && <img src="/logo.png" alt="Logo" className="w-6 h-6" />}
            <span className="font-bold text-lg">
              {selectedUser ? selectedUser.name : "Select a chat"}
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2 bg-[#111827]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`max-w-sm px-3 py-2 rounded-lg ${
                msg.sender.id === currentUserId
                  ? "ml-auto bg-blue-600 text-white"
                  : "mr-auto bg-gray-700 text-white"
              }`}
            >
              {msg.message}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {selectedUser && (
          <div className="p-4 border-t border-gray-800 flex gap-2 bg-[#1f2937]">
            <input
              type="text"
              className="flex-1 border border-gray-700 bg-[#111827] rounded-md px-3 py-2 text-white focus:outline-none"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Type a message..."
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            >
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInterface;
