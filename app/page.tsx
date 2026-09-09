import FileUploadComponent from './components/file-upload';
import ChatComponent from './components/chat';
import { UserButton } from '@clerk/nextjs';
import { FileText } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen w-screen flex flex-col">
      {/* Header with User Button */}
      <header className="w-full border-b border-border bg-card/50 backdrop-blur-sm px-6 py-4 flex items-center justify-between z-10">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              PDF RAG Chat
            </h1>
            <p className="text-xs text-muted-foreground">AI-Powered Document Assistant</p>
          </div>
        </div>
        <div className="flex items-center">
          <UserButton 
            appearance={{
              elements: {
                avatarBox: "w-10 h-10",
                userButtonPopoverCard: "shadow-lg border border-border",
                userButtonPopoverActionButton: "hover:bg-accent transition-colors",
                userButtonPopoverActionButtonText: "text-sm",
              },
            }}
            afterSignOutUrl="/"
          />
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        <div className="w-[30vw] min-h-full p-4 flex justify-center items-start border-r border-border bg-muted/20">
          <div className="w-full max-w-md mt-8">
            <FileUploadComponent />
          </div>
        </div>
        <div className="w-[70vw] min-h-full">
          <ChatComponent />
        </div>
      </div>
    </div>
  );
}
