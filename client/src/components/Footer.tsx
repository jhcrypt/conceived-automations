import { APP_TITLE } from '@/const';
import { Mail, Linkedin, Twitter, Github, Workflow, Send, Loader2, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';
import { trackEvent, AnalyticsEvents } from '@/lib/analytics';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');

  const newsletterMutation = trpc.newsletter.subscribe.useMutation({
    onSuccess: (data) => {
      if (data.alreadySubscribed) {
        trackEvent(AnalyticsEvents.NEWSLETTER_SUCCESS, { alreadySubscribed: true });
        toast.info('You\'re already subscribed to our newsletter!');
      } else {
        trackEvent(AnalyticsEvents.NEWSLETTER_SUCCESS);
        toast.success('Thanks for subscribing! Check your email for automation tips.');
      }
      setEmail('');
    },
    onError: (error) => {
      trackEvent(AnalyticsEvents.NEWSLETTER_ERROR, { error: error.message });
      toast.error(error.message || 'Something went wrong. Please try again.');
    },
  });

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    trackEvent(AnalyticsEvents.NEWSLETTER_SUBSCRIBE);
    newsletterMutation.mutate({ email });
  };

  const footerLinks = {
    Services: [
      { label: 'Workflow Automation', href: '#services' },
      { label: 'AI Integration', href: '#services' },
      { label: 'Consulting', href: '#services' },
      { label: 'Support', href: '#services' },
    ],
    Company: [
      { label: 'About Us', href: '#about' },
      { label: 'How It Works', href: '#how-it-works' },
      { label: 'Use Cases', href: '#use-cases' },
      { label: 'Pricing', href: '#pricing' },
    ],
    Resources: [
      { label: 'FAQ', href: '#faq' },
      { label: 'Contact', href: '#contact' },
    ],
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="section bg-slate-900 relative overflow-hidden">
      {/* Gradient glows */}
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-blue-400/10 rounded-full blur-[130px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-pink-500/10 rounded-full blur-[130px] pointer-events-none"></div>
      
      <div className="container relative z-10">
        {/* Newsletter Section */}
        <div className="mb-12 max-w-2xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-2">Stay Ahead with Automation Insights</h3>
          <p className="text-foreground/70 mb-6">
            Get weekly tips, case studies, and exclusive automation strategies delivered to your inbox.
          </p>
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1"
              disabled={newsletterMutation.isPending}
            />
            <Button 
              type="submit" 
              size="lg"
              disabled={newsletterMutation.isPending}
              className="whitespace-nowrap"
            >
              {newsletterMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                  Subscribing...
                </>
              ) : (
                <>
                  <Send className="mr-2 w-5 h-5" />
                  Subscribe
                </>
              )}
            </Button>
          </form>
          <p className="text-xs text-foreground/50 mt-3">
            Join 500+ automation enthusiasts. Unsubscribe anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-gradient-to-br from-violet-600 to-cyan-500 p-2 rounded-lg">
                <Workflow className="text-white w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                Conceived<span className="text-violet-400">Automations</span>
              </h3>
            </div>
            <p className="text-foreground/70 mb-4 max-w-sm">
              Intelligent workflow automation powered by n8n and AI. Transform your business operations 
              and scale efficiently.
            </p>
            <div className="space-y-2 mb-4">
              <a href="tel:+18563835528" className="flex items-center gap-2 text-foreground/70 hover:text-primary transition-colors text-sm">
                <Phone className="w-4 h-4" />
                (856) 383-5528
              </a>
              <a href="mailto:conceived.automations@gmail.com" className="flex items-center gap-2 text-foreground/70 hover:text-primary transition-colors text-sm">
                <Mail className="w-4 h-4" />
                conceived.automations@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="mailto:conceived.automations@gmail.com"
                className="w-10 h-10 rounded-full bg-foreground/10 hover:bg-primary/20 flex items-center justify-center transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-foreground/10 hover:bg-primary/20 flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-foreground/10 hover:bg-primary/20 flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-foreground/10 hover:bg-primary/20 flex items-center justify-center transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.href);
                      }}
                      className="text-foreground/70 hover:text-primary transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-violet-500/30 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-foreground/60">
            © {currentYear} {APP_TITLE}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-foreground/60 hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-foreground/60 hover:text-primary transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
