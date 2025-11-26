// client/src/App.tsx (Lines 32-40)

function App() {
  return (
    // ⬅️ START of the entire application tree
    <ErrorBoundary> 
      
      {/* 1. The chatbot is rendered inside the ErrorBoundary */}
      <AIChatBox /> 
      
      {/* 2. ThemeProvider starts AFTER the Chatbot and is wrapped by the ErrorBoundary */}
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