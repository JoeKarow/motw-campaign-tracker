import type { PlaybookDefinition } from './types';

export const sidekick: PlaybookDefinition = {
	id: 'sidekick',
	displayName: 'The Sidekick',
	description:
		"I don't know much about the occult or monsters, or this whole deal. But I found a Hero. Someone better than me. They need a hand now and then, to do the heroic stuff. Someday, maybe, I can be a big damn hero too. You also get +1 to your hero's best rating.",
	luckSpecial:
		"Whenever you spend a Luck point, you'll get a chance to do something heroic.",

	ratingLines: [
		{ charm: 1, cool: 1, sharp: 0, tough: -1, weird: 1 },
		{ charm: 1, cool: 1, sharp: 1, tough: -1, weird: 0 },
		{ charm: 1, cool: 0, sharp: 1, tough: -1, weird: 1 },
		{ charm: 0, cool: 1, sharp: 1, tough: -1, weird: 1 },
		{ charm: 1, cool: 0, sharp: 1, tough: 1, weird: -1 },
	],

	looks: [],

	mandatoryMoves: [
		{
			id: 'sidekick-no-i-in-team',
			name: 'There\'s no "I" in "team"',
			description:
				"You get +1 on all help out rolls, or +2 if it's for your hero.",
		},
	],

	optionalMoves: [
		{
			id: 'sidekick-caddy',
			name: 'Caddy',
			description:
				"You carry all your hero's stuff around. That means you can use anything from their gear list, unless they are currently holding it. If it's something that there would be a bunch of, or some spares, you can use it even if they are.",
		},
		{
			id: 'sidekick-as-you-wish',
			name: 'As You Wish',
			description:
				"Mark experience whenever your hero gives orders or requests that you don't want to do, and you go ahead and do it anyway.",
		},
		{
			id: 'sidekick-eek',
			name: 'Eek!',
			description:
				"When a monster (or anyone really) appears on the scene and you find a hiding spot, roll +Sharp. On a 10+, you hide in the best nearby spot before the monster sees you. On a 7-9, pick one of these: You hide okay, but the monster is now between you and escape; You hide okay for now, but your hiding spot is bound to be spotted soon; You hide okay, but leave something important out in the open.",
			rollType: 'SHARP',
		},
		{
			id: 'sidekick-bodyguard',
			name: 'Bodyguard',
			description:
				'If something bad is going to happen to your hero, your comrades, or a bystander, and you are right there, you may throw yourself in harm\'s way. Whatever was going to happen to them happens to you instead, and you mark experience.',
		},
		{
			id: 'sidekick-me-too',
			name: 'Me Too!',
			description:
				"If your hero makes a roll for a move, and you copy what they did, making the same move, you may choose not to roll. Instead, use your hero's die roll (but adjusted with your own rating).",
		},
		{
			id: 'sidekick-i-can-make-you-look-good',
			name: 'I Can Make You Look Good',
			description:
				"If you are helping out your hero, you may swap one or both your dice with theirs, as long as you come out with the lowest total. Calculate your results as if you had each rolled the dice you now have in front of you.",
		},
		{
			id: 'sidekick-apprentice',
			name: 'Apprentice',
			description: 'Take a move that your hero has.',
		},
	],
	pickMovesCount: 2,

	startingGearOptions: [
		{
			label: 'Hero item',
			pickCount: 1,
			options: ['_____ (pick one item from your hero\'s gear options)'],
		},
		{
			label: 'Sidekick weapons',
			pickCount: 1,
			options: [
				{ name: 'Handgun', harm: 2, ranges: ['close'], tags: ['reload', 'loud'] },
				{ name: 'Shotgun', harm: 3, ranges: ['close'], tags: ['messy'] },
				{ name: 'Baseball bat', harm: 2, ranges: ['hand'], tags: [] },
				{ name: 'Stun gun', harm: 1, ranges: ['hand'], tags: ['stun'] },
				{ name: 'Big knife', harm: 1, ranges: ['hand'], tags: [] },
			],
		},
	],

	improvements: [
		{
			id: 'sidekick-imp-sharp',
			label: 'Get +1 Sharp, max +3',
			isAdvanced: false,
			type: 'rating-boost',
			rating: 'sharp',
			maxValue: 3,
		},
		{
			id: 'sidekick-imp-charm',
			label: 'Get +1 Charm, max +3',
			isAdvanced: false,
			type: 'rating-boost',
			rating: 'charm',
			maxValue: 3,
		},
		{
			id: 'sidekick-imp-cool',
			label: 'Get +1 Cool, max +2',
			isAdvanced: false,
			type: 'rating-boost',
			rating: 'cool',
			maxValue: 2,
		},
		{
			id: 'sidekick-imp-tough',
			label: 'Get +1 Tough, max +2',
			isAdvanced: false,
			type: 'rating-boost',
			rating: 'tough',
			maxValue: 2,
		},
		{
			id: 'sidekick-imp-move1',
			label: 'Take another Sidekick move',
			isAdvanced: false,
			type: 'playbook-move',
		},
		{
			id: 'sidekick-imp-move2',
			label: 'Take another Sidekick move',
			isAdvanced: false,
			type: 'playbook-move',
		},
		{
			id: 'sidekick-imp-ally',
			label: 'Gain an ally: another sidekick for your hero, but junior to you',
			isAdvanced: false,
			type: 'gain-ally',
		},
		{
			id: 'sidekick-imp-change-to-hero',
			label:
				"Change playbooks to be the same as your hero. This overrides the general rule that only one of each playbook may be in use.",
			isAdvanced: false,
			type: 'playbook-specific',
		},
		{
			id: 'sidekick-imp-cross1',
			label: 'Take a move from another playbook',
			isAdvanced: false,
			type: 'cross-playbook-move',
		},
		{
			id: 'sidekick-imp-cross2',
			label: 'Take a move from another playbook',
			isAdvanced: false,
			type: 'cross-playbook-move',
		},
	],

	advancedImprovements: [
		{
			id: 'sidekick-adv-stat',
			label: 'Get +1 to any rating, max +3',
			isAdvanced: true,
			type: 'rating-boost',
			rating: 'any',
			maxValue: 3,
		},
		{
			id: 'sidekick-adv-change',
			label: 'Change this hunter to a new type',
			isAdvanced: true,
			type: 'change-playbook',
		},
		{
			id: 'sidekick-adv-second',
			label: 'Create a second hunter to play as well as this one',
			isAdvanced: true,
			type: 'second-hunter',
		},
		{
			id: 'sidekick-adv-advanced1',
			label: 'Mark two of the basic moves as advanced',
			isAdvanced: true,
			type: 'advanced-moves',
		},
		{
			id: 'sidekick-adv-advanced2',
			label: 'Mark two of the basic moves as advanced',
			isAdvanced: true,
			type: 'advanced-moves',
		},
		{
			id: 'sidekick-adv-retire',
			label: 'Retire this hunter to safety',
			isAdvanced: true,
			type: 'retire',
		},
		{
			id: 'sidekick-adv-luck',
			label: 'Get back one used Luck point',
			isAdvanced: true,
			type: 'luck-recovery',
		},
		{
			id: 'sidekick-adv-new-hero',
			label:
				'Pick a new hero. All moves that mention your hero now apply to the new hero.',
			isAdvanced: true,
			type: 'playbook-specific',
		},
	],

	customSections: [
		{
			type: 'text-input',
			key: 'hero',
			title: 'Hero',
			description:
				"Pick one of the other hunters to be your hero. Check their playbook choices and copy at least one from each look category. You also get +1 to their highest rating.",
			fields: [
				{ label: 'Hero name', placeholder: 'Name of your hero' },
				{
					label: 'Look',
					placeholder: "Copy look choices from your hero's playbook",
				},
			],
		},
	],

	historyOptions: [
		'(For the hero) This hunter is your hero.',
		'This hunter makes you a bit jealous of their relationship with your hero.',
		'This hunter has been your friend for many years. Where did you meet?',
		'This hunter bonded with you after defeating a monster together, the first time you worked as a team. What was it?',
		'This hunter knew you back when you were a nobody. Tell them something about the person you used to be, something you\'re now ashamed of.',
		'This hunter introduced you to your hero.',
		'This hunter saved your life when you were distracted, so you owe them big time.',
		"This hunter's pretty great, they could have almost been your hero. Tell them why they're not quite as good.",
	],
};
