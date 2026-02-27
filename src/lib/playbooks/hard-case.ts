import type { PlaybookDefinition } from './types';

export const hardCase: PlaybookDefinition = {
	id: 'hard-case',
	displayName: 'The Hard Case',
	description:
		"I've fought anything that you can fight, and won. Now I found monsters needing a beatdown, and there ain't nobody can give 'em the thrashing I can. Stand back, I got this.",
	luckSpecial:
		'When you spend a point of Luck, someone you fought in the past is going to turn up. Did you part as enemies or with respect?',

	ratingLines: [
		{ charm: -1, cool: 1, sharp: 1, tough: 2, weird: 0 },
		{ charm: 1, cool: 1, sharp: 0, tough: 2, weird: -1 },
		{ charm: 0, cool: 2, sharp: -1, tough: 2, weird: -1 },
		{ charm: 1, cool: 0, sharp: 1, tough: 2, weird: -1 },
		{ charm: -1, cool: 1, sharp: 0, tough: 2, weird: 1 },
	],

	looks: [
		{
			label: 'Scars',
			options: [
				'Horrific scarring',
				'huge scars',
				'burn scars',
				'talon scars',
				'bite scars',
				'ritual scarring',
				'_____ scars',
			],
			allowCustom: true,
		},
		{
			label: 'Clothes',
			options: [
				'Street wear',
				'tactical wear',
				'military wear',
				'bike leathers',
				'sharp suit',
				'utility wear',
				'jeans and t-shirt',
				'tracksuit',
			],
			allowCustom: true,
		},
	],

	mandatoryMoves: [
		{
			id: 'hard-case-furnace',
			name: 'Furnace',
			description:
				'You have a Fire track with 10 boxes. Mark 1 Fire for every harm you suffer, every time someone openly defies you, and every time a friend is hurt. If the track fills you do not gain more. You may spend 1 Fire to add +1-harm whenever you inflict harm, or take +1 to a kick some ass or protect someone move. If you erase any harm marks, clear half your Fire. Between mysteries, clear all Fire.',
		},
	],

	optionalMoves: [
		{
			id: 'hard-case-bodyguard',
			name: 'Bodyguard',
			description:
				'When you spend 1 Fire to protect someone, as well as +1 forward, you may protect them even if they are out of reach or the harm they are about to suffer would be unstoppable. Get an ally group of old colleagues: good at protecting people. Get the "concealed armour" gear pick.',
		},
		{
			id: 'hard-case-enforcer',
			name: 'Enforcer',
			description:
				'Spend 1 Fire to look so scary that it counts as a reason for manipulating someone. After you roll, if you terrify them, spend Fire 1-for-1 to increase your result. Gain an ally who can help with money, disguises, back you up, or get underworld gossip. Get the "bag of cash" gear pick.',
		},
		{
			id: 'hard-case-secret-martial-art',
			name: 'Secret Martial Art',
			description:
				"Spend Fire 1-for-1 to increase harm inflicted by your unarmed attacks. Your unarmed attacks gain 'ignore-armour'. Get an ally, a mentor or student: good in a fight or philosophical discussion. Get the \"ancient sword\" gear pick.",
		},
		{
			id: 'hard-case-military',
			name: 'Military',
			description:
				"When you're using military gear on a move, you may spend 2 Fire to boost the result level (a miss becomes a 7-9, 7-9 becomes 10+, or 10+ becomes 12+). You have an ally group, your old comrades: good in a fight and when you need help making preparations. Get the \"battered assault rifle\" gear pick.",
		},
		{
			id: 'hard-case-resistance',
			name: 'Resistance',
			description:
				'What was your cause? You have contacts amongst sympathetic activists. If it fits the cause, call on them. Roll +Charm. On a 10+ they will help. On a 7-9 they\'ll help but then you have to help them. On a miss, they help but you get drawn into their trouble. You may spend 2-Fire instead of rolling; you rouse them and they\'ll help as if you rolled 10+. Gain an ally, an old comrade from the movement. Get the "spell formula" gear pick.',
			rollType: 'CHARM',
		},
		{
			id: 'hard-case-street-fighter',
			name: 'Street Fighter',
			description:
				'When you have an ally standing by your side, spend 1-Fire to add +2 harm when you inflict harm. If there are multiple allies at your side, you may spend Fire for each. Gain an ally, an old friend you can count on for anything. Get the "firewater" gear pick.',
		},
		{
			id: 'hard-case-unstoppable',
			name: 'Unstoppable',
			description:
				'You may spend 3 Fire to avoid or heal 2-harm. This also stabilizes you, if needed. When used to heal yourself, do not erase half your remaining Fire.',
		},
		{
			id: 'hard-case-ascetic',
			name: 'Ascetic',
			description:
				'Spend 1 Fire to ignore all pain and discomfort in your current situation, even beyond normal human tolerances.',
		},
		{
			id: 'hard-case-always-angry',
			name: 'Always Angry',
			description: 'Start mysteries with 2 Fire marked.',
		},
		{
			id: 'hard-case-finish-him',
			name: 'FINISH HIM!',
			description:
				"When you have Fire remaining and strike a foe for 3-harm or more, tell the Keeper how much Fire you have and ask if that's enough. If the foe has that much or less harm capacity left, the Keeper will tell you. You may spend all your Fire to immediately make a follow up attack, defeating your foe.",
		},
		{
			id: 'hard-case-inspired-guesswork',
			name: 'Inspired Guesswork',
			description:
				'When you investigate a mystery, you may spend 1 Fire to add 1 extra hold. The extra question must be about powers, motivations, or weaknesses.',
		},
		{
			id: 'hard-case-stone-cold',
			name: 'Stone Cold',
			description:
				'You never really get ruffled by danger. Gain +1 ongoing when you act under pressure due to pain or fear. Your nearby allies also gain this bonus against pain and fear, as long as you keep it together.',
		},
		{
			id: 'hard-case-weapon-master',
			name: 'Weapon Master',
			description:
				'When you take possession of a new weapon you may add, remove, or change one tag. This change only applies for you. When you get this move, apply it to all your current weapons.',
		},
	],
	pickMovesCount: 2,

	startingGearOptions: [
		{
			label: 'Hard Case weapon (pick one)',
			pickCount: 1,
			options: [
				{
					name: 'Ancient sword',
					harm: 2,
					ranges: ['hand'],
					tags: ['valuable', 'balanced', 'holy'],
				},
				{
					name: 'Auto shotgun',
					harm: 3,
					ranges: ['close'],
					tags: ['load', 'reload', 'area'],
				},
				{
					name: 'Battered assault rifle',
					harm: 3,
					ranges: ['close', 'far'],
					tags: ['area', 'loud'],
				},
				{
					name: 'Chainsaw',
					harm: 3,
					ranges: ['hand'],
					tags: ['unreliable', 'messy', 'heavy'],
				},
				{
					name: 'Crowbar',
					harm: 2,
					ranges: ['hand'],
					tags: ['messy', 'innocuous'],
				},
				{
					name: 'Hand cannon',
					harm: 3,
					ranges: ['close'],
					tags: ['loud'],
				},
				{
					name: 'Huge fucking knife',
					harm: 2,
					ranges: ['hand'],
					tags: ['messy'],
				},
			],
		},
		{
			label: 'Normal weapons (pick one or two)',
			pickCount: 2,
			options: [
				{
					name: 'Shotgun',
					harm: 3,
					ranges: ['close'],
					tags: ['messy'],
				},
				{
					name: 'Hunting rifle',
					harm: 2,
					ranges: ['far'],
					tags: ['loud'],
				},
				{
					name: 'Pistol',
					harm: 2,
					ranges: ['close'],
					tags: [],
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
			label: 'Vehicle (pick one, if you want)',
			pickCount: 1,
			options: ['Pickup', 'Motorbike', 'Muscle car', 'Sportscar'],
		},
		{
			label: 'Other item (pick one)',
			pickCount: 1,
			options: [
				'Concealed armour (1-armour hidden)',
				'Heavy armour (2-armour heavy)',
				'Firewater (once per mystery, drink it to mark 1 Fire)',
				'Bag of cash (untraceable)',
				'Ghost detector (unreliable)',
				'A bunch of old monster hunting journals',
				'A spell formula, written on a napkin',
			],
		},
	],

	improvements: [
		{
			id: 'hard-case-imp-tough',
			label: 'Get +1 Tough, max +3',
			isAdvanced: false,
			type: 'rating-boost',
			rating: 'tough',
			maxValue: 3,
		},
		{
			id: 'hard-case-imp-cool',
			label: 'Get +1 Cool, max +2',
			isAdvanced: false,
			type: 'rating-boost',
			rating: 'cool',
			maxValue: 2,
		},
		{
			id: 'hard-case-imp-sharp',
			label: 'Get +1 Sharp, max +2',
			isAdvanced: false,
			type: 'rating-boost',
			rating: 'sharp',
			maxValue: 2,
		},
		{
			id: 'hard-case-imp-weird',
			label: 'Get +1 Weird, max +2',
			isAdvanced: false,
			type: 'rating-boost',
			rating: 'weird',
			maxValue: 2,
		},
		{
			id: 'hard-case-imp-move1',
			label: 'Take another Hard Case move',
			isAdvanced: false,
			type: 'playbook-move',
		},
		{
			id: 'hard-case-imp-move2',
			label: 'Take another Hard Case move',
			isAdvanced: false,
			type: 'playbook-move',
		},
		{
			id: 'hard-case-imp-harm-box',
			label: 'Add an extra box to your harm track, before the "Unstable" mark',
			isAdvanced: false,
			type: 'playbook-specific',
		},
		{
			id: 'hard-case-imp-ally',
			label: 'Gain command of an ally team of monster hunters',
			isAdvanced: false,
			type: 'gain-ally',
		},
		{
			id: 'hard-case-imp-cross1',
			label: 'Take a move from another playbook',
			isAdvanced: false,
			type: 'cross-playbook-move',
		},
		{
			id: 'hard-case-imp-cross2',
			label: 'Take a move from another playbook',
			isAdvanced: false,
			type: 'cross-playbook-move',
		},
	],

	advancedImprovements: [
		{
			id: 'hard-case-adv-stat',
			label: 'Get +1 to any rating, max +3',
			isAdvanced: true,
			type: 'rating-boost',
			rating: 'any',
			maxValue: 3,
		},
		{
			id: 'hard-case-adv-change',
			label: 'Change this hunter to a new type',
			isAdvanced: true,
			type: 'change-playbook',
		},
		{
			id: 'hard-case-adv-second',
			label: 'Create a second hunter to play as well as this one',
			isAdvanced: true,
			type: 'second-hunter',
		},
		{
			id: 'hard-case-adv-advanced1',
			label: 'Mark two of the basic moves as advanced',
			isAdvanced: true,
			type: 'advanced-moves',
		},
		{
			id: 'hard-case-adv-advanced2',
			label: 'Mark two of the basic moves as advanced',
			isAdvanced: true,
			type: 'advanced-moves',
		},
		{
			id: 'hard-case-adv-retire',
			label: 'Retire this hunter to safety',
			isAdvanced: true,
			type: 'retire',
		},
		{
			id: 'hard-case-adv-luck',
			label: 'Get back one used Luck point',
			isAdvanced: true,
			type: 'luck-recovery',
		},
		{
			id: 'hard-case-adv-fire-track',
			label: 'Your Fire track increases to 13 boxes',
			isAdvanced: true,
			type: 'playbook-specific',
		},
		{
			id: 'hard-case-adv-harm-box',
			label: 'Add an extra harm box to your harm track, before the "Dying" mark',
			isAdvanced: true,
			type: 'playbook-specific',
		},
	],

	customSections: [
		{
			type: 'pick',
			key: 'hard-knocks',
			title: 'Hard Knocks',
			description:
				'Pick one background move from the Hard Knocks list. This determines your backstory, an ally, and an extra gear pick.',
			pickCount: 1,
			options: [
				{
					label: 'Bodyguard',
					description:
						'When you spend 1 Fire to protect someone, as well as +1 forward, you may protect them even if they are out of reach or the harm they are about to suffer would be unstoppable. Get an ally group of old colleagues: good at protecting people. Get the "concealed armour" gear pick.',
				},
				{
					label: 'Enforcer',
					description:
						'Spend 1 Fire to look so scary that it counts as a reason for manipulating someone. After you roll, if you terrify them, spend Fire 1-for-1 to increase your result. Gain an ally who can help with money, disguises, back you up, or get underworld gossip. Get the "bag of cash" gear pick.',
				},
				{
					label: 'Secret Martial Art',
					description:
						"Spend Fire 1-for-1 to increase harm inflicted by your unarmed attacks. Your unarmed attacks gain 'ignore-armour'. Get an ally, a mentor or student: good in a fight or philosophical discussion. Get the \"ancient sword\" gear pick.",
				},
				{
					label: 'Military',
					description:
						"When you're using military gear on a move, you may spend 2 Fire to boost the result level (a miss becomes a 7-9, 7-9 becomes 10+, or 10+ becomes 12+). You have an ally group, your old comrades: good in a fight and when you need help making preparations. Get the \"battered assault rifle\" gear pick.",
				},
				{
					label: 'Resistance',
					description:
						'What was your cause? You have contacts amongst sympathetic activists. If it fits the cause, call on them. Roll +Charm. On a 10+ they will help. On a 7-9 they\'ll help but then you have to help them. On a miss, they help but you get drawn into their trouble. You may spend 2-Fire instead of rolling; you rouse them and they\'ll help as if you rolled 10+. Gain an ally, an old comrade from the movement. Get the "spell formula" gear pick.',
					rollType: 'CHARM',
				},
				{
					label: 'Street Fighter',
					description:
						'When you have an ally standing by your side, spend 1-Fire to add +2 harm when you inflict harm. If there are multiple allies at your side, you may spend Fire for each. Gain an ally, an old friend you can count on for anything. Get the "firewater" gear pick.',
				},
			],
		},
	],

	historyOptions: [
		'This hunter is blood kin. Decide how you\'re related, then ask them how you fit into the family.',
		'You beat the tar out of this hunter one time. Ask them why. Then tell them why you work together now.',
		'This hunter saw you lose control one time and go on a rampage. Tell them what started it, then ask them what you did.',
		'You respect each other as comrades-in-arms: the two toughest bastards in this outfit.',
		"You respect this hunter's brains. Someone with that many ideas, you want them on your side.",
		'You came across this hunter in your time of hard knocks. Decide how they were involved and how you became good friends.',
		"You have a crush on this hunter. Ask them if it's reciprocal, and if you know or not.",
		'This hunter saved your life when you were about to step on that rainbow.',
	],
};
