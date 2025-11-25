import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ROIProvider } from "./contexts/ROIContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import AIChatBox from "@/components/AIChatBox"; 
import Home from "./pages/Home";
import WorkflowPreview from "./pages/WorkflowPreview";
import SharedResults from "./pages/SharedResults";

function Router() {
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
      {/* CHANGED: defaultTheme is now "system" */}
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <ROIProvider>
          <TooltipProvider>
            <Toaster />
            <AIChatBox />
            <Router />
          </TooltipProvider>
        </ROIProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;