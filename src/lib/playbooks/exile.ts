import type { PlaybookDefinition } from './types';

export const exile: PlaybookDefinition = {
	id: 'exile',
	displayName: 'The Exile',
	description:
		"What is this place? Am I in hell? One moment, fighting the Devil's spawn sword to claw, the next I am here in this light and noise. What manner of clothes are those? There's the creature! After it!",
	luckSpecial:
		"Whenever you spend a Luck point, you'll soon find something from your original life. It might be something good, or it might be bad.",

	ratingLines: [
		{ charm: -1, cool: 2, sharp: 1, tough: 2, weird: 0 },
		{ charm: -1, cool: 2, sharp: 2, tough: 1, weird: 0 },
		{ charm: 1, cool: 0, sharp: 1, tough: 3, weird: -1 },
		{ charm: -1, cool: 2, sharp: 0, tough: 1, weird: 2 },
		{ charm: 2, cool: -1, sharp: -1, tough: 1, weird: 2 },
	],

	looks: [
		{
			label: 'Body',
			options: [
				'Warrior body',
				'wasted body',
				'scarred body',
				'lithe body',
				'short',
				'tall',
				'tattooed body',
			],
			allowCustom: true,
		},
		{
			label: 'Clothes',
			options: [
				'Ancient armour',
				'ancient clothing',
				'hastily scavenged modern clothing',
			],
			allowCustom: true,
		},
		{
			label: 'Accessories',
			options: [
				'Silver necklace with holy symbol',
				'gold and silver arm rings',
				'mystical amulet',
				'many rings',
				'jeweled brooch',
				'embroidered belt',
				'beadwork shirt',
				'many necklaces',
			],
			allowCustom: true,
		},
	],

	mandatoryMoves: [],

	optionalMoves: [
		{
			id: 'exile-adept-sorcerer',
			name: 'Adept sorcerer',
			description:
				'You have a familiar spirit (usually in the guise of a pet) that counts as an Ally: Subordinate.',
		},
		{
			id: 'exile-warrior',
			name: 'Warrior',
			description:
				'If you are fighting with (and against) old-fashioned hand weapons and suffer harm, you suffer 1 less harm. Monster attacks almost always count as old-fashioned for this move.',
		},
		{
			id: 'exile-traditional-remedies',
			name: 'Traditional remedies',
			description:
				'You can treat injuries without any need for modern medical supplies (although you might need someone to hold the patient down). This can stabilise a hunter or heal 1-harm. Dealing with a poison, infection, or disease might need you to track down some specific healing herbs.',
		},
		{
			id: 'exile-immortal-name',
			name: 'Immortal name',
			description:
				'Your monster hunting exploits are legendary, so much that your name still scares monsters and minions. You may manipulate monsters with threats if they understand enough to have heard stories about you.',
		},
		{
			id: 'exile-hearty-constitution',
			name: 'Hearty constitution',
			description:
				"You never suffer from normal illnesses, and get +1 ongoing against magical illnesses and poisons. You've been through worse.",
		},
		{
			id: 'exile-confused',
			name: 'Confused',
			description:
				'Mark experience whenever your bafflement with the modern world gets in the way of monster hunting.',
		},
		{
			id: 'exile-ancient-magics',
			name: 'Ancient magics',
			description:
				'You learned magic when less lore had been lost. When you use magic, on a 7-9 result you can opt not to choose a glitch, instead taking -1 forward.',
		},
		{
			id: 'exile-learned',
			name: 'Learned',
			description:
				'You researched all the legends and tales of monsters in your home time. When you investigate a mystery, you can ask the Keeper following questions as well as the ones on the usual list: Did this creature (or type) exist in my home time? What defenses are effective against this creature? What do I know about this creature that has been forgotten?',
		},
	],
	pickMovesCount: 2,

	startingGearOptions: [
		{
			label: 'Ancient armour (optional)',
			pickCount: 1,
			options: [
				'No armour (0-armour)',
				'Ancient armour appropriate to your origin (1-armour)',
			],
		},
		{
			label: 'Ancient weapons (pick up to three)',
			pickCount: 3,
			options: [
				{ name: 'Sword', harm: 2, ranges: ['hand'], tags: ['messy'] },
				{ name: 'Axe', harm: 2, ranges: ['hand'], tags: ['messy'] },
				{ name: 'Spear', harm: 2, ranges: ['hand', 'close'], tags: ['balanced'] },
				{ name: 'Big sword', harm: 3, ranges: ['hand'], tags: ['messy', 'heavy'] },
				{ name: 'Poleaxe', harm: 3, ranges: ['hand'], tags: ['messy', 'heavy'] },
				{ name: 'Shield', harm: 1, ranges: ['hand'], tags: ['1-armour'] },
				{ name: 'Silver knife', harm: 1, ranges: ['hand'], tags: ['silver'] },
				{ name: 'Bow', harm: 2, ranges: ['close', 'far'], tags: [] },
				{ name: 'Crossbow', harm: 2, ranges: ['close'], tags: ['slow'] },
				{
					name: 'Handgonne',
					harm: 1,
					ranges: ['hand', 'close'],
					tags: ['loud', 'volatile', 'smokey', 'reload'],
				},
				{
					name: 'Harquebus',
					harm: 2,
					ranges: ['close'],
					tags: ['loud', 'volatile', 'smokey', 'heavy', 'reload'],
				},
				{ name: 'Big knife', harm: 1, ranges: ['hand'], tags: [] },
				{ name: 'Cudgel', harm: 1, ranges: ['hand'], tags: [] },
				{ name: 'Martial arts', harm: 1, ranges: ['hand'], tags: [] },
			],
		},
	],

	improvements: [
		{
			id: 'exile-imp-weird',
			label: 'Get +1 Weird, max +3',
			isAdvanced: false,
			type: 'rating-boost',
			rating: 'weird',
			maxValue: 3,
		},
		{
			id: 'exile-imp-tough',
			label: 'Get +1 Tough, max +3',
			isAdvanced: false,
			type: 'rating-boost',
			rating: 'tough',
			maxValue: 3,
		},
		{
			id: 'exile-imp-cool',
			label: 'Get +1 Cool, max +3',
			isAdvanced: false,
			type: 'rating-boost',
			rating: 'cool',
			maxValue: 3,
		},
		{
			id: 'exile-imp-sharp',
			label: 'Get +1 Sharp, max +3',
			isAdvanced: false,
			type: 'rating-boost',
			rating: 'sharp',
			maxValue: 3,
		},
		{
			id: 'exile-imp-move1',
			label: 'Take another Exile move',
			isAdvanced: false,
			type: 'playbook-move',
		},
		{
			id: 'exile-imp-move2',
			label: 'Take another Exile move',
			isAdvanced: false,
			type: 'playbook-move',
		},
		{
			id: 'exile-imp-ally',
			label:
				'Gain an ally: another one of your old comrades has come to join you in the modern day',
			isAdvanced: false,
			type: 'gain-ally',
		},
		{
			id: 'exile-imp-cache',
			label:
				'Find a cache of objects left for you by your comrades in the past. The Keeper will decide what they expected you might need',
			isAdvanced: false,
			type: 'playbook-specific',
		},
		{
			id: 'exile-imp-cross1',
			label: 'Take a move from another playbook',
			isAdvanced: false,
			type: 'cross-playbook-move',
		},
		{
			id: 'exile-imp-cross2',
			label: 'Take a move from another playbook',
			isAdvanced: false,
			type: 'cross-playbook-move',
		},
	],

	advancedImprovements: [
		{
			id: 'exile-adv-stat',
			label: 'Get +1 to any rating, max +3',
			isAdvanced: true,
			type: 'rating-boost',
			rating: 'any',
			maxValue: 3,
		},
		{
			id: 'exile-adv-change',
			label: 'Change this hunter to a new type',
			isAdvanced: true,
			type: 'change-playbook',
		},
		{
			id: 'exile-adv-second',
			label: 'Create a second hunter to play as well as this one',
			isAdvanced: true,
			type: 'second-hunter',
		},
		{
			id: 'exile-adv-advanced1',
			label: 'Mark two of the basic moves as advanced',
			isAdvanced: true,
			type: 'advanced-moves',
		},
		{
			id: 'exile-adv-advanced2',
			label: 'Mark two of the basic moves as advanced',
			isAdvanced: true,
			type: 'advanced-moves',
		},
		{
			id: 'exile-adv-retire',
			label: 'Retire this hunter to safety',
			isAdvanced: true,
			type: 'retire',
		},
		{
			id: 'exile-adv-luck',
			label: 'Get back one used Luck point',
			isAdvanced: true,
			type: 'luck-recovery',
		},
		{
			id: 'exile-adv-gateway',
			label:
				'When you use magic, you may choose "create a gateway between the modern world and my origin" as an effect',
			isAdvanced: true,
			type: 'playbook-specific',
		},
	],

	customSections: [
		{
			type: 'text-input',
			key: 'origin',
			title: 'Origin',
			description:
				'You were taken from your home in the past, and dropped into the modern world with only what you were carrying.',
			fields: [
				{
					label: 'Home time and place',
					placeholder: 'You are from _____ in the year _____',
				},
				{
					label: 'Nemesis',
					placeholder: 'Your nemesis is a _____ named _____',
				},
			],
		},
		{
			type: 'pick',
			key: 'how-transported',
			title: 'How were you transported to the modern day?',
			description: 'Pick one:',
			pickCount: 1,
			options: [
				{ label: 'You chased your nemesis through a portal.' },
				{ label: 'A spell sent you after your nemesis.' },
				{ label: 'Magical accident or side-effect.' },
				{ label: 'You angered a sorcerer.' },
				{ label: 'Divine intervention.' },
				{ label: 'One moment you were there, the next you were here.' },
				{ label: 'A strange place or artifact brought you.' },
				{ label: 'You were frozen, and recently unearthed and revived.' },
			],
		},
	],

	historyOptions: [
		'This hunter is a distant descendant in your family line.',
		'This hunter was the first to take you in, explain the modern world, and learn about your origins. Work out how you managed to communicate (perhaps you speak a common language, or ancient and modern versions of the same one).',
		'This hunter belongs to an organisation that existed in your home time. Decide between you what your relationship was with that group, and how you\'ll be remembered by them.',
		'This hunter showed understanding when you were confused and overwhelmed.',
		'When you met, you immediately liked and respected each other.',
		'This hunter possesses a message or item left for you by your comrades in the past. Tell them what it is and ask how it came into their possession.',
		'This hunter had a vision, premonition, or prophecy that mentioned you. Tell them what the vision showed them about you.',
		'You both became hunters because of the same sort of monster attacked you or your kin. Decide between you what it was.',
	],
};
