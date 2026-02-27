import type { PlaybookDefinition } from './types';

export const chosen: PlaybookDefinition = {
	id: 'chosen',
	displayName: 'The Chosen',
	description:
		'Your birth was prophesied. You are the Chosen One, and with your abilities you can save the world. If you fail, all will be destroyed. It all rests on you. Only you.',
	luckSpecial:
		'When you spend a point of Luck, the Keeper will bring your fate into play.',

	ratingLines: [
		{ charm: 2, cool: -1, sharp: 1, tough: 2, weird: -1 },
		{ charm: -1, cool: 2, sharp: 1, tough: 2, weird: -1 },
		{ charm: 1, cool: 2, sharp: 1, tough: 1, weird: -1 },
		{ charm: -1, cool: 1, sharp: 2, tough: -1, weird: 2 },
		{ charm: 1, cool: 2, sharp: -1, tough: -1, weird: 2 },
	],

	looks: [
		{
			label: 'Body',
			options: ['Kid', 'teen', 'young', 'burnt-out'],
			allowCustom: true,
		},
		{
			label: 'Face',
			options: [
				'Fresh face',
				'haggard face',
				'young face',
				'haunted face',
				'hopeful face',
				'controlled face',
			],
			allowCustom: true,
		},
		{
			label: 'Clothes',
			options: [
				'Preppy clothes',
				'casual wear',
				'urban wear',
				'normal clothes',
				'neat clothes',
				'street wear',
			],
			allowCustom: true,
		},
	],

	mandatoryMoves: [
		{
			id: 'chosen-destinys-plaything',
			name: "Destiny's Plaything",
			description:
				'At the beginning of each mystery, roll +Weird to see what is revealed about your immediate future. On a 10+, the Keeper will reveal a useful detail about the coming mystery. On a 7-9 you get a vague hint about it. On a miss, something bad is going to happen to you.',
			rollType: 'WEIRD',
		},
		{
			id: 'chosen-here-for-a-reason',
			name: "I'm Here For A Reason",
			description:
				"There's something only you can do. Work out the details with the Keeper, based on your fate. You cannot die until it comes to pass. If you die in play, then you must spend a Luck point. You will then, somehow, recover or be returned to life. Once your task is done (or you use up all your Luck), all bets are off.",
		},
	],

	optionalMoves: [
		{
			id: 'chosen-big-entrance',
			name: 'The Big Entrance',
			description:
				'When you make a showy entrance into a dangerous situation, roll +Cool. On 10+ everyone stops and watches until you finish your opening speech. On a 7-9, you pick one person or monster to stop, watch and listen until you finish talking. On a miss, you\'re marked as the biggest threat by all enemies who are present.',
			rollType: 'COOL',
		},
		{
			id: 'chosen-devastating',
			name: 'Devastating',
			description: 'When you inflict harm, you may inflict +1 harm.',
		},
		{
			id: 'chosen-dutiful',
			name: 'Dutiful',
			description:
				'When your fate rears its ugly head, and you act in accordance with any of your fate tags (either heroic or doom) then mark experience. If it\'s a heroic tag, take +1 forward.',
		},
		{
			id: 'chosen-invincible',
			name: 'Invincible',
			description:
				"You always count as having 2-armour. This doesn't stack with other protection.",
		},
		{
			id: 'chosen-resilience',
			name: 'Resilience',
			description:
				"You heal faster than normal people. Any time your harm gets healed, heal an extra point. Additionally, your wounds count as 1-harm less for the purpose of the Keeper's harm moves.",
		},
	],
	pickMovesCount: 1,

	startingGearOptions: [
		{
			label: 'Protective gear',
			pickCount: 1,
			options: ['Protective gear worth 1-armour'],
		},
	],

	improvements: [
		{
			id: 'chosen-imp-charm',
			label: 'Get +1 Charm, max +3',
			isAdvanced: false,
			type: 'rating-boost',
			rating: 'charm',
			maxValue: 3,
		},
		{
			id: 'chosen-imp-cool',
			label: 'Get +1 Cool, max +3',
			isAdvanced: false,
			type: 'rating-boost',
			rating: 'cool',
			maxValue: 3,
		},
		{
			id: 'chosen-imp-sharp',
			label: 'Get +1 Sharp, max +3',
			isAdvanced: false,
			type: 'rating-boost',
			rating: 'sharp',
			maxValue: 3,
		},
		{
			id: 'chosen-imp-tough',
			label: 'Get +1 Tough, max +3',
			isAdvanced: false,
			type: 'rating-boost',
			rating: 'tough',
			maxValue: 3,
		},
		{
			id: 'chosen-imp-weird',
			label: 'Get +1 Weird, max +3',
			isAdvanced: false,
			type: 'rating-boost',
			rating: 'weird',
			maxValue: 3,
		},
		{
			id: 'chosen-imp-move1',
			label: 'Take another Chosen move',
			isAdvanced: false,
			type: 'playbook-move',
		},
		{
			id: 'chosen-imp-move2',
			label: 'Take another Chosen move',
			isAdvanced: false,
			type: 'playbook-move',
		},
		{
			id: 'chosen-imp-cross1',
			label: 'Take a move from another playbook',
			isAdvanced: false,
			type: 'cross-playbook-move',
		},
		{
			id: 'chosen-imp-cross2',
			label: 'Take a move from another playbook',
			isAdvanced: false,
			type: 'cross-playbook-move',
		},
		{
			id: 'chosen-imp-ally',
			label: 'Gain an ally',
			isAdvanced: false,
			type: 'gain-ally',
		},
	],

	advancedImprovements: [
		{
			id: 'chosen-adv-stat',
			label: 'Get +1 to any rating, max +3',
			isAdvanced: true,
			type: 'rating-boost',
			rating: 'any',
			maxValue: 3,
		},
		{
			id: 'chosen-adv-luck',
			label: 'Get back one used Luck point',
			isAdvanced: true,
			type: 'luck-recovery',
		},
		{
			id: 'chosen-adv-change',
			label: 'Change this hunter to a new type',
			isAdvanced: true,
			type: 'change-playbook',
		},
		{
			id: 'chosen-adv-second',
			label: 'Create a second hunter to play as well as this one',
			isAdvanced: true,
			type: 'second-hunter',
		},
		{
			id: 'chosen-adv-advanced1',
			label: 'Mark two of the basic moves as advanced',
			isAdvanced: true,
			type: 'advanced-moves',
		},
		{
			id: 'chosen-adv-advanced2',
			label: 'Mark another two of the basic moves as advanced',
			isAdvanced: true,
			type: 'advanced-moves',
		},
		{
			id: 'chosen-adv-retire',
			label: 'Retire this hunter to safety',
			isAdvanced: true,
			type: 'retire',
		},
		{
			id: 'chosen-adv-doom',
			label:
				'Delete one of your Doom tags, and (optionally) one of your Heroic tags. You have changed that aspect of your destiny.',
			isAdvanced: true,
			type: 'playbook-specific',
		},
	],

	customSections: [
		{
			type: 'builder',
			key: 'fate',
			title: 'Your Fate',
			description:
				'You get to decide what sort of fate is in store for you. Pick how you found out about your fate on the reverse side of this sheet.',
			steps: [
				{
					label: 'How You Found Out (pick one)',
					pickCount: 1,
					options: [
						{ label: 'Nightmares and visions' },
						{ label: 'Some weirdo told you' },
						{ label: 'An ancient cult found you' },
						{ label: 'Sought out by your nemesis' },
						{ label: 'Attacked by monsters' },
						{ label: 'Trained from birth' },
						{ label: 'You found the prophecy' },
					],
				},
				{
					label: 'Heroic (pick two)',
					pickCount: 2,
					options: [
						{ label: 'Sacrifice' },
						{ label: 'You are the Champion' },
						{ label: 'Visions' },
						{ label: 'Secret training' },
						{ label: 'Magical powers' },
						{ label: 'Mystical inheritance' },
						{ label: 'A normal life' },
						{ label: 'True love' },
						{ label: 'You can save the world' },
						{ label: 'Hidden allies' },
						{ label: 'The end of monsters' },
						{ label: 'Divine help' },
					],
				},
				{
					label: 'Doom (pick two)',
					pickCount: 2,
					options: [
						{ label: 'Death' },
						{ label: "You can't save everyone" },
						{ label: 'Impossible love' },
						{ label: 'Failure' },
						{ label: 'A nemesis' },
						{ label: 'No normal life' },
						{ label: 'Loss of loved ones' },
						{ label: 'Treachery' },
						{ label: 'Doubt' },
						{ label: 'Sympathy with the enemy' },
						{ label: 'Damnation' },
						{ label: 'Hosts of monsters' },
						{ label: 'The end of days' },
						{ label: 'The source of Evil' },
					],
				},
			],
		},
		{
			type: 'builder',
			key: 'special-weapon',
			title: 'Your Special Weapon',
			description:
				'Design your weapon by choosing a form and three business-end options (which are added to the base tags), and a material.',
			steps: [
				{
					label: 'Form (choose 1)',
					pickCount: 1,
					options: [
						{
							label: 'Staff',
							description: '1-harm hand/close',
							effects: { harm: 1, ranges: ['hand', 'close'] },
						},
						{
							label: 'Haft',
							description: '2-harm hand heavy',
							effects: { harm: 2, ranges: ['hand'], tags: ['heavy'] },
						},
						{
							label: 'Handle',
							description: '1-harm hand balanced',
							effects: { harm: 1, ranges: ['hand'], tags: ['balanced'] },
						},
						{
							label: 'Chain',
							description: '1-harm hand area',
							effects: { harm: 1, ranges: ['hand'], tags: ['area'] },
						},
					],
				},
				{
					label: 'Business-end (choose 3)',
					pickCount: 3,
					options: [
						{
							label: 'Artifact',
							description: 'Add the "magic" tag',
							effects: { tags: ['magic'] },
						},
						{
							label: 'Spikes',
							description: '+1 harm, add the "messy" tag',
							effects: { harm: 1, tags: ['messy'] },
						},
						{
							label: 'Blade',
							description: '+1 harm',
							effects: { harm: 1 },
						},
						{
							label: 'Heavy',
							description: '+1 harm',
							effects: { harm: 1 },
						},
						{
							label: 'Long',
							description: 'Add the "close" tag',
							effects: { tags: ['close'] },
						},
						{
							label: 'Throwable',
							description: 'Add the "close" tag',
							effects: { tags: ['close'] },
						},
						{
							label: 'Chain',
							description: 'Add the "area" tag',
							effects: { tags: ['area'] },
						},
					],
				},
				{
					label: 'Material (choose 1)',
					pickCount: 1,
					options: [
						{ label: 'Steel' },
						{ label: 'Cold iron' },
						{ label: 'Silver' },
						{ label: 'Wood' },
						{ label: 'Stone' },
						{ label: 'Bone' },
						{ label: 'Teeth' },
						{ label: 'Obsidian' },
					],
				},
			],
		},
	],

	historyOptions: [
		'You are close blood relations. Ask them exactly how close.',
		'They are destined to be your mentor. Tell them how this was revealed.',
		'Your best friend in the world, who you trust totally.',
		'A rival at first, but you came to a working arrangement.',
		'Romantic entanglement, or fated to be romantically entangled.',
		'Just friends, from school or work or something. Ask them what.',
		'They could have been the Chosen One instead of you, but they failed some trial. Tell them how they failed.',
		"You saved their life, back when they didn't know monsters were real. Tell them what you saved them from.",
	],
};
