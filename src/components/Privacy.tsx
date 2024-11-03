import React from 'react';
import { X } from 'lucide-react';

interface PrivacyProps {
  isOpen: boolean;
  onClose: () => void;
}

const Privacy: React.FC<PrivacyProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-black border border-green-500 text-green-500 p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-black">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Privacy Policy</h2>
          <button
            onClick={onClose}
            className="hover:text-green-400 transition-colors"
            aria-label="Close privacy policy"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4 font-mono">
          <section>
            <h3 className="text-lg font-bold mb-2">Data Collection</h3>
            <p>MU-TH-UR 6000 operates entirely in your browser. We collect:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Terminal interactions</li>
              <li>Command history</li>
              <li>System responses</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-bold mb-2">Data Storage</h3>
            <p>All data is stored temporarily in your browser's memory and is cleared when you:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Close the browser tab</li>
              <li>Use the 'clear' command</li>
              <li>Refresh the page</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-bold mb-2">Data Usage</h3>
            <p>Your data is used exclusively for:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Maintaining conversation context</li>
              <li>Generating appropriate responses</li>
              <li>Creating downloadable log files</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-bold mb-2">Third-Party Access</h3>
            <p>MU-TH-UR 6000 does not:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Share data with third parties</li>
              <li>Store data on external servers</li>
              <li>Track user behavior</li>
              <li>Use cookies or persistent storage</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-bold mb-2">User Rights</h3>
            <p>You have the right to:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Download your interaction logs</li>
              <li>Clear your terminal history</li>
              <li>Start a new session at any time</li>
            </ul>
          </section>

          <div className="mt-6 pt-4 border-t border-green-500/30">
            <p className="text-sm opacity-80">
              Last updated: {new Date().toISOString().split('T')[0]}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;