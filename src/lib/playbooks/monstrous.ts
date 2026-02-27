import type { PlaybookDefinition } from './types';

export const monstrous: PlaybookDefinition = {
	id: 'monstrous',
	displayName: 'The Monstrous',
	description:
		"I feel the hunger, the lust to destroy. But I fight it: I never give in. I'm not human any more, not really, but I have to protect those who still are. That way I can tell myself I'm different to the other monsters. Sometimes I can even believe it.",
	luckSpecial:
		'When you spend a point of Luck, your Curse becomes stronger, or another Breed disadvantage may manifest.',

	ratingLines: [
		{ charm: -1, cool: -1, sharp: 0, tough: 2, weird: 3 },
		{ charm: -1, cool: 1, sharp: 1, tough: 0, weird: 3 },
		{ charm: 2, cool: 0, sharp: -1, tough: -1, weird: 3 },
		{ charm: -2, cool: 2, sharp: 0, tough: 0, weird: 3 },
		{ charm: 0, cool: -1, sharp: 2, tough: -1, weird: 3 },
	],

	looks: [
		{
			label: 'Body',
			options: ['Almost human', 'half human', 'monstrous'],
			allowCustom: true,
		},
		{
			label: 'Aura',
			options: [
				'Sinister aura',
				'powerful aura',
				'dark aura',
				'unnerving aura',
				'energetic aura',
				'evil aura',
				'bestial aura',
			],
			allowCustom: true,
		},
		{
			label: 'Clothes',
			options: [
				'Archaic clothes',
				'casual clothes',
				'ragged clothes',
				'tailored clothes',
				'stylish clothes',
				'street clothes',
				'outdoor clothes',
			],
			allowCustom: true,
		},
	],

	mandatoryMoves: [],

	optionalMoves: [
		{
			id: 'monstrous-immortal',
			name: 'Immortal',
			description:
				'You do not age or sicken, and whenever you suffer harm you suffer 1-harm less.',
		},
		{
			id: 'monstrous-unnatural-appeal',
			name: 'Unnatural Appeal',
			description:
				'Roll +Weird instead of +Charm when you manipulate someone.',
		},
		{
			id: 'monstrous-unholy-strength',
			name: 'Unholy Strength',
			description:
				'Roll +Weird instead of +Tough when you kick some ass.',
		},
		{
			id: 'monstrous-incorporeal',
			name: 'Incorporeal',
			description:
				'You may move freely through solid objects (but not people).',
		},
		{
			id: 'monstrous-preternatural-speed',
			name: 'Preternatural Speed',
			description:
				'You go much faster than normal people. When you chase, flee, or run take +1 ongoing.',
		},
		{
			id: 'monstrous-claws-of-the-beast',
			name: 'Claws of the Beast',
			description: 'All your natural attacks get +1 harm.',
		},
		{
			id: 'monstrous-mental-dominion',
			name: 'Mental Dominion',
			description:
				"When you gaze into a normal human's eyes and exert your will over them, roll +Charm. On a 10+, hold 3. On a 7-9, hold 1. You may spend your hold to give them an order. Regular people will follow your order, whatever it is. Hunters can choose whether they do it or not. If they do, they mark experience.",
			rollType: 'CHARM',
		},
		{
			id: 'monstrous-unquenchable-vitality',
			name: 'Unquenchable Vitality',
			description:
				'When you have taken harm, you can heal yourself. Roll +Cool. On a 10+, heal 2-harm and stabilise your injuries. On a 7-9, heal 1-harm and stabilise your injuries. On a miss, your injuries worsen.',
			rollType: 'COOL',
		},
		{
			id: 'monstrous-dark-negotiator',
			name: 'Dark Negotiator',
			description:
				'You can use the manipulate someone move on monsters as well as people, if they can reason and talk.',
		},
		{
			id: 'monstrous-flight',
			name: 'Flight',
			description: 'You can fly.',
		},
		{
			id: 'monstrous-shapeshifter',
			name: 'Shapeshifter',
			description:
				'You may change your form (usually into an animal). Decide if you have just one alternate form or several, and detail them. You gain +1 to investigate a mystery when using an alternate form\'s superior senses (e.g. smell for a wolf, sight for an eagle).',
		},
		{
			id: 'monstrous-something-borrowed',
			name: 'Something Borrowed',
			description:
				'Take a move from a hunter playbook that is not currently in play.',
		},
	],
	pickMovesCount: 2,

	startingGearOptions: [
		{
			label: 'Handy weapon (pick one)',
			pickCount: 1,
			options: [
				{ name: '.38 revolver', harm: 2, ranges: ['close'], tags: ['reload', 'loud'] },
				{ name: '9mm', harm: 2, ranges: ['close'], tags: ['loud'] },
				{ name: 'Magnum', harm: 3, ranges: ['close'], tags: ['reload', 'loud'] },
				{ name: 'Shotgun', harm: 3, ranges: ['close'], tags: ['messy'] },
				{ name: 'Big knife', harm: 1, ranges: ['hand'], tags: [] },
				{ name: 'Brass knuckles', harm: 1, ranges: ['hand'], tags: ['quiet', 'small'] },
				{ name: 'Sword', harm: 2, ranges: ['hand'], tags: ['messy'] },
				{ name: 'Huge sword', harm: 3, ranges: ['hand'], tags: ['heavy'] },
			],
		},
	],

	improvements: [
		{
			id: 'monstrous-imp-charm',
			label: 'Get +1 Charm, max +2',
			isAdvanced: false,
			type: 'rating-boost',
			rating: 'charm',
			maxValue: 2,
		},
		{
			id: 'monstrous-imp-cool',
			label: 'Get +1 Cool, max +2',
			isAdvanced: false,
			type: 'rating-boost',
			rating: 'cool',
			maxValue: 2,
		},
		{
			id: 'monstrous-imp-sharp',
			label: 'Get +1 Sharp, max +2',
			isAdvanced: false,
			type: 'rating-boost',
			rating: 'sharp',
			maxValue: 2,
		},
		{
			id: 'monstrous-imp-tough',
			label: 'Get +1 Tough, max +2',
			isAdvanced: false,
			type: 'rating-boost',
			rating: 'tough',
			maxValue: 2,
		},
		{
			id: 'monstrous-imp-move1',
			label: 'Take another Monstrous move',
			isAdvanced: false,
			type: 'playbook-move',
		},
		{
			id: 'monstrous-imp-move2',
			label: 'Take another Monstrous move',
			isAdvanced: false,
			type: 'playbook-move',
		},
		{
			id: 'monstrous-imp-haven',
			label: 'Gain a haven, like the Expert has, with two options',
			isAdvanced: false,
			type: 'haven-option',
		},
		{
			id: 'monstrous-imp-natural-attacks',
			label: 'Take a natural attacks pick',
			isAdvanced: false,
			type: 'playbook-specific',
		},
		{
			id: 'monstrous-imp-cross1',
			label: 'Take a move from another playbook',
			isAdvanced: false,
			type: 'cross-playbook-move',
		},
		{
			id: 'monstrous-imp-cross2',
			label: 'Take a move from another playbook',
			isAdvanced: false,
			type: 'cross-playbook-move',
		},
	],

	advancedImprovements: [
		{
			id: 'monstrous-adv-stat',
			label: 'Get +1 to any rating, max +3',
			isAdvanced: true,
			type: 'rating-boost',
			rating: 'any',
			maxValue: 3,
		},
		{
			id: 'monstrous-adv-change',
			label: 'Change this hunter to a new type',
			isAdvanced: true,
			type: 'change-playbook',
		},
		{
			id: 'monstrous-adv-second',
			label: 'Create a second hunter to play as well as this one',
			isAdvanced: true,
			type: 'second-hunter',
		},
		{
			id: 'monstrous-adv-advanced1',
			label: 'Mark two of the basic moves as advanced',
			isAdvanced: true,
			type: 'advanced-moves',
		},
		{
			id: 'monstrous-adv-advanced2',
			label: 'Mark two of the basic moves as advanced',
			isAdvanced: true,
			type: 'advanced-moves',
		},
		{
			id: 'monstrous-adv-retire',
			label: 'Retire this hunter to safety',
			isAdvanced: true,
			type: 'retire',
		},
		{
			id: 'monstrous-adv-free-curse',
			label:
				'Free yourself from the curse of your kind. Your curse no longer applies, but you lose 1 Weird.',
			isAdvanced: true,
			type: 'playbook-specific',
		},
		{
			id: 'monstrous-adv-turn-evil',
			label:
				"You turn evil (again). Retire this character, they become one of the Keeper's threats.",
			isAdvanced: true,
			type: 'playbook-specific',
		},
		{
			id: 'monstrous-adv-luck',
			label: 'Get back one used Luck point',
			isAdvanced: true,
			type: 'luck-recovery',
		},
	],

	customSections: [
		{
			type: 'builder',
			key: 'breed',
			title: 'Monster Breed',
			description:
				"You're half-human, half-monster: decide if you were always this way or if you were originally human and transformed somehow. Define your monstrous breed by picking a curse, moves, and natural attacks.",
			steps: [
				{
					label: 'Curse (pick one)',
					pickCount: 1,
					options: [
						{
							label: 'Feed',
							description:
								'You must subsist on living humans\u2014it might take the form of blood, brains, or spiritual essence but it must be from people. You need to act under pressure to resist feeding whenever a perfect opportunity presents itself.',
						},
						{
							label: 'Vulnerability',
							description:
								'Pick a substance. You suffer +1 harm when you are hurt by it. If you are bound or surrounded by it, you must act under pressure to use your powers.',
							hasTextInput: true,
						},
						{
							label: 'Pure Drive',
							description:
								'One emotion rules you. Pick from: hunger, hate, anger, fear, jealousy, greed, joy, pride, envy, lust, or cruelty. Whenever you have a chance to indulge that emotion, you must do so immediately, or act under pressure to resist.',
							hasTextInput: true,
						},
						{
							label: 'Dark Master',
							description:
								"You have an evil lord who doesn't know you changed sides. They still give you orders, and they do not tolerate refusal. Or failure.",
						},
					],
				},
				{
					label: 'Natural Attacks (pick a Base and add an extra to it, or two Bases)',
					pickCount: 2,
					options: [
						{
							label: 'Base: teeth',
							description: '3-harm intimate',
							effects: { harm: 3, ranges: ['intimate'] },
						},
						{
							label: 'Base: claws',
							description: '2-harm hand',
							effects: { harm: 2, ranges: ['hand'] },
						},
						{
							label: 'Base: magical force',
							description: '1-harm magical close',
							effects: { harm: 1, ranges: ['close'], tags: ['magical'] },
						},
						{
							label: 'Base: life-drain',
							description: '1-harm intimate life-drain',
							effects: { harm: 1, ranges: ['intimate'], tags: ['life-drain'] },
						},
						{
							label: 'Extra: Add +1 harm to a base',
							description: '+1 harm',
							effects: { harm: 1 },
						},
						{
							label: 'Extra: Add ignore-armour to a base',
							description: 'ignore-armour',
							effects: { tags: ['ignore-armour'] },
						},
						{
							label: 'Extra: Add an extra range to a base',
							description: 'Add intimate, hand, or close',
							hasTextInput: true,
						},
					],
				},
			],
		},
	],

	historyOptions: [
		'You lost control one time, and almost killed them. Ask them how they stopped you.',
		"They tried to slay you, but you proved you're on the side of good. Ask them what convinced them.",
		'You are romantically obsessed with them. Ask them if they know, and if they reciprocate.',
		'Close relations, or a distant descendant. Tell them which.',
		'You saved them from another of your kind, and prevented reprisals against that individual creature (maybe it\'s another good one, or maybe it has a hold over you).',
		'They are tied to your curse or origin. Tell them how.',
		'You fought together against the odds, and prevailed.',
		'They saved you from another hunter who was prepared to kill you. Ask them what happened.',
	],
};
