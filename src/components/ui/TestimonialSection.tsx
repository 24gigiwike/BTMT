import React, { useState } from 'react';
import { TestimonialItem } from '../../types';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

interface TestimonialSectionProps {
  testimonials: TestimonialItem[];
  className?: string;
}

export const TestimonialSection: React.FC<TestimonialSectionProps> = ({
  testimonials,
  className = ''
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!testimonials || testimonials.length === 0) return null;

  const current = testimonials[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className={`py-20 lg:py-24 bg-[#F6F8FA] border-b border-slate-200 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-12 border-b border-slate-200">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-[#12A9DB] mb-2">
              Voices & Perspectives
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#051449] tracking-tight">
              What Our Clients Say
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 text-[11px] font-medium text-slate-600 uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
              Demonstration Preview
            </span>
          </div>
        </div>

        {/* Editorial Single Quote Showcase */}
        <div className="mt-12 lg:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Large Quote Mark & Indicator */}
          <div className="lg:col-span-2 flex lg:flex-col items-center justify-between lg:justify-start gap-4">
            <div className="w-14 h-14 bg-white border border-slate-200 flex items-center justify-center text-[#051449] shadow-sm">
              <Quote className="w-7 h-7 text-[#051449]" />
            </div>
            <div className="font-mono text-xs tracking-widest text-slate-400">
              0{currentIndex + 1} / 0{testimonials.length}
            </div>
          </div>

          {/* Testimonial Quote & Identity */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center gap-1 text-amber-500">
              {Array.from({ length: current.rating || 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-500" />
              ))}
            </div>

            <blockquote className="text-xl sm:text-2xl lg:text-3xl text-slate-800 font-light leading-relaxed tracking-tight">
              "{current.quote}"
            </blockquote>

            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <div>
                <div className="text-base sm:text-lg font-bold text-[#051449]">
                  {current.clientName}
                </div>
                <div className="text-xs sm:text-sm text-slate-500">
                  {current.role} • <span className="font-medium text-slate-700">{current.company}</span>
                </div>
              </div>
              {current.serviceCategory && (
                <div className="text-[11px] font-semibold text-[#12A9DB] uppercase tracking-wider bg-white px-2.5 py-1 border border-slate-200 self-start sm:self-auto">
                  {current.serviceCategory}
                </div>
              )}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="lg:col-span-2 flex lg:flex-col items-center justify-end lg:justify-center gap-3">
            <button
              onClick={handlePrev}
              aria-label="Previous client testimonial"
              className="w-12 h-12 bg-white border border-slate-300 hover:border-[#051449] hover:bg-[#051449] hover:text-white transition-all flex items-center justify-center text-slate-700"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next client testimonial"
              className="w-12 h-12 bg-white border border-slate-300 hover:border-[#051449] hover:bg-[#051449] hover:text-white transition-all flex items-center justify-center text-slate-700"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Dots */}
        <div className="flex justify-center items-center gap-2 mt-12">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1.5 transition-all duration-200 ${
                idx === currentIndex ? 'w-8 bg-[#051449]' : 'w-2 bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
