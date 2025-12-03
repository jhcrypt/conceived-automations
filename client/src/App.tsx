import { Toaster } from "@/components/ui/sonner";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ROIProvider } from "./contexts/ROIContext";
import FloatingChatbot from "./components/FloatingChatbot";
import Home from "./pages/Home";
import WorkflowPreview from "./pages/WorkflowPreview";
import SharedResults from "./pages/SharedResults";
import React from "react";
const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  
  return (
    <div className="flex h-screen bg-slate-950">
      <aside className={`${sidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300 bg-slate-900 border-r border-slate-800 flex flex-col`}>
        <div className="h-16 flex items-center px-4 border-b border-slate-800">
          {sidebarOpen && <span className="text-white font-semibold">Dashboard</span>}
        </div>
        <nav className="flex-1 p-2">
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-slate-300 hover:bg-slate-800">
            <span>📊</span>
            {sidebarOpen && <span>Overview</span>}
          </button>
        </nav>
      </aside>
      <div className="flex-1 flex flex-col">
        <header className="h-16 border-b border-slate-800 flex items-center px-4 bg-slate-900">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-slate-800 rounded-md text-slate-300">
            ☰
          </button>
        </header>
        <main className="flex-1 overflow-auto p-6">
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-slate-400 mt-2">Welcome to your dashboard.</p>
        </main>
      </div>
    </div>
  );
};

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/workflow-preview"} component={WorkflowPreview} />
      <Route path={"/shared-results/:shareId"} component={SharedResults} />
      <Route path={"/dashboard"} component={Dashboard} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ROIProvider>
        <Toaster />
        <Router />
        <FloatingChatbot />
      </ROIProvider>
    </ErrorBoundary>
  );
}

export default App;
// v3 update