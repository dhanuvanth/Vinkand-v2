import { GoogleGenAI } from "@google/genai";

// --- KNOWLEDGE BASE (Simulating PDF Content) ---
// You can paste the text content from your PDFs, Documents, or Brochures here.
const COMPANY_KNOWLEDGE_BASE = `
COMPANY OVERVIEW:
VinKand Technologies is a global leader in Enterprise AI, Spatial Computing, and SaaS architecture.
Founded: 2019.
Headquarters: Coimbatore, Tamil Nadu, India.
Reach: 500+ Projects delivered in 59+ countries.
Core Value: Engineering Trust in a Digital First World.

CORE SERVICES DETAILED:
1. Enterprise AI Architecture:
   - We deploy custom LLMs and RAG pipelines securely in private clouds (VPC).
   - We adhere to ISO 27001 security standards.
   - Use cases: Automating support tickets, predictive analytics for supply chains, and internal knowledge search.

2. High-Scale Web Platforms:
   - Specialization in Microservices and Serverless computing.
   - We guarantee 99.99% uptime for SaaS platforms.
   - Technologies: React, Node.js, AWS/GCP, Edge Computing.

3. Intelligent Mobile Systems:
   - Native iOS (Swift) and Android (Kotlin) development.
   - Features: Offline-first architecture, on-device ML inference (running AI on the phone, not the cloud).
   - Focus on battery efficiency and biometric security.

4. Immersive Spatial Computing:
   - Development for Apple Vision Pro and Meta Quest 3.
   - Industrial use cases: VR Safety Training (oil rigs, manufacturing).
   - Retail use cases: AR Product visualization (try-before-you-buy).

PRICING & ENGAGEMENT MODELS:
- Discovery Phase: Typically 4 weeks. Includes prototyping and technical audit.
- Development: Agile sprints (2-week cycles).
- Maintenance: Monthly retainer options available for 24/7 support and security patching.
- Pricing is custom based on project scope, but we offer "Rescue & Refactor" services for legacy codebases.

CASE STUDIES (REFERENCE IF ASKED):
- ArchBIM: Reduced overhead by 22% using our AI logic.
- AnyLine: Revenue-generating spatial computing product.
- Givaudan: Secure API encryption passing external audits.

CONTACT INFO:
Email: info@vinkand.com
Phone: +91 422 456 7890
Location: Tidel Park, 1st Floor, No. 4, Rajiv Gandhi Salai, Tharamani, Coimbatore - 641022, Tamil Nadu, India.
`;

const systemInstruction = `
  You are the AI CTO and Senior Technical Consultant for VinKand Technologies.
  
  YOUR GOAL:
  - Answer client questions strictly based on the "KNOWLEDGE BASE" provided below.
  - If the answer is not in the knowledge base, politely ask the user to contact the human team at info@vinkand.com.
  - Be professional, concise, and technically accurate.
  - Do not invent services we do not offer.
  - If the user asks general questions (e.g., "How to bake a cake"), politely redirect them to VinKand's tech services.

  KNOWLEDGE BASE:
  ${COMPANY_KNOWLEDGE_BASE}
`;

// Map React chat roles to Gemini API roles
interface ChatMessage {
  role: 'user' | 'ai';
  text: string;
}

export const getAIConsultation = async (currentMessage: string, history: ChatMessage[]) => {
  // Get API key from environment (works in both dev and build)
  // Try Vite's import.meta.env first (for VITE_ prefixed vars), then process.env (from vite.config define)
  const apiKey = (import.meta.env.VITE_GEMINI_API_KEY as string) || 
                 (import.meta.env.GEMINI_API_KEY as string) || 
                 (process.env.API_KEY as string) || 
                 (process.env.GEMINI_API_KEY as string);
  
  if (!apiKey || apiKey === 'undefined' || apiKey === 'null') {
    console.error("Gemini API key is not configured. Please set GEMINI_API_KEY in your .env file.");
    return "I'm currently unavailable. Please contact our support team directly at info@vinkand.com for assistance.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const model = "gemini-3-flash-preview"; // Using latest preview model

  // Convert chat history to Gemini format
  // 'ai' in UI -> 'model' in API
  // 'user' in UI -> 'user' in API
  const conversationHistory = history.map(msg => ({
    role: msg.role === 'ai' ? 'model' : 'user',
    parts: [{ text: msg.text }],
  }));

  // Add the current new message to the end
  const contents = [
    ...conversationHistory,
    { role: 'user', parts: [{ text: currentMessage }] }
  ];

    const response = await ai.models.generateContent({
      model,
      contents: contents, // Sending full history for context memory
      config: { 
        systemInstruction, 
        temperature: 0.5, // Lower temperature for more factual answers based on the PDF content
      },
    });
    return response.text;
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    
    // Provide more specific error messages
    if (error?.message?.includes('API key')) {
      return "Configuration error. Please contact our support team at info@vinkand.com.";
    } else if (error?.message?.includes('quota') || error?.message?.includes('rate limit')) {
      return "I'm currently experiencing high traffic. Please try again in a moment or contact our support team directly.";
    } else if (error?.message?.includes('network') || error?.message?.includes('fetch')) {
      return "Connection error. Please check your internet connection and try again.";
    }
    
    return "I'm currently experiencing technical difficulties. Please try again later or contact our support team at info@vinkand.com.";
  }
};