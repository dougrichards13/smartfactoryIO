import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Mail, Phone, User, Building, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  budget: string;
  message: string;
}

interface ContactFormProps {
  onSubmit?: (data: FormData) => Promise<boolean>;
}

export function ContactForm({ onSubmit }: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    budget: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      if (onSubmit) {
        const success = await onSubmit(formData);
        setSubmitStatus(success ? 'success' : 'error');
      } else {
        // Default Netlify Forms submission
        const form = e.target as HTMLFormElement;
        const response = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(new FormData(form) as any).toString()
        });
        setSubmitStatus(response.ok ? 'success' : 'error');
      }
      
      if (submitStatus !== 'error') {
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          budget: '',
          message: ''
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardContent className="p-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-semibold mb-2">Strategic Consultation Request</h3>
          <p className="text-white/80">
            Complete this form to connect with Smart Suite™ teams for your AI transformation journey.
          </p>
        </div>

        <form 
          onSubmit={handleSubmit}
          name="contact"
          method="POST"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          className="space-y-6"
        >
          {/* Netlify form detection */}
          <input type="hidden" name="form-name" value="contact" />
          <input type="hidden" name="bot-field" />

          <div className="grid md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="flex items-center space-x-2 mb-2 text-sm font-medium">
                <User className="w-4 h-4 text-primary" />
                <span>Full Name *</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="Your full name"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="flex items-center space-x-2 mb-2 text-sm font-medium">
                <Mail className="w-4 h-4 text-primary" />
                <span>Email Address *</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="your.email@company.com"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Company */}
            <div>
              <label htmlFor="company" className="flex items-center space-x-2 mb-2 text-sm font-medium">
                <Building className="w-4 h-4 text-primary" />
                <span>Company *</span>
              </label>
              <input
                type="text"
                id="company"
                name="company"
                required
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="Your company name"
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="flex items-center space-x-2 mb-2 text-sm font-medium">
                <Phone className="w-4 h-4 text-primary" />
                <span>Phone Number</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>

          {/* Budget */}
          <div>
            <label htmlFor="budget" className="block mb-2 text-sm font-medium">
              Annual Innovation Budget *
            </label>
            <select
              id="budget"
              name="budget"
              required
              value={formData.budget}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <option value="">Select your budget range</option>
              <option value="$500K - $1M">$500K - $1M</option>
              <option value="$1M - $5M">$1M - $5M</option>
              <option value="$5M - $10M">$5M - $10M</option>
              <option value="$10M+">$10M+</option>
            </select>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="flex items-center space-x-2 mb-2 text-sm font-medium">
              <MessageSquare className="w-4 h-4 text-primary" />
              <span>Project Details *</span>
            </label>
            <textarea
              id="message"
              name="message"
              required
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary resize-none"
              placeholder="Describe your AI transformation goals, current challenges, and specific areas where you need strategic guidance..."
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <Button
              type="submit"
              disabled={isSubmitting}
              size="lg"
              className="gradient-primary text-white px-8 py-3 text-lg font-semibold hover:shadow-xl transition-all duration-300 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                  Processing...
                </>
              ) : (
                <>
                  Send Strategic Assessment Request
                  <Mail className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </div>

          {/* Status Messages */}
          {submitStatus === 'success' && (
            <div className="flex items-center justify-center space-x-2 text-secondary bg-secondary/10 p-4 rounded-lg">
              <CheckCircle className="w-5 h-5" />
              <span>Thank you! Smart Suite™ teams will contact you within 2 hours.</span>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="flex items-center justify-center space-x-2 text-destructive bg-destructive/10 p-4 rounded-lg">
              <AlertCircle className="w-5 h-5" />
              <span>There was an error sending your request. Please try again or call us directly.</span>
            </div>
          )}
        </form>

        <div className="mt-8 pt-6 border-t border-border text-center text-sm text-white/80">
          <p>
            <strong>Priority Response:</strong> C-level inquiries receive guaranteed response within 2 hours.
            <br />
            For urgent matters, call <strong>+1 (555) 123-4567</strong>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}