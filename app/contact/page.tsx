"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import emailjs from '@emailjs/browser'
import ReCAPTCHA from 'react-google-recaptcha'
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [captchaValue, setCaptchaValue] = useState<string | null>(null)

  const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
  const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
  const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
  const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    const form = e.currentTarget;

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      setIsSubmitting(false);
      setSubmitStatus('error');
      setErrorMessage('EmailJS environment variables are missing. Please check your .env.local and Render environment settings.');
      return;
    }
    if (!RECAPTCHA_SITE_KEY) {
      setIsSubmitting(false);
      setSubmitStatus('error');
      setErrorMessage('reCAPTCHA site key is missing. Please check your .env.local and Render environment settings.');
      return;
    }
    if (!captchaValue) {
      setIsSubmitting(false);
      setSubmitStatus('error');
      setErrorMessage('Please complete the CAPTCHA challenge.');
      return;
    }

    const formData = new FormData(form);
    const templateParams = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      organization: formData.get('organization') as string,
      interest: formData.get('interest') as string,
      message: formData.get('message') as string,
      'g-recaptcha-response': captchaValue,
    };

    try {
      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      if (result.status === 200) {
        setSubmitStatus('success');
        form.reset();
        setCaptchaValue(null);
      } else {
        setSubmitStatus('error');
        setErrorMessage('Failed to send message');
      }
    } catch (error) {
      console.error('[Contact] EmailJS send failed:', error);
      setSubmitStatus('error');
      setErrorMessage('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 font-serif flex flex-col">
      <Nav />

      <main className="flex-1 pt-24">
        {/* Header Section */}
        <section className="max-w-2xl mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl md:text-6xl font-normal tracking-tight leading-tight mb-8">Get In Touch</h1>
          <p className="text-lg font-normal leading-relaxed tracking-wide text-neutral-600">
            Ready to collaborate or just looking to find out more? We'd love to hear from you.
          </p>
        </section>

        {/* Contact Form */}
        <section className="max-w-lg mx-auto px-6 pb-24">
          {submitStatus === 'success' ? (
            <div className="text-center space-y-4">
              <div className="text-green-600 text-lg font-medium">Message sent successfully!</div>
              <p className="text-neutral-600">We'll get back to you within 24-48 hours.</p>
              <button
                onClick={() => setSubmitStatus('idle')}
                className="text-neutral-900 border border-neutral-300 px-6 py-2 rounded-lg hover:bg-neutral-900 hover:text-white transition-all duration-300"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-6">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-4 border border-neutral-300 bg-transparent text-neutral-900 placeholder-neutral-500 focus:outline-none focus:border-neutral-900 transition-colors font-serif text-lg rounded-lg disabled:opacity-50"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-4 border border-neutral-300 bg-transparent text-neutral-900 placeholder-neutral-500 focus:outline-none focus:border-neutral-900 transition-colors font-serif text-lg rounded-lg disabled:opacity-50"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    name="organization"
                    placeholder="Organization"
                    disabled={isSubmitting}
                    className="w-full px-4 py-4 border border-neutral-300 bg-transparent text-neutral-900 placeholder-neutral-500 focus:outline-none focus:border-neutral-900 transition-colors font-serif text-lg rounded-lg disabled:opacity-50"
                  />
                </div>

                <div className="relative">
                  <select
                    name="interest"
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-4 pr-10 border border-neutral-300 bg-transparent text-neutral-900 focus:outline-none focus:border-neutral-900 transition-colors font-serif text-lg appearance-none cursor-pointer rounded-lg disabled:opacity-50"
                  >
                    <option value="">Interest Area</option>
                    <option value="pilot-program">Pilot Program</option>
                    <option value="partnership">Partnership</option>
                    <option value="research-collaboration">Research Collaboration</option>
                    <option value="funding-opportunity">Funding Opportunity</option>
                    <option value="join-team">Join Our Team</option>
                    <option value="other">Other</option>
                  </select>
                  <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                    <ChevronDown className="w-4 h-4 text-neutral-400" />
                  </div>
                </div>

                <div>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Message"
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-4 border border-neutral-300 bg-transparent text-neutral-900 placeholder-neutral-500 focus:outline-none focus:border-neutral-900 transition-colors font-serif text-lg resize-none rounded-lg disabled:opacity-50"
                  />
                </div>
              </div>

              {submitStatus === 'error' && (
                <div className="text-red-600 text-sm">
                  {errorMessage || 'Failed to send message. Please try again.'}
                </div>
              )}

              <div className="pt-8">
                {RECAPTCHA_SITE_KEY ? (
                  <ReCAPTCHA
                    sitekey={RECAPTCHA_SITE_KEY}
                    onChange={setCaptchaValue}
                    className="my-4"
                  />
                ) : (
                  <div className="text-red-600 text-sm mb-4">
                    reCAPTCHA is not configured. Please check your environment variables.
                  </div>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting || (!captchaValue && !!RECAPTCHA_SITE_KEY)}
                  className="w-full py-4 text-lg font-normal tracking-wide text-neutral-900 border border-neutral-300 hover:bg-neutral-900 hover:text-white transition-all duration-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          )}

          {/* Response Time Note */}
          <div className="text-center mt-12 pt-8 border-t border-neutral-200">
            <p className="text-sm text-neutral-500 tracking-wide">We typically respond within 24-48 hours</p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
