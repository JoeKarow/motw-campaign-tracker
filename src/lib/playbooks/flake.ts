import type { PlaybookDefinition } from './types';

export const flake: PlaybookDefinition = {
	id: 'flake',
	displayName: 'The Flake',
	description:
		"Everything's connected. But not everyone can see the patterns, and most people don't even look that hard. But me, I can never stop seeing the truth. I spot the patterns. That's how I found the monsters, and that's how I help kill them.",
	luckSpecial:
		'When you spend a point of Luck, pick an aspect of the current situation. The Keeper will tell you what other conspiracies that aspect connects to.',

	ratingLines: [
		{ charm: 1, cool: 1, sharp: 2, tough: -1, weird: 0 },
		{ charm: 0, cool: 1, sharp: 2, tough: -1, weird: 1 },
		{ charm: 1, cool: -1, sharp: 2, tough: 1, weird: 0 },
		{ charm: 1, cool: -1, sharp: 2, tough: 0, weird: 1 },
		{ charm: -1, cool: -1, sharp: 2, tough: 0, weird: 2 },
	],

	looks: [
		{
			label: 'Eyes',
			options: [
				'Wild eyes',
				'moving eyes',
				'focused eyes',
				'searching eyes',
				'suspicious eyes',
				'wide eyes',
				'guarded eyes',
			],
			allowCustom: true,
		},
		{
			label: 'Clothes',
			options: [
				'Ratty clothes',
				'casual clothes',
				'rumpled suit',
				'neat clothes',
				'comfortable clothes',
				'army surplus gear',
			],
			allowCustom: true,
		},
	],

	mandatoryMoves: [],

	optionalMoves: [
		{
			id: 'flake-connect-the-dots',
			name: 'Connect the Dots',
			description:
				'At the beginning of each mystery, if you look for the wider patterns that current events might be part of, roll +Sharp. On a 10+ hold 3, and on a 7-9 hold 1. Spend your hold during the mystery to ask the Keeper any one of the following questions: Is this person connected to current events more than they are saying? When and where will the next critical event occur? What does the monster want from this person? Is this connected to previous mysteries we have investigated? How does this mystery connect to the bigger picture?',
			rollType: 'SHARP',
		},
		{
			id: 'flake-crazy-eyes',
			name: 'Crazy Eyes',
			description: 'You get +1 Weird (max +3).',
		},
		{
			id: 'flake-see-it-all-fits-together',
			name: 'See, It All Fits Together',
			description:
				'You can use Sharp instead of Charm when you manipulate someone.',
		},
		{
			id: 'flake-suspicious-mind',
			name: 'Suspicious Mind',
			description: 'If someone lies to you, you know it.',
		},
		{
			id: 'flake-often-overlooked',
			name: 'Often Overlooked',
			description:
				"When you act all crazy to avoid something, roll +Weird. On a 10+ you're regarded as unthreatening or unimportant. On a 7-9, pick one: unthreatening or unimportant. On a miss, you draw lots (but not all) of the attention.",
			rollType: 'WEIRD',
		},
		{
			id: 'flake-contrary',
			name: 'Contrary',
			description:
				'When you seek out and receive someone\'s honest advice on the best course of action for you and then do something else instead, mark experience. If you do exactly the opposite of their advice, you also take +1 ongoing on any moves you make pursuing that course.',
		},
		{
			id: 'flake-net-friends',
			name: 'Net Friends',
			description:
				"You know a lot of people on the Internet. When you contact a net friend to help you with a mystery, roll +Charm. On a 10+, they're available and helpful\u2014they can fix something, break a code, hack a computer, or get you some special information. On a 7-9, they're prepared to help, but it's either going to take some time or you're going to have to do part of it yourself. On a miss, you burn some bridges.",
			rollType: 'CHARM',
		},
		{
			id: 'flake-sneaky',
			name: 'Sneaky',
			description:
				'When you attack from ambush, or from behind, inflict +2 harm.',
		},
	],
	pickMovesCount: 3,

	startingGearOptions: [
		{
			label: 'Normal weapons (pick one)',
			pickCount: 1,
			options: [
				{
					name: '.38 revolver',
					harm: 2,
					ranges: ['close'],
					tags: ['reload', 'loud'],
				},
				{
					name: '9mm',
					harm: 2,
					ranges: ['close'],
					tags: ['loud'],
				},
				{
					name: 'Hunting rifle',
					harm: 2,
					ranges: ['far'],
					tags: ['loud'],
				},
				{
					name: 'Magnum',
					harm: 3,
					ranges: ['close'],
					tags: ['reload', 'loud'],
				},
				{
					name: 'Shotgun',
					harm: 3,
					ranges: ['close'],
					tags: ['messy', 'loud'],
				},
				{
					name: 'Big knife',
					harm: 1,
					ranges: ['hand'],
					tags: [],
				},
			],
		},
		{
			label: 'Hidden weapons (pick two)',
			pickCount: 2,
			options: [
				{
					name: 'Throwing knives',
					harm: 1,
					ranges: ['close'],
					tags: ['many'],
				},
				{
					name: 'Holdout pistol',
					harm: 2,
					ranges: ['close'],
					tags: ['loud', 'reload'],
				},
				{
					name: 'Garrote',
					harm: 3,
					ranges: ['intimate'],
					tags: [],
				},
				{
					name: "Watchman's flashlight",
					harm: 1,
					ranges: ['hand'],
					tags: [],
				},
				{
					name: 'Weighted gloves/brass knuckles',
					harm: 1,
					ranges: ['hand'],
					tags: [],
				},
				{
					name: 'Butterfly knife/folding knife',
					harm: 1,
					ranges: ['hand'],
					tags: [],
				},
			],
		},
	],

	improvements: [
		{
			id: 'flake-imp-sharp',
			label: 'Get +1 Sharp, max +3',
			isAdvanced: false,
			type: 'rating-boost',
			rating: 'sharp',
			maxValue: 3,
		},
		{
			id: 'flake-imp-charm',
			label: 'Get +1 Charm, max +2',
			isAdvanced: false,
			type: 'rating-boost',
			rating: 'charm',
			maxValue: 2,
		},
		{
			id: 'flake-imp-cool',
			label: 'Get +1 Cool, max +2',
			isAdvanced: false,
			type: 'rating-boost',
			rating: 'cool',
			maxValue: 2,
		},
		{
			id: 'flake-imp-weird',
			label: 'Get +1 Weird, max +2',
			isAdvanced: false,
			type: 'rating-boost',
			rating: 'weird',
			maxValue: 2,
		},
		{
			id: 'flake-imp-move1',
			label: 'Take another Flake move',
			isAdvanced: false,
			type: 'playbook-move',
		},
		{
			id: 'flake-imp-move2',
			label: 'Take another Flake move',
			isAdvanced: false,
			type: 'playbook-move',
		},
		{
			id: 'flake-imp-haven',
			label: 'Get a haven, like the Expert has, with two options',
			isAdvanced: false,
			type: 'haven-option',
		},
		{
			id: 'flake-imp-haven2',
			label: 'Gain another option for your haven',
			isAdvanced: false,
			type: 'haven-option',
		},
		{
			id: 'flake-imp-cross1',
			label: 'Take a move from another playbook',
			isAdvanced: false,
			type: 'cross-playbook-move',
		},
		{
			id: 'flake-imp-cross2',
			label: 'Take a move from another playbook',
			isAdvanced: false,
			type: 'cross-playbook-move',
		},
	],

	advancedImprovements: [
		{
			id: 'flake-adv-stat',
			label: 'Get +1 to any rating, max +3',
			isAdvanced: true,
			type: 'rating-boost',
			rating: 'any',
			maxValue: 3,
		},
		{
			id: 'flake-adv-change',
			label: 'Change this hunter to a new type',
			isAdvanced: true,
			type: 'change-playbook',
		},
		{
			id: 'flake-adv-second',
			label: 'Create a second hunter to play as well as this one',
			isAdvanced: true,
			type: 'second-hunter',
		},
		{
			id: 'flake-adv-advanced1',
			label: 'Mark two of the basic moves as advanced',
			isAdvanced: true,
			type: 'advanced-moves',
		},
		{
			id: 'flake-adv-advanced2',
			label: 'Mark two of the basic moves as advanced',
			isAdvanced: true,
			type: 'advanced-moves',
		},
		{
			id: 'flake-adv-retire',
			label: 'Retire this hunter to safety',
			isAdvanced: true,
			type: 'retire',
		},
		{
			id: 'flake-adv-luck',
			label: 'Get back one used Luck point',
			isAdvanced: true,
			type: 'luck-recovery',
		},
	],

	customSections: [],

	historyOptions: [
		"They're somehow tied into it all. You've been keeping an eye on them.",
		"They're a close relative. Ask them to decide exactly what.",
		'Old friends, who originally met through a long chain of coincidences.',
		'You went through hell together: maybe a monster, maybe military service, maybe time in an institution. Whatever it was, it bound you together, and you have total trust in each other.',
		'Members of the same support group.',
		'Fellow freaks.',
		'The signs all pointed to working together. So you found them and now you work together.',
		'You know each other through cryptozoology and conspiracy theory websites.',
	],
};
