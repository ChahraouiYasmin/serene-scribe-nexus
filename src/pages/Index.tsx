
import { ChatInterface } from "@/components/ChatInterface";
import { Sidebar } from "@/components/Sidebar";

const Index = () => {
  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 via-purple-50/50 to-white">
      <Sidebar />
      <main className="flex-1">
        <ChatInterface />
      </main>
    </div>
  );
};

export default Index;
