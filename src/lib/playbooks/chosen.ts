import type { PlaybookDefinition } from './types';

export const chosen: PlaybookDefinition = {
	id: 'chosen',
	displayName: 'The Chosen',
	luckSpecial:
		'When you spend a point of Luck, the Keeper will bring your fate into play.',

	ratingLines: [
		{ charm: 2, cool: -1, sharp: 1, tough: 2, weird: -1 },
		{ charm: -1, cool: 2, sharp: 1, tough: 2, weird: -1 },
		{ charm: 1, cool: 2, sharp: 1, tough: 1, weird: -1 },
		{ charm: -1, cool: 2, sharp: -1, tough: 2, weird: 1 },
		{ charm: 1, cool: 1, sharp: 0, tough: 2, weird: -1 },
	],

	looks: [
		{ label: 'Body', options: ['Fit', 'Pointed', 'Thin', 'Muscular', 'Gorgeous', 'Huge'] },
		{
			label: 'Clothes',
			options: [
				'Casual', 'Street', 'Urban', 'Outdoors wear', 'Armor',
			],
		},
	],

	mandatoryMoves: [
		{
			id: 'chosen-fate',
			name: 'I\'m Here For A Reason',
			description:
				'There\'s something only you can do. Work out the details with the Keeper: you have a special destiny.',
		},
	],

	optionalMoves: [
		{
			id: 'chosen-connect',
			name: 'Devastating',
			description:
				'When you inflict harm, you may inflict +1 harm.',
		},
		{
			id: 'chosen-dutiful',
			name: 'Dutiful',
			description:
				'When you act in the best interests of your destiny, the Keeper will give you +1 forward.',
		},
		{
			id: 'chosen-heroic',
			name: 'Heroic',
			description:
				'When you charge into immediate danger without hedging your bets, roll +Tough. On a 10+ you are unharmed. On a 7-9 you are unharmed but the Keeper picks one thing that goes wrong.',
			rollType: 'TOUGH',
		},
		{
			id: 'chosen-invincible',
			name: 'Invincible',
			description:
				'You always count as having 2-armour. This doesn\'t stack with other armour.',
		},
		{
			id: 'chosen-resilience',
			name: 'Resilience',
			description:
				'You heal faster than normal. Any time your harm gets healed, heal an extra point. You are immune to all sicknesses, natural and supernatural.',
		},
		{
			id: 'chosen-boss',
			name: 'Boss From Beyond',
			description:
				'At the beginning of each mystery, roll +Weird. On a 10+ the boss gives you useful info. On a 7-9 you get a vague hint. On a miss, the boss\'s info is misleading or dangerous.',
			rollType: 'WEIRD',
		},
		{
			id: 'chosen-sword',
			name: 'The Big Entrance',
			description:
				'When you make a showy entrance into a dangerous situation, roll +Cool. On 10+ everyone stops and watches. On a 7-9, just most do.',
			rollType: 'COOL',
		},
	],
	pickMovesCount: 3,

	startingGearOptions: [
		{
			label: 'Special Weapon',
			pickCount: 1,
			options: [
				{
					name: 'Sword',
					harm: 3,
					ranges: ['hand'],
					tags: ['messy'],
				},
				{
					name: 'Axe',
					harm: 3,
					ranges: ['hand'],
					tags: ['messy'],
				},
				{
					name: 'Spear / Staff',
					harm: 2,
					ranges: ['hand', 'close'],
					tags: [],
				},
				{
					name: 'Flail',
					harm: 3,
					ranges: ['hand'],
					tags: ['area', 'messy'],
				},
			],
		},
		{
			label: 'Mundane Weapons (pick 2)',
			pickCount: 2,
			options: [
				{ name: '.38 revolver', harm: 2, ranges: ['close', 'far'], tags: ['loud', 'reload'] },
				{ name: '9mm', harm: 2, ranges: ['close'], tags: ['loud'] },
				{ name: 'Hunting rifle', harm: 2, ranges: ['far'], tags: ['loud'] },
				{ name: 'Shotgun', harm: 3, ranges: ['close'], tags: ['messy', 'loud'] },
				{ name: 'Big knife', harm: 1, ranges: ['hand'], tags: [] },
				{ name: 'Brass knuckles', harm: 1, ranges: ['hand'], tags: [] },
				{ name: 'Sword', harm: 2, ranges: ['hand'], tags: [] },
			],
		},
	],

	improvements: [
		{ id: 'chosen-imp-charm', label: 'Get +1 Charm (max +3)', isAdvanced: false },
		{ id: 'chosen-imp-cool', label: 'Get +1 Cool (max +3)', isAdvanced: false },
		{ id: 'chosen-imp-sharp', label: 'Get +1 Sharp (max +3)', isAdvanced: false },
		{ id: 'chosen-imp-tough', label: 'Get +1 Tough (max +3)', isAdvanced: false },
		{ id: 'chosen-imp-weird', label: 'Get +1 Weird (max +3)', isAdvanced: false },
		{ id: 'chosen-imp-move1', label: 'Take another Chosen move', isAdvanced: false },
		{ id: 'chosen-imp-move2', label: 'Take another Chosen move', isAdvanced: false },
		{ id: 'chosen-imp-cross1', label: 'Take a move from another playbook', isAdvanced: false },
		{ id: 'chosen-imp-cross2', label: 'Take a move from another playbook', isAdvanced: false },
		{ id: 'chosen-imp-haven', label: 'Gain an ally', isAdvanced: false },
	],

	advancedImprovements: [
		{ id: 'chosen-adv-stat', label: 'Get +1 to any rating (max +3)', isAdvanced: true },
		{ id: 'chosen-adv-luck', label: 'Mark two of the advanced luck boxes', isAdvanced: true },
		{ id: 'chosen-adv-shotgun', label: 'Change this hunter to a new type', isAdvanced: true },
		{ id: 'chosen-adv-retire', label: 'Retire this hunter to safety', isAdvanced: true },
		{ id: 'chosen-adv-second', label: 'Make a second hunter to play', isAdvanced: true },
		{
			id: 'chosen-adv-dead',
			label: 'Erase a used luck mark from your playbook',
			isAdvanced: true,
		},
	],

	customSections: [],
};
