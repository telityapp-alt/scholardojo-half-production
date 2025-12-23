
import React from 'react';

/**
 * renderJuicyContent
 * Converts **text** into <strong> tags and handles basic line breaks.
 * Security: Sanitizes raw text to prevent XSS.
 */
export const renderJuicyContent = (text: string | undefined): React.ReactNode => {
    if (!text) return null;

    // Simple Sanitizer: Strip HTML tags to prevent XSS before processing Duo-formatting
    const sanitized = text.replace(/<[^>]*>?/gm, '');

    // Split by ** delimiters
    const parts = sanitized.split(/(\*\*.*?\*\*)/g);

    return (
        <>
            {parts.map((part, i) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                    return (
                        <strong key={i} className="font-black text-slate-800">
                            {part.substring(2, part.length - 2)}
                        </strong>
                    );
                }
                
                return part.split('\n').map((line, j) => (
                    <React.Fragment key={`${i}-${j}`}>
                        {line}
                        {j < part.split('\n').length - 1 && <br />}
                    </React.Fragment>
                ));
            })}
        </>
    );
};
