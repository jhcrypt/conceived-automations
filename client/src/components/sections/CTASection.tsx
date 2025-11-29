import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight, Mail, Phone, MapPin, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { trpc } from '@/lib/trpc';
import { trackEvent, AnalyticsEvents } from '@/lib/analytics';

export default function CTASection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  const contactMutation = trpc.contact.submit.useMutation({
    onSuccess: () => {
      trackEvent(AnalyticsEvents.CONTACT_FORM_SUCCESS);
      toast.success('Thank you! We\'ll be in touch within 24 hours.');
      setFormData({ name: '', email: '', company: '', message: '' });
    },
    onError: (error) => {
      trackEvent(AnalyticsEvents.CONTACT_FORM_ERROR, { error: error.message });
      toast.error(error.message || 'Something went wrong. Please try again.');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    trackEvent(AnalyticsEvents.CONTACT_FORM_SUBMIT);
    contactMutation.mutate({
      name: formData.name,
      email: formData.email,
      companyName: formData.company || undefined,
      message: formData.message,
    });
  };

  return (
    <section className="section bg-background relative overflow-hidden" id="contact">
      {/* Gradient glows */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none"></div>
      
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left side - CTA */}
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to <span className="text-white drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">Automate Your Success?</span>
            </h2>
            <p className="text-lg text-foreground/70 mb-8">
              Join dozens of businesses that have transformed their operations with intelligent automation. 
              Let's discuss how we can help you save time, reduce costs, and scale efficiently.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">Email Us</p>
                  <a href="mailto:conceived.automations@gmail.com" className="text-foreground/70 hover:text-primary">
                    conceived.automations@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">Call Us</p>
                  <a href="tel:+18563835528" className="text-foreground/70 hover:text-primary">
                    (856) 383-5528
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">Location</p>
                  <p className="text-foreground/70">Remote-first, serving clients worldwide</p>
                </div>
              </div>
            </div>

            <div className="glass rounded-xl p-6 border border-violet-500/30 hover:border-violet-500/60 hover:scale-105 transition-all duration-300">
              <p className="text-sm text-foreground/70">
                <strong className="text-primary">Limited Availability:</strong> We work with a select number of clients 
                to ensure dedicated attention and exceptional results. Book your free consultation today.
              </p>
            </div>
          </div>

          {/* Right side - Contact Form */}
          <div className="glass rounded-lg p-8 border border-violet-500/30 hover:border-violet-500/60 transition-all duration-300">
            <h3 className="text-2xl font-bold mb-6">Get Your Free Consultation</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                  placeholder="Company Name"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
              </div>
              <div>
                <Textarea
                  placeholder="Tell us about your automation needs..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  required
                />
              </div>
              <Button type="submit" className="w-full" size="lg" disabled={contactMutation.isPending}>
                {contactMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Schedule Free Consultation
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </>
                )}
              </Button>
              <p className="text-xs text-foreground/60 text-center">
                No commitment required. We'll respond within 24 hours.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
