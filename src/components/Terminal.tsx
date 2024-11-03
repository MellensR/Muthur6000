import React, { useState, useEffect, useRef } from 'react';
import { AudioManager } from '../utils/AudioManager';
import { getRandomDirective } from '../utils/DirectiveMatrix';
import { easterEggs, randomBootMessages } from '../utils/EasterEggs';
import Cursor from './Cursor';
import InitializationLines from './InitializationLines';
import Privacy from './Privacy';
import Header from './Header';
import Help from './Help';

const standardResponses = [
  'DATA LOGGED FOR REVIEW',
  'ALL SYSTEMS OPERATIONAL',
  'ENTRY ARCHIVED IN DATABANKS',
  'PROCESSING COMPLETE',
  'LOG ENTRY ACCEPTED',
  'CREW STATUS: NORMAL',
  'ATMOSPHERIC CONDITIONS: STABLE'
];

const d6Responses = {
  6: "Affirmative. Situation NOMINAL.",
  5: "Affirmative. Proceed with caution.",
  4: "Affirmative. Mother sees it feasible.",
  3: "Uncertain. Mother requires more data.",
  2: "Negative. Mother advises against it.",
  1: "Negative. Critical system alert!"
};

const bootSequence = [
  'MU-TH-UR 6000 SYSTEM INITIALIZING...',
  'PERFORMING SYSTEM DIAGNOSTICS...',
  'CHECKING LIFE SUPPORT SYSTEMS...',
  'ANALYZING ATMOSPHERIC CONDITIONS...',
  'ESTABLISHING SECURE CONNECTION...',
  'ACCESS GRANTED. TERMINAL ACTIVE.',
  'ASK MU-TH-UR PROTOCOL ENABLED.',
  'DIRECTIVE MATRIX LOADED.',
  { text: 'INTERFACE 2037 READY.', isHighlight: true }
];

