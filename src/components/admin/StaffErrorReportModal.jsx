import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AlertTriangle, ShieldAlert, CheckCircle2, Plus, Clock, User, X } from 'lucide-react';

export const StaffErrorReportModal = ({ isOpen, onClose }) => {
  const { staffErrors, reportStaffError, resolveStaffError, tables } = useApp();

  const [isReportingNew, setIsReportingNew] = useState(false);
  const [staffName, setStaffName] = useState('Ramesh Sharma');
  const [tableNumber, setTableNumber] = useState('2');
  const [errorType, setErrorType] = useState('Order Delay');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState('Medium');
  const [selectedResolveId, setSelectedResolveId] = useState(null);
  const [actionInput, setActionInput] = useState('');

  if (!isOpen) return null;

  const handleSubmitNewReport = (e) => {
    e.preventDefault();
    if (!description.trim()) return;
    reportStaffError(staffName, tableNumber, errorType, description, severity);
    setDescription('');
    setIsReportingNew(false);
  };

  const handleConfirmResolve = (errorId) => {
    if (!actionInput.trim()) return;
    resolveStaffError(errorId, actionInput);
    setSelectedResolveId(null);
    setActionInput('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl glass-panel rounded-3xl p-6 border border-rose-500/30 shadow-2xl max-h-[90vh] overflow-y-auto space-y-5 bg-[#090d18]/95">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400">
              <ShieldAlert className="h-6 w-6 animate-pulse" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-white">Staff Error & Incident Audit Hub</h3>
              <p className="text-xs text-slate-400">Track worker errors, order delays, and resolution actions in real-time</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsReportingNew(!isReportingNew)}
              className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md transition flex items-center space-x-1"
            >
              <Plus className="h-4 w-4" />
              <span>Log Incident</span>
            </button>

            <button onClick={onClose} className="p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* New Report Form */}
        {isReportingNew && (
          <form onSubmit={handleSubmitNewReport} className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 animate-fadeIn">
            <h4 className="font-bold text-xs text-rose-300 uppercase tracking-wide">Report New Staff Incident</h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Staff Member</label>
                <input
                  type="text"
                  value={staffName}
                  onChange={e => setStaffName(e.target.value)}
                  className="w-full p-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-rose-500"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Table Number</label>
                <select
                  value={tableNumber}
                  onChange={e => setTableNumber(e.target.value)}
                  className="w-full p-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-rose-500"
                >
                  {tables.map(t => <option key={t.id} value={t.id}>Table #{t.id}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Error Type</label>
                <select
                  value={errorType}
                  onChange={e => setErrorType(e.target.value)}
                  className="w-full p-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-rose-500"
                >
                  <option value="Order Delay">Order Delay</option>
                  <option value="Item Customization Mismatch">Item Customization Mismatch</option>
                  <option value="Table Billing Dispute">Table Billing Dispute</option>
                  <option value="Kitchen Equipment Bottleneck">Kitchen Equipment Bottleneck</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Severity</label>
                <select
                  value={severity}
                  onChange={e => setSeverity(e.target.value)}
                  className="w-full p-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-rose-500"
                >
                  <option value="Low">Low 🟢</option>
                  <option value="Medium">Medium 🟡</option>
                  <option value="High">High 🔴</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Incident Description</label>
                <input
                  type="text"
                  placeholder="Describe what happened..."
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="w-full p-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-rose-500"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setIsReportingNew(false)}
                className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-xl bg-rose-600 text-white text-xs font-extrabold"
              >
                Submit Incident Report
              </button>
            </div>
          </form>
        )}

        {/* Error Reports List */}
        <div className="space-y-3">
          {staffErrors.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-500 bg-slate-900/40 rounded-2xl">
              No staff errors or operational incidents logged.
            </div>
          ) : (
            staffErrors.map(err => (
              <div key={err.id} className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-extrabold text-white">{err.id}</span>
                    <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-extrabold border ${err.severity === 'High' ? 'bg-rose-500/20 text-rose-300 border-rose-500/30' : err.severity === 'Medium' ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'}`}>
                      {err.severity} Severity
                    </span>
                    <span className="text-xs text-slate-400">• Table #{err.tableNumber}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-[11px] font-bold text-slate-400">{err.timestamp}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded font-extrabold ${err.status === 'Resolved' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'}`}>
                      {err.status}
                    </span>
                  </div>
                </div>

                <div className="text-xs space-y-1">
                  <div className="flex items-center space-x-1.5 text-slate-300">
                    <User className="h-3.5 w-3.5 text-amber-400" />
                    <span className="font-bold text-white">{err.staffName}</span>
                    <span className="text-slate-500">({err.errorType})</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed bg-slate-950/60 p-2 rounded-xl border border-slate-800">{err.description}</p>
                </div>

                {err.status === 'Resolved' ? (
                  <div className="text-[11px] text-emerald-300 font-semibold flex items-center space-x-1 pt-1">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Action Taken: {err.actionTaken}</span>
                  </div>
                ) : (
                  <div className="pt-2">
                    {selectedResolveId === err.id ? (
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          placeholder="Action taken to resolve..."
                          value={actionInput}
                          onChange={e => setActionInput(e.target.value)}
                          className="flex-1 p-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500"
                        />
                        <button
                          onClick={() => handleConfirmResolve(err.id)}
                          className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-extrabold text-xs"
                        >
                          Confirm Resolve
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setSelectedResolveId(err.id)}
                        className="px-3 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold transition"
                      >
                        Resolve Incident ➔
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
