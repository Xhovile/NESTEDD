import React from 'react';
import { MessageCircle } from 'lucide-react';

interface FloatingChatButtonProps {
  onClick: () => void;
}

const FloatingChatButton: React.FC<FloatingChatButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-8 right-8 z-[90] w-16 h-16 bg-orange-600 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all group"
      aria-label="Open support chat"
    >
      <MessageCircle size={32} />
      <span className="absolute -top-1 -right-1 w-6 h-6 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white dark:border-zinc-950 animate-bounce">
        3
      </span>
      <div className="absolute bottom-full right-0 mb-4 bg-white dark:bg-zinc-900 p-4 rounded-2xl shadow-xl border border-zinc-100 dark:border-zinc-800 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
        <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Need help finding a home?</p>
        <p className="text-xs text-zinc-500">Our agents are online</p>
      </div>
    </button>
  );
};

export default FloatingChatButton;
