
import React, { useState, useEffect } from 'react';
import { Language } from '../../types';
import { Database, Clock, User, MessageCircle, Trash2 } from 'lucide-react';
// Added missing import for BUSINESS_DETAILS
import { BUSINESS_DETAILS } from '../../constants';

const AdminDashboard: React.FC<{ lang: Language }> = ({ lang }) => {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('sankalp_logs') || '[]');
    setLogs(data.reverse());
  }, []);

  const clearLogs = () => {
    if(confirm("Clear all records?")) {
        localStorage.removeItem('sankalp_logs');
        setLogs([]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-32 px-6 pb-20">
      <div className="max-w-6xl mx-auto space-y-10">
        <header className="flex items-center justify-between">
           <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-[#7B1E1E] rounded-2xl flex items-center justify-center text-[#D4AF37]">
                 <Database size={24} />
              </div>
              <div>
                 <h1 className="text-3xl font-black text-gray-800">Admin Kendra</h1>
                 <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Ritual Tracking System</p>
              </div>
           </div>
           <button onClick={clearLogs} className="p-4 text-red-400 hover:bg-red-50 rounded-2xl transition-all">
              <Trash2 size={24} />
           </button>
        </header>

        <div className="grid gap-6">
          {logs.length === 0 ? (
            <div className="bg-white p-20 text-center rounded-[3rem] border border-gray-100 italic text-gray-400">
               No recent sankalp submissions found.
            </div>
          ) : (
            logs.map((log, i) => (
              <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8 group hover:shadow-xl transition-all">
                 <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-full bg-[#FFF8E7] flex items-center justify-center text-[#7B1E1E] font-black text-xl">
                       {log.name[0]}
                    </div>
                    <div className="space-y-1">
                       <h3 className="font-bold text-xl text-gray-800">{log.name}</h3>
                       <p className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest">{log.ritual}</p>
                    </div>
                 </div>

                 <div className="flex flex-wrap gap-8">
                    <div className="flex items-center gap-2 text-gray-400">
                       <User size={16} />
                       <span className="text-xs font-bold">{log.gotra}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                       <Clock size={16} />
                       <span className="text-xs font-bold">{new Date(log.date).toLocaleDateString()}</span>
                    </div>
                 </div>

                 <a 
                    href={`https://wa.me/${BUSINESS_DETAILS.phone.replace('+', '')}?text=Hello ${log.name}, regarding your ${log.ritual} sankalp...`}
                    target="_blank"
                    className="bg-emerald-500 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center gap-2 shadow-lg shadow-emerald-500/20 hover:scale-105 transition-all"
                 >
                    <MessageCircle size={16} /> Contact
                 </a>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
