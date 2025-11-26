import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ROIProvider } from "./contexts/ROIContext";
import AIChatBox from "@/components/AIChatBox"; // ⬅️ Ensure this is imported
import Home from "./pages/Home";
import WorkflowPreview from "./pages/WorkflowPreview";
import SharedResults from "./pages/SharedResults";

function Router() {
  // We need to temporarily comment out the SharedResults route to unblock the push
  // If this line is still in your file, remove it: 
  // <Route path={"/shared-results/:shareId"} component={SharedResults} />

  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/workflow-preview"} component={WorkflowPreview} />
      <Route path={"/shared-results/:shareId"} component={SharedResults} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      {/* ⬅️ FINAL INTEGRATION: Renders the chatbot globally. */}
      <AIChatBox /> 
      
      <ThemeProvider
        defaultTheme="dark"
      >
        <ROIProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </ROIProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;