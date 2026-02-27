import type { PlaybookDefinition } from './types';

export const professional: PlaybookDefinition = {
	id: 'professional',
	displayName: 'The Professional',
	description:
		'It\'s kind of strange when your regular 9-to-5 job is to hunt down monsters. Still, that\'s the job I took when I joined this outfit. It pays well, and the benefits are good. Like they say "You don\'t have to be crazy to work here, but it sure helps!"',
	luckSpecial:
		'When you spend a point of Luck, your next mission from the Agency comes with lots of Red Tape. Lots.',

	ratingLines: [
		{ charm: 0, cool: 2, sharp: -1, tough: 2, weird: -1 },
		{ charm: -1, cool: 2, sharp: 1, tough: 1, weird: 0 },
		{ charm: 1, cool: 2, sharp: 1, tough: -1, weird: 0 },
		{ charm: -1, cool: 2, sharp: 1, tough: 0, weird: 1 },
		{ charm: 0, cool: 2, sharp: 2, tough: -1, weird: -1 },
	],

	looks: [
		{
			label: 'Face',
			options: [
				'Chiseled face',
				'Scarred face',
				'Unshaven face',
				'Soft face',
				'Young face',
				'Old face',
				'Determined face',
			],
			allowCustom: true,
		},
		{
			label: 'Clothes',
			options: [
				'Tailored suit',
				'Shabby suit',
				'Perfect suit',
				'Utility coveralls',
				'Battledress',
				'Paramilitary uniform',
				'Lab coat',
			],
			allowCustom: true,
		},
	],

	mandatoryMoves: [
		{
			id: 'professional-deal-with-the-agency',
			name: 'Deal With the Agency',
			description:
				"When you deal with the Agency, requesting help or gear, or making excuses for a failure, roll +Sharp. On a 10+, you're good\u2014your request for gear or personnel is okayed, or your slip-up goes unnoticed. On a 7-9, things aren't so great. You might get chewed out by your superiors and there'll be fallout, but you get what you need for the job. On a miss, you screwed up: you might be suspended or under investigation, or just in the doghouse. You certainly aren't going to get any help until you sort it all out.",
			rollType: 'SHARP',
		},
	],

	optionalMoves: [
		{
			id: 'professional-bottle-it-up',
			name: 'Bottle It Up',
			description:
				'If you want, you can take up to +3 bonus when you act under pressure. For each +1 you use, the Keeper holds 1. That hold can be spent later\u2014one for one\u2014to give you -1 on any move except act under pressure.',
		},
		{
			id: 'professional-unfazeable',
			name: 'Unfazeable',
			description: 'Take +1 Cool (max +3).',
		},
		{
			id: 'professional-battlefield-awareness',
			name: 'Battlefield Awareness',
			description:
				'You always know what\u2019s happening around you, and what to watch out for. Take +1 armour (max 2-armour) on top of whatever you get from your gear.',
		},
		{
			id: 'professional-leave-no-one-behind',
			name: 'Leave No One Behind',
			description:
				'In combat, when you help someone escape, roll +Sharp. On a 10+ you get them out clean. On a 7-9, you can either get them out or suffer no harm, you choose. On a miss, you fail to get them out and you\u2019ve attracted hostile attention.',
			rollType: 'SHARP',
		},
		{
			id: 'professional-tactical-genius',
			name: 'Tactical Genius',
			description:
				'When you read a bad situation, you may roll +Cool instead of +Sharp.',
		},
		{
			id: 'professional-medic',
			name: 'Medic',
			description:
				'You have a full first aid kit, and the training to heal people. When you do first aid, roll +Cool. On a 10+ the patient is stabilized and healed of 2 harm. On a 7-9 choose one: heal 2 harm or stabilize the injury. On a miss, you cause an extra 1 harm. This move takes the place of regular first aid.',
			rollType: 'COOL',
		},
		{
			id: 'professional-mobility',
			name: 'Mobility',
			description:
				'You have a truck, van, or car built for monster hunting. Choose two good things and one bad thing about it. Good things: roomy; surveillance gear; fast; stealthy; intimidating; classic; medical kit; sleeping space; toolkit; concealed weapons; anonymous; armoured (+1 armour inside); tough; monster cage. Bad things: loud; obvious; temperamental; beaten-up; gas-guzzler; uncomfortable; slow; old.',
		},
	],
	pickMovesCount: 3,

	startingGearOptions: [
		{
			label: 'Serious weapon (pick one)',
			pickCount: 1,
			options: [
				{
					name: 'Assault rifle',
					harm: 3,
					ranges: ['far'],
					tags: ['area', 'loud', 'reload'],
				},
				{
					name: 'Grenade launcher',
					harm: 4,
					ranges: ['far'],
					tags: ['area', 'messy', 'loud', 'reload'],
				},
				{
					name: 'Sniper rifle',
					harm: 4,
					ranges: ['far'],
					tags: [],
				},
				{
					name: 'Grenades',
					harm: 4,
					ranges: ['close'],
					tags: ['area', 'messy', 'loud'],
				},
				{
					name: 'Submachine gun',
					harm: 3,
					ranges: ['close'],
					tags: ['area', 'loud', 'reload'],
				},
			],
		},
		{
			label: 'Normal weapons (pick two)',
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
					tags: ['messy'],
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
			label: 'Protection (pick one)',
			pickCount: 1,
			options: [
				'Flak vest (1-armour hidden)',
				'Combat armour (2-armour heavy)',
			],
		},
	],

	improvements: [
		{
			id: 'professional-imp-cool',
			label: 'Get +1 Cool, max +3',
			isAdvanced: false,
			type: 'rating-boost',
			rating: 'cool',
			maxValue: 3,
		},
		{
			id: 'professional-imp-charm',
			label: 'Get +1 Charm, max +2',
			isAdvanced: false,
			type: 'rating-boost',
			rating: 'charm',
			maxValue: 2,
		},
		{
			id: 'professional-imp-sharp',
			label: 'Get +1 Sharp, max +2',
			isAdvanced: false,
			type: 'rating-boost',
			rating: 'sharp',
			maxValue: 2,
		},
		{
			id: 'professional-imp-tough',
			label: 'Get +1 Tough, max +2',
			isAdvanced: false,
			type: 'rating-boost',
			rating: 'tough',
			maxValue: 2,
		},
		{
			id: 'professional-imp-move1',
			label: 'Take another Professional move',
			isAdvanced: false,
			type: 'playbook-move',
		},
		{
			id: 'professional-imp-move2',
			label: 'Take another Professional move',
			isAdvanced: false,
			type: 'playbook-move',
		},
		{
			id: 'professional-imp-agency-resource',
			label: 'Add a new resource tag for your Agency or change a red tape tag',
			isAdvanced: false,
			type: 'playbook-specific',
		},
		{
			id: 'professional-imp-agency-team',
			label: 'Get command of an Agency team of monster hunters',
			isAdvanced: false,
			type: 'playbook-specific',
		},
		{
			id: 'professional-imp-cross1',
			label: 'Take a move from another playbook',
			isAdvanced: false,
			type: 'cross-playbook-move',
		},
		{
			id: 'professional-imp-cross2',
			label: 'Take a move from another playbook',
			isAdvanced: false,
			type: 'cross-playbook-move',
		},
	],

	advancedImprovements: [
		{
			id: 'professional-adv-stat',
			label: 'Get +1 to any rating, max +3',
			isAdvanced: true,
			type: 'rating-boost',
			rating: 'any',
			maxValue: 3,
		},
		{
			id: 'professional-adv-change',
			label: 'Change this hunter to a new type',
			isAdvanced: true,
			type: 'change-playbook',
		},
		{
			id: 'professional-adv-second',
			label: 'Create a second hunter to play as well as this one',
			isAdvanced: true,
			type: 'second-hunter',
		},
		{
			id: 'professional-adv-advanced1',
			label: 'Mark two of the basic moves as advanced',
			isAdvanced: true,
			type: 'advanced-moves',
		},
		{
			id: 'professional-adv-advanced2',
			label: 'Mark two of the basic moves as advanced',
			isAdvanced: true,
			type: 'advanced-moves',
		},
		{
			id: 'professional-adv-retire',
			label: 'Retire this hunter to safety',
			isAdvanced: true,
			type: 'retire',
		},
		{
			id: 'professional-adv-agency-hire',
			label:
				"Get some or all of the other players' hunters hired by your agency. They get the deal with the agency move, as well as salary and benefits.",
			isAdvanced: true,
			type: 'playbook-specific',
		},
		{
			id: 'professional-adv-luck',
			label: 'Get back one used Luck point',
			isAdvanced: true,
			type: 'luck-recovery',
		},
	],

	customSections: [
		{
			type: 'text-input',
			key: 'agency',
			title: 'Agency',
			description:
				"Decide who it is you work for. Are they a black-budget government department, a secret military unit, a clandestine police team, a private individual's crusade, a corporation, a scientific team, or what?",
			fields: [
				{
					label: 'Agency name',
					placeholder: 'Name your Agency',
				},
			],
		},
		{
			type: 'pick',
			key: 'agency-resources',
			title: 'Resources',
			description: 'Pick two resource tags for the Agency:',
			pickCount: 2,
			options: [
				{ label: 'Well-armed' },
				{ label: 'Well-financed' },
				{ label: 'Rigorous training' },
				{ label: 'Official pull' },
				{ label: 'Cover identities' },
				{ label: 'Offices all over' },
				{ label: 'Good intel' },
				{ label: 'Recognised authority' },
				{ label: 'Weird tech gadgets' },
				{ label: 'Support teams' },
			],
		},
		{
			type: 'pick',
			key: 'agency-red-tape',
			title: 'Red Tape',
			description: 'Pick two red tape tags:',
			pickCount: 2,
			options: [
				{ label: 'Dubious motives' },
				{ label: 'Bureaucratic' },
				{ label: 'Secretive hierarchy' },
				{ label: 'Cryptic missions' },
				{ label: 'Hostile superiors' },
				{ label: 'Inter-departmental rivalry' },
				{ label: 'Budget cuts' },
				{ label: 'Take no prisoners policy' },
				{ label: 'Live capture policy' },
			],
		},
	],

	historyOptions: [
		'Your relationship with them has romantic potential. So far it hasn\u2019t gone further.',
		"They're on the Agency's watch list, and you've been keeping an eye on them.",
		'You are related. Tell them how close.',
		'You met on a mission and worked together unofficially. And successfully.',
		"They've worked with the Agency before, and they're well regarded.",
		'You were friends back in training, before the Agency recruited you. This could be military, law enforcement, or some weirder school: decide the details between you.',
		'They pulled you (and maybe your team) out of a terrible FUBARed mission.',
		'You got sent to "deal with them" as a hazard to the Agency\'s policies one time. Tell them how you resolved this.',
	],
};
