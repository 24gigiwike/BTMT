import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast } = useApp();

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md animate-in fade-in slide-in-from-bottom-4 duration-200">
      <div
        className={`flex items-start gap-3 p-4 rounded-lg shadow-lg border text-sm ${
          toast.type === 'success'
            ? 'bg-white border-emerald-200 text-slate-800'
            : toast.type === 'error'
            ? 'bg-white border-red-200 text-slate-800'
            : 'bg-white border-slate-200 text-slate-800'
        }`}
      >
        <div className="shrink-0 mt-0.5">
          {toast.type === 'success' && (
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          )}
          {toast.type === 'error' && (
            <AlertCircle className="w-5 h-5 text-red-600" />
          )}
          {toast.type === 'info' && (
            <Info className="w-5 h-5 text-[#12A9DB]" />
          )}
        </div>
        <div className="flex-1 font-medium leading-snug">
          {toast.message}
        </div>
      </div>
    </div>
  );
};
