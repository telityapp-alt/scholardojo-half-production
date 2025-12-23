
import { DomainConfig } from "../core/contracts/domainConfig";
import { AIOrchestrator } from "../core/engines/aiOrchestrator";
import { APP_CONFIG } from "../core/contracts/appConfig";

/**
 * Dojo Gemini Service Proxy
 * Wraps AI calls with centralized orchestration for security and cost safety.
 */

const truncateInput = (text: string) => text.slice(0, APP_CONFIG.AI.MAX_INPUT_CHARS);

export const translateObjectWithAI = async (
  data: any,
  targetLang: string
): Promise<any> => {
  const systemInstruction = `
    You are the "Dojo Omnilingual Sensei". 
    Your task is to translate the provided JSON object into ${targetLang.toUpperCase()}.
    Return ONLY valid JSON.
  `;

  try {
    const response = await AIOrchestrator.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Translate this: \n\n ${truncateInput(JSON.stringify(data))}`,
      config: { systemInstruction, responseMimeType: "application/json" }
    });
    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("[Sensei AI] Translation strike failed.", error);
    return data;
  }
};

export const generateDomainAdvice = async (
  input: string,
  domainConfig: DomainConfig
): Promise<string> => {
  const lang = localStorage.getItem('dojo_lang') || 'en';
  const systemInstruction = `You are a Duo-style coach for ${domainConfig.name}. Language: ${lang}. Concise.`;

  try {
    const response = await AIOrchestrator.generateContent({
      model: 'gemini-3-flash-preview',
      contents: truncateInput(input),
      config: { systemInstruction }
    });
    return response.text || "Sensei is silent.";
  } catch (error) {
    return "Sensei is currently meditating. Please strike later.";
  }
};

export const getChatResponse = async (
  history: any[],
  userMsg: string,
  context: string
): Promise<string> => {
  const lang = localStorage.getItem('dojo_lang') || 'en';
  const systemInstruction = `Sensei for ${context}. Respond in ${lang}. Concise.`;

  try {
    // Note: AIOrchestrator currently handles generateContent. 
    // We pass history as part of contents to maintain context in a single call or 
    // we can expand orchestrator to handle chats. For now, we simulate history.
    const response = await AIOrchestrator.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
          ...history.map(h => ({ role: h.role, parts: [{ text: truncateInput(h.parts[0].text) }] })),
          { role: 'user', parts: [{ text: truncateInput(userMsg) }] }
      ] as any,
      config: { systemInstruction }
    });
    return response.text || "...";
  } catch (error) {
    return "The neural link is unstable. Recalibrating...";
  }
};
