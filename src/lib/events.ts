/** Discriminated union of campaign events sent over SSE */
export type CampaignEvent =
	| { type: 'hunter:updated'; hunterId: string; data: Record<string, number | boolean> }
	| { type: 'npc:statusChanged'; npcId: string; status: string }
	| { type: 'clue:added'; sceneId: string; clue: { id: string; description: string; significance: string | null } }
	| { type: 'scene:advanced'; sessionId: string; direction: 'next' | 'prev' | 'new' };
