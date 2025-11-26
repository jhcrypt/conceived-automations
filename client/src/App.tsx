import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "@/components/ErrorBoundary"; 
import { ThemeProvider } from "@/contexts/ThemeContext"; 
import { ROIProvider } from "@/contexts/ROIContext"; 
import AIChatBox from "@/components/AIChatBox"; 
import Home from "@/pages/Home"; 
import WorkflowPreview from "@/pages/WorkflowPreview"; 
import SharedResults from "@/pages/SharedResults"; 

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

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    // ⬅️ The ErrorBoundary must wrap the ENTIRE application tree.
    <ErrorBoundary> 
      {/* ⬅️ AIChatBox is fixed position, rendered first. */}
      <AIChatBox /> 
      
      <ThemeProvider
        defaultTheme="dark"
        // switchable
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
// v3 update