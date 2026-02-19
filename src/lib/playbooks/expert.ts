import type { PlaybookDefinition } from './types';

export const expert: PlaybookDefinition = {
	id: 'expert',
	displayName: 'The Expert',
	luckSpecial:
		'When you spend a point of Luck, you\'ll discover something happening in your haven that needs to be dealt with. It might be minor, or it could be a world-ending situation.',

	ratingLines: [
		{ charm: -1, cool: 1, sharp: 2, tough: 1, weird: 0 },
		{ charm: 0, cool: 1, sharp: 2, tough: -1, weird: 1 },
		{ charm: 1, cool: -1, sharp: 2, tough: 1, weird: 0 },
		{ charm: -1, cool: 1, sharp: 2, tough: 0, weird: 1 },
		{ charm: -1, cool: 0, sharp: 2, tough: -1, weird: 2 },
	],

	looks: [
		{ label: 'Body', options: ['Thoughtful face', 'Lined face', 'Scarred face', 'Aged face'] },
		{
			label: 'Clothes',
			options: ['Untidy clothes', 'Casual clothes', 'Neat clothes', 'Utility clothes'],
		},
	],

	mandatoryMoves: [
		{
			id: 'expert-haven',
			name: 'I\'ve Read About This Sort Of Thing',
			description:
				'Roll +Sharp instead of +Cool when you act under pressure.',
		},
		{
			id: 'expert-dark-past',
			name: 'Often Right',
			description:
				'When a hunter comes to you for advice about a problem, give them your best advice. If they take your advice, they get +1 ongoing while following your advice, and you mark experience.',
		},
	],

	optionalMoves: [
		{
			id: 'expert-prep',
			name: 'Preparedness',
			description:
				'When you need something unusual or rare, roll +Sharp. On a 10+ you have it right here. On a 7-9 you have it, but not here—you know where to find it.',
			rollType: 'SHARP',
		},
		{
			id: 'expert-dark-arts',
			name: 'Dark Past',
			description:
				'You dabbled in the worst parts of the supernatural. You can use the Hex move from The Spooky.',
		},
		{
			id: 'expert-trap',
			name: 'Trap Expert',
			description:
				'When you lay a trap for a monster, roll +Sharp. On a 10+ you set it up perfectly. On a 7-9 you set a trap but it won\'t hold for long.',
			rollType: 'SHARP',
		},
		{
			id: 'expert-theories',
			name: 'It Wasn\'t As Bad As It Looked',
			description:
				'Once per mystery, you may attempt to patch up someone who\'s taken harm. Roll +Sharp. On a 10+ heal 2 harm. On a 7-9 heal 1 harm.',
			rollType: 'SHARP',
		},
		{
			id: 'expert-connected',
			name: 'Connected',
			description:
				'You have contacts in useful places. Take +1 to manipulate someone when you\'re working through your contacts.',
		},
		{
			id: 'expert-precise',
			name: 'Precise Strike',
			description:
				'When you inflict harm, you can aim for a specific body part. On a successful attack, the Keeper will describe an additional consequence for your target.',
		},
	],
	pickMovesCount: 2,

	startingGearOptions: [
		{
			label: 'Weapons (pick 3)',
			pickCount: 3,
			options: [
				{ name: 'Walking stick (silver handle)', harm: 1, ranges: ['hand'], tags: ['silver'] },
				{ name: '.38 revolver', harm: 2, ranges: ['close', 'far'], tags: ['loud', 'reload'] },
				{ name: 'Hunting rifle', harm: 2, ranges: ['far'], tags: ['loud'] },
				{ name: 'Shotgun', harm: 3, ranges: ['close'], tags: ['messy', 'loud'] },
				{ name: 'Knife', harm: 1, ranges: ['hand'], tags: [] },
				{ name: 'EMF reader', harm: 0, ranges: ['close'], tags: ['detect-ghosts'] },
				{ name: 'Cross or holy symbol', harm: 0, ranges: ['intimate'], tags: ['holy'] },
			],
		},
		{
			label: 'Haven (write-in)',
			pickCount: 0,
			options: [
				'Lore library',
				'Mystical wards',
				'Infirmary',
				'Workshop',
				'Oubliette',
				'Panic room',
				'Summoning circle',
			],
		},
	],

	improvements: [
		{ id: 'expert-imp-charm', label: 'Get +1 Charm (max +3)', isAdvanced: false },
		{ id: 'expert-imp-cool', label: 'Get +1 Cool (max +3)', isAdvanced: false },
		{ id: 'expert-imp-sharp', label: 'Get +1 Sharp (max +3)', isAdvanced: false },
		{ id: 'expert-imp-tough', label: 'Get +1 Tough (max +3)', isAdvanced: false },
		{ id: 'expert-imp-weird', label: 'Get +1 Weird (max +3)', isAdvanced: false },
		{ id: 'expert-imp-move1', label: 'Take another Expert move', isAdvanced: false },
		{ id: 'expert-imp-move2', label: 'Take another Expert move', isAdvanced: false },
		{ id: 'expert-imp-cross1', label: 'Take a move from another playbook', isAdvanced: false },
		{ id: 'expert-imp-cross2', label: 'Take a move from another playbook', isAdvanced: false },
		{ id: 'expert-imp-haven', label: 'Add an option to your haven', isAdvanced: false },
	],

	advancedImprovements: [
		{ id: 'expert-adv-stat', label: 'Get +1 to any rating (max +3)', isAdvanced: true },
		{ id: 'expert-adv-luck', label: 'Mark two of the advanced luck boxes', isAdvanced: true },
		{ id: 'expert-adv-shotgun', label: 'Change this hunter to a new type', isAdvanced: true },
		{ id: 'expert-adv-retire', label: 'Retire this hunter to safety', isAdvanced: true },
		{ id: 'expert-adv-second', label: 'Make a second hunter to play', isAdvanced: true },
		{
			id: 'expert-adv-dead',
			label: 'Erase a used luck mark from your playbook',
			isAdvanced: true,
		},
	],

	customSections: [],
};
