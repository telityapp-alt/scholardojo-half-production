
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const toggleFaq = (i: number) => setOpenFaq(openFaq === i ? null : i);

  return (
      <section className="py-24 px-6 bg-white">
          <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-black text-slate-700 text-center mb-12 tracking-tight">Frequently Asked Questions</h2>
              
              <div className="space-y-4">
                  {[
                      { q: "Is ScholarDojo really free?", a: "Yes! You can access the core Quest Board, Roadmap, and Community for free forever. We make money from our 'Super Scholar' premium tier which offers unlimited AI usage." },
                      { q: "How does the AI Essay writer work?", a: "We use advanced LLMs (like Gemini) to structure your thoughts. It doesn't write for you; it acts as a coach to polish your unique story." },
                      { q: "Can I find international scholarships?", a: "Absolutely. Our database covers opportunities in the US, UK, Europe, Asia, and Australia." },
                      { q: "What is the 'Interview Arena'?", a: "It's a simulator where you voice-chat with AI personas (like a strict Dean or a friendly Alumnus) to practice your answers in real-time." }
                  ].map((item, i) => (
                      <div key={i} className="border-2 border-slate-200 rounded-[32px] overflow-hidden">
                          <button 
                            onClick={() => toggleFaq(i)}
                            className="w-full p-6 text-left bg-white hover:bg-slate-50 flex justify-between items-center transition-colors"
                          >
                              <span className="font-black text-slate-700 text-lg">{item.q}</span>
                              {openFaq === i ? <ChevronUp className="text-slate-400" /> : <ChevronDown className="text-slate-400" />}
                          </button>
                          {openFaq === i && (
                              <div className="p-6 pt-0 bg-white text-slate-500 font-bold leading-relaxed border-t-2 border-slate-100">
                                  {item.a}
                              </div>
                          )}
                      </div>
                  ))}
              </div>
          </div>
      </section>
  );
};
