"use client"
import { complementary } from '@/fonts';
import { useRouter } from 'next/navigation';
import React from 'react';
import * as Tone from "tone";
import LogoIcon from '../icons/logo';

// Note: For this to work in your project, you'll need to have
// React, Tailwind CSS, and Tone.js installed.
// npm install tone

// --- Sound Synthesizers ---
// We define synths in the module scope so they are created only once.
// A simple synth for the standard button press beep.
const beepSynth = new Tone.Synth({
    oscillator: { type: 'sine' },
    envelope: { attack: 0.005, decay: 0.1, sustain: 0.3, release: 0.1 }
}).toDestination();

// A lower-pitched synth for the reset/clear action.
const resetBeepSynth = new Tone.Synth({
    oscillator: { type: 'triangle' },
    envelope: { attack: 0.005, decay: 0.2, sustain: 0.1, release: 0.2 }
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
    const handleClearClick = () => {
        Tone.start();
        // Play the lower-pitched reset sound
        resetBeepSynth.triggerAttackRelease('G3', '8n');
        // Reset the passcode to an empty string
        setPasscode('');
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
        ['CLR', '0', 'DEL']
    ];

    return (
      <div className="grid grid-cols-3 gap-4 p-4 w-full max-w-xs mx-auto">
          <span className='col-span-3 text-center text-white h-8'>
            {passcodeIsCorrect ? <button className='w-full h-full bg-black rounded-lg focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800' onClick={() => router.push('/')}><LogoIcon className='w-12 mx-auto'/></button> :passcode}
            </span>
            {keys.flat().map((key) => {
                const isNumber = !isNaN(parseInt(key));
                const isClear = key === 'CLR';
                const isDelete = key === 'DEL';

                let action = () => handleNumberClick(parseInt(key));
                if (isClear) action = handleClearClick;
                if (isDelete) action = handleDeleteClick;
                
                // Dynamic styling for different button types using Tailwind CSS
                const buttonClass = `
                    ${complementary.className}
                    w-full h-8 flex items-center justify-center text-2xl font-semibold 
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800
                    transition-all duration-100 ease-in-out
                    ${isNumber ? 'bg-transparent text-white active:bg-gray-500 focus:ring-cyan-500' : ''}
                    ${isClear || isDelete ? 'bg-black text-white active:bg-red-500 focus:ring-red-500 text-lg' : ''}
                `;

                return (
                    <button key={key} onClick={action} className={buttonClass}>
                        {key}
                    </button>
                );
            })}
        </div>
    );
}


