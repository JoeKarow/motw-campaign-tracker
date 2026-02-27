import type { PlaybookDefinition } from './types';

export const expert: PlaybookDefinition = {
	id: 'expert',
	displayName: 'The Expert',
	description:
		'I have dedicated my life to the study of the unnatural. I know their habits, their weaknesses. I may not be youngest or strongest, but my knowledge makes me the biggest threat.',
	luckSpecial:
		"When you spend a point of Luck, you discover something happening now is related to something you were involved in years ago.",

	ratingLines: [
		{ charm: -1, cool: 1, sharp: 2, tough: 1, weird: 0 },
		{ charm: 0, cool: 1, sharp: 2, tough: -1, weird: 1 },
		{ charm: 1, cool: -1, sharp: 2, tough: 1, weird: 0 },
		{ charm: -1, cool: 1, sharp: 2, tough: 0, weird: 1 },
		{ charm: -1, cool: 0, sharp: 2, tough: -1, weird: 2 },
	],

	looks: [
		{
			label: 'Face',
			options: [
				'Thoughtful face',
				'lined face',
				'scarred face',
				'contemplative face',
				'stern face',
				'avuncular face',
				'experienced face',
				'ancient face',
			],
			allowCustom: true,
		},
		{
			label: 'Clothes',
			options: [
				'Old fashioned clothes',
				'casual clothes',
				'utility clothes',
				'tailored clothes',
				'outdoor clothes',
			],
			allowCustom: true,
		},
	],

	mandatoryMoves: [],

	optionalMoves: [
		{
			id: 'expert-read-about',
			name: "I've Read About This Sort Of Thing",
			description:
				'Roll +Sharp instead of +Cool when you act under pressure.',
		},
		{
			id: 'expert-often-right',
			name: 'Often Right',
			description:
				'When a hunter comes to you for advice about a problem, give them your honest opinion and advice. If they take your advice, they get +1 ongoing while following your advice, and you mark experience.',
		},
		{
			id: 'expert-preparedness',
			name: 'Preparedness',
			description:
				"When you need something unusual or rare, roll +Sharp. On a 10+, you have it here right now. On a 7-9 you have it, but not here: it will take some time to get it. On a miss, you know where it is, but it's somewhere real bad.",
			rollType: 'SHARP',
		},
		{
			id: 'expert-it-wasnt-as-bad',
			name: "It Wasn't As Bad As It Looked",
			description:
				'Once per mystery, you may attempt to keep going despite your injuries. Roll +Cool. On a 10+, heal 2 harm and stabilize your wounds. On a 7-9 you may either stabilize or heal 1 harm. On a miss, it was worse than it looked: the Keeper may inflict a harm move on you, or make your wounds unstable.',
			rollType: 'COOL',
		},
		{
			id: 'expert-precise-strike',
			name: 'Precise Strike',
			description:
				'When you inflict harm on a monster, you can aim for a weak spot. Roll +Tough. On a 10+ you inflict +2 harm. On a 7-9 you inflict +1 harm. On a miss, you leave yourself open to the monster.',
			rollType: 'TOUGH',
		},
		{
			id: 'expert-the-woman-with-the-plan',
			name: 'The Woman (or Man) With The Plan',
			description:
				"At the beginning of each mystery, roll +Sharp. On a 10+ hold 2, on a 7-9 hold 1. Spend the hold to be where you need to be, prepared and ready. On a miss, the Keeper holds 1 they can spend to put you in the worst place, unprepared and unready.",
			rollType: 'SHARP',
		},
		{
			id: 'expert-dark-past',
			name: 'Dark Past',
			description:
				"If you trawl through your memories for something relevant to the case at hand, roll +Weird. On a 10+ ask the Keeper two questions from the list below. On a 7-9 ask one. On a miss, you can ask a question anyway but that will mean you were personally complicit in creating the situation you are now dealing with. The questions are: When I dealt with this creature (or one of its kind), what did I learn? What black magic do I know that could help here? Do I know anyone who might be behind this? Who do I know who can help us right now?",
			rollType: 'WEIRD',
		},
		{
			id: 'expert-trap-expert',
			name: 'Trap Expert',
			description:
				"When you lay a trap for a monster, roll +Sharp. On a 10+ you set it up perfectly. On a 7-9 you set a trap but it won't hold for long.",
			rollType: 'SHARP',
		},
	],
	pickMovesCount: 2,

	startingGearOptions: [
		{
			label: 'Monster-slaying weapons (pick three)',
			pickCount: 3,
			options: [
				{
					name: 'Mallet & wooden stakes',
					harm: 3,
					ranges: ['intimate'],
					tags: ['slow', 'wooden'],
				},
				{
					name: 'Silver sword',
					harm: 2,
					ranges: ['hand'],
					tags: ['messy', 'silver'],
				},
				{
					name: 'Cold iron sword',
					harm: 2,
					ranges: ['hand'],
					tags: ['messy', 'iron'],
				},
				{
					name: 'Blessed knife',
					harm: 2,
					ranges: ['hand'],
					tags: ['holy'],
				},
				{
					name: 'Magical dagger',
					harm: 2,
					ranges: ['hand'],
					tags: ['magic'],
				},
				{
					name: 'Juju bag',
					harm: 1,
					ranges: ['far'],
					tags: ['magic'],
				},
				{
					name: 'Flamethrower',
					harm: 3,
					ranges: ['close'],
					tags: ['fire', 'heavy', 'volatile'],
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
			],
		},
	],

	improvements: [
		{
			id: 'expert-imp-sharp',
			label: 'Get +1 Sharp, max +3',
			isAdvanced: false,
			type: 'rating-boost',
			rating: 'sharp',
			maxValue: 3,
		},
		{
			id: 'expert-imp-charm',
			label: 'Get +1 Charm, max +2',
			isAdvanced: false,
			type: 'rating-boost',
			rating: 'charm',
			maxValue: 2,
		},
		{
			id: 'expert-imp-cool',
			label: 'Get +1 Cool, max +2',
			isAdvanced: false,
			type: 'rating-boost',
			rating: 'cool',
			maxValue: 2,
		},
		{
			id: 'expert-imp-weird',
			label: 'Get +1 Weird, max +2',
			isAdvanced: false,
			type: 'rating-boost',
			rating: 'weird',
			maxValue: 2,
		},
		{
			id: 'expert-imp-move1',
			label: 'Take another Expert move',
			isAdvanced: false,
			type: 'playbook-move',
		},
		{
			id: 'expert-imp-move2',
			label: 'Take another Expert move',
			isAdvanced: false,
			type: 'playbook-move',
		},
		{
			id: 'expert-imp-haven1',
			label: 'Add an option to your haven',
			isAdvanced: false,
			type: 'haven-option',
		},
		{
			id: 'expert-imp-haven2',
			label: 'Add an option to your haven',
			isAdvanced: false,
			type: 'haven-option',
		},
		{
			id: 'expert-imp-cross1',
			label: 'Take a move from another playbook',
			isAdvanced: false,
			type: 'cross-playbook-move',
		},
		{
			id: 'expert-imp-cross2',
			label: 'Take a move from another playbook',
			isAdvanced: false,
			type: 'cross-playbook-move',
		},
	],

	advancedImprovements: [
		{
			id: 'expert-adv-stat',
			label: 'Get +1 to any rating, max +3',
			isAdvanced: true,
			type: 'rating-boost',
			rating: 'any',
			maxValue: 3,
		},
		{
			id: 'expert-adv-luck',
			label: 'Get back one used Luck point',
			isAdvanced: true,
			type: 'luck-recovery',
		},
		{
			id: 'expert-adv-change',
			label: 'Change this hunter to a new type',
			isAdvanced: true,
			type: 'change-playbook',
		},
		{
			id: 'expert-adv-second',
			label: 'Create a second hunter to play as well as this one',
			isAdvanced: true,
			type: 'second-hunter',
		},
		{
			id: 'expert-adv-advanced1',
			label: 'Mark two of the basic moves as advanced',
			isAdvanced: true,
			type: 'advanced-moves',
		},
		{
			id: 'expert-adv-advanced2',
			label: 'Mark another two of the basic moves as advanced',
			isAdvanced: true,
			type: 'advanced-moves',
		},
		{
			id: 'expert-adv-retire',
			label: 'Retire this hunter to safety',
			isAdvanced: true,
			type: 'retire',
		},
	],

	customSections: [
		{
			type: 'pick',
			key: 'haven',
			title: 'Haven',
			description:
				'You have set up a haven, a safe place to work. Pick three of the options below for your haven.',
			pickCount: 3,
			options: [
				{
					label: 'Lore Library',
					description:
						'When you hit the books, take +1 forward to investigate the mystery (as long as historical or reference works are appropriate).',
				},
				{
					label: 'Mystical Library',
					description:
						"If you use your library's occult tomes and grimoires, preparing with your tomes and grimoires, take +1 forward for use magic.",
				},
				{
					label: 'Protection Spells',
					description:
						"Your haven is safe from monsters—they cannot enter. Monsters might be able to do something special to evade the wards, but not easily.",
				},
				{
					label: 'Armory',
					description:
						'You have a stockpile of mystical and rare, monster-killing weapons and items. If you need a special weapon, roll +Weird. On a 10+ you have it (and plenty if that matters). On a 7-9 you have it, but only the minimum. On a miss, you\'ve got the wrong thing.',
					rollType: 'WEIRD',
				},
				{
					label: 'Infirmary',
					description:
						'You can heal people, and have the space for one or two to recuperate. The Keeper will tell you how long any patient\'s recovery is likely to take, and if you need extra supplies or help.',
				},
				{
					label: 'Workshop',
					description:
						'You have a space for building and repairing guns, cars and other gadgets. Work out with the Keeper how long any repair or construction will take, and if you need extra supplies or help.',
				},
				{
					label: 'Oubliette',
					description:
						"This room is isolated from every kind of monster, spirit and magic that you know about. Anything you stash in there can't be found, can't do any magic, and can't get out.",
				},
				{
					label: 'Panic Room',
					description:
						'This has essential supplies and is protected by normal and mystical means. You can hide out there for a few days, safe from pretty much anything.',
				},
				{
					label: 'Magical Laboratory',
					description:
						'You have a mystical lab with all kinds of weird ingredients and tools useful for casting spells (like the use magic move, big magic, and any other magical moves).',
				},
			],
		},
	],

	historyOptions: [
		'They are your student, apprentice, ward, or child. Between you, decide which.',
		'They came to you for advice, and your advice got them out of trouble. Ask them what the trouble was.',
		"They know about some of your dark secrets, but they've agreed to keep quiet about them. Tell them what they know.",
		'A distant relation. Tell them exactly what.',
		'You were previously both members of an eldritch group, now disbanded. Ask them why they left, then tell them why you did.',
		'They once helped you get a singular item that is now part of your haven. Tell them what it was.',
		'You were taught by the same master. Ask them how it ended.',
		'You saved their life in a tight spot. Tell them what happened.',
	],
};
