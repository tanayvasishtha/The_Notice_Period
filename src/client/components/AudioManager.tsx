import React, { useEffect, useRef } from 'react';
import { GamePhase } from '../../shared/types/game';

interface AudioManagerProps {
  phase: GamePhase;
  stressLevel: number;
  isPlaying: boolean;
}

export const AudioManager: React.FC<AudioManagerProps> = ({ phase, stressLevel, isPlaying }) => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  useEffect(() => {
    if (!isPlaying) return;

    // Initialize Web Audio API
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    const audioContext = audioContextRef.current;
    
    // Stop previous audio
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
    }

    // Create new oscillator and gain node
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillatorRef.current = oscillator;
    gainNodeRef.current = gainNode;

    // Connect audio nodes
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Configure audio based on phase and stress
    const getAudioConfig = () => {
      switch (phase) {
        case 'hunt':
          return {
            frequency: 220 + (stressLevel * 2), // Rising tension
            waveType: 'sine' as OscillatorType,
            volume: 0.1,
            duration: 2000
          };
        case 'honeymoon':
          return {
            frequency: 330 + Math.sin(Date.now() / 1000) * 50, // Pleasant, slightly varying
            waveType: 'sine' as OscillatorType,
            volume: 0.08,
            duration: 3000
          };
        case 'grind':
          return {
            frequency: 110 + (stressLevel * 3), // Deep, oppressive
            waveType: 'sawtooth' as OscillatorType,
            volume: 0.15,
            duration: 1500
          };
        case 'choice':
          return {
            frequency: 80 + (stressLevel * 4), // Very deep, ominous
            waveType: 'square' as OscillatorType,
            volume: 0.2,
            duration: 4000
          };
        default:
          return {
            frequency: 220,
            waveType: 'sine' as OscillatorType,
            volume: 0.1,
            duration: 2000
          };
      }
    };

    const config = getAudioConfig();
    
    // Set oscillator properties
    oscillator.type = config.waveType;
    oscillator.frequency.setValueAtTime(config.frequency, audioContext.currentTime);
    
    // Set volume with fade in/out
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(config.volume, audioContext.currentTime + 0.1);
    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + config.duration / 1000);

    // Add frequency modulation for grind and choice phases
    if (phase === 'grind' || phase === 'choice') {
      const lfo = audioContext.createOscillator();
      const lfoGain = audioContext.createGain();
      
      lfo.frequency.setValueAtTime(0.5, audioContext.currentTime);
      lfoGain.gain.setValueAtTime(20, audioContext.currentTime);
      
      lfo.connect(lfoGain);
      lfoGain.connect(oscillator.frequency);
      
      lfo.start();
      setTimeout(() => lfo.stop(), config.duration);
    }

    // Start and stop oscillator
    oscillator.start();
    setTimeout(() => {
      if (oscillatorRef.current === oscillator) {
        oscillator.stop();
        oscillatorRef.current = null;
      }
    }, config.duration);

    return () => {
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
        oscillatorRef.current = null;
      }
    };
  }, [phase, stressLevel, isPlaying]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return null; // This component doesn't render anything
};