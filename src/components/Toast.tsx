import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast } = useApp();

  if (!toast) return null;

  const bgStyle =
    toast.type === 'success'
      ? 'bg-slate-900 text-white border-emerald-500/30'
      : toast.type === 'error'
      ? 'bg-rose-950 text-rose-100 border-rose-500/30'
      : 'bg-slate-900 text-slate-100 border-indigo-500/30';

  const icon =
    toast.type === 'success' ? (
      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
    ) : toast.type === 'error' ? (
      <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
    ) : (
      <Info className="w-5 h-5 text-indigo-400 shrink-0" />
    );

  return (
    <aside
      aria-label="Notifikasi sistem"
      className="fixed top-20 right-6 z-50 max-w-md animate-in fade-in slide-in-from-top-4 duration-200"
    >
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-xl backdrop-blur-md ${bgStyle}`}
      >
        {icon}
        <p className="text-sm font-medium leading-snug">{toast.message}</p>
      </div>
    </aside>
  );
};
