import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';

export type LegalDocType = 'privacy' | 'terms' | null;

export const openLegalModal = (doc: 'privacy' | 'terms') => {
  window.dispatchEvent(new CustomEvent('logicstac:open-legal', { detail: doc }));
};

export const LegalModal: React.FC = () => {
  const [activeDoc, setActiveDoc] = useState<LegalDocType>(null);

  useEffect(() => {
    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent<LegalDocType>;
      setActiveDoc(customEvent.detail || 'privacy');
    };

    window.addEventListener('logicstac:open-legal', handleOpen);
    return () => window.removeEventListener('logicstac:open-legal', handleOpen);
  }, []);

  useEffect(() => {
    if (activeDoc) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setActiveDoc(null);
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [activeDoc]);

  if (!activeDoc) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={() => setActiveDoc(null)}
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
    >
      <div
        className="relative w-full max-w-3xl max-h-[85vh] bg-[#141613] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-[#191c17]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-ln-yellow/10 border border-ln-yellow/20 flex items-center justify-center text-ln-yellow">
              {activeDoc === 'privacy' ? <ShieldCheck className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-ln-yellow font-bold">
                  LogicStac Legal
                </span>
                <span className="text-[10px] text-gray-500 font-mono">• Updated Jan 2025</span>
              </div>
              <h2 id="legal-modal-title" className="font-display font-bold text-xl uppercase tracking-tight text-white">
                {activeDoc === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Toggle between docs */}
            <div className="hidden sm:flex bg-white/5 p-1 rounded-lg border border-white/10 text-xs font-mono">
              <button
                onClick={() => setActiveDoc('privacy')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  activeDoc === 'privacy' ? 'bg-ln-yellow text-black font-bold' : 'text-gray-400 hover:text-white'
                }`}
              >
                Privacy
              </button>
              <button
                onClick={() => setActiveDoc('terms')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  activeDoc === 'terms' ? 'bg-ln-yellow text-black font-bold' : 'text-gray-400 hover:text-white'
                }`}
              >
                Terms
              </button>
            </div>

            <button
              onClick={() => setActiveDoc(null)}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close legal modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 font-sans text-sm sm:text-base text-gray-300 leading-relaxed">
          {activeDoc === 'privacy' ? (
            <>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-white font-bold">
                  <CheckCircle2 className="w-4 h-4 text-ln-yellow" />
                  <span>Privacy Summary</span>
                </div>
                <p className="text-xs text-gray-400">
                  LogicStac values your privacy. We do not sell your personal data, track your browsing activities across unrelated websites, or share your proprietary project briefs with unauthorized third parties.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-display font-bold text-lg text-white uppercase tracking-tight">1. Information We Collect</h3>
                <p>
                  When you initiate project inquiries, book discovery calls, or engage with our interactive configurators, we may collect your name, business email, organization name, approximate project budget, and project requirements.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-display font-bold text-lg text-white uppercase tracking-tight">2. Use of Information</h3>
                <p>
                  We use collected project parameters solely to evaluate technical scope, prepare customized architecture proposals, and maintain client communications throughout the delivery lifecycle.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-display font-bold text-lg text-white uppercase tracking-tight">3. Confidentiality & Non-Disclosure</h3>
                <p>
                  All project briefs, intellectual property assets, and proprietary design tokens shared with LogicStac are held under strict commercial confidentiality and protected by reciprocal non-disclosure protocols.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-display font-bold text-lg text-white uppercase tracking-tight">4. Contact Our Data Protection Team</h3>
                <p>
                  If you have inquiries regarding our data handling practices or wish to request data erasure, please contact us directly at <span className="text-ln-yellow font-mono">legal@logicstac.com</span>.
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-white font-bold">
                  <CheckCircle2 className="w-4 h-4 text-ln-yellow" />
                  <span>Engagement Terms</span>
                </div>
                <p className="text-xs text-gray-400">
                  By accessing the LogicStac agency portal, utilizing our interactive tools, or commissioning bespoke engineering sprints, you agree to these commercial terms of engagement.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-display font-bold text-lg text-white uppercase tracking-tight">1. Services & SOW Execution</h3>
                <p>
                  All bespoke web development, 3D WebGL engineering, and brand identity projects are executed according to mutually agreed Statements of Work (SOW) defining sprint milestones, deliverables, and acceptance criteria.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-display font-bold text-lg text-white uppercase tracking-tight">2. Intellectual Property Rights</h3>
                <p>
                  Upon settlement of project sprint invoices, all final custom codebases, design files, component libraries, and creative assets transfer exclusively to the client, subject to standard open-source library licenses.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-display font-bold text-lg text-white uppercase tracking-tight">3. Performance & Warranties</h3>
                <p>
                  We guarantee that deliverables pass modern performance benchmarks (Core Web Vitals, 60fps canvas performance, and responsive mobile parity) as agreed in your service level tier.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-display font-bold text-lg text-white uppercase tracking-tight">4. Governing Law</h3>
                <p>
                  These terms are governed by and construed in accordance with the laws of England and Wales, with jurisdiction in London, United Kingdom.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/10 bg-[#191c17] flex justify-between items-center text-xs text-gray-400 font-mono">
          <span>LogicStac Digital Agency London</span>
          <button
            onClick={() => setActiveDoc(null)}
            className="px-4 py-2 rounded-lg bg-ln-yellow text-black font-sans font-bold uppercase tracking-wider hover:brightness-110 transition-all cursor-pointer"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default LegalModal;
