'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Close icon SVG component
const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SERVICE_TYPES = [
  'Braids',
  'Colored Braids',
  'Twists',
  'Locks',
  'Retwists',
  'Hair Styling',
  'Extensions',
  'Consultation',
] as const;

const TIME_SLOTS = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
  '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
  '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM',
  '5:00 PM', '5:30 PM', '6:00 PM',
];

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    day: 'Saturday',
    time: '',
    services: [] as string[],
    extraInfo: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Format email body as a structured table
      const emailBody = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                    NEW BOOKING REQUEST - OYATZ HAIR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

┌─────────────────────────────────────────────────────────────────────────────┐
│ FIELD                          │ VALUE                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│ Name                           │ ${formData.name}                           │
├─────────────────────────────────────────────────────────────────────────────┤
│ Preferred Day                  │ ${formData.day}                            │
├─────────────────────────────────────────────────────────────────────────────┤
│ Preferred Time                 │ ${formData.time || 'Not specified'}       │
├─────────────────────────────────────────────────────────────────────────────┤
│ Services Requested             │ ${formData.services.length > 0 ? formData.services.join(', ') : 'None selected'} │
├─────────────────────────────────────────────────────────────────────────────┤
│ Additional Information         │ ${formData.extraInfo || 'None provided'}  │
└─────────────────────────────────────────────────────────────────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      `;

      // Use mailto (works without backend)
      const subject = encodeURIComponent('New Booking Request from OYATZ Hair Website');
      const body = encodeURIComponent(emailBody);

      window.location.href = `mailto:ainababs0@gmail.com?subject=${subject}&body=${body}`;
      
      setSubmitStatus('success');
      setTimeout(() => {
        onClose();
        setFormData({
          name: '',
          day: 'Saturday',
          time: '',
          services: [],
          extraInfo: '',
        });
        setSubmitStatus('idle');
      }, 2000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Liquid Glass Card */}
          <div className="relative rounded-[32px] backdrop-blur-[40px] bg-white/20 border border-white/30 shadow-2xl overflow-hidden">
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-brand-500/10 pointer-events-none" />
            
            {/* Content */}
            <div className="relative z-10 p-6 sm:p-8 md:p-10">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <motion.h2
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white"
                >
                  Book Your Appointment
                </motion.h2>
                <motion.button
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  transition={{ delay: 0.2 }}
                  onClick={onClose}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors text-white"
                  aria-label="Close"
                >
                  <CloseIcon />
                </motion.button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Input */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <label className="block text-white/90 font-semibold mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
                    placeholder="Enter your full name"
                  />
                </motion.div>

                {/* Day Selection */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <label className="block text-white/90 font-semibold mb-3">
                    Preferred Day *
                  </label>
                  <div className="flex gap-4">
                    {['Saturday', 'Sunday'].map((day) => (
                      <motion.button
                        key={day}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, day }))}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all ${
                          formData.day === day
                            ? 'bg-white text-brand-600 shadow-lg'
                            : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                        }`}
                      >
                        {day}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                {/* Time Selection */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <label className="block text-white/90 font-semibold mb-2">
                    Preferred Time *
                  </label>
                  <select
                    required
                    value={formData.time}
                    onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
                  >
                    <option value="" className="bg-brand-600">Select a time</option>
                    {TIME_SLOTS.map((time) => (
                      <option key={time} value={time} className="bg-brand-600">
                        {time}
                      </option>
                    ))}
                  </select>
                </motion.div>

                {/* Service Types */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <label className="block text-white/90 font-semibold mb-3">
                    Services Needed *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {SERVICE_TYPES.map((service) => (
                      <motion.button
                        key={service}
                        type="button"
                        onClick={() => handleServiceToggle(service)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                          formData.services.includes(service)
                            ? 'bg-white text-brand-600 shadow-md'
                            : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                        }`}
                      >
                        {service}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                {/* Extra Information */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <label className="block text-white/90 font-semibold mb-2">
                    Additional Information
                  </label>
                  <textarea
                    value={formData.extraInfo}
                    onChange={(e) => setFormData(prev => ({ ...prev, extraInfo: e.target.value }))}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all resize-none"
                    placeholder="Any additional details, special requests, or questions..."
                  />
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="pt-4"
                >
                  <motion.button
                    type="submit"
                    disabled={isSubmitting || formData.services.length === 0}
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    className={`w-full px-8 py-4 rounded-xl font-bold text-lg transition-all ${
                      isSubmitting || formData.services.length === 0
                        ? 'bg-white/20 text-white/50 cursor-not-allowed'
                        : 'bg-white text-brand-600 hover:shadow-2xl hover:shadow-white/20'
                    }`}
                  >
                    {isSubmitting ? 'Sending...' : submitStatus === 'success' ? '✓ Sent!' : 'Submit Booking Request'}
                  </motion.button>
                  
                  {submitStatus === 'error' && (
                    <p className="mt-2 text-red-300 text-sm text-center">
                      Error sending request. Please try again or call directly.
                    </p>
                  )}
                  
                  {formData.services.length === 0 && (
                    <p className="mt-2 text-white/70 text-sm text-center">
                      Please select at least one service
                    </p>
                  )}
                </motion.div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

