/**
 * Analytics event tracking utility
 * Works with the built-in analytics endpoint (VITE_ANALYTICS_ENDPOINT)
 */

interface AnalyticsEvent {
  event: string;
  properties?: Record<string, any>;
}

export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  // Track via built-in analytics if available
  if (typeof window !== 'undefined' && (window as any).umami) {
    (window as any).umami.track(eventName, properties);
  }
  
  // Also log to console in development
  if (import.meta.env.DEV) {
    console.log('[Analytics]', eventName, properties);
  }
};

// Predefined events for consistency
export const AnalyticsEvents = {
  // Contact form
  CONTACT_FORM_SUBMIT: 'contact_form_submit',
  CONTACT_FORM_SUCCESS: 'contact_form_success',
  CONTACT_FORM_ERROR: 'contact_form_error',
  
  // ROI Calculator
  ROI_CALCULATOR_OPEN: 'roi_calculator_open',
  ROI_CALCULATOR_SUBMIT: 'roi_calculator_submit',
  ROI_CALCULATOR_SUCCESS: 'roi_calculator_success',
  ROI_CALCULATOR_ERROR: 'roi_calculator_error',
  
  // Newsletter
  NEWSLETTER_SUBSCRIBE: 'newsletter_subscribe',
  NEWSLETTER_SUCCESS: 'newsletter_success',
  NEWSLETTER_ERROR: 'newsletter_error',
  
  // Navigation
  NAV_CLICK: 'nav_click',
  CTA_CLICK: 'cta_click',
  
  // Pricing
  PRICING_PLAN_CLICK: 'pricing_plan_click',
} as const;
