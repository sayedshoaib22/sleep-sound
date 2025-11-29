
import { GoogleGenAI, Type } from "@google/genai";
import { DesignAdvice } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const analysisSchema = {
  type: Type.OBJECT,
  properties: {
    roomType: { type: Type.STRING, description: "Identified room type (e.g., Living Room, Bedroom)." },
    designStyle: { type: Type.STRING, description: "Suggested design style (e.g., Minimalist, Scandinavian, Industrial)." },
    mood: { type: Type.STRING, description: "The vibe of the room (e.g., Cozy, Airy, Sophisticated)." },
    colorSuggestions: {
      type: Type.ARRAY,
      description: "Recommended color palette for walls and furniture.",
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          hex: { type: Type.STRING, description: "Hex code for the color" },
        },
        required: ["name", "hex"],
      },
    },
    furnitureRecommendations: {
      type: Type.ARRAY,
      description: "List of specific furniture pieces that would fit this room (e.g., 'L-shaped grey sofa', 'Oak coffee table').",
      items: { type: Type.STRING }
    },
    layoutTips: { type: Type.STRING, description: "Advice on how to arrange furniture in this space." },
  },
  required: ["roomType", "designStyle", "colorSuggestions", "furnitureRecommendations", "layoutTips", "mood"],
};

export const analyzeRoomImage = async (base64Image: string, mimeType: string): Promise<DesignAdvice> => {
  try {
    const imagePart = {
      inlineData: {
        data: base64Image,
        mimeType,
      },
    };

    const textPart = {
      text: `You are an expert Interior Designer for 'FurniFit', a premium furniture showroom. Analyze the photo of this room. 
      Identify the room type. Suggest a matching interior design style. 
      Provide a color palette that complements the space.
      Recommend specific furniture pieces that would look good here.
      Give layout tips for placement.
      Return the response strictly as JSON matching the schema.`,
    };
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: { parts: [imagePart, textPart] },
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
      },
    });

    const jsonText = response.text.trim();
    return JSON.parse(jsonText) as DesignAdvice;

  } catch (error) {
    console.error("Error analyzing room image:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to analyze image with Gemini API: ${error.message}`);
    }
    throw new Error("An unknown error occurred during analysis.");
  }
};
