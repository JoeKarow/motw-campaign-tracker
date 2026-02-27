import type { PlaybookDefinition } from './types';

export const wronged: PlaybookDefinition = {
	id: 'wronged',
	displayName: 'The Wronged',
	description:
		"They took my loved ones. Back then I wasn't strong enough to fight, but I studied, trained, and now I'm ready to cleanse the world of their taint. I'll kill them all. That's all I have left.",
	luckSpecial:
		'When you spend a point of Luck, you find a dangerous lead on your prey.',

	ratingLines: [
		{ charm: 0, cool: 1, sharp: -1, tough: 2, weird: 1 },
		{ charm: 0, cool: 0, sharp: 1, tough: 2, weird: 0 },
		{ charm: 1, cool: 0, sharp: 1, tough: 2, weird: -1 },
		{ charm: -1, cool: -1, sharp: 0, tough: 2, weird: 2 },
		{ charm: 1, cool: -1, sharp: 0, tough: 2, weird: 1 },
	],

	looks: [
		{
			label: 'Eyes',
			options: [
				'Sad eyes',
				'icy eyes',
				'angry eyes',
				'untouchable eyes',
				'emotionless eyes',
				'hurt eyes',
				'harrowed eyes',
			],
			allowCustom: true,
		},
		{
			label: 'Clothes',
			options: [
				'Nondescript clothes',
				'ragged clothes',
				'casual clothes',
				'hunting gear',
				'army surplus gear',
				'old clothes',
			],
			allowCustom: true,
		},
	],

	mandatoryMoves: [
		{
			id: 'wronged-i-know-my-prey',
			name: 'I Know My Prey',
			description:
				'You get +1 ongoing when knowingly investigating, pursuing or fighting the breed of monster that caused your loss.',
		},
	],

	optionalMoves: [
		{
			id: 'wronged-berserk',
			name: 'Berserk',
			description:
				"No matter how much harm you take, you can always keep going until the current fight is over. During a fight, the Keeper may not use harm moves on you and you cannot die. When the fight ends, all harm takes effect as normal.",
		},
		{
			id: 'wronged-never-again',
			name: 'NEVER AGAIN',
			description:
				'In combat, you may choose to protect someone without rolling, as if you had rolled a 10+, but you may not choose to "suffer little harm."',
		},
		{
			id: 'wronged-what-does-not-kill-me',
			name: 'What Does Not Kill Me...',
			description:
				'If you have suffered harm in a fight, you gain +1 ongoing until the fight is over.',
		},
		{
			id: 'wronged-fervor',
			name: 'Fervor',
			description:
				'When you manipulate someone, roll +Tough instead of +Charm.',
			rollType: 'TOUGH',
		},
		{
			id: 'wronged-safety-first',
			name: 'Safety First',
			description:
				'You have jury-rigged extra protection into your gear, giving you +1 armour (maximum 2-armour).',
		},
		{
			id: 'wronged-diy-surgery',
			name: 'DIY Surgery',
			description:
				'When you do quick and dirty first aid on someone (including yourself), roll +Cool. On a 10+ it\'s all good, it counts as normal first aid, plus stabilize the injury and heal 1 harm. On a 7-9 it counts as normal first aid, plus one of these, your choice: Stabilise the injury but the patient takes -1 forward; Heal 1-harm and stabilise for now, but it will return as 2-harm and become unstable again later; Heal 1-harm and stabilise but the patient takes -1 ongoing until it\'s fixed properly.',
			rollType: 'COOL',
		},
		{
			id: 'wronged-tools-matter',
			name: 'Tools Matter',
			description:
				'With your signature weapon (see your gear, below), you get +1 to kick some ass.',
		},
	],
	pickMovesCount: 2,

	startingGearOptions: [
		{
			label: 'Signature weapon (pick one)',
			pickCount: 1,
			options: [
				{
					name: 'Sawn-off shotgun',
					harm: 3,
					ranges: ['hand', 'close'],
					tags: ['messy', 'loud', 'reload'],
				},
				{
					name: 'Hand cannon',
					harm: 3,
					ranges: ['close'],
					tags: ['loud'],
				},
				{
					name: 'Fighting knife',
					harm: 2,
					ranges: ['hand'],
					tags: ['quiet'],
				},
				{
					name: 'Huge sword or huge axe',
					harm: 3,
					ranges: ['hand'],
					tags: ['messy', 'heavy'],
				},
				'Specialist weapons for destroying your foes (4-harm against the specific creatures it targets, 1-harm otherwise, other tags by agreement with the Keeper)',
				{
					name: 'Enchanted dagger',
					harm: 2,
					ranges: ['hand'],
					tags: ['magic'],
				},
				{
					name: 'Chainsaw',
					harm: 3,
					ranges: ['hand'],
					tags: ['messy', 'unreliable', 'loud', 'heavy'],
				},
			],
		},
		{
			label: 'Practical weapons (pick two)',
			pickCount: 2,
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
				{
					name: 'Brass knuckles',
					harm: 1,
					ranges: ['hand'],
					tags: ['stealthy'],
				},
				{
					name: 'Assault rifle',
					harm: 3,
					ranges: ['close'],
					tags: ['area', 'loud', 'reload'],
				},
			],
		},
		{
			label: 'Protection and transport',
			pickCount: 1,
			options: [
				'Protective wear, suited to your look, worth 1-armour',
			],
		},
	],

	improvements: [
		{
			id: 'wronged-imp-tough',
			label: 'Get +1 Tough, max +3',
			isAdvanced: false,
			type: 'rating-boost',
			rating: 'tough',
			maxValue: 3,
		},
		{
			id: 'wronged-imp-cool',
			label: 'Get +1 Cool, max +2',
			isAdvanced: false,
			type: 'rating-boost',
			rating: 'cool',
			maxValue: 2,
		},
		{
			id: 'wronged-imp-sharp',
			label: 'Get +1 Sharp, max +2',
			isAdvanced: false,
			type: 'rating-boost',
			rating: 'sharp',
			maxValue: 2,
		},
		{
			id: 'wronged-imp-weird',
			label: 'Get +1 Weird, max +2',
			isAdvanced: false,
			type: 'rating-boost',
			rating: 'weird',
			maxValue: 2,
		},
		{
			id: 'wronged-imp-move1',
			label: 'Take another Wronged move',
			isAdvanced: false,
			type: 'playbook-move',
		},
		{
			id: 'wronged-imp-move2',
			label: 'Take another Wronged move',
			isAdvanced: false,
			type: 'playbook-move',
		},
		{
			id: 'wronged-imp-haven1',
			label: 'Gain a haven, like the Expert has, with two options',
			isAdvanced: false,
			type: 'haven-option',
		},
		{
			id: 'wronged-imp-haven2',
			label: 'Add one more option to your haven',
			isAdvanced: false,
			type: 'haven-option',
		},
		{
			id: 'wronged-imp-cross1',
			label: 'Take a move from another playbook',
			isAdvanced: false,
			type: 'cross-playbook-move',
		},
		{
			id: 'wronged-imp-cross2',
			label: 'Take a move from another playbook',
			isAdvanced: false,
			type: 'cross-playbook-move',
		},
	],

	advancedImprovements: [
		{
			id: 'wronged-adv-stat',
			label: 'Get +1 to any rating, max +3',
			isAdvanced: true,
			type: 'rating-boost',
			rating: 'any',
			maxValue: 3,
		},
		{
			id: 'wronged-adv-change',
			label: 'Change this hunter to a new type',
			isAdvanced: true,
			type: 'change-playbook',
		},
		{
			id: 'wronged-adv-second',
			label: 'Create a second hunter to play as well as this one',
			isAdvanced: true,
			type: 'second-hunter',
		},
		{
			id: 'wronged-adv-advanced1',
			label: 'Mark two of the basic moves as advanced',
			isAdvanced: true,
			type: 'advanced-moves',
		},
		{
			id: 'wronged-adv-advanced2',
			label: 'Mark two of the basic moves as advanced',
			isAdvanced: true,
			type: 'advanced-moves',
		},
		{
			id: 'wronged-adv-retire',
			label: 'Retire this hunter to safety',
			isAdvanced: true,
			type: 'retire',
		},
		{
			id: 'wronged-adv-track-down',
			label:
				'You track down the specific monster(s) responsible for your loss. The Keeper must make the next mystery about them.',
			isAdvanced: true,
			type: 'playbook-specific',
		},
		{
			id: 'wronged-adv-change-target',
			label:
				'Change the target of your vengeful rage. Pick a new monster breed: I know my prey now applies to them instead.',
			isAdvanced: true,
			type: 'playbook-specific',
		},
		{
			id: 'wronged-adv-luck',
			label: 'Get back one used Luck point',
			isAdvanced: true,
			type: 'luck-recovery',
		},
	],

	customSections: [
		{
			type: 'pick',
			key: 'who-you-lost',
			title: 'Who You Lost',
			description: 'Who did you lose? Pick one or more of:',
			pickCount: 1,
			options: [
				{ label: 'Your parent(s)', hasTextInput: true },
				{ label: 'Your sibling(s)', hasTextInput: true },
				{ label: 'Your spouse/partner', hasTextInput: true },
				{ label: 'Your child(ren)', hasTextInput: true },
				{ label: 'Your best friend(s)', hasTextInput: true },
			],
		},
		{
			type: 'text-input',
			key: 'what-did-it',
			title: 'What Did It?',
			description:
				"With the Keeper's agreement, pick the monster breed.",
			fields: [
				{
					label: 'My prey',
					placeholder: 'Name the monster breed',
				},
			],
		},
		{
			type: 'pick',
			key: 'why-you-couldnt-save-them',
			title: "Why couldn't you save them?",
			description: 'You were (pick one or more):',
			pickCount: 1,
			options: [
				{ label: 'At fault' },
				{ label: 'Selfish' },
				{ label: 'Injured' },
				{ label: 'Weak' },
				{ label: 'Slow' },
				{ label: 'Scared' },
				{ label: 'In denial' },
				{ label: 'Complicit' },
			],
		},
	],

	historyOptions: [
		'They helped you at a critical point in your quest for revenge. Tell them what you needed help with.',
		'They stood between you and what you needed to find out. Ask them why.',
		'They also lost a friend or relative to these monsters. Ask them who it was.',
		'Relations, close or distant. Tell them exactly what.',
		"You saved their life, back when they were a pathetic newbie hunter. Ask them what you saved them from.",
		'You respect their hard-earned knowledge, and often come to them for advice.',
		'They showed you the ropes when you were learning how to fight.',
		'They saw you absolutely lose it and go berserk. Tell them what the situation was, and ask them how much collateral damage you caused.',
	],
};
