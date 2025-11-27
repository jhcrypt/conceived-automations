import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ROIProvider } from "./contexts/ROIContext";
import FloatingChatbot from "./components/FloatingChatbot";
import Home from "./pages/Home";
import WorkflowPreview from "./pages/WorkflowPreview";
import SharedResults from "./pages/SharedResults";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/workflow-preview"} component={WorkflowPreview} />
      <Route path={"/shared-results/:shareId"} component={SharedResults} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ROIProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
          <FloatingChatbot />
        </TooltipProvider>
      </ROIProvider>
    </ErrorBoundary>
  );
}

export default App;
// v3 update