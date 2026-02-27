import type { PlaybookDefinition } from './types';

export const divine: PlaybookDefinition = {
	id: 'divine',
	displayName: 'The Divine',
	description:
		'I am the Light, the Sword. I am sent to defend the meek from Darkness. All Evil fears me, for I am its end.',
	luckSpecial:
		'When you spend a point of Luck, you get word your Mission requires something difficult that must be done. By you. Urgently.',

	ratingLines: [
		{ charm: 1, cool: 1, sharp: -1, tough: 2, weird: 0 },
		{ charm: -1, cool: 2, sharp: -1, tough: 2, weird: 0 },
		{ charm: -1, cool: 0, sharp: 1, tough: 2, weird: 1 },
		{ charm: 1, cool: 1, sharp: 0, tough: 2, weird: -1 },
		{ charm: -1, cool: 1, sharp: 0, tough: 2, weird: 1 },
	],

	looks: [
		{
			label: 'Body',
			options: ['Human', 'marked by divinity', 'inhuman'],
			allowCustom: true,
		},
		{
			label: 'Eyes',
			options: [
				'Blazing eyes',
				'terrifying eyes',
				'placid eyes',
				'sparkling eyes',
				'perceptive eyes',
				'starry eyes',
				'glowing eyes',
			],
			allowCustom: true,
		},
		{
			label: 'Clothes',
			options: [
				'Dirty clothes',
				'perfect suit',
				'rumpled suit',
				'casual clothes',
				'practical clothes',
			],
			allowCustom: true,
		},
	],

	mandatoryMoves: [],

	optionalMoves: [
		{
			id: 'divine-boss-from-beyond',
			name: 'Boss from Beyond',
			description:
				'At the beginning of each mystery, roll +Weird. On a 10+, your Superiors ask you to do something simple. On a 7-9, they ask you to do something complicated or difficult. In either case, you get to ask them one of the questions from the investigate a mystery move right now. On a miss, you are required to do something terrible. If you do not accomplish what they\'ve ordered, you cannot use this move again until you have made up for your failure.',
			rollType: 'WEIRD',
		},
		{
			id: 'divine-angel-wings',
			name: 'Angel Wings',
			description:
				"You can go instantly to anywhere you've visited before, or to a person you know well. When you carry one or two people with you, roll +Weird. On a 10+ you all go where you wanted. On a 7-9, you don't quite manage it. Either you are all separated, or you all appear in the wrong place.",
			rollType: 'WEIRD',
		},
		{
			id: 'divine-what-i-need',
			name: 'What I Need, When I Need It',
			description:
				'You may store any small object you own, putting it into a magical space nobody can get to. You may retrieve anything you stored at any time; it appears in your hand.',
		},
		{
			id: 'divine-soothe',
			name: 'Soothe',
			description:
				'When you talk to someone for a few seconds in a quiet voice, you can calm them down, blocking any panic, anger, or other negative emotions they have. This works even if the thing that freaked them out is still present, as long as your voice can be heard.',
		},
		{
			id: 'divine-lay-on-hands',
			name: 'Lay On Hands',
			description:
				"Your touch can heal injury and disease. When you lay your hands on someone hurt, roll +Cool. On a 10+, heal 2 harm or an illness, plus they're stabilized. On a 7-9, you can heal the harm or illness as on a 10+, but you take it into yourself. On a miss, your aura causes them extra harm.",
			rollType: 'COOL',
		},
		{
			id: 'divine-cast-out-evil',
			name: 'Cast Out Evil',
			description:
				"You may banish an unnatural creature from your presence. Roll +Tough. On a 10+ it is banished. On a 7-9 it takes a little while for the creature has time to make one or two actions. Either way, the banished creature is unharmed, and you have no control over where it goes. This move may be used on unnatural hunters (e.g. the Monstrous). On a miss, something is keeping it here. That's bad.",
			rollType: 'TOUGH',
		},
		{
			id: 'divine-smite',
			name: 'Smite',
			description:
				'Your body and divine weapon always count as a weakness against the monsters you fight. Your unarmed attacks are 2-harm intimate hand messy.',
		},
	],
	pickMovesCount: 3,

	startingGearOptions: [
		{
			label: 'Divine weapon',
			pickCount: 1,
			options: [
				{ name: 'Flaming sword', harm: 3, ranges: ['hand'], tags: ['fire', 'holy'] },
				{ name: 'Thunder hammer', harm: 3, ranges: ['hand'], tags: ['stun', 'holy'] },
				{ name: 'Razor whip', harm: 3, ranges: ['hand'], tags: ['area', 'messy', 'holy'] },
				{ name: 'Five demon bag', harm: 3, ranges: ['close'], tags: ['magic', 'holy'] },
				{ name: 'Silver trident', harm: 3, ranges: ['hand'], tags: ['silver', 'holy'] },
			],
		},
		{
			label: 'Divine armour',
			pickCount: 1,
			options: ['Divine armour (1-armour holy)'],
		},
	],

	improvements: [
		{
			id: 'divine-imp-tough',
			label: 'Get +1 Tough, max +3',
			isAdvanced: false,
			type: 'rating-boost',
			rating: 'tough',
			maxValue: 3,
		},
		{
			id: 'divine-imp-cool',
			label: 'Get +1 Cool, max +2',
			isAdvanced: false,
			type: 'rating-boost',
			rating: 'cool',
			maxValue: 2,
		},
		{
			id: 'divine-imp-charm',
			label: 'Get +1 Charm, max +2',
			isAdvanced: false,
			type: 'rating-boost',
			rating: 'charm',
			maxValue: 2,
		},
		{
			id: 'divine-imp-sharp',
			label: 'Get +1 Sharp, max +2',
			isAdvanced: false,
			type: 'rating-boost',
			rating: 'sharp',
			maxValue: 2,
		},
		{
			id: 'divine-imp-weird',
			label: 'Get +1 Weird, max +2',
			isAdvanced: false,
			type: 'rating-boost',
			rating: 'weird',
			maxValue: 2,
		},
		{
			id: 'divine-imp-move1',
			label: 'Take another Divine move',
			isAdvanced: false,
			type: 'playbook-move',
		},
		{
			id: 'divine-imp-move2',
			label: 'Take another Divine move',
			isAdvanced: false,
			type: 'playbook-move',
		},
		{
			id: 'divine-imp-ally',
			label: 'Gain a lesser divine being as an ally, sent from above to help with your mission',
			isAdvanced: false,
			type: 'gain-ally',
		},
		{
			id: 'divine-imp-cross1',
			label: 'Take a move from another playbook',
			isAdvanced: false,
			type: 'cross-playbook-move',
		},
		{
			id: 'divine-imp-cross2',
			label: 'Take a move from another playbook',
			isAdvanced: false,
			type: 'cross-playbook-move',
		},
	],

	advancedImprovements: [
		{
			id: 'divine-adv-stat',
			label: 'Get +1 to any rating, max +3',
			isAdvanced: true,
			type: 'rating-boost',
			rating: 'any',
			maxValue: 3,
		},
		{
			id: 'divine-adv-change',
			label: 'Change this hunter to a new type',
			isAdvanced: true,
			type: 'change-playbook',
		},
		{
			id: 'divine-adv-second',
			label: 'Create a second hunter to play as well as this one',
			isAdvanced: true,
			type: 'second-hunter',
		},
		{
			id: 'divine-adv-advanced1',
			label: 'Mark two of the basic moves as advanced',
			isAdvanced: true,
			type: 'advanced-moves',
		},
		{
			id: 'divine-adv-advanced2',
			label: 'Mark two of the basic moves as advanced',
			isAdvanced: true,
			type: 'advanced-moves',
		},
		{
			id: 'divine-adv-retire',
			label: 'Retire this hunter to safety',
			isAdvanced: true,
			type: 'retire',
		},
		{
			id: 'divine-adv-luck',
			label: 'Erase one used Luck mark from your playbook',
			isAdvanced: true,
			type: 'luck-recovery',
		},
		{
			id: 'divine-adv-mission',
			label:
				'Change your mission. Select a different mission from the normal options, or (with the Keeper\'s agreement) a new mission of your creation.',
			isAdvanced: true,
			type: 'playbook-specific',
		},
	],

	customSections: [
		{
			type: 'pick',
			key: 'mission',
			title: 'Mission',
			description: 'You have been put on Earth for a purpose. Pick one:',
			pickCount: 1,
			options: [
				{ label: 'You are here to fight the schemes of an Adversary.' },
				{
					label:
						'The End of Days approaches. Your role is to guide these hunters and prevent it from coming to pass.',
				},
				{
					label:
						'The End of Days approaches. Your role is to guide these hunters and ensure it comes to pass.',
				},
				{
					label:
						'You have been exiled. You must work for the cause of Good without drawing attention from your brothers and sisters, as they are bound to execute you for your crimes.',
				},
				{
					label:
						'One of the other hunters has a crucial role to play in events to come. You must prepare them for their role, and protect them at any cost.',
				},
			],
		},
	],

	historyOptions: [
		'If you are protecting another hunter as your mission, tell them this: You have a crucial role in what is to come. I am here to guide and defend you.',
		"They should not be involved in this situation: the prophecies didn't mention them at all. This gets your attention but you don't know what it means yet.",
		'They are, at heart, a good and righteous person. You must help them stay that way.',
		"They are an abomination, and should be destroyed. Except you can't\u2014work out with them why not.",
		'Their prayer (perhaps an informal or even unconscious prayer) summoned you.',
		'They fill you with feelings of sexual infatuation. You are confused by the associated mortal emotions.',
		'They saved your life, and you understand (intellectually at least) that you owe them for it.',
		"They're the person you go to for advice on mortal stuff (e.g sex, food, drugs, television, etc).",
	],
};
