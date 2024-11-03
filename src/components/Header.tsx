import React from 'react';
import { Download, Power, Shield } from 'lucide-react';

interface HeaderProps {
  onDownloadLogs: () => void;
  onPrivacyClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onDownloadLogs, onPrivacyClick }) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Power className="w-5 h-5" />
          <span className="text-sm">MU-TH-UR 6000 TERMINAL</span>
        </div>
        <button
          onClick={onPrivacyClick}
          className="flex items-center gap-2 text-sm text-green-500/70 hover:text-green-500 transition-colors"
        >
          <Shield className="w-4 h-4" />
          <span>Privacy</span>
        </button>
      </div>
      <button
        onClick={onDownloadLogs}
        className="flex items-center gap-2 px-3 py-1 border border-green-500 hover:bg-green-500/10"
      >
        <Download className="w-4 h-4" />
        <span className="text-sm">DOWNLOAD LOGS</span>
      </button>
    </div>
  );
};

export default Header;