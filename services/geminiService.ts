
import { GoogleGenAI } from "@google/genai";
import { DomainConfig } from "../core/contracts/domainConfig";

// DOJO TOKEN GUARD: Max 30k characters to prevent API cost spikes
const truncateInput = (text: string) => text.slice(0, 30000);

export const translateObjectWithAI = async (
  data: any,
  targetLang: string
): Promise<any> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const model = 'gemini-3-flash-preview';
  
  const systemInstruction = `
    You are the "Dojo Omnilingual Sensei". 
    Your task is to translate the provided JSON object into ${targetLang.toUpperCase()}.
    Return ONLY valid JSON.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: `Translate this: \n\n ${truncateInput(JSON.stringify(data))}`,
      config: { systemInstruction, responseMimeType: "application/json" }
    });
    return JSON.parse(response.text || "{}");
  } catch (error) {
    return data;
  }
};

export const generateDomainAdvice = async (
  input: string,
  domainConfig: DomainConfig
): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const lang = localStorage.getItem('dojo_lang') || 'en';
  const systemInstruction = `You are a Duo-style coach for ${domainConfig.name}. Language: ${lang}. Concise.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: truncateInput(input),
      config: { systemInstruction }
    });
    return response.text || "Sensei is silent.";
  } catch (error) {
    return "Offline.";
  }
};

export const getChatResponse = async (
  history: any[],
  userMsg: string,
  context: string
): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const lang = localStorage.getItem('dojo_lang') || 'en';
  const systemInstruction = `Sensei for ${context}. Respond in ${lang}. Concise.`;

  try {
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: { systemInstruction },
      history: history.map(h => ({ ...h, parts: [{ text: truncateInput(h.parts[0].text) }] }))
    });
    const result = await chat.sendMessage({ message: truncateInput(userMsg) });
    return result.text || "...";
  } catch (error) {
    return "Sensei is busy.";
  }
};
