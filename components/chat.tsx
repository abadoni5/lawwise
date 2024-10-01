"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const sampleResponses = [
  "According to Section 107 of the Copyright Act, fair use is determined by four factors: purpose of use, nature of the copyrighted work, amount used, and effect on the market.",
  "The statute of limitations for personal injury claims in most states is typically between 1-3 years, but it's important to check your specific jurisdiction.",
  "In contract law, the doctrine of promissory estoppel can be invoked when there's a clear and definite promise, reasonable reliance on that promise, and injustice can only be avoided by enforcing the promise.",
  "The Fourth Amendment protects against unreasonable searches and seizures. Generally, law enforcement needs a warrant to search private property, with some exceptions like exigent circumstances.",
  "Under the at-will employment doctrine, an employer can terminate an employee for any reason or no reason, as long as it's not for an illegal reason such as discrimination.",
  "In intellectual property law, trade secrets are protected as long as they remain secret. Unlike patents, there's no time limit on trade secret protection.",
];

export default function Chat({ userType }: { userType: "lawyer" | "user" }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (input.trim()) {
      const newMessage: Message = {
        role: "user",
        content: input,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, newMessage]);
      setInput("");
      setIsTyping(true);

      // Simulate response
      setTimeout(() => {
        const responseMessage: Message = {
          role: "assistant",
          content:
            sampleResponses[Math.floor(Math.random() * sampleResponses.length)],
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, responseMessage]);
        setIsTyping(false);
      }, 1500);
    }
  };

  useEffect(() => {
    // Scroll to bottom when messages change
    const scrollArea = document.querySelector(".scroll-area");
    if (scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  }, [messages]);

  return (
    <Card className="h-full flex flex-col">
      <Tabs defaultValue="chat" className="w-full flex-grow flex flex-col">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="chat">Chat</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
        <TabsContent value="chat" className="flex-grow flex flex-col">
          <ScrollArea className="flex-grow p-4 space-y-4 scroll-area">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div className={`flex items-start space-x-2 max-w-[70%]`}>
                  {message.role === "assistant" && (
                    <Avatar>
                      <AvatarImage src="/bot-avatar.png" alt="Bot" />
                      <AvatarFallback>LW</AvatarFallback>
                    </Avatar>
                  )}
                  <CardContent
                    className={`p-3 rounded-lg ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    <p>{message.content}</p>
                    <span className="text-xs opacity-50">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </CardContent>
                  {message.role === "user" && (
                    <Avatar>
                      <AvatarImage src="/user-avatar.png" alt="User" />
                      <AvatarFallback>US</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <CardContent className="bg-secondary text-secondary-foreground p-3 rounded-lg">
                  <p>Lawwise is typing...</p>
                </CardContent>
              </div>
            )}
          </ScrollArea>
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={`Ask Lawwise ${
                  userType === "lawyer"
                    ? "a professional legal question"
                    : "about your legal rights"
                }...`}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
              />
              <Button onClick={handleSend}>Send</Button>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="history">
          <ScrollArea className="h-[calc(100vh-10rem)] p-4">
            <h3 className="text-lg font-semibold mb-2">Chat History</h3>
            <ul className="space-y-2">
              {messages.map((message, index) => (
                <li key={index} className="text-sm">
                  <span className="font-medium">
                    {message.role === "user" ? "You" : "Lawwise"}:
                  </span>{" "}
                  {message.content.substring(0, 50)}...
                </li>
              ))}
            </ul>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
