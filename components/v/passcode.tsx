"use client"
import { complementary } from '@/fonts';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import * as Tone from "tone";
import { WhiteMonogram } from '../icons/monograms';

// Note: For this to work in your project, you'll need to have
// React, Tailwind CSS, and Tone.js installed.
// npm install tone

// --- Sound Synthesizers ---
// We define synths in the module scope so they are created only once.
// A simple synth for the standard button press beep.
const beepSynth = new Tone.Synth({
    oscillator: { type: 'sine' },
    envelope: { attack: 0.005, decay: 0.1, sustain: 0.3, release: 0.1 },
    volume: -20 // Reduce volume by 20dB (much quieter)
}).toDestination();



/**
 * Passcode Component: A numeric keyboard for passcode entry.
 * @param {object} props
 * @param {string} props.passcode - The current passcode value.
 * @param {(newPasscode: string) => void} props.setPasscode - Function to update the passcode.
 */
export function Passcode({ passcode, setPasscode, passcodeIsCorrect }: { passcode: string, setPasscode: (newPasscode: string) => void, passcodeIsCorrect: boolean }) {
  const router = useRouter()
    // Handler for numeric button clicks
    const handleNumberClick = (number: number) => {
        // Tone.js requires starting the audio context on a user interaction
        Tone.start();
        // Play the standard beep sound
        beepSynth.triggerAttackRelease('C5', '8n');
        // Append the new number to the existing passcode
        setPasscode(passcode + number);
    };

    // Handler for the clear button
    const handleVoir = () => {
        Tone.start();
        router.push('/');
    };
    
    // Handler for the delete button
    const handleDeleteClick = () => {
        Tone.start();
         // Play a slightly different beep for delete
        beepSynth.triggerAttackRelease('A4', '8n');
        // Remove the last character from the passcode
        setPasscode(passcode.slice(0, -1));
    }

    // Define the layout of the keyboard
    const keys = [
        ['1', '2', '3'],
        ['4', '5', '6'],
        ['7', '8', '9'],
        ['V', '0', 'DEL']
    ];
    useEffect(() => {
        if(passcodeIsCorrect){
            router.push('/');
        }
    }, [passcodeIsCorrect, router]);
    return (
      <div className="grid grid-cols-3 gap-4 p-4 w-full max-w-xs mx-auto">
          <span className='col-span-3 text-center text-white h-8'>
            {passcode}
            </span>
            {keys.flat().map((key) => {
                const isNumber = !isNaN(parseInt(key));
                const isVoir = key === 'V';
                const isDelete = key === 'DEL';

                let action = () => handleNumberClick(parseInt(key));
                if (isVoir) action = handleVoir;
                if (isDelete) action = handleDeleteClick;
                
                // Dynamic styling for different button types using Tailwind CSS
                const buttonClass = `
                    ${complementary.className}
                    w-full h-8 flex items-center justify-center text-2xl font-semibold 
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800
                    transition-all duration-100 ease-in-out
                    ${isNumber ? 'bg-transparent text-white active:bg-gray-500 focus:ring-cyan-500' : ''}
                    ${isVoir ? 'w-full h-full bg-black focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800' : ''}
                    ${isDelete ? 'bg-black text-white active:bg-red-500 focus:ring-red-500 text-lg' : ''}
                `;

                return (
                    <button key={key} onClick={action} className={buttonClass}>
                        {isVoir ? <WhiteMonogram className='w-6  mx-auto fill-white'/> : key }
                    </button>
                );
            })}
        </div>
    );
}


