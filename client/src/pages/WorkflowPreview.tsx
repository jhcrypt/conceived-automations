import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import WorkflowCanvas from '@/components/WorkflowCanvas';
import { Loader2, Calendar, CheckCircle2, Clock, Zap, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function WorkflowPreview() {
  const [, setLocation] = useLocation();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Get token from URL query params
    const params = new URLSearchParams(window.location.search);
    const tokenParam = params.get('token');
    if (tokenParam) {
      setToken(tokenParam);
    } else {
      toast.error('Invalid or missing magic link token');
      setTimeout(() => setLocation('/'), 3000);
    }
  }, [setLocation]);

  const { data: workflowData, isLoading, error } = trpc.workflows.getPreview.useQuery(
    { token: token || '' },
    { enabled: !!token }
  );

  const trackCTAClick = trpc.workflows.trackCTAClick.useMutation();

  const handleScheduleCall = () => {
    if (workflowData && workflowData.workflow) {
      trackCTAClick.mutate({ workflowId: workflowData.workflow.id });
    }
    // Open Calendly or scheduling link
    window.open('https://calendly.com/conceived-automations/discovery-call', '_blank');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-violet-500 animate-spin mx-auto mb-4" />
          <p className="text-xl text-slate-300">Loading your workflow preview...</p>
        </div>
      </div>
    );
  }

  if (error || !workflowData) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="max-w-md text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-500/20 border-2 border-red-500 mb-6">
            <AlertCircle className="w-10 h-10 text-red-500" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Invalid or Expired Link</h1>
          <p className="text-lg text-slate-300 mb-6">
            This magic link is invalid, has expired, or has already been used.
          </p>
          <p className="text-sm text-slate-400 mb-8">
            Magic links expire after 48 hours and can only be used once for security.
          </p>
          <Button
            onClick={() => setLocation('/')}
          >
            Return to Homepage
          </Button>
        </div>
      </div>
    );
  }

  const { workflow, expiresAt, timeRemaining } = workflowData;
  const iconOnlyWorkflow = JSON.parse(workflow.iconOnlyData);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-violet-500/30 bg-slate-900/50 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-2xl">⚡</div>
              <div>
                <span className="text-xl font-bold">Conceived</span>
                <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400"> Automations</span>
              </div>
            </div>
            <Button
              onClick={handleScheduleCall}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Discovery Call
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-12">
        {/* Workflow info */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-500/10 border border-violet-500/30 mb-4">
            <Clock className="w-4 h-4 text-violet-400" />
            <span className="text-sm text-violet-400 font-medium">
              Expires in {timeRemaining}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{workflow.name}</h1>
          <p className="text-xl text-slate-300 max-w-3xl">{workflow.description}</p>
        </div>

        {/* Metrics grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-slate-800/50 backdrop-blur-md border border-violet-500/30 rounded-2xl p-6 hover:border-violet-500/60 transition-all">
            <div className="flex items-center gap-3 mb-2">
              <Zap className="w-5 h-5 text-cyan-400" />
              <span className="text-sm text-slate-400">Workflow Steps</span>
            </div>
            <p className="text-3xl font-bold">{workflow.nodeCount}</p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-md border border-violet-500/30 rounded-2xl p-6 hover:border-violet-500/60 transition-all">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle2 className="w-5 h-5 text-green-400" />
              <span className="text-sm text-slate-400">Integrations</span>
            </div>
            <p className="text-3xl font-bold">{JSON.parse(workflow.toolsUsed || '[]').length}</p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-md border border-violet-500/30 rounded-2xl p-6 hover:border-violet-500/60 transition-all">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-5 h-5 text-violet-400" />
              <span className="text-sm text-slate-400">Time Saved/Week</span>
            </div>
            <p className="text-3xl font-bold">{workflow.estimatedSavingsHours}h</p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-md border border-violet-500/30 rounded-2xl p-6 hover:border-violet-500/60 transition-all">
            <div className="flex items-center gap-3 mb-2">
              <Zap className="w-5 h-5 text-amber-400" />
              <span className="text-sm text-slate-400">Complexity</span>
            </div>
            <p className="text-3xl font-bold capitalize">{workflow.complexity}</p>
          </div>
        </div>

        {/* Workflow canvas */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Your Custom Workflow</h2>
          <WorkflowCanvas
            nodes={iconOnlyWorkflow.nodes}
            email={workflow.email ?? 'user'}
            className="h-[600px]"
          />
        </div>

        {/* CTA section */}
        <div className="bg-gradient-to-br from-violet-900/50 to-cyan-900/50 backdrop-blur-md border border-violet-500/30 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Bring This to Life?
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Schedule a free 30-minute discovery call to discuss your workflow in detail and get a custom implementation plan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              onClick={handleScheduleCall}
              className="text-lg px-8"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Schedule Discovery Call
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setLocation('/')}
              className="border-violet-500/30 hover:border-violet-500/60 text-lg px-8"
            >
              Learn More About Us
            </Button>
          </div>

          <div className="mt-8 pt-8 border-t border-white/10">
            <p className="text-sm text-slate-400">
              💡 <span className="font-semibold">What happens next?</span> We'll discuss your specific needs, answer all your questions, and provide a detailed proposal with pricing and timeline.
            </p>
          </div>
        </div>

        {/* Tools used */}
        <div className="mt-12">
          <h3 className="text-xl font-bold mb-4">Tools & Integrations</h3>
          <div className="flex flex-wrap gap-3">
            {JSON.parse(workflow.toolsUsed || '[]').map((tool: string, index: number) => (
              <div
                key={index}
                className="px-4 py-2 bg-slate-800/50 border border-violet-500/30 rounded-lg text-sm"
              >
                {tool}
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-violet-500/30 bg-slate-900/50 mt-20 py-8">
        <div className="container mx-auto px-4 text-center text-slate-400">
          <p className="text-sm">
            © 2024 Conceived Automations. All rights reserved.
          </p>
          <p className="text-xs mt-2">
            This workflow preview is confidential and intended only for {workflow.email ?? 'the recipient'}
          </p>
        </div>
      </footer>
    </div>
  );
}
