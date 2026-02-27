import type { PlaybookDefinition } from './types';

export const initiate: PlaybookDefinition = {
	id: 'initiate',
	displayName: 'The Initiate',
	description:
		'Since the dawn of history, we have been the bulwark against Darkness. We know the Evils of the world, and we stand against them so that the mass of humanity need not fear. We are the Flame that cleanses the Shadows.',
	luckSpecial:
		'When you spend a point of Luck, something goes wrong for your Sect: an ill-advised project or a disastrous operation.',

	ratingLines: [
		{ charm: -1, cool: 1, sharp: 0, tough: 1, weird: 2 },
		{ charm: 0, cool: 1, sharp: 1, tough: -1, weird: 2 },
		{ charm: -1, cool: 0, sharp: -1, tough: 2, weird: 2 },
		{ charm: 1, cool: -1, sharp: 1, tough: 0, weird: 2 },
		{ charm: 0, cool: 0, sharp: 0, tough: 1, weird: 2 },
	],

	looks: [
		{
			label: 'Body',
			options: [
				'Hardened body',
				'tattooed body',
				'agile body',
				'strong body',
				'thin body',
				'angular body',
				'hunched body',
			],
			allowCustom: true,
		},
		{
			label: 'Clothes',
			options: [
				'Archaic clothes',
				'unfashionable clothes',
				'ceremonial clothes',
				'mismatched clothes',
				'formal clothes',
			],
			allowCustom: true,
		},
	],

	mandatoryMoves: [
		{
			id: 'initiate-sect-standing',
			name: 'Sect Standing',
			description:
				'When you are in good standing with your Sect, at the beginning of each mystery, roll +Charm. On a 10+ they provide some useful info or help in the field. On a 7-9 you get a mission associated with the mystery, and if you do it you\'ll get some info or help too. On a miss, they ask you to do something bad. If you fail a mission or refuse an order, you\'ll be in trouble with the Sect until you atone.',
			rollType: 'CHARM',
		},
	],

	optionalMoves: [
		{
			id: 'initiate-ancient-fighting-arts',
			name: 'Ancient Fighting Arts',
			description:
				'When using an old-fashioned hand weapon, you inflict +1 harm and get +1 whenever you roll protect someone.',
		},
		{
			id: 'initiate-mystic',
			name: 'Mystic',
			description:
				'Every time you successfully use magic, take +1 forward.',
		},
		{
			id: 'initiate-fortunes',
			name: 'Fortunes',
			description:
				"The Sect has ancient prophecies or divination techniques to predict the future. Once per mystery, if you look at what the future holds, roll +Weird. On a 10+ hold 3, and on a 7-9 hold 1. On a miss, you get bad information and the Keeper decides how that affects you. Spend your hold to: have a useful object ready; be somewhere you are needed, just in time; take +1 forward, or give +1 forward to another hunter; retroactively warn someone about an attack, so that it doesn't happen.",
			rollType: 'WEIRD',
		},
		{
			id: 'initiate-sacred-oath',
			name: 'Sacred Oath',
			description:
				"You may bind yourself to a single goal, forsaking something during your quest (e.g. speech, all sustenance but bread and water, alcohol, lying, sex, etc). Get the Keeper's agreement on this\u2014it should match the goal in importance and difficulty. While you keep your oath and work towards your goal, mark experience at the end of every session and get +1 on any rolls that directly help achieve the goal. If you break the oath, take -1 ongoing until you have atoned.",
		},
		{
			id: 'initiate-mentor',
			name: 'Mentor',
			description:
				"You have a mentor in the Sect: name them. When you contact your mentor for info, roll +Sharp. On a 10+, you get an answer to your question, no problem. On a 7-9 you choose: they're either busy and can't help, or they answer the question but you owe a favour. On a miss, your question causes trouble.",
			rollType: 'SHARP',
		},
		{
			id: 'initiate-apprentice',
			name: 'Apprentice',
			description:
				"You have an apprentice: name them. Your job is to teach them the Sect's ways. They count as an ally: subordinate (motivation: to follow your instructions to the letter).",
		},
		{
			id: 'initiate-helping-hand',
			name: 'Helping Hand',
			description:
				'When you successfully help out another hunter, they get +2 instead of the usual +1.',
		},
		{
			id: 'initiate-that-old-black-magic',
			name: 'That Old Black Magic',
			description:
				'When you use magic, you can ask a question from the investigate a mystery move as your effect.',
		},
	],
	pickMovesCount: 3,

	startingGearOptions: [
		{
			label: 'Old-fashioned weapons',
			pickCount: 3,
			options: [
				{ name: 'Sword', harm: 2, ranges: ['hand'], tags: ['messy'] },
				{ name: 'Axe', harm: 2, ranges: ['hand'], tags: ['messy'] },
				{
					name: 'Big sword',
					harm: 3,
					ranges: ['hand'],
					tags: ['messy', 'heavy'],
				},
				{
					name: 'Big axe',
					harm: 3,
					ranges: ['hand'],
					tags: ['messy', 'heavy'],
				},
				{
					name: 'Silver knife',
					harm: 1,
					ranges: ['hand'],
					tags: ['silver'],
				},
				{
					name: 'Fighting sticks',
					harm: 1,
					ranges: ['hand'],
					tags: ['quick'],
				},
				{
					name: 'Spear',
					harm: 2,
					ranges: ['hand', 'close'],
					tags: [],
				},
				{ name: 'Mace', harm: 2, ranges: ['hand'], tags: ['messy'] },
				{
					name: 'Crossbow',
					harm: 2,
					ranges: ['close'],
					tags: ['slow'],
				},
			],
		},
		{
			label: 'Modern weapons',
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
					name: 'Sniper rifle',
					harm: 3,
					ranges: ['far'],
					tags: [],
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
					tags: ['messy'],
				},
			],
		},
		{
			label: 'Armour',
			pickCount: 1,
			options: ['Old-fashioned armour (1-armour heavy)'],
		},
	],

	improvements: [
		{
			id: 'initiate-imp-weird',
			label: 'Get +1 Weird, max +3',
			isAdvanced: false,
			type: 'rating-boost',
			rating: 'weird',
			maxValue: 3,
		},
		{
			id: 'initiate-imp-cool',
			label: 'Get +1 Cool, max +2',
			isAdvanced: false,
			type: 'rating-boost',
			rating: 'cool',
			maxValue: 2,
		},
		{
			id: 'initiate-imp-sharp',
			label: 'Get +1 Sharp, max +2',
			isAdvanced: false,
			type: 'rating-boost',
			rating: 'sharp',
			maxValue: 2,
		},
		{
			id: 'initiate-imp-tough',
			label: 'Get +1 Tough, max +2',
			isAdvanced: false,
			type: 'rating-boost',
			rating: 'tough',
			maxValue: 2,
		},
		{
			id: 'initiate-imp-move1',
			label: 'Take another Initiate move',
			isAdvanced: false,
			type: 'playbook-move',
		},
		{
			id: 'initiate-imp-move2',
			label: 'Take another Initiate move',
			isAdvanced: false,
			type: 'playbook-move',
		},
		{
			id: 'initiate-imp-chapter',
			label: 'Get command of your chapter of the Sect',
			isAdvanced: false,
			type: 'playbook-specific',
		},
		{
			id: 'initiate-imp-sect-team',
			label: 'Get a Sect team under your command',
			isAdvanced: false,
			type: 'playbook-specific',
		},
		{
			id: 'initiate-imp-cross1',
			label: 'Take a move from another playbook',
			isAdvanced: false,
			type: 'cross-playbook-move',
		},
		{
			id: 'initiate-imp-cross2',
			label: 'Take a move from another playbook',
			isAdvanced: false,
			type: 'cross-playbook-move',
		},
	],

	advancedImprovements: [
		{
			id: 'initiate-adv-stat',
			label: 'Get +1 to any rating, max +3',
			isAdvanced: true,
			type: 'rating-boost',
			rating: 'any',
			maxValue: 3,
		},
		{
			id: 'initiate-adv-change',
			label: 'Change this hunter to a new type',
			isAdvanced: true,
			type: 'change-playbook',
		},
		{
			id: 'initiate-adv-second',
			label: 'Create a second hunter to play as well as this one',
			isAdvanced: true,
			type: 'second-hunter',
		},
		{
			id: 'initiate-adv-advanced1',
			label: 'Mark two of the basic moves as advanced',
			isAdvanced: true,
			type: 'advanced-moves',
		},
		{
			id: 'initiate-adv-advanced2',
			label: 'Mark two of the basic moves as advanced',
			isAdvanced: true,
			type: 'advanced-moves',
		},
		{
			id: 'initiate-adv-retire',
			label: 'Retire this hunter to safety',
			isAdvanced: true,
			type: 'retire',
		},
		{
			id: 'initiate-adv-sect-leader',
			label:
				'Become the leader, or effective leader, of the whole Sect.',
			isAdvanced: true,
			type: 'playbook-specific',
		},
		{
			id: 'initiate-adv-luck',
			label: 'Get back one used Luck point',
			isAdvanced: true,
			type: 'luck-recovery',
		},
	],

	customSections: [
		{
			type: 'text-input',
			key: 'sect',
			title: 'Sect',
			description:
				'You are part of an ancient, secret order that slays monsters. Describe your Sect.',
			fields: [{ label: 'Sect name', placeholder: 'Name your Sect' }],
		},
		{
			type: 'pick',
			key: 'good-traditions',
			title: 'Good Traditions',
			description: "Pick the Sect's good traditions (pick two):",
			pickCount: 2,
			options: [
				{ label: 'Knowledgeable' },
				{ label: 'Ancient lore' },
				{ label: 'Magical lore' },
				{ label: 'Fighting arts' },
				{ label: 'Modernised' },
				{ label: 'Chapters everywhere' },
				{ label: 'Secular power' },
				{ label: 'Flexible tactics' },
				{ label: 'Open hierarchy' },
				{ label: 'Integrated in society' },
				{ label: 'Rich' },
				{ label: 'Nifty gadgets' },
				{ label: 'Magical items' },
			],
		},
		{
			type: 'pick',
			key: 'bad-traditions',
			title: 'Bad Traditions',
			description: "Pick the Sect's bad tradition (pick one):",
			pickCount: 1,
			options: [
				{ label: 'Dubious motives' },
				{ label: 'Tradition-bound' },
				{ label: 'Short-sighted' },
				{ label: 'Paranoid and secretive' },
				{ label: 'Closed hierarchy' },
				{ label: 'Factionalised' },
				{ label: 'Strict laws' },
				{ label: 'Mystical oaths' },
				{ label: 'Total obedience' },
				{ label: 'Tyrannical leaders' },
				{ label: 'Obsolete gear' },
				{ label: 'Poor' },
			],
		},
	],

	historyOptions: [
		'They are a lay member of your Sect.',
		'You fought together when the tide of monsters seemed unstoppable. Ask them how it went.',
		'Friends, but they first met you under your cover identity, and learned about the Sect later. Ask how they feel about that.',
		'They are your close relative, or partner/spouse. Decide between you exactly what the relationship is.',
		'Fellow ancient weapons/martial arts club members.',
		"They're described in the prophecies, but the role they will play isn't stated.",
		'An ex-member of the Sect, but still friends. Ask them why they left or got thrown out.',
		"You met researching mystical weirdness, and you've been occult comrades ever since.",
	],
};
