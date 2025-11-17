import { runPrompt } from './PromptEngine.js';

// Spawn and run the appropriate agent based on type
export const spawnAgent = async (agentType, payload) => {
  try {
    console.log(`Spawning ${agentType} agent`);
    
    // Run the appropriate prompt template based on agent type
    const response = await runPrompt(agentType, payload);
    
    return response;
  } catch (error) {
    console.error(`Error spawning ${agentType} agent:`, error);
    throw error;
  }
};