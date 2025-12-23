
export const AIParser = {
    /**
     * Robust JSON extraction even with AI conversational noise.
     */
    safeParse: <T>(raw: string, fallback: T): T => {
        if (!raw || typeof raw !== 'string') return fallback;
        
        try {
            // Remove markdown code blocks if present
            let clean = raw.replace(/```json/g, '').replace(/```/g, '').trim();
            
            // Find boundaries of actual JSON object or array
            const firstBrace = clean.indexOf('{');
            const lastBrace = clean.lastIndexOf('}');
            const firstBracket = clean.indexOf('[');
            const lastBracket = clean.lastIndexOf(']');
            
            let jsonString = '';
            if (firstBrace !== -1 && (firstBracket === -1 || firstBrace < firstBracket)) {
                jsonString = clean.substring(firstBrace, lastBrace + 1);
            } else if (firstBracket !== -1) {
                jsonString = clean.substring(firstBracket, lastBracket + 1);
            } else {
                // Not a JSON structure, attempt direct parse
                jsonString = clean;
            }

            const parsed = JSON.parse(jsonString);
            return { ...fallback, ...parsed } as T; // Merge with fallback to ensure property existence
        } catch (e) {
            console.warn("[Sensei AI] Malformed JSON received. Recovery mode activated.");
            return fallback;
        }
    }
};
