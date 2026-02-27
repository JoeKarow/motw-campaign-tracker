import type { PlaybookDefinition } from './types';

export const mundane: PlaybookDefinition = {
	id: 'mundane',
	displayName: 'The Mundane',
	description:
		'You heard about how monsters only pick on people with crazy powers who can fight back on even terms? Yeah, me neither. But, hell, I ended up in this monster-hunting team so I gotta do what I can, right?',
	luckSpecial:
		"When you spend a point of Luck, you'll find something weird—maybe even useful!",

	ratingLines: [
		{ charm: 2, cool: 1, sharp: 0, tough: 1, weird: -1 },
		{ charm: 2, cool: -1, sharp: 1, tough: 1, weird: 0 },
		{ charm: 2, cool: 0, sharp: -1, tough: 1, weird: 1 },
		{ charm: 2, cool: 0, sharp: 1, tough: 1, weird: -1 },
		{ charm: 2, cool: 1, sharp: 1, tough: 0, weird: -1 },
	],

	looks: [
		{
			label: 'Body',
			options: ['Kid', 'teen', 'adult', 'old'],
			allowCustom: true,
		},
		{
			label: 'Face',
			options: [
				'Friendly face',
				'alluring face',
				'laughing face',
				'trustworthy face',
				'average face',
				'serious face',
				'sensual face',
			],
			allowCustom: true,
		},
		{
			label: 'Clothes',
			options: [
				'Normal clothes',
				'casual clothes',
				'goth clothes',
				'sporty clothes',
				'work clothes',
				'street clothes',
				'nerdy clothes',
			],
			allowCustom: true,
		},
	],

	mandatoryMoves: [],

	optionalMoves: [
		{
			id: 'mundane-always-the-victim',
			name: 'Always The Victim',
			description:
				'When another hunter uses protect someone to protect you, they mark experience. Whenever a monster captures you, you mark experience.',
		},
		{
			id: 'mundane-oops',
			name: 'Oops!',
			description:
				'If you want to stumble across something important, tell the Keeper. You will find something important and useful, although not necessarily related to your immediate problems.',
		},
		{
			id: 'mundane-lets-get-out-of-here',
			name: "Let's Get Out Of Here!",
			description:
				'If you can protect someone by telling them what to do, or by leading them out, roll +Charm instead of +Tough.',
			rollType: 'CHARM',
		},
		{
			id: 'mundane-panic-button',
			name: 'Panic Button',
			description:
				"When you need to escape, name the route you'll try and roll +Sharp. On a 10+ you're out of danger, no problem. On a 7-9 you can go or stay, but if you go it's going to cost you (leave something behind or something comes with you). On a miss, you are caught halfway out.",
			rollType: 'SHARP',
		},
		{
			id: 'mundane-the-power-of-heart',
			name: 'The Power of Heart',
			description:
				"When fighting a monster, if you help someone, don't roll +Cool. You automatically help as though you'd rolled a 10.",
		},
		{
			id: 'mundane-trust-me',
			name: 'Trust Me',
			description:
				'When you tell a normal person the truth in order to protect them from danger, roll +Charm. On a 10+ they\'ll do what you say they should, no questions asked. On a 7-9 they do it, but the Keeper chooses one from: They ask you a hard question first; They stall and dither a while; They have a "better" idea. On a miss, they\'re going to think you\'re crazy and maybe dangerous too.',
			rollType: 'CHARM',
		},
		{
			id: 'mundane-what-could-go-wrong',
			name: 'What Could Go Wrong?',
			description:
				'Whenever you charge into immediate danger without hedging your bets, hold 2. You may spend your hold to: Inflict +1 harm; Reduce someone\'s harm suffered by 1; Take +2 forward on an act under pressure roll.',
		},
		{
			id: 'mundane-dont-worry-ill-check-it-out',
			name: "Don't Worry, I'll Check It Out",
			description:
				'Whenever you go off by yourself to check out somewhere (or something) scary, mark experience.',
		},
	],
	pickMovesCount: 3,

	startingGearOptions: [
		{
			label: 'Mundane weapons',
			pickCount: 2,
			options: [
				{
					name: 'Golf club, baseball bat, cricket bat, or hockey stick',
					harm: 2,
					ranges: ['hand'],
					tags: ['innocuous', 'messy'],
				},
				{
					name: 'Pocket knife or multitool',
					harm: 1,
					ranges: ['hand'],
					tags: ['useful', 'small'],
				},
				{
					name: 'Small handgun',
					harm: 2,
					ranges: ['close'],
					tags: ['loud', 'reload'],
				},
				{
					name: 'Hunting rifle',
					harm: 3,
					ranges: ['far'],
					tags: ['loud', 'reload'],
				},
				{
					name: 'Sledge-hammer or fire axe',
					harm: 3,
					ranges: ['hand'],
					tags: ['messy'],
				},
				{
					name: 'Nunchuks',
					harm: 2,
					ranges: ['hand'],
					tags: ['area'],
				},
			],
		},
		{
			label: 'Means of transport',
			pickCount: 1,
			options: [
				'Skateboard',
				'Bicycle',
				'Fairly new car in decent condition',
				'Classic car in terrible condition',
				'Motorcycle',
				'Van',
			],
		},
	],

	improvements: [
		{
			id: 'mundane-imp-charm',
			label: 'Get +1 Charm, max +3',
			isAdvanced: false,
			type: 'rating-boost',
			rating: 'charm',
			maxValue: 3,
		},
		{
			id: 'mundane-imp-cool',
			label: 'Get +1 Cool, max +2',
			isAdvanced: false,
			type: 'rating-boost',
			rating: 'cool',
			maxValue: 2,
		},
		{
			id: 'mundane-imp-sharp',
			label: 'Get +1 Sharp, max +2',
			isAdvanced: false,
			type: 'rating-boost',
			rating: 'sharp',
			maxValue: 2,
		},
		{
			id: 'mundane-imp-tough',
			label: 'Get +1 Tough, max +2',
			isAdvanced: false,
			type: 'rating-boost',
			rating: 'tough',
			maxValue: 2,
		},
		{
			id: 'mundane-imp-move1',
			label: 'Take another Mundane move',
			isAdvanced: false,
			type: 'playbook-move',
		},
		{
			id: 'mundane-imp-move2',
			label: 'Take another Mundane move',
			isAdvanced: false,
			type: 'playbook-move',
		},
		{
			id: 'mundane-imp-luck1',
			label: 'Get back one used Luck point',
			isAdvanced: false,
			type: 'luck-recovery',
		},
		{
			id: 'mundane-imp-luck2',
			label: 'Get back one used Luck point',
			isAdvanced: false,
			type: 'luck-recovery',
		},
		{
			id: 'mundane-imp-cross1',
			label: 'Take a move from another playbook',
			isAdvanced: false,
			type: 'cross-playbook-move',
		},
		{
			id: 'mundane-imp-cross2',
			label: 'Take a move from another playbook',
			isAdvanced: false,
			type: 'cross-playbook-move',
		},
	],

	advancedImprovements: [
		{
			id: 'mundane-adv-stat',
			label: 'Get +1 to any rating, max +3',
			isAdvanced: true,
			type: 'rating-boost',
			rating: 'any',
			maxValue: 3,
		},
		{
			id: 'mundane-adv-change',
			label: 'Change this hunter to a new type',
			isAdvanced: true,
			type: 'change-playbook',
		},
		{
			id: 'mundane-adv-second',
			label: 'Create a second hunter to play as well as this one',
			isAdvanced: true,
			type: 'second-hunter',
		},
		{
			id: 'mundane-adv-advanced1',
			label: 'Mark two of the basic moves as advanced',
			isAdvanced: true,
			type: 'advanced-moves',
		},
		{
			id: 'mundane-adv-advanced2',
			label: 'Mark two of the basic moves as advanced',
			isAdvanced: true,
			type: 'advanced-moves',
		},
		{
			id: 'mundane-adv-retire',
			label: 'Retire this hunter to safety',
			isAdvanced: true,
			type: 'retire',
		},
		{
			id: 'mundane-adv-luck1',
			label: 'Get back one used Luck point',
			isAdvanced: true,
			type: 'luck-recovery',
		},
		{
			id: 'mundane-adv-luck2',
			label: 'Get back one used Luck point',
			isAdvanced: true,
			type: 'luck-recovery',
		},
	],

	customSections: [],

	historyOptions: [
		"You are close relations. Tell them exactly how you're related.",
		"Initially rivals, you both now respect each other's talents.",
		"Romantically involved, or you just have a crush on them. Ask them which they prefer.",
		"They're your hero, exactly the kind of monster hunter you aspire to be. Tell them why you worship them.",
		"Good friends. Tell them if it's from way back, or recently.",
		"You're a bit suspicious of them (maybe due to their unnatural powers or something like that).",
		'They introduced you to the existence of monsters. Tell them how you feel about that.',
		'You saved their life from a monster due to an unlikely chain of events. Tell them what.',
	],
};
