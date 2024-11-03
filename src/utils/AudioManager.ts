export class AudioManager {
  private static instance: AudioManager;
  private audioContext: AudioContext;
  private gainNode: GainNode;
  private oscillator: OscillatorNode | null = null;

  private constructor() {
    this.audioContext = new AudioContext();
    this.gainNode = this.audioContext.createGain();
    this.gainNode.connect(this.audioContext.destination);
    this.gainNode.gain.value = 0.15; // Master volume
  }

  public static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }

  public playKeystroke() {
    const clickOsc = this.audioContext.createOscillator();
    const clickGain = this.audioContext.createGain();
    const filterNode = this.audioContext.createBiquadFilter();
    
    clickOsc.connect(filterNode);
    filterNode.connect(clickGain);
    clickGain.connect(this.gainNode);
    
    // Random frequency between 100-400Hz for a heavier sound
    const freq = 100 + Math.random() * 300;
    
    // Random waveform between square and sawtooth for harsh tones
    clickOsc.type = Math.random() > 0.5 ? 'square' : 'sawtooth';
    
    // Filter setup for a more mechanical sound
    filterNode.type = 'bandpass';
    filterNode.frequency.setValueAtTime(freq * 2, this.audioContext.currentTime);
    filterNode.Q.value = 1 + Math.random() * 5;
    
    clickOsc.frequency.setValueAtTime(freq, this.audioContext.currentTime);
    clickOsc.frequency.exponentialRampToValueAtTime(
      freq * 0.7,
      this.audioContext.currentTime + 0.03
    );
    
    clickGain.gain.setValueAtTime(0.4, this.audioContext.currentTime);
    clickGain.gain.exponentialRampToValueAtTime(
      0.01,
      this.audioContext.currentTime + 0.03
    );
    
    clickOsc.start();
    clickOsc.stop(this.audioContext.currentTime + 0.03);
  }

  public playResponseChar() {
    const clickOsc = this.audioContext.createOscillator();
    const clickGain = this.audioContext.createGain();
    
    clickOsc.connect(clickGain);
    clickGain.connect(this.gainNode);
    
    // Heavy mechanical click sound
    clickOsc.type = 'square';
    clickOsc.frequency.setValueAtTime(80, this.audioContext.currentTime);
    
    clickGain.gain.setValueAtTime(0.4, this.audioContext.currentTime);
    clickGain.gain.exponentialRampToValueAtTime(
      0.01,
      this.audioContext.currentTime + 0.08
    );
    
    clickOsc.start();
    clickOsc.stop(this.audioContext.currentTime + 0.08);
  }

  public playResponseBeep() {
    const beepOsc = this.audioContext.createOscillator();
    const beepGain = this.audioContext.createGain();
    const filterNode = this.audioContext.createBiquadFilter();
    
    beepOsc.connect(filterNode);
    filterNode.connect(beepGain);
    beepGain.connect(this.gainNode);
    
    // Create a more mechanical, industrial sound
    filterNode.type = 'lowpass';
    filterNode.frequency.setValueAtTime(800, this.audioContext.currentTime);
    
    beepOsc.frequency.setValueAtTime(220, this.audioContext.currentTime);
    beepOsc.type = 'square';
    
    beepGain.gain.setValueAtTime(0.4, this.audioContext.currentTime);
    beepGain.gain.exponentialRampToValueAtTime(
      0.01,
      this.audioContext.currentTime + 0.2
    );
    
    beepOsc.start();
    beepOsc.stop(this.audioContext.currentTime + 0.2);
  }

  public playProcessingHum() {
    if (this.oscillator) {
      this.stopProcessingHum();
    }

    this.oscillator = this.audioContext.createOscillator();
    const humGain = this.audioContext.createGain();
    const filterNode = this.audioContext.createBiquadFilter();
    
    this.oscillator.connect(filterNode);
    filterNode.connect(humGain);
    humGain.connect(this.gainNode);
    
    filterNode.type = 'bandpass';
    filterNode.frequency.setValueAtTime(200, this.audioContext.currentTime);
    filterNode.Q.value = 10;
    
    this.oscillator.frequency.setValueAtTime(120, this.audioContext.currentTime);
    this.oscillator.type = 'sawtooth';
    
    humGain.gain.setValueAtTime(0.1, this.audioContext.currentTime);
    
    this.oscillator.start();
  }

  public stopProcessingHum() {
    if (this.oscillator) {
      this.oscillator.stop();
      this.oscillator.disconnect();
      this.oscillator = null;
    }
  }

  public async initialize() {
    if (this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }
  }
}