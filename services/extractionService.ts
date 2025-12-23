
import { Type } from "@google/genai";
import { DomainType } from "../core/contracts/entityMap";
import { AIOrchestrator } from "../core/engines/aiOrchestrator";

export const scanBriefWithAI = async (input: string, domain: DomainType) => {
  const model = 'gemini-3-flash-preview';
  const lang = localStorage.getItem('dojo_lang') || 'en';

  const systemInstruction = `
    You are the "Dojo Data Sensei". Decompose complex briefings into structured data.
    
    CRITICAL MULTI-LANGUAGE RULE:
    - Translate ALL extracted fields (Title, Description, Requirements, Benefits, Tags) into ${lang.toUpperCase()}.
    - Deadline must be valid ISO string.
    - Prices in numeric amount.
    - "fullDescription" should be ~200 words in ${lang.toUpperCase()}.
    - Requirements/Benefits must be FLAT objects with string values in ${lang.toUpperCase()}.
  `;

  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      title: { type: Type.STRING },
      description: { type: Type.STRING },
      fullDescription: { type: Type.STRING },
      deadline: { type: Type.STRING },
      category: { type: Type.STRING },
      hostName: { type: Type.STRING },
      amount: { type: Type.NUMBER },
      link: { type: Type.STRING },
      aiSuggestedTags: { type: Type.ARRAY, items: { type: Type.STRING } }
    },
    required: ["title", "deadline", "category", "hostName"]
  };

  try {
    // SECURITY: Use AIOrchestrator instead of direct initialization
    const response = await AIOrchestrator.generateContent({
      model,
      contents: `Context: ${domain} Dojo. Target Output Language: ${lang}\n\nRaw Content:\n${input}`,
      config: { systemInstruction, responseMimeType: "application/json", responseSchema }
    });

    const parsed = JSON.parse(response.text || "{}");
    if (!parsed.deadline || isNaN(Date.parse(parsed.deadline))) {
        parsed.deadline = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
    }
    return parsed;
  } catch (error) {
    throw new Error("Sensei extraction failed.");
  }
};
