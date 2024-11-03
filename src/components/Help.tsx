import React from 'react';
import { X } from 'lucide-react';

interface HelpProps {
  isOpen: boolean;
  onClose: () => void;
}

const Help: React.FC<HelpProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-black border border-green-500 text-green-500 p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-black">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">MU-TH-UR 6000 Help</h2>
          <button
            onClick={onClose}
            className="hover:text-green-400 transition-colors"
            aria-label="Close help"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6 font-mono">
          <section>
            <h3 className="text-lg font-bold mb-2">Available Commands</h3>
            <div className="space-y-2">
              <div>
                <code className="text-green-400">help</code>
                <p className="mt-1">Display this help information</p>
              </div>
              <div>
                <code className="text-green-400">clear</code>
                <p className="mt-1">Clear the terminal screen</p>
              </div>
              <div>
                <code className="text-green-400">expand</code>
                <p className="mt-1">Access a random directive from the protocol matrix</p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-bold mb-2">Interaction Types</h3>
            <div className="space-y-2">
              <div>
                <p className="font-bold">Questions</p>
                <p className="mt-1">End your entry with a question mark (?) to receive probability analysis</p>
              </div>
              <div>
                <p className="font-bold">Statements</p>
                <p className="mt-1">Regular entries will be logged and analyzed</p>
              </div>
              <div>
                <p className="font-bold">Special Commands</p>
                <p className="mt-1">Specific keywords may trigger special responses</p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-bold mb-2">Interface Features</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Download logs using the download button</li>
              <li>View privacy policy using the privacy button</li>
              <li>Terminal history is preserved during session</li>
              <li>Audio feedback for enhanced interaction</li>
            </ul>
          </section>

          <div className="mt-8 pt-4 border-t border-green-500/30">
            <p className="text-sm opacity-80">
              MU-TH-UR 6000 is ready to assist. Enter your queries or commands above.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;