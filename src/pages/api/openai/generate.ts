import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

// Check if we have the API key
if (!process.env.OPENAI_API_KEY) {
  console.error("Missing OPENAI_API_KEY environment variable");
  // Optionally throw an error during build/startup if critical
  // throw new Error("Missing OPENAI_API_KEY environment variable");
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "dummy-key", // Provide dummy key if missing to avoid crash, but log error
});

// Helper function to format sheet type for the prompt
const formatSheetType = (type: string): string => {
  switch (type) {
    case "coloring_sheet":
      return "coloring sheet";
    case "color_by_numbers":
      return "color-by-numbers sheet";
    case "dot_to_dot":
      return "dot-to-dot activity sheet";
    default:
      return "image"; // Fallback
  }
};

// Helper function to format ability level for the prompt - More descriptive
const formatAbilityLevel = (level: string): string => {
  switch (level) {
    case "beginner":
      return "very simple with thick, clear lines and large areas, suitable for young children or beginners";
    case "intermediate":
      return "moderately detailed with clear lines and varied area sizes, suitable for intermediate skill levels";
    case "advanced":
      return "intricate and detailed with fine lines and complex small areas, suitable for advanced users";
    default:
      return "with clear lines"; // Fallback
  }
};

// Helper function to determine color count for color-by-numbers
const getColorCount = (level: string): string => {
  switch (level) {
    case "beginner":
      return "using a limited palette of 3-5 simple, distinct colors";
    case "intermediate":
      return "using a moderate palette of 6-10 distinct colors";
    case "advanced":
      return "using a wider palette of 11-15 distinct colors";
    default:
      return "using a standard palette of colors";
  }
};

// Helper function to determine dot count for dot-to-dot
const getDotCount = (level: string): string => {
    switch (level) {
        case "beginner":
            return "around 15-30 dots";
        case "intermediate":
            return "around 30-60 dots";
        case "advanced":
            return "around 60-100+ dots";
        default:
            return "a suitable number of dots";
    }
};


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (!process.env.OPENAI_API_KEY) {
     res.status(500).json({
      error: "AI Service is not configured correctly (Missing API Key).",
      showToast: true,
    });
    return;
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({
      error: "Method not allowed",
      showToast: true,
    });
    return;
  }

  const {
    prompt,
    abilityLevel = "beginner", // Default values
    sheetType = "coloring_sheet",
  } = req.body;

  // Log the incoming request body
  console.log("API Request Body:", { prompt, abilityLevel, sheetType });

  if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
    res.status(400).json({
      error: "Missing or invalid required field: prompt",
      showToast: true,
    });
    return;
  }

  // --- Prompt Engineering ---
  const formattedAbilityLevelDesc = formatAbilityLevel(abilityLevel);
  // Base instruction for all types: clear line art, no fill.
  const basePromptInstruction = `The style must be clear black and white line art only, with no filled colors or shading, on a plain white background. Lines should be ${formattedAbilityLevelDesc}.`;

  let imagePrompt = "";

  // Add specific instructions based on sheet type
  if (sheetType === "color_by_numbers") {
    const colorCountInstruction = getColorCount(abilityLevel);
    imagePrompt = `Create a color-by-numbers sheet featuring: "${prompt}". ${basePromptInstruction} It must have distinct, clearly numbered areas suitable for coloring. The image must include a visible color key (legend) at the bottom or side, mapping each number to a specific color name (e.g., 1=Red, 2=Blue, etc.). Generate the numbered areas ${colorCountInstruction}. Ensure the numbers within the areas are very clear, legible, and correctly correspond to the key. The areas themselves must not be colored in.`;
  } else if (sheetType === "dot_to_dot") {
    const dotCountInstruction = getDotCount(abilityLevel);
    imagePrompt = `Create a connect-the-dots activity sheet puzzle featuring the outline of: "${prompt}". ${basePromptInstruction} The style should be clearly numbered dots, using approximately ${dotCountInstruction}. The final connected image should be clearly recognizable once the dots are connected in sequence. Ensure the numbers are sequential, starting from 1, and very clear and legible next to each dot. Do not pre-connect the dots.`;
  } else { // Default to coloring_sheet
    imagePrompt = `Create a coloring sheet featuring: "${prompt}". ${basePromptInstruction} Ready for coloring.`;
  }

  console.log("Constructed Image Prompt:", imagePrompt);
  // --- End Prompt Engineering ---

  try {
    const imageResponse = await openai.images.generate({
      model: "dall-e-3", // Or "dall-e-2" if preferred/needed
      prompt: imagePrompt,
      n: 1, // Generate one image
      size: "1024x1024", // Specify desired size
      response_format: "url", // Get a URL back
      // quality: "standard", // or "hd" for dall-e-3
      // style: "natural", // or "vivid" for dall-e-3
    });

    const imageUrl = imageResponse.data[0]?.url;

    // Log the raw response from OpenAI
    console.log("Raw OpenAI Image Response:", imageResponse);

    if (!imageUrl) {
      console.error("No image URL found in OpenAI response data:", imageResponse.data);
      res.status(500).json({
        error: "AI service returned an unexpected response (no image URL).",
        showToast: true,
      });
      return;
    }

    console.log("Generated Image URL:", imageUrl);
    res.status(200).json({ imageUrl });

   
  } catch (err: any) {
    console.error("Error in OpenAI Image API call:", err);

    let errorMessage = "AI service encountered an error during image generation";
    let statusCode = err.status || 500;

    if (err instanceof OpenAI.APIError) {
      statusCode = err.status;
      errorMessage = err.message || `OpenAI API Error (${statusCode})`;
      console.error(
        `OpenAI API Error (${statusCode}): ${err.name} - ${err.message}`
      );
      if (statusCode === 429) {
        errorMessage =
          "AI service is currently busy (Rate Limit). Please try again in a moment.";
      } else if (statusCode === 401 || statusCode === 403) {
        errorMessage = "Authentication error with AI service. Check API Key.";
      } else if (statusCode >= 500) {
        errorMessage =
          "AI service is experiencing issues. Please try again later.";
      } else if (statusCode === 400) {
        // DALL-E specific 400 errors might relate to prompt issues (content policy)
        if (err.code === 'content_policy_violation') {
             errorMessage = "Your request was rejected due to the content policy. Please modify your prompt.";
        } else {
            errorMessage = `Invalid request sent to AI service: ${err.message}`;
        }
      }
    } else {
      errorMessage = err.message || "An unknown error occurred.";
    }

    res.status(statusCode).json({
      error: errorMessage,
      showToast: true,
      details: err.message || "Unknown error details",
    });
  }
}