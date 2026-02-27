import type { PlaybookDefinition } from './types';

export const meddlingKid: PlaybookDefinition = {
	id: 'meddling-kid',
	displayName: 'The Meddling Kid',
	description:
		"A ghost in the old library? We'll find out what's really going on! By the way, what's up with your stake in the development company that wants to knock the old place down?",
	luckSpecial:
		"Whenever you spend a Luck point, you'll see something you weren't supposed to. It might help your investigation, or it might just be scary.",

	ratingLines: [
		{ charm: 2, cool: 0, sharp: 2, tough: -1, weird: -1 },
		{ charm: 2, cool: 0, sharp: 1, tough: 1, weird: -1 },
		{ charm: 2, cool: -1, sharp: 0, tough: -1, weird: 2 },
		{ charm: 2, cool: 1, sharp: 0, tough: 1, weird: -1 },
		{ charm: 2, cool: 0, sharp: 1, tough: -1, weird: 1 },
	],

	looks: [
		{
			label: 'Body',
			options: ['Kid', 'dog', 'cat'],
			allowCustom: true,
		},
		{
			label: 'Hair',
			options: [
				'Messy hair',
				'long hair',
				'perfect hair',
				'short hair',
				'big hair',
				'_____ hair',
			],
			allowCustom: true,
		},
		{
			label: 'Clothes',
			options: [
				'Preppy wear',
				'designer wear',
				'stoner wear',
				'nerdy wear',
				'collar & nametag',
				'_____ wear',
			],
			allowCustom: true,
		},
	],

	mandatoryMoves: [],

	optionalMoves: [
		{
			id: 'meddling-kid-unmasked',
			name: 'Unmasked!',
			description:
				'When you have a monster captured or at bay, you may explain it is not a monster after all but a specific person in a mask. You must explain the real reason for all the seemingly supernatural events you have seen, and how the villain was behind them. When you reveal the culprit, roll +Sharp. On a 10+, your deduction is correct and it really is that person in a mask! On a 7-9, the Keeper must choose one of: This really is a monster, but the named bystander was secretly their ally all along; You are correct, but while you talked, they found a way to attempt an escape; You are correct, but the explanation for all the events is correct but you picked the wrong person: when you unmask them, the villain is someone unexpected. On a miss, the monster gets an opportunity to create chaos while you explain your (incorrect) deductions.',
			rollType: 'SHARP',
		},
		{
			id: 'meddling-kid-power-snack',
			name: 'Power Snack!',
			description:
				'When you take the time to eat your chosen snacks and really enjoy them, take +1 forward.',
		},
		{
			id: 'meddling-kid-best-bud',
			name: 'Best Bud!',
			description:
				'You have an animal ally to help you solve mysteries. They can talk, but with a heavy accent (most people don\'t understand).',
		},
		{
			id: 'meddling-kid-hard-head',
			name: 'Hard Head!',
			description:
				'Any time you suffer harm from an attack, you may choose to take 0-harm. You instead are knocked out for a few minutes.',
		},
		{
			id: 'meddling-kid-its-a-trap',
			name: "It's A Trap!",
			description:
				'When you make a trap to capture a monster or minion, roll +Sharp. On a 7-9 or higher you capture something! On a 10+ not only do you capture something, but you can choose one extra effect: It will take some time for the victim to get free; The trap inflicts harm (and may include effects from Wallop! if you have that move); The trap may be re-set and re-used later (you\'ll need to roll the move again when you do so, with +1 forward).',
			rollType: 'SHARP',
		},
		{
			id: 'meddling-kid-tell-me-the-truth',
			name: 'Tell Me The Truth!',
			description:
				'When you are questioning somebody to investigate a mystery, you may add these questions to the list you may choose to ask: Who has something to gain from this situation? What are you plotting? Are you lying to me? Who knows about _____?',
		},
		{
			id: 'meddling-kid-run-away',
			name: 'Run Away!',
			description:
				'When you decide to get out of a bad situation, you can get away just fine. Unfortunately you will end up somewhere just as bad, but important to the current mystery.',
		},
		{
			id: 'meddling-kid-pleasant-manner',
			name: 'A Pleasant and Friendly Manner',
			description:
				'When you politely manipulate somebody, your impeccable manners always count as a reason for the person to do what you say.',
		},
		{
			id: 'meddling-kid-wallop',
			name: 'Wallop!',
			description:
				'When you use an improvised weapon to attack something, you may choose one of these extra effects: Momentarily stun them with a blow to the head; Trip or entangle them; Inflict +1 harm but the improvised weapon breaks.',
		},
	],
	pickMovesCount: 3,

	startingGearOptions: [
		{
			label: 'Mystery solving gadgets (pick three)',
			pickCount: 3,
			options: [
				'Magnifying glass',
				'Microscope',
				'A van',
				'Library card',
				'Chemistry kit',
				'A set of walkie-talkies',
				'Fingerprint kit',
				'Camera',
				'Bag of snacks',
				'Toolbox',
				'Tape recorder',
				'Disguise kit',
			],
		},
	],

	improvements: [
		{
			id: 'meddling-kid-imp-charm',
			label: 'Get +1 Charm, max +3',
			isAdvanced: false,
			type: 'rating-boost',
			rating: 'charm',
			maxValue: 3,
		},
		{
			id: 'meddling-kid-imp-sharp',
			label: 'Get +1 Sharp, max +2',
			isAdvanced: false,
			type: 'rating-boost',
			rating: 'sharp',
			maxValue: 2,
		},
		{
			id: 'meddling-kid-imp-cool',
			label: 'Get +1 Cool, max +2',
			isAdvanced: false,
			type: 'rating-boost',
			rating: 'cool',
			maxValue: 2,
		},
		{
			id: 'meddling-kid-imp-weird',
			label: 'Get +1 Weird, max +2',
			isAdvanced: false,
			type: 'rating-boost',
			rating: 'weird',
			maxValue: 2,
		},
		{
			id: 'meddling-kid-imp-move1',
			label: 'Take another Meddling Kid move',
			isAdvanced: false,
			type: 'playbook-move',
		},
		{
			id: 'meddling-kid-imp-move2',
			label: 'Take another Meddling Kid move',
			isAdvanced: false,
			type: 'playbook-move',
		},
		{
			id: 'meddling-kid-imp-ally',
			label: 'Gain an ally: a new mystery team member (they may be an animal)',
			isAdvanced: false,
			type: 'gain-ally',
		},
		{
			id: 'meddling-kid-imp-luck',
			label: 'Get back one used Luck point',
			isAdvanced: false,
			type: 'luck-recovery',
		},
		{
			id: 'meddling-kid-imp-cross1',
			label: 'Take a move from another playbook',
			isAdvanced: false,
			type: 'cross-playbook-move',
		},
		{
			id: 'meddling-kid-imp-cross2',
			label: 'Take a move from another playbook',
			isAdvanced: false,
			type: 'cross-playbook-move',
		},
	],

	advancedImprovements: [
		{
			id: 'meddling-kid-adv-stat',
			label: 'Get +1 to any rating, max +3',
			isAdvanced: true,
			type: 'rating-boost',
			rating: 'any',
			maxValue: 3,
		},
		{
			id: 'meddling-kid-adv-change',
			label: 'Change this hunter to a new type',
			isAdvanced: true,
			type: 'change-playbook',
		},
		{
			id: 'meddling-kid-adv-second',
			label: 'Create a second hunter to play as well as this one',
			isAdvanced: true,
			type: 'second-hunter',
		},
		{
			id: 'meddling-kid-adv-advanced1',
			label: 'Mark two of the basic moves as advanced',
			isAdvanced: true,
			type: 'advanced-moves',
		},
		{
			id: 'meddling-kid-adv-advanced2',
			label: 'Mark two of the basic moves as advanced',
			isAdvanced: true,
			type: 'advanced-moves',
		},
		{
			id: 'meddling-kid-adv-retire',
			label: 'Retire this hunter to safety',
			isAdvanced: true,
			type: 'retire',
		},
		{
			id: 'meddling-kid-adv-luck',
			label: 'Get back one used Luck point',
			isAdvanced: true,
			type: 'luck-recovery',
		},
	],

	customSections: [
		{
			type: 'text-input',
			key: 'power-snack',
			title: 'Power Snack',
			description: 'If you took the Power Snack! move, what is your chosen snack?',
			fields: [
				{
					label: 'My power snack is',
					placeholder: 'Enter your power snack',
				},
			],
		},
	],

	historyOptions: [
		'This hunter is your older sibling, cousin, aunt, or uncle.',
		'This hunter has a rather disturbing "kill all monsters" attitude.',
		'You have a crush on this hunter.',
		"You're friends from school.",
		"You respect this hunter's mystery solving skills.",
		"This hunter knows why you don't really believe in monsters. Tell them what they found out about your past.",
		'When you saw your first "monster," this hunter explained what was going on. You may not believe everything they believe, but you appreciate that they mean well.',
		'You stopped them attacking the wrong person one time, when they thought it was a monster.',
	],
};
