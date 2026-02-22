/* eslint-disable @typescript-eslint/no-explicit-any */
import { confirmable, createConfirmation } from 'react-confirm';

function ConfirmationDialog({ title, confirmation, actionLabel, show, proceed }: any) {
    if (!show) return null;

    return (
        <div className="fixed inset-0 z-999 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-[#0d071a] border border-white/10 p-8 rounded-[2.5rem] shadow-2xl max-w-sm w-full text-white animate-in fade-in zoom-in duration-300">
                <div className={`flex items-center justify-between border-l-4 border-red-500 pl-4 mb-4`}>
                    <h2 className="text-2xl inline-flex font-bold uppercase tracking-wider items-center">
                        {title}
                    </h2>
                </div>
                <p className="text-gray-400 mb-8 leading-relaxed">
                    {confirmation}
                </p>
                <div className="flex justify-end gap-3">
                    <button
                        onClick={() => proceed(false)}
                        className="px-6 py-3 rounded-2xl bg-white/5 hover:bg-white/10 font-bold transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => proceed(true)}
                        className={`px-6 py-3 rounded-2xl bg-red-600 hover:bg-red-500 font-bold shadow-lg shadow-red-600/20 transition-all`}
                    >
                        {actionLabel}
                    </button>
                </div>
            </div>
        </div>
    );
};

export const Confirmation = createConfirmation(confirmable(ConfirmationDialog));