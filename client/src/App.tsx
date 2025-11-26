function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/workflow-preview"} component={WorkflowPreview} />
      {/* ⬅️ COMMENTED OUT THE FAULTY LINE */}
      {/* <Route path={"/shared-results/:shareId"} component={SharedResults} /> */}
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}