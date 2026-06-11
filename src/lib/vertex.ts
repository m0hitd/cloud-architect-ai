import { GoogleGenerativeAI, SchemaType, Schema } from "@google/generative-ai";
import { labelMaps } from "./mapSvg";
import { replaceCaseInsensitive } from "../utils/string";

export type CloudProviderType = 'GCP' | 'AWS' | 'Azure';

export interface DiagramProposalInterface {
  description: string;
  diagram: string;
  runningCost: string;
  terraform: string;
  title: string;
}

// Get the API key from environment variables
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  console.warn("VITE_GEMINI_API_KEY is not defined. AI requests will fail.");
}

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(apiKey || "");

// Define the response schema using standard SchemaType
const jsonSchema: Schema = {
  type: SchemaType.OBJECT,
  properties: {
    proposals: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          title: { type: SchemaType.STRING },
          description: { type: SchemaType.STRING },
          diagram: { type: SchemaType.STRING },
          terraform: { type: SchemaType.STRING },
          runningCost: { type: SchemaType.STRING },
        },
        required: ["title", "description", "diagram", "terraform", "runningCost"],
      },
    },
  },
  required: ["proposals"],
};

// Initialize the model
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: jsonSchema,
  },
});

const promptContext = `
    I would like to design a system architecture using {CLOUD_PROVIDER} services.
    The mermaid output should start with the diagram type,
    and DO NOT APPLY any style or STYLE keyword to cloud service objects.

    Mermaid and terraform has to be in English.
    DO NOT use any Special characters in the Mermaid output.

    Title, description, and running cost should be in English.
    Also, give terraform code that would be deployable to {CLOUD_PROVIDER}, and estimate the running cost with a number in USD.

    For the output, I would like 3 proposed Mermaid diagrams.

    Order the proposals based on the best fit for the requirements.

    Here are the system requirements.

    \n
`;

const parseTerraform = (terraform: string) => {
  terraform = replaceCaseInsensitive(terraform, "```terraform\n", "");
  terraform = replaceCaseInsensitive(terraform, "```terraform", "");
  terraform = replaceCaseInsensitive(terraform, "```", "");
  return terraform;
};

const parseDiagram = (diagram: string) => {
  if (diagram.includes("```mermaid\n")) {
    diagram = diagram.split("```mermaid\n")[1];
  } else if (diagram.includes("```mermaid")) {
    diagram = diagram.split("```mermaid")[1];
  } else if (diagram.includes("flowchart")) {
    diagram = "flowchart" + diagram.split(/flowchart(.*)/s)[1];
  } else if (diagram.includes("sequenceDiagram")) {
    diagram = "sequenceDiagram" + diagram.split(/sequenceDiagram(.*)/s)[1];
  } else if (
    diagram.includes("graph LR") ||
    diagram.includes("graph RL") ||
    diagram.includes("graph BT") ||
    diagram.includes("graph TB")
  ) {
    diagram = "graph" + diagram.split(/graph(.*)/s)[1];
  }

  diagram = replaceCaseInsensitive(diagram, "```", "");

  for (const key of Object.keys(labelMaps)) {
    if (diagram.toLowerCase().includes(key.toLowerCase())) {
      diagram = replaceCaseInsensitive(
        diagram,
        key,
        labelMaps[key] + "\nXXXXXXXXXXXXXXXXXX\nXXXXXXXXXXXXXXXXXX"
      );
    }
  }
  return diagram;
};

export const parseProposals = (proposals: DiagramProposalInterface[]) => {
  return proposals.map((proposal: DiagramProposalInterface) => {
    return {
      ...proposal,
      terraform: parseTerraform(proposal.terraform),
      diagram: parseDiagram(proposal.diagram),
    };
  });
};

const askVertex = async ({
  requirements,
  budget,
  isIncludeLoggingAndMonitoring,
  cloudProvider,
}: // isUseMockData,
{
  requirements: string;
  budget: number | null;
  isIncludeLoggingAndMonitoring: boolean;
  cloudProvider: 'GCP' | 'AWS' | 'Azure';
  // isUseMockData?: boolean;
}): Promise<DiagramProposalInterface[]> => {
  let cloudSpecificPrompt = promptContext.replace(/{CLOUD_PROVIDER}/g, cloudProvider);

  let prompt = cloudSpecificPrompt + requirements;
  if (budget != null) {
    prompt += `\n This is the monthly budget in USD: ${budget}`;
  }

  if (isIncludeLoggingAndMonitoring) {
    if (cloudProvider === 'GCP') {
      prompt += "\n Please include Cloud Monitoring and Cloud Logging services.";
    } else if (cloudProvider === 'AWS') {
      prompt += "\n Please include AWS CloudWatch for monitoring and logging services.";
    } else if (cloudProvider === 'Azure') {
      prompt += "\n Please include Azure Monitor and Azure Log Analytics services.";
    }
  } else {
    if (cloudProvider === 'GCP') {
      prompt += "\n Please do not include Cloud Monitoring and Cloud Logging services.";
    } else if (cloudProvider === 'AWS') {
      prompt += "\n Please do not include AWS CloudWatch for monitoring and logging services.";
    } else if (cloudProvider === 'Azure') {
      prompt += "\n Please do not include Azure Monitor and Azure Log Analytics services.";
    }
  }

  const result = await model.generateContent(prompt);

  const response = result.response;
  const text = response.text();
  const data = JSON.parse(text);

  const proposals = parseProposals(data["proposals"]);
  return proposals;
};

export default askVertex;
