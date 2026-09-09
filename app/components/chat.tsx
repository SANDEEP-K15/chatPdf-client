'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import * as React from 'react';
import { Send, Bot, User, FileText, Sparkles, Loader2 } from 'lucide-react';

interface Doc {
  pageContent?: string;
  metdata?: {
    loc?: {
      pageNumber?: number;
    };
    source?: string;
  };
}
interface IMessage {
  role: 'assistant' | 'user';
  content?: string;
  documents?: Doc[];
}

const ChatComponent: React.FC = () => {
  const [message, setMessage] = React.useState<string>('');
  const [messages, setMessages] = React.useState<IMessage[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendChatMessage = async () => {
    if (!message.trim() || isLoading) return;
    
    const userMessage = message;
    setMessage(''); // Clear input
    setIsLoading(true);
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const res = await fetch(`${apiUrl}/chat?message=${encodeURIComponent(userMessage)}`);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: data?.message || 'No response received',
          documents: data?.docs || [],
        },
      ]);
    } catch (error) {
      console.error('Error fetching chat response:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again.',
          documents: [],
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-lg">AI Assistant</h2>
            <p className="text-xs text-muted-foreground">Ask questions about your PDF documents</p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 md:px-6 py-6 space-y-6">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
            <div className="p-6 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl mb-4">
              <Bot className="w-16 h-16 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="space-y-2 max-w-md">
              <h3 className="text-xl font-semibold">Start a Conversation</h3>
              <p className="text-sm text-muted-foreground">
                Ask me anything about your uploaded PDF documents. I can help you find information, summarize content, and answer questions.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 justify-center mt-6">
              <span className="px-4 py-2 bg-card border border-border rounded-full text-sm text-muted-foreground">
                &quot;What is this document about?&quot;
              </span>
              <span className="px-4 py-2 bg-card border border-border rounded-full text-sm text-muted-foreground">
                &quot;Summarize the key points&quot;
              </span>
              <span className="px-4 py-2 bg-card border border-border rounded-full text-sm text-muted-foreground">
                &quot;Find information about...&quot;
              </span>
            </div>
          </div>
        ) : (
          <>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-4 animate-in fade-in slide-in-from-bottom-4 duration-300 ${
                  msg.role === 'user' ? 'flex-row-reverse' : ''
                }`}
              >
                {/* Avatar */}
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-br from-blue-600 to-blue-700'
                      : 'bg-gradient-to-br from-purple-600 to-purple-700'
                  }`}
                >
                  {msg.role === 'user' ? (
                    <User className="w-5 h-5 text-white" />
                  ) : (
                    <Bot className="w-5 h-5 text-white" />
                  )}
                </div>

                {/* Message Bubble */}
                <div className={`flex flex-col space-y-2 max-w-[75%] md:max-w-[65%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`rounded-2xl px-4 py-3 shadow-sm ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-tr-sm'
                        : 'bg-card border border-border text-foreground rounded-tl-sm'
                    }`}
                  >
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">
                      {msg.content}
                    </div>
                  </div>

                  {/* Document Sources */}
                  {msg.documents && msg.documents.length > 0 && (
                    <div className={`flex flex-wrap gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-full text-xs text-muted-foreground border border-border">
                        <FileText className="w-3.5 h-3.5" />
                        <span>{msg.documents.length} source{msg.documents.length > 1 ? 's' : ''} found</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex gap-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-purple-600 to-purple-700">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="bg-card border border-border rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                  <Loader2 className="w-5 h-5 text-muted-foreground animate-spin" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t border-border bg-card/50 backdrop-blur-sm px-4 md:px-6 py-4">
        <div className="max-w-4xl mx-auto flex gap-3 items-end">
          <div className="flex-1 relative">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
                  e.preventDefault();
                  handleSendChatMessage();
                }
              }}
              placeholder="Ask a question about your PDF..."
              className="pr-12 min-h-[52px] text-base resize-none"
              disabled={isLoading}
            />
          </div>
          <Button
            onClick={handleSendChatMessage}
            disabled={!message.trim() || isLoading}
            size="lg"
            className="h-[52px] px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </Button>
        </div>
        <p className="text-xs text-center text-muted-foreground mt-2 max-w-4xl mx-auto">
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </div>
  );
};
export default ChatComponent;
