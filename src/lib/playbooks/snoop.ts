import type { PlaybookDefinition } from './types';

export const snoop: PlaybookDefinition = {
	id: 'snoop',
	displayName: 'The Snoop',
	description:
		"Cryptids have kept out of sight, but I'm going to find them and record them. The evidence will be incontrovertible, and I'll be the one who did it. I'm going to be a superstar one day, you mark my words! Hey... did you just feel a chill?",
	luckSpecial:
		"Whenever you spend a Luck point, you're going to have technical difficulties. Breakdowns, communication problems, weird noises in the recordings, etc.",

	ratingLines: [
		{ charm: 2, cool: -1, sharp: 1, tough: 0, weird: 1 },
		{ charm: 2, cool: 0, sharp: 1, tough: 1, weird: -1 },
		{ charm: 2, cool: 1, sharp: 1, tough: 0, weird: -1 },
		{ charm: 2, cool: -1, sharp: 2, tough: -1, weird: 0 },
		{ charm: 2, cool: 1, sharp: 0, tough: 0, weird: 1 },
	],

	looks: [
		{
			label: 'Body',
			options: [
				'Slender body',
				'hefty body',
				'trim body',
				'jittery body',
				'tall body',
				'short body',
			],
			allowCustom: true,
		},
		{
			label: 'Clothes',
			options: [
				'Student clothes',
				'arty clothes',
				'old suit',
				'stylish suit',
				'safari wear',
				'hat & trenchcoat',
				'utility wear',
			],
			allowCustom: true,
		},
	],

	mandatoryMoves: [],

	optionalMoves: [
		{
			id: 'snoop-what-does-that-feel-like',
			name: '"What Does That Feel Like?"',
			description:
				"When you put your camera or microphone right in a person's face, they might go right back to it after they deal with you, but you'll create enough time for the other hunters to act in the meantime.",
		},
		{
			id: 'snoop-minor-celebrity',
			name: 'Minor Celebrity',
			description:
				'At the beginning of each mystery, roll +Weird. On a 10+ hold 2 and on a 7-9 hold 1. Spend your hold during the mystery to have someone you meet know of you in a positive light (maybe they read your blog, or watch your Internet/TV show, etc). You may end up getting asked for autographs or given "hot" leads, etc.',
			rollType: 'WEIRD',
		},
		{
			id: 'snoop-well-fix-it-in-post',
			name: "We'll Fix It In Post",
			description:
				"You can use anything you could conceivably have recorded as evidence for investigate a mystery, allowing you to check previous interviews, attack sites, and so on from the comfort of your laptop.",
		},
		{
			id: 'snoop-press-accreditation',
			name: 'Press Accreditation',
			description:
				'When you investigate a mystery by talking to witnesses, interviewing locals, or anything else requiring interpersonal skills, roll +Charm instead of +Sharp.',
			rollType: 'CHARM',
		},
		{
			id: 'snoop-truthiness',
			name: 'Truthiness',
			description:
				"Whatever you tell a normal person, they'll accept that you think it's true. If it's far out, they might think you're deluded, but they won't think you're lying.",
		},
		{
			id: 'snoop-the-mojo-wire',
			name: 'The Mojo Wire',
			description:
				'When you spend a while reading all the latest news feeds looking for the weird stuff, take +1 forward.',
		},
		{
			id: 'snoop-relaxed-producer',
			name: 'Relaxed Producer',
			description:
				"You're employed, with a regular pay check and little or no oversight. As long as you send in a story every few days, no matter how bizarre, you're set. Every now and again they'll send you somewhere in particular, and when that happens it usually involves supernatural activity. Unless they need human interest, in which case it will be a kitten show or agricultural fair or something.",
		},
	],
	pickMovesCount: 3,

	startingGearOptions: [
		{
			label: 'Recording devices',
			pickCount: 3,
			options: [
				'Video camera',
				'Tiny digital camera',
				'Film camera',
				'Digital recorder',
				'Tape recorder',
				'Infrared camera',
				'Pro sound gear',
				'Camera drone',
				'Starlight camera',
				'Steadicam rig',
				'Laser microphone',
				'SLR camera',
				'Nice smartphone',
				'_____',
			],
		},
		{
			label: 'Detectors',
			pickCount: 2,
			options: [
				'Electromagnetic field detector',
				'Temperature fluctuation detector',
				'Ouija board',
				'Humidity meter',
				'Dowsing rods',
				'Chemistry test kit',
				'Metal detector',
				'Compass',
				'GPS receiver',
				'Laser rangefinder',
				'Pendulum',
				'Tarot deck',
				'_____',
			],
		},
		{
			label: 'Subtle weapons',
			pickCount: 1,
			options: [
				{
					name: 'Multitool/pocket knife',
					harm: 1,
					ranges: ['hand'],
					tags: ['hidden', 'useful'],
				},
				{ name: 'Stun gun', harm: 1, ranges: ['hand'], tags: ['stun'] },
				{
					name: 'Baseball/cricket bat',
					harm: 2,
					ranges: ['hand'],
					tags: ['innocuous', 'messy'],
				},
				{ name: 'Handgun', harm: 2, ranges: ['close'], tags: ['loud'] },
				{ name: 'Knife', harm: 1, ranges: ['hand'], tags: ['hidden'] },
			],
		},
	],

	improvements: [
		{
			id: 'snoop-imp-charm',
			label: 'Get +1 Charm, max +3',
			isAdvanced: false,
			type: 'rating-boost',
			rating: 'charm',
			maxValue: 3,
		},
		{
			id: 'snoop-imp-cool',
			label: 'Get +1 Cool, max +2',
			isAdvanced: false,
			type: 'rating-boost',
			rating: 'cool',
			maxValue: 2,
		},
		{
			id: 'snoop-imp-weird',
			label: 'Get +1 Weird, max +2',
			isAdvanced: false,
			type: 'rating-boost',
			rating: 'weird',
			maxValue: 2,
		},
		{
			id: 'snoop-imp-sharp',
			label: 'Get +1 Sharp, max +2',
			isAdvanced: false,
			type: 'rating-boost',
			rating: 'sharp',
			maxValue: 2,
		},
		{
			id: 'snoop-imp-move1',
			label: 'Take another Snoop move',
			isAdvanced: false,
			type: 'playbook-move',
		},
		{
			id: 'snoop-imp-move2',
			label: 'Take another Snoop move',
			isAdvanced: false,
			type: 'playbook-move',
		},
		{
			id: 'snoop-imp-ally',
			label:
				'Gain an ally: one of your existing crew members or the whole crew as an ally team',
			isAdvanced: false,
			type: 'gain-ally',
		},
		{
			id: 'snoop-imp-haven',
			label:
				'Get a haven, like the Expert has, with one option plus a film lab and editing suite',
			isAdvanced: false,
			type: 'haven-option',
		},
		{
			id: 'snoop-imp-cross1',
			label: 'Take a move from another playbook',
			isAdvanced: false,
			type: 'cross-playbook-move',
		},
		{
			id: 'snoop-imp-cross2',
			label: 'Take a move from another playbook',
			isAdvanced: false,
			type: 'cross-playbook-move',
		},
	],

	advancedImprovements: [
		{
			id: 'snoop-adv-stat',
			label: 'Get +1 to any rating, max +3',
			isAdvanced: true,
			type: 'rating-boost',
			rating: 'any',
			maxValue: 3,
		},
		{
			id: 'snoop-adv-change',
			label: 'Change this hunter to a new type',
			isAdvanced: true,
			type: 'change-playbook',
		},
		{
			id: 'snoop-adv-second',
			label: 'Create a second hunter to play as well as this one',
			isAdvanced: true,
			type: 'second-hunter',
		},
		{
			id: 'snoop-adv-advanced1',
			label: 'Mark two of the basic moves as advanced',
			isAdvanced: true,
			type: 'advanced-moves',
		},
		{
			id: 'snoop-adv-advanced2',
			label: 'Mark two of the basic moves as advanced',
			isAdvanced: true,
			type: 'advanced-moves',
		},
		{
			id: 'snoop-adv-retire',
			label: 'Retire this hunter to safety',
			isAdvanced: true,
			type: 'retire',
		},
		{
			id: 'snoop-adv-luck',
			label: 'Get back one used Luck point',
			isAdvanced: true,
			type: 'luck-recovery',
		},
		{
			id: 'snoop-adv-superstar',
			label: "Make it big. You're a superstar now!",
			isAdvanced: true,
			type: 'playbook-specific',
		},
	],

	customSections: [
		{
			type: 'text-input',
			key: 'crew',
			title: 'Crew',
			description:
				'Decide if your crew is the other hunters, or if you have an entourage. If they are not the hunters, there are up to three of them. Pick a name and job for each. Tell the Keeper\u2014your crew are bystanders. Crew jobs: camera, sound, editing, dogsbody, researcher, driver, director, producer, bodyguard.',
			fields: [
				{ label: 'Crew member 1', placeholder: 'Name and job' },
				{ label: 'Crew member 2', placeholder: 'Name and job' },
				{ label: 'Crew member 3', placeholder: 'Name and job' },
			],
		},
	],

	historyOptions: [
		'You\'re best friends from school/university (film class, maybe?)',
		'You met this hunter when they killed a monster you were doing a story on. Ask them what it was.',
		'This hunter almost defeated a monster but you did something to prevent that. Ask them what the monster was, then tell them what you did. Was it an accident or on purpose?',
		'This hunter was in danger of some having unhelpful publicity, but you got the story killed.',
		"You have a crush on this hunter. Ask them if they've noticed.",
		'This hunter saved your ass when you did something stupid. Ask them what you did.',
		'This hunter is a huge fan of your work. Ask them if they keep quiet about it or if everyone knows?',
		'This hunter is a relation, close or distant. Decide between you exactly what.',
	],
};
