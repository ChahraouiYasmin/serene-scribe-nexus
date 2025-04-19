
import { ChatInterface } from "@/components/ChatInterface";
import { Sidebar } from "@/components/Sidebar";

const Index = () => {
  return (
    <div className="flex h-screen bg-gradient-to-br from-purple-50 via-purple-100/30 to-white">
      <Sidebar />
      <main className="flex-1 relative">
        <ChatInterface />
      </main>
    </div>
  );
};

export default Index;
