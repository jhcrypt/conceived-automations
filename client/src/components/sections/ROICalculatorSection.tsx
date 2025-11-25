import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Calculator, Loader2, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';
import { trackEvent, AnalyticsEvents } from '@/lib/analytics';

export default function ROICalculatorSection() {
  const [hoursPerWeek, setHoursPerWeek] = useState(10);
  const [hourlyRate, setHourlyRate] = useState(50);
  const [employeeCount, setEmployeeCount] = useState(5);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
  });

  // Calculate savings
  const weeklySavings = hoursPerWeek * hourlyRate * 0.75; // 75% time saved
  const monthlySavings = weeklySavings * 4;
  const yearlySavings = monthlySavings * 12;

  const roiMutation = trpc.roi.calculate.useMutation({
    onSuccess: (data) => {
      trackEvent(AnalyticsEvents.ROI_CALCULATOR_SUCCESS, {
        yearlySavings: data.yearlySavings,
        monthlySavings: data.monthlySavings,
      });
      toast.success('Your custom ROI report has been sent to your email!');
      setShowModal(false);
      setFormData({ name: '', email: '', company: '' });
    },
    onError: (error) => {
      trackEvent(AnalyticsEvents.ROI_CALCULATOR_ERROR, { error: error.message });
      toast.error(error.message || 'Something went wrong. Please try again.');
    },
  });

  const handleGetReport = () => {
    trackEvent(AnalyticsEvents.ROI_CALCULATOR_OPEN, {
      yearlySavings,
      monthlySavings,
    });
    setShowModal(true);
  };

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    trackEvent(AnalyticsEvents.ROI_CALCULATOR_SUBMIT);
    roiMutation.mutate({
      name: formData.name,
      email: formData.email,
      companyName: formData.company || undefined,
      employeeCount,
      avgHourlyRate: hourlyRate,
      hoursPerWeek,
    });
  };

  return (
    <>
      <section className="section bg-background relative overflow-hidden" id="calculator">
        {/* Gradient glows */}
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-blue-400/10 rounded-full blur-[130px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-pink-500/10 rounded-full blur-[130px] pointer-events-none"></div>
        
        <div className="container relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="group p-8 md:p-12 rounded-2xl bg-slate-800/50 border border-violet-500/30 hover:border-violet-500/60 hover:bg-slate-800 transition-all duration-300 hover:shadow-2xl hover:shadow-violet-900/20 relative overflow-hidden">
              {/* Calculator icon watermark */}
              <div className="absolute top-8 right-8 opacity-5 pointer-events-none">
                <Calculator className="w-48 h-48 text-white" />
              </div>

              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-12">
                  Calculate Your Savings
                </h2>

                <div className="grid md:grid-cols-2 gap-12">
                  {/* Left Column - Sliders */}
                  <div className="space-y-8">
                    {/* Employee count slider */}
                    <div>
                      <label className="text-sm text-foreground/70 block mb-4">
                        Number of Employees
                      </label>
                      <div className="flex items-center gap-6">
                        <Slider
                          value={[employeeCount]}
                          onValueChange={(value) => setEmployeeCount(value[0])}
                          min={1}
                          max={100}
                          step={1}
                          className="flex-1 [&_[data-slot=slider-track]]:bg-slate-700 [&_[data-slot=slider-range]]:bg-purple-500"
                        />
                        <div className="text-lg font-bold text-purple-400 whitespace-nowrap min-w-[120px] text-right">
                          {employeeCount} employees
                        </div>
                      </div>
                    </div>

                    {/* Hours per week slider */}
                    <div>
                      <label className="text-sm text-foreground/70 block mb-4">
                        Hours spent manually per week
                      </label>
                      <div className="flex items-center gap-6">
                        <Slider
                          value={[hoursPerWeek]}
                          onValueChange={(value) => setHoursPerWeek(value[0])}
                          min={1}
                          max={80}
                          step={1}
                          className="flex-1 [&_[data-slot=slider-track]]:bg-slate-700 [&_[data-slot=slider-range]]:bg-cyan-500"
                        />
                        <div className="text-lg font-bold text-cyan-400 whitespace-nowrap min-w-[120px] text-right">
                          {hoursPerWeek} hrs/week
                        </div>
                      </div>
                    </div>

                    {/* Hourly rate slider */}
                    <div>
                      <label className="text-sm text-foreground/70 block mb-4">
                        Average Employee Hourly Rate ($)
                      </label>
                      <div className="flex items-center gap-6">
                        <Slider
                          value={[hourlyRate]}
                          onValueChange={(value) => setHourlyRate(value[0])}
                          min={15}
                          max={200}
                          step={5}
                          className="flex-1 [&_[data-slot=slider-track]]:bg-slate-700 [&_[data-slot=slider-range]]:bg-violet-500"
                        />
                        <div className="text-lg font-bold text-violet-400 whitespace-nowrap min-w-[120px] text-right">
                          ${hourlyRate}/hr
                        </div>
                      </div>
                    </div>

                    {/* Disclaimer */}
                    <p className="text-xs text-foreground/50 italic mt-8">
                      * In a real-world business context, this is actually a conservative 
                      estimate (meaning the actual savings are likely higher).
                    </p>
                  </div>

                  {/* Right Column - Results */}
                  <div className="space-y-6">
                    {/* Monthly savings */}
                    <div className="p-4 rounded-lg bg-slate-950/50 border border-violet-500/30 text-center">
                      <div className="text-xs text-foreground/60 uppercase tracking-wider mb-1">
                        Monthly Savings
                      </div>
                      <div className="text-3xl md:text-4xl font-bold text-white">
                        ${monthlySavings.toLocaleString('en-US', { 
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0 
                        })}
                      </div>
                    </div>

                    {/* Yearly savings with gradient background */}
                    <div className="p-4 rounded-lg bg-gradient-to-br from-violet-600/30 to-blue-600/30 border border-violet-500/40 text-center">
                      <div className="text-xs text-foreground/80 uppercase tracking-wider mb-1">
                        Projected Yearly Savings
                      </div>
                      <div className="text-3xl md:text-4xl font-bold text-white">
                        ${yearlySavings.toLocaleString('en-US', { 
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0 
                        })}
                      </div>
                    </div>

                    {/* Get Custom Report Button */}
                    <Button 
                      onClick={handleGetReport}
                      className="w-full"
                      size="lg"
                      variant="default"
                    >
                      <Download className="mr-2 w-5 h-5" />
                      Get My Custom ROI Report
                    </Button>
                    <p className="text-xs text-foreground/60 text-center">
                      Receive a detailed breakdown via email
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Report Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Get Your Custom ROI Report</DialogTitle>
            <DialogDescription>
              Enter your details to receive a personalized savings report with detailed breakdown and recommendations.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitReport} className="space-y-4 mt-4">
            <div>
              <Input
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <Input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div>
              <Input
                placeholder="Company Name (Optional)"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              />
            </div>
            <div className="bg-slate-800/50 p-4 rounded-lg border border-violet-500/30">
              <p className="text-sm text-foreground/70 mb-2">Your Estimated Savings:</p>
              <p className="text-2xl font-bold text-white">
                ${yearlySavings.toLocaleString('en-US', { 
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0 
                })} / year
              </p>
            </div>
            <Button type="submit" className="w-full" disabled={roiMutation.isPending}>
              {roiMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Download className="mr-2 w-5 h-5" />
                  Send My Report
                </>
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
