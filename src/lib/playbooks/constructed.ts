import type { PlaybookDefinition } from './types';

export const constructed: PlaybookDefinition = {
	id: 'constructed',
	displayName: 'The Constructed',
	description:
		'I am not alive, yet I live. My body is not of flesh, yet I move. I have no heart, yet I feel. I have no brain, yet I think and have purpose. I have the will to fulfill that purpose.',
	luckSpecial:
		'Whenever you spend a Luck point, soon your animating force will malfunction a bit.',
	harmBoxes: 10,
	canBecomeUnstable: false,

	ratingLines: [
		{ charm: -1, cool: 2, sharp: -1, tough: 2, weird: 0 },
		{ charm: 0, cool: 1, sharp: -1, tough: 2, weird: 1 },
		{ charm: -1, cool: 2, sharp: 0, tough: 2, weird: -1 },
		{ charm: -1, cool: -1, sharp: 0, tough: 2, weird: 2 },
		{ charm: -1, cool: 1, sharp: 1, tough: 2, weird: 0 },
	],

	looks: [
		{
			label: 'Shape',
			options: [
				'Man-shaped',
				'woman-shaped',
				'monstrous-shaped',
				'neuter-shaped',
			],
			allowCustom: true,
		},
		{
			label: 'Material',
			options: [
				'Clay body',
				'wood body',
				'stone body',
				'metal body',
				'plastic body',
				'robotic body',
			],
			allowCustom: true,
		},
		{
			label: 'Clothes',
			options: [
				'Trench-coat and hat',
				'toga',
				'servant\'s livery',
				'lab coat',
				'hooded cloak',
				'work clothes',
				'casual wear',
				'fine clothes',
				'naked',
			],
			allowCustom: true,
		},
	],

	mandatoryMoves: [
		{
			id: 'constructed-inhuman',
			name: 'Inhuman',
			description:
				"You have a hard time understanding human behavior, mannerisms, and emotions. When making move relying on social intelligence, take -1. People don't get you either, so other hunters suffer a -1 if they try to manipulate you. You also get 10 harm boxes instead of 7, and do not become unstable due to damage.",
		},
		{
			id: 'constructed-recharge',
			name: 'Recharge',
			description:
				"You may repair yourself by immersing yourself into a source of your animating force, but it's dangerous. Roll +Weird. On a 10+, heal 3-harm. On a 7-9, heal 2-harm. On a 6 or less, the energy overwhelms you, which never ends well.",
			rollType: 'WEIRD',
		},
	],

	optionalMoves: [
		{
			id: 'constructed-detachable-parts',
			name: 'Detachable Parts',
			description:
				'You may detach one or more of your body parts. They act as an ally: subordinate (motivation: to follow your exact instructions). Each is able to move and sense in some way.',
		},
		{
			id: 'constructed-mystic-focus',
			name: 'Mystic Focus',
			description:
				'Your body acts as a magical focus and can count as a requirement for use magic or big magic.',
		},
		{
			id: 'constructed-awaken-object',
			name: 'Awaken Object',
			description:
				'Share your animating force with another object within close range to treat it as an extension of yourself. When you animate an object, roll +Weird. On a 10+, you control the object like a part of yourself and gain +1 ongoing for rolls you make with it. On a 7-9, you control the object like a part of yourself. On a miss, suffer harm as you lose that essence.',
			rollType: 'WEIRD',
		},
		{
			id: 'constructed-hide-in-plain-sight',
			name: 'Hide In Plain Sight',
			description:
				'If you hold still, you appear to be a statue. Nobody will pay any special attention to you.',
		},
		{
			id: 'constructed-but-why',
			name: 'But Why?',
			description:
				'Your struggles to understand people can reveal more than they mean to. Always take one extra hold when you investigate a mystery or read a bad situation by talking to someone.',
		},
	],
	pickMovesCount: 1,

	startingGearOptions: [
		{
			label: 'Large weapons (pick one)',
			pickCount: 1,
			options: [
				{ name: 'Sledgehammer', harm: 3, ranges: ['hand'], tags: ['heavy', 'messy'] },
				{ name: 'Big sword', harm: 3, ranges: ['hand'], tags: ['heavy', 'messy'] },
				{ name: 'Huge handgun', harm: 3, ranges: ['close'], tags: ['loud', 'reload'] },
				{ name: 'Poleaxe', harm: 3, ranges: ['hand', 'close'], tags: ['messy'] },
			],
		},
		{
			label: 'Your body (pick two)',
			pickCount: 2,
			options: [
				{ name: 'Fists', harm: 2, ranges: ['hand'], tags: ['forceful'] },
				{ name: 'Energy blast', harm: 2, ranges: ['close'], tags: ['animating-force'] },
				{ name: 'Wrestle', harm: 1, ranges: ['intimate', 'hand'], tags: ['restraining'] },
				{
					name: 'Energy pulse',
					harm: 1,
					ranges: ['close'],
					tags: ['area', 'animating-force'],
				},
				'Bulwark (1-armour)',
			],
		},
	],

	improvements: [
		{
			id: 'constructed-imp-tough',
			label: 'Get +1 Tough, max +3',
			isAdvanced: false,
			type: 'rating-boost',
			rating: 'tough',
			maxValue: 3,
		},
		{
			id: 'constructed-imp-cool',
			label: 'Get +1 Cool, max +3',
			isAdvanced: false,
			type: 'rating-boost',
			rating: 'cool',
			maxValue: 3,
		},
		{
			id: 'constructed-imp-sharp',
			label: 'Get +1 Sharp, max +2',
			isAdvanced: false,
			type: 'rating-boost',
			rating: 'sharp',
			maxValue: 2,
		},
		{
			id: 'constructed-imp-weird',
			label: 'Get +1 Weird, max +2',
			isAdvanced: false,
			type: 'rating-boost',
			rating: 'weird',
			maxValue: 2,
		},
		{
			id: 'constructed-imp-move1',
			label: 'Take another Constructed move',
			isAdvanced: false,
			type: 'playbook-move',
		},
		{
			id: 'constructed-imp-move2',
			label: 'Take another Constructed move',
			isAdvanced: false,
			type: 'playbook-move',
		},
		{
			id: 'constructed-imp-ally',
			label: 'Gain an ally: you make a friend (literally)',
			isAdvanced: false,
			type: 'gain-ally',
		},
		{
			id: 'constructed-imp-animating-force',
			label: 'Adjust your needs: mark a second animating force',
			isAdvanced: false,
			type: 'playbook-specific',
		},
		{
			id: 'constructed-imp-cross1',
			label: 'Take a move from another playbook',
			isAdvanced: false,
			type: 'cross-playbook-move',
		},
		{
			id: 'constructed-imp-cross2',
			label: 'Take a move from another playbook',
			isAdvanced: false,
			type: 'cross-playbook-move',
		},
	],

	advancedImprovements: [
		{
			id: 'constructed-adv-stat',
			label: 'Get +1 to any rating, max +3',
			isAdvanced: true,
			type: 'rating-boost',
			rating: 'any',
			maxValue: 3,
		},
		{
			id: 'constructed-adv-become-human',
			label: 'Become human, and change to a new type',
			isAdvanced: true,
			type: 'playbook-specific',
		},
		{
			id: 'constructed-adv-change',
			label: 'Change this hunter to a new type',
			isAdvanced: true,
			type: 'change-playbook',
		},
		{
			id: 'constructed-adv-second',
			label: 'Create a second hunter to play as well as this one',
			isAdvanced: true,
			type: 'second-hunter',
		},
		{
			id: 'constructed-adv-advanced1',
			label: 'Mark two of the basic moves as advanced',
			isAdvanced: true,
			type: 'advanced-moves',
		},
		{
			id: 'constructed-adv-advanced2',
			label: 'Mark two of the basic moves as advanced',
			isAdvanced: true,
			type: 'advanced-moves',
		},
		{
			id: 'constructed-adv-retire',
			label: 'Retire this hunter to safety',
			isAdvanced: true,
			type: 'retire',
		},
		{
			id: 'constructed-adv-luck',
			label: 'Erase one used luck mark from your playbook',
			isAdvanced: true,
			type: 'luck-recovery',
		},
	],

	customSections: [
		{
			type: 'pick',
			key: 'animating-force',
			title: 'Animating Force',
			description:
				'There is a force that gives you life, which cannot harm you naturally. You do not eat, breathe, drink, or heal naturally. Instead, repair yourself with your recharge move. Pick an energy type:',
			pickCount: 1,
			options: [
				{ label: 'Lightning' },
				{ label: 'Fire' },
				{ label: 'Music' },
				{ label: 'Clockwork' },
				{ label: 'Orgone' },
				{ label: 'Alchemy' },
				{ label: 'Thought' },
				{ label: 'Aether' },
				{ label: '', hasTextInput: true },
			],
		},
		{
			type: 'pick',
			key: 'purpose',
			title: 'Purpose',
			description: 'You were created to serve a specific function, pick one:',
			pickCount: 1,
			options: [
				{ label: 'Weapon', description: 'All your attacks do +1 harm.' },
				{ label: 'Guardian', description: 'You get +1 when you protect someone.' },
				{ label: 'Assistant', description: 'You give a +2 bonus when helping out.' },
				{ label: 'Experiment', description: 'Take a move from another playbook.' },
			],
		},
		{
			type: 'pick',
			key: 'why-free',
			title: 'Why are you no longer serving that function?',
			description:
				'Your history options overlap with these, so check those to help you decide. Pick one:',
			pickCount: 1,
			options: [
				{ label: 'Your creator died.' },
				{ label: 'Your creator set you free (Why?)' },
				{ label: 'Your creator discarded you as a failure.' },
				{ label: 'You were buried for many years (Who found you?)' },
				{ label: 'You killed your creator (What did they do?)' },
				{ label: 'You ran away.' },
				{ label: 'You were lost in the war (Who were you fighting?)' },
				{ label: 'You were broken but now restored (Who fixed you?)' },
			],
		},
	],

	historyOptions: [
		'This hunter is your creator. Tell them how you feel about them.',
		'This hunter is the first one who treated you like a person instead of a thing. Ask them what you did that made them think of you that way.',
		'This hunter is still afraid of you. Work out with them why that is.',
		'This hunter treats you like pet, fondly but dismissively. Ask them why.',
		'This hunter is a good friend. Tell them if it\'s from way back, or recently.',
		'This hunter makes you a bit suspicious. What makes you feel that way?',
		'This hunter thought you were a monster and tried to kill you. Figure out why you are now friends.',
		'This hunter has known you since they were little. Ask them what is the nature of your relationship is.',
	],
};
