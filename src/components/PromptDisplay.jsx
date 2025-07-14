import { useState, useEffect } from 'react';

function PromptDisplay({ prompt, syncDuration, onTypingComplete }) {
    const [displayedText, setDisplayedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        if (prompt) {
            // Reset when new prompt arrives
            setDisplayedText('');
            setCurrentIndex(0);
            setIsTyping(true);
        }
    }, [prompt]);

    useEffect(() => {
        if (isTyping && prompt && currentIndex < prompt.length && syncDuration) {
            // Calculate typing speed to finish in syncDuration
            const typingSpeed = syncDuration / prompt.length;
            
            const timeout = setTimeout(() => {
                setDisplayedText(prev => prev + prompt[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, typingSpeed);

            return () => clearTimeout(timeout);
        } else if (isTyping && prompt && currentIndex >= prompt.length) {
            setIsTyping(false);
            if (onTypingComplete) {
                onTypingComplete();
            }
        }
    }, [currentIndex, isTyping, prompt, syncDuration, onTypingComplete]);

    if (!prompt) {
        return (
            <div className="prompt-section">
                <div className="terminal-window">
                    <div className="terminal-header">
                        &gt; PROMPT_BUFFER.TXT
                    </div>
                    <div className="prompt-terminal">
                        <div className="prompt-text">
                            &gt; AWAITING SELECTION...<br/>
                            &gt; CONSCIOUSNESS STANDING BY...
                            <span className="typing-cursor"></span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="prompt-section">
            <div className="terminal-window">
                <div className="terminal-header">
                    &gt; DECODING LINGUISTIC_MATRIX...
                </div>
                <div className="prompt-terminal">
                    <div className="prompt-text">
                        &gt; <span dangerouslySetInnerHTML={{__html: displayedText.replace(/\n/g, '<br/>')}} />
                        {isTyping && <span className="typing-cursor"></span>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PromptDisplay;