"use client";

import React, { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { get_user_status } from "@/api/default";
import { get_chat_history, get_chat_recent } from "@/api/chat";
import ChatInterface from "@/components/dashboard/chat/Chat";
import { Chat, PartnerPreview, User } from "@/api/type";
import { User as UserDetail } from "@/components/dashboard/type";
import AuthGuard from "../../components/auth/AuthGuard";

enum UserPermission {
  Admin = "admin",
  User = "user",
}

const customerService: User = {
  id: Number(process.env.NEXT_PUBLIC_CUSTOMER_SERVICE_ID!),
  name: "Support Agent",
};

const ChatPage: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | undefined>();
  const [chatMessages, setChatMessages] = useState<Chat[]>([]);
  const [recentChats, setRecentChats] = useState<PartnerPreview[] | null>(null);
  const [userDetail, setUserDetail] = useState<UserDetail>({});
  const socketRef = useRef<Socket | null>(null);

  const getMessages = async (otherId: number) => {
    const messages = await get_chat_history(userDetail.id, otherId);
    setChatMessages(messages);
  };

  const getPartnerPreview = async () => {
    if (userDetail.permission === UserPermission.Admin) {
      const partners = await get_chat_recent(userDetail.id);
      setRecentChats(partners);
    }
  };

  const handleSelectUser = async (user: User) => {
    setSelectedUser(user);
    await getMessages(user.id);
  };

  const handleSendMessage = (text: string) => {
    if (!selectedUser || !socketRef.current) return;

    const message = {
      sender_id: userDetail.id,
      recv_id: selectedUser.id,
      message: text,
    };

    setChatMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        message: text,
        sender: { id: userDetail.id, name: userDetail.name },
        recv: selectedUser,
        sentAt: new Date().toISOString(),
      },
    ]);

    socketRef.current.emit("message", message);
  };

  useEffect(() => {
    const setup = async () => {
      const user = await get_user_status();
      setUserDetail(user);
    };

    setup();
  }, []);

  useEffect(() => {
    if (!userDetail.id) return;

    if (userDetail.permission === UserPermission.User) {
      handleSelectUser(customerService);
      setRecentChats([]);
    } else {
      getPartnerPreview();
    }

    const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL as string, {
      auth: { id: userDetail.id },
    });

    socketRef.current = socket;

    socket.on("message", (data: Chat) => {
      if (
        selectedUser &&
        (data.sender.id === selectedUser.id || data.recv.id === selectedUser.id)
      ) {
        setChatMessages((prev) => [...prev, data]);
        getPartnerPreview();
      }
    });

    socket.on("notification", (msg: string) => {
      console.log("Server Notification:", msg);
    });

    return () => {
      socket.disconnect();
    };
  }, [userDetail.id, selectedUser]);

  return (
    <AuthGuard>
      {!userDetail.id || !recentChats ? (
        <div className="flex justify-center items-center w-[100dvw] h-[100dvh]">
          <span className="loader" />
        </div>
      ) : (
        <ChatInterface
          mode={userDetail.permission}
          currentUserId={userDetail.id}
          partners={recentChats}
          selectedUser={selectedUser}
          onSelectUser={handleSelectUser}
          messages={chatMessages}
          onSendMessage={handleSendMessage}
        />
      )}
    </AuthGuard>
  );
};

export default ChatPage;