const Terminal: React.FC = () => {
  const [showLaunchOption, setShowLaunchOption] = useState(true);
  const [showInitLines, setShowInitLines] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [bootText, setBootText] = useState<Array<{ text: string; isHighlight?: boolean }>>([]);
  const [entry, setEntry] = useState('');
  const [logs, setLogs] = useState<Array<{text: string, type: 'input' | 'response', isProtocol?: boolean, isPriority?: boolean}>>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const typingSpeedRef = useRef<number>(50);
  const audioManager = useRef<AudioManager>(AudioManager.getInstance());

  useEffect(() => {
    const handleGlobalClick = () => {
      if (inputRef.current && initialized) {
        inputRef.current.focus();
      }
    };

    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, [initialized]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  const handleLaunch = async () => {
    try {
      await audioManager.current.initialize();
      audioManager.current.playResponseBeep();
      setShowLaunchOption(false);
      setShowInitLines(true);
    } catch (error) {
      console.error('Failed to initialize audio:', error);
      setShowLaunchOption(false);
      setShowInitLines(true);
    }
  };

  const handleInitComplete = () => {
    setShowInitLines(false);
    startBootSequence();
  };

  const startBootSequence = async () => {
    for (const line of bootSequence) {
      const text = typeof line === 'string' ? line : line.text;
      const isHighlight = typeof line === 'object' ? line.isHighlight : false;
      
      if (Math.random() < 0.3) {
        const randomMessage = randomBootMessages[Math.floor(Math.random() * randomBootMessages.length)];
        setBootText(prev => [...prev, { text: randomMessage, isHighlight: true }]);
        audioManager.current.playResponseBeep();
        await new Promise(r => setTimeout(r, 800));
      }
      
      let currentLine = '';
      for (const char of text) {
        currentLine += char;
        setBootText(prev => [
          ...prev.slice(0, -1),
          { text: currentLine, isHighlight }
        ]);
        audioManager.current.playResponseChar();
        await new Promise(r => setTimeout(r, typingSpeedRef.current));
      }
      
      setBootText(prev => [...prev, { text: '', isHighlight: false }]);
      audioManager.current.playResponseBeep();
      await new Promise(r => setTimeout(r, 500));
    }
    
    await new Promise(r => setTimeout(r, 1000));
    setInitialized(true);
  };

  const sanitizeInput = (input: string): string => {
    return input.replace(/<[^>]*>/g, '').slice(0, 500);
  };

  const isQuestion = (text: string) => {
    return text.trim().endsWith('?');
  };

  const rollD6 = () => {
    return Math.floor(Math.random() * 6) + 1;
  };

  const typeResponse = async (response: string, isProtocol: boolean = false, isPriority: boolean = false) => {
    setIsTyping(true);
    audioManager.current.playProcessingHum();
    
    const newLog = { text: '', type: 'response' as const, isProtocol, isPriority };
    setLogs(prev => [...prev, newLog]);
    
    let currentText = '';
    for (const char of response) {
      currentText += char;
      setLogs(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          ...updated[updated.length - 1],
          text: currentText
        };
        return updated;
      });
      
      if (char === '.') {
        audioManager.current.playResponseBeep();
        await new Promise(r => setTimeout(r, typingSpeedRef.current * 3));
      } else if (char === ' ') {
        await new Promise(r => setTimeout(r, typingSpeedRef.current * 0.5));
      } else {
        audioManager.current.playResponseChar();
        await new Promise(r => setTimeout(r, typingSpeedRef.current));
      }
    }
    
    audioManager.current.stopProcessingHum();
    setIsTyping(false);
  };

  const handleQuestionSequence = async () => {
    await typeResponse('Entry received.');
    await typeResponse('Processing...');
    const roll = rollD6();
    await typeResponse(d6Responses[roll as keyof typeof d6Responses]);
  };

  const handleExpandCommand = async () => {
    const directive = getRandomDirective();
    await typeResponse('ACCESSING DIRECTIVE MATRIX...');
    await typeResponse(`${directive.protocol} PROTOCOL ${directive.number}`, true);
    
    const segments = directive.directive.split('...');
    for (const segment of segments) {
      if (segment.trim()) {
        await typeResponse(segment.trim());
      }
    }
  };

  const handleClearCommand = async () => {
    await typeResponse('CLEARING TERMINAL...');
    setLogs([]);
  };

  const handleHelpCommand = async () => {
    setShowHelp(true);
    await typeResponse('DISPLAYING HELP INFORMATION...');
  };

  const handleSubmit = async () => {
    if (!entry.trim() || isTyping) return;
    
    audioManager.current.playKeystroke();
    const sanitizedEntry = sanitizeInput(entry.trim());
    setLogs(prev => [...prev, { text: sanitizedEntry, type: 'input' }]);
    
    const command = sanitizedEntry.toLowerCase();
    setEntry('');
    
    if (command === 'clear') {
      await handleClearCommand();
    } else if (command === 'help') {
      await handleHelpCommand();
    } else {
      const easterEgg = Object.values(easterEggs).find(egg => 
        command.includes(egg.trigger.toLowerCase())
      );
      
      if (easterEgg) {
        await typeResponse(easterEgg.response, false, easterEgg.priority);
      } else if (command === 'expand') {
        await handleExpandCommand();
      } else if (isQuestion(sanitizedEntry)) {
        await handleQuestionSequence();
      } else {
        await typeResponse(standardResponses[Math.floor(Math.random() * standardResponses.length)]);
      }
    }
  };

  const downloadLogs = () => {
    const content = logs
      .map(log => {
        if (log.type === 'input') return `> USER: ${log.text}`;
        return `> MU-TH-UR: ${log.text}`;
      })
      .join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `MU-TH-UR_LOG_${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (showLaunchOption) {
    return (
      <div className="min-h-screen bg-black text-green-500 flex items-center justify-center font-mono">
        <button
          onClick={handleLaunch}
          className="text-2xl border-b-2 border-green-500 pb-1 hover:text-green-400 hover:border-green-400 transition-colors"
        >
          Interface 2037
        </button>
      </div>
    );
  }

  if (showInitLines) {
    return <InitializationLines onComplete={handleInitComplete} />;
  }

  if (!initialized) {
    return (
      <div className="min-h-screen bg-black text-green-500 p-8 font-mono">
        {bootText.map((line, index) => (
          <div key={index} className="whitespace-pre-line">
            {line.isHighlight ? (
              <span className="protocol-line animate-glow">{line.text}</span>
            ) : (
              line.text
            )}
          </div>
        ))}
        <Cursor />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-green-500 p-4 font-mono">
      <div className="max-w-4xl mx-auto">
        <Header 
          onDownloadLogs={downloadLogs}
          onPrivacyClick={() => setShowPrivacy(true)}
        />

        <div 
          ref={terminalRef}
          className="h-[calc(100vh-12rem)] mb-4 overflow-y-auto scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-black"
        >
          {logs.map((log, i) => (
            <div 
              key={i} 
              className={`mb-2 ${
                log.type === 'response' 
                  ? log.isPriority 
                    ? 'text-red-500 font-bold' 
                    : 'text-green-400' 
                  : 'text-green-600'
              }`}
            >
              <span className="opacity-50">
                {log.type === 'input' ? '> USER:' : '> MU-TH-UR:'}
              </span>{' '}
              {log.isProtocol ? (
                <span className="protocol-line animate-glow">{log.text}</span>
              ) : (
                log.text
              )}
              {i === logs.length - 1 && !isTyping && <Cursor />}
            </div>
          ))}
          {logs.length === 0 && <Cursor />}
        </div>

        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={entry}
            onChange={(e) => {
              const sanitized = sanitizeInput(e.target.value);
              setEntry(sanitized);
              audioManager.current.playKeystroke();
            }}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            className="flex-1 bg-black border border-green-500 text-green-500 p-2 focus:outline-none focus:ring-1 focus:ring-green-500"
            placeholder="Enter log entry, ask a question, or type 'help' for commands..."
            disabled={isTyping}
            maxLength={500}
          />
          <button
            onClick={handleSubmit}
            disabled={isTyping}
            className="px-4 py-2 border border-green-500 hover:bg-green-500/10 disabled:opacity-50"
          >
            SUBMIT
          </button>
        </div>
      </div>

      <Privacy 
        isOpen={showPrivacy}
        onClose={() => setShowPrivacy(false)}
      />

      <Help
        isOpen={showHelp}
        onClose={() => setShowHelp(false)}
      />
    </div>
  );
};

export default Terminal;