import type { PlaybookDefinition } from './types';

export const spellSlinger: PlaybookDefinition = {
	id: 'spell-slinger',
	displayName: 'The Spell-Slinger',
	description: 'Fight fire with fire magic.',
	luckSpecial:
		'When you spend a point of Luck, the official council of wizards is going to poke their nose into your business.',

	ratingLines: [
		{ charm: -1, cool: 1, sharp: 1, tough: 0, weird: 2 },
		{ charm: 0, cool: -1, sharp: 1, tough: 1, weird: 2 },
		{ charm: -1, cool: 0, sharp: 2, tough: -1, weird: 2 },
		{ charm: 1, cool: 0, sharp: 1, tough: -1, weird: 2 },
		{ charm: 0, cool: 0, sharp: 0, tough: 0, weird: 2 },
	],

	looks: [
		{
			label: 'Clothes',
			options: [
				'Rumpled clothes',
				'stylish clothes',
				'goth clothes',
				'old fashioned clothes',
			],
			allowCustom: true,
		},
		{
			label: 'Eyes',
			options: ['Shadowed eyes', 'fierce eyes', 'weary eyes', 'sparkling eyes'],
			allowCustom: true,
		},
	],

	mandatoryMoves: [
		{
			id: 'spell-slinger-tools-and-techniques',
			name: 'Tools and Techniques',
			description:
				"To use your combat magic effectively, you rely on a collection of tools and techniques. Cross off one; you'll need the rest. Consumables (certain supplies\u2014powders, oils, etc\u2014on hand, some will be used up each cast. If you don't have them, take 1-harm ignore-armour when you cast), Foci (wands, staves, and other obvious props to focus. If you don't have what you need, your combat magic does 1 less harm), Gestures (you need to wave your hands around to use combat magic. If you're restrained, take -1 ongoing for combat magic), Incantations (you must speak in an arcane language to control your magic. If you use combat magic without speaking, act under pressure to avoid scrambling your thoughts).",
		},
	],

	optionalMoves: [
		{
			id: 'spell-slinger-advanced-arcane-training',
			name: 'Advanced Arcane Training',
			description:
				'If you have two of your three Tools and Techniques at the ready, you may ignore the third one.',
		},
		{
			id: 'spell-slinger-arcane-reputation',
			name: 'Arcane Reputation',
			description:
				"Pick three big organizations or groups in the supernatural community, which can include some of the more sociable types of monsters. They've heard of you and respect your power. With affected humans, take +1 forward when you manipulate them. You may manipulate affected monsters as if they were human, with no bonus.",
		},
		{
			id: 'spell-slinger-couldve-been-worse',
			name: "Could've Been Worse",
			description:
				"When you miss a use magic roll you can choose one of the following options instead of losing control of the magic: Fizzle (the preparations and materials for the spell are ruined. You'll have to start over from scratch with the prep time doubled), This Is Gonna Suck (the effect happens, but you trigger all of the listed glitches but one. You pick the one you avoid).",
		},
		{
			id: 'spell-slinger-enchanted-clothing',
			name: 'Enchanted Clothing',
			description:
				"Pick an article of every-day clothing\u2014it's enchanted without any change in appearance. Take -1 harm from any source that tries to get at you through the garment.",
		},
		{
			id: 'spell-slinger-forensic-divination',
			name: 'Forensic Divination',
			description:
				'When you successfully investigate a mystery, you may ask "What magic was done here?" as a free extra question.',
		},
		{
			id: 'spell-slinger-go-big-or-go-home',
			name: 'Go Big or Go Home',
			description:
				'When you must use magic as a requirement for Big Magic, take +1 ongoing to those use magic rolls.',
		},
		{
			id: 'spell-slinger-not-my-fault',
			name: 'Not My Fault',
			description:
				'+1 to act under pressure when you are dealing with the consequences of your own spell-casting.',
		},
		{
			id: 'spell-slinger-practitioner',
			name: 'Practitioner',
			description:
				'Choose two effects available to you under use magic. Take +1 to use magic whenever you choose one of those effects.',
		},
		{
			id: 'spell-slinger-shield-spell',
			name: 'Shield Spell',
			description:
				"When you protect someone, gain 2-armour against any harm that is transferred to you. This doesn't stack with your other armour, if any.",
		},
		{
			id: 'spell-slinger-third-eye',
			name: 'Third Eye',
			description:
				"When you read a bad situation, you can open up your third eye for a moment to take in extra information. Take +1 hold on any result of 7 or more, plus you can see invisible things. On a miss, you may still get 1 hold, but you're exposed to supernatural danger. Unfiltered hidden reality is rough on the mind!",
		},
	],
	pickMovesCount: 3,

	startingGearOptions: [
		{
			label: 'Pick one backup weapon',
			pickCount: 1,
			options: [
				{
					name: 'Old revolver',
					harm: 2,
					ranges: ['close'],
					tags: ['reload', 'loud'],
				},
				{
					name: 'Ritual knife',
					harm: 1,
					ranges: ['hand'],
					tags: [],
				},
				{
					name: 'Heirloom sword',
					harm: 2,
					ranges: ['hand'],
					tags: ['messy'],
				},
			],
		},
	],

	improvements: [
		{
			id: 'spell-slinger-imp-weird',
			label: 'Get +1 Weird, max +3',
			isAdvanced: false,
			type: 'rating-boost',
			rating: 'weird',
			maxValue: 3,
		},
		{
			id: 'spell-slinger-imp-cool',
			label: 'Get +1 Cool, max +2',
			isAdvanced: false,
			type: 'rating-boost',
			rating: 'cool',
			maxValue: 2,
		},
		{
			id: 'spell-slinger-imp-sharp',
			label: 'Get +1 Sharp, max +2',
			isAdvanced: false,
			type: 'rating-boost',
			rating: 'sharp',
			maxValue: 2,
		},
		{
			id: 'spell-slinger-imp-tough',
			label: 'Get +1 Tough, max +2',
			isAdvanced: false,
			type: 'rating-boost',
			rating: 'tough',
			maxValue: 2,
		},
		{
			id: 'spell-slinger-imp-move1',
			label: 'Take another Spell-Slinger move',
			isAdvanced: false,
			type: 'playbook-move',
		},
		{
			id: 'spell-slinger-imp-move2',
			label: 'Take another Spell-Slinger move',
			isAdvanced: false,
			type: 'playbook-move',
		},
		{
			id: 'spell-slinger-imp-cross1',
			label: 'Take a move from another playbook',
			isAdvanced: false,
			type: 'cross-playbook-move',
		},
		{
			id: 'spell-slinger-imp-cross2',
			label: 'Take a move from another playbook',
			isAdvanced: false,
			type: 'cross-playbook-move',
		},
		{
			id: 'spell-slinger-imp-combat-magic',
			label: 'Take another Combat Magic pick',
			isAdvanced: false,
			type: 'playbook-specific',
		},
	],

	advancedImprovements: [
		{
			id: 'spell-slinger-adv-stat',
			label: 'Get +1 to any rating, max +3',
			isAdvanced: true,
			type: 'rating-boost',
			rating: 'any',
			maxValue: 3,
		},
		{
			id: 'spell-slinger-adv-change',
			label: 'Change this hunter to a new type',
			isAdvanced: true,
			type: 'change-playbook',
		},
		{
			id: 'spell-slinger-adv-second',
			label: 'Create a second hunter to play as well as this one',
			isAdvanced: true,
			type: 'second-hunter',
		},
		{
			id: 'spell-slinger-adv-advanced1',
			label: 'Mark two of the basic moves as advanced',
			isAdvanced: true,
			type: 'advanced-moves',
		},
		{
			id: 'spell-slinger-adv-advanced2',
			label: 'Mark two of the basic moves as advanced',
			isAdvanced: true,
			type: 'advanced-moves',
		},
		{
			id: 'spell-slinger-adv-retire',
			label: 'Retire this hunter to safety',
			isAdvanced: true,
			type: 'retire',
		},
		{
			id: 'spell-slinger-adv-luck',
			label: 'Erase one used Luck mark from your playbook',
			isAdvanced: true,
			type: 'luck-recovery',
		},
		{
			id: 'spell-slinger-adv-combat-magic',
			label: 'Take another Combat Magic pick',
			isAdvanced: true,
			type: 'playbook-specific',
		},
		{
			id: 'spell-slinger-adv-tools',
			label: 'You may cross off another option from your Tools and Techniques',
			isAdvanced: true,
			type: 'playbook-specific',
		},
	],

	customSections: [
		{
			type: 'builder',
			key: 'combat-magic',
			title: 'Combat Magic',
			description:
				'You have a few attack spells you can use as weapons. When you use these spells to kick some ass, roll +Weird instead of +Tough. Your combat spells can combine any of your base spells with any of your effects. Pick three total, with at least one base.',
			steps: [
				{
					label: 'Bases (pick at least one)',
					pickCount: 1,
					options: [
						{
							label: 'Blast',
							description: '2-harm magic close obvious loud',
							effects: {
								harm: 2,
								tags: ['magic', 'obvious', 'loud'],
								ranges: ['close'],
							},
						},
						{
							label: 'Ball',
							description: '1-harm magic area close obvious loud',
							effects: {
								harm: 1,
								tags: ['magic', 'area', 'obvious', 'loud'],
								ranges: ['close'],
							},
						},
						{
							label: 'Missile',
							description: '1-harm magic far obvious loud',
							effects: {
								harm: 1,
								tags: ['magic', 'obvious', 'loud'],
								ranges: ['far'],
							},
						},
						{
							label: 'Wall',
							description: '1-harm magic barrier close 1-armour obvious loud',
							effects: {
								harm: 1,
								tags: ['magic', 'barrier', '1-armour', 'obvious', 'loud'],
								ranges: ['close'],
							},
						},
					],
				},
				{
					label: 'Effects (pick enough to total three with bases)',
					pickCount: 2,
					options: [
						{
							label: 'Fire',
							description:
								'Add "+2 harm fire" to a base. If you get a 10+ on a combat magic roll, the fire won\'t spread.',
						},
						{
							label: 'Force or Wind',
							description:
								'Add "+1 harm forceful" to a base, or "+1 armour" to a wall.',
						},
						{
							label: 'Lightning or Entropy',
							description: 'Add "+1 harm messy" to a base.',
						},
						{
							label: 'Frost or Ice',
							description:
								'Adds "-1 harm +2 armour" to a wall, or "+1 harm restraining" to other bases.',
						},
						{
							label: 'Earth',
							description: 'Add "forceful restraining" to a base.',
						},
						{
							label: 'Necromantic',
							description: 'Add "life-drain" to a base.',
						},
					],
				},
			],
		},
	],

	historyOptions: [
		'They act as your conscience when the power goes to your head. Ask them about the last time this happened.',
		'Blood relation, though you were out of contact for years. Ask them how they reconnected with you.',
		'Mentor from another life. Ask them what they taught you.',
		'Your magic-fueled rescue of them introduced them to the supernatural. Tell them what creature was after them.',
		'An old rivalry has turned into a tight friendship. Tell them what you once fought over.',
		"You thought they were dead, and now they're back. What \"killed\" them?",
		"They're an on-again/off-again love interest. Ask them what keeps you apart. Tell them what keeps you together.",
		"A comrade-in-arms. You've faced the biggest threats together.",
	],
};
