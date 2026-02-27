import type { PlaybookDefinition } from './types';

export const spooky: PlaybookDefinition = {
	id: 'spooky',
	displayName: 'The Spooky',
	description:
		"I can do things, things that normal people can't. But there's a price\u2014I haven't paid it in full, yet, but the bill's gonna come due soon. It's best I don't tell you any more. You get too close, you'll get hurt.",
	luckSpecial:
		"As you mark off Luck boxes, your dark side's needs will get nastier.",

	ratingLines: [
		{ charm: 1, cool: 0, sharp: 1, tough: -1, weird: 2 },
		{ charm: -1, cool: 1, sharp: 0, tough: 1, weird: 2 },
		{ charm: 2, cool: 0, sharp: 0, tough: -1, weird: 2 },
		{ charm: 0, cool: -1, sharp: 1, tough: 1, weird: 2 },
		{ charm: -1, cool: -1, sharp: 2, tough: 0, weird: 2 },
	],

	looks: [
		{
			label: 'Body',
			options: ['Kid', 'teen', 'adult', 'old'],
			allowCustom: true,
		},
		{
			label: 'Eyes',
			options: [
				'Burning eyes',
				'dark eyes',
				'pained eyes',
				'blank eyes',
				'unblinking eyes',
				'piercing eyes',
				'shadowed eyes',
				'creepy eyes',
			],
			allowCustom: true,
		},
		{
			label: 'Clothes',
			options: [
				'Ratty clothes',
				'casual clothes',
				'goth clothes',
				'neat clothes',
				'nerdy clothes',
			],
			allowCustom: true,
		},
	],

	mandatoryMoves: [],

	optionalMoves: [
		{
			id: 'spooky-telepathy',
			name: 'Telepathy',
			description:
				"You can read people's thoughts and put words in their mind. This can allow you to investigate a mystery or read a bad situation without needing to actually talk. You can also manipulate someone without speaking. You still roll moves as normal, except people will not expect the weirdness of your mental communication.",
		},
		{
			id: 'spooky-hex',
			name: 'Hex',
			description:
				'When you cast a spell (with use magic), as well as the normal effects, you may pick from the following: The target contracts a disease; The target immediately suffers harm (2-harm magic ignore-armour); The target breaks something precious or important.',
		},
		{
			id: 'spooky-the-sight',
			name: 'The Sight',
			description:
				'You can see the invisible, especially spirits and magical influences. You may communicate the way you see fit (maybe even make deals with) the spirits you see, and they give you more opportunities to spot clues when you investigate a mystery.',
		},
		{
			id: 'spooky-premonitions',
			name: 'Premonitions',
			description:
				'At the start of each mystery, roll +Weird. On a 10+, you get a detailed vision of something bad that is yet to happen. You take +1 forward to prevent it coming true, and mark experience if you stop it. On a 7-9+ you get clouded images of something bad that is yet to happen: mark experience if you stop it. On a miss, you get a vision of something bad happening to you and the Keeper holds 3, to be spent one-for-one as penalties to rolls you make.',
			rollType: 'WEIRD',
		},
		{
			id: 'spooky-hunches',
			name: 'Hunches',
			description:
				"When something bad is happening (or just about to happen) somewhere that you aren't, roll +Sharp. On a 10+ you knew where you needed to go, just in time to get there. On a 7-9, you get there late\u2014in time to intervene, but not prevent it altogether. On a miss, you get there just in time to be in trouble yourself.",
			rollType: 'SHARP',
		},
		{
			id: 'spooky-tune-in',
			name: 'Tune In',
			description:
				'You can attune your mind to a monster or minion. Roll +Weird. On a 10+, hold 3. On a 7-9, hold 1. On a miss, the monster becomes aware of you. Spend one hold to ask the Keeper one of the following questions, and gain +1 ongoing while acting on the answers: Where is the creature right now? What is it planning to do right now? Who is it going to attack next? Who does it regard as the biggest threat? How can I attract its attention?',
			rollType: 'WEIRD',
		},
		{
			id: 'spooky-the-big-whammy',
			name: 'The Big Whammy',
			description:
				"You can use your powers to kick some ass: roll +Weird instead of +Tough. The attack has 2-harm close obvious ignore-armour. On a miss, you'll get a magical backlash.",
		},
		{
			id: 'spooky-jinx',
			name: 'Jinx',
			description:
				'You can encourage coincidences to occur, the way you want. When you jinx a target, roll +Weird. On a 10+ hold 2 and on a 7-9 hold 1. On a miss, the Keeper holds 2 over you to be used in the same way. Spend your hold to: Interfere with a hunter, giving them -1 forward; Help a hunter, giving them +1 forward, by interfering with their enemy; Interfere with what a monster, minion, or bystander is trying to do; Inflict 1-harm on the target due to an accident; The target finds something you left for them; The target loses something that you will soon find.',
			rollType: 'WEIRD',
		},
	],
	pickMovesCount: 3,

	startingGearOptions: [
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
	],

	improvements: [
		{
			id: 'spooky-imp-weird',
			label: 'Get +1 Weird, max +3',
			isAdvanced: false,
			type: 'rating-boost',
			rating: 'weird',
			maxValue: 3,
		},
		{
			id: 'spooky-imp-charm',
			label: 'Get +1 Charm, max +2',
			isAdvanced: false,
			type: 'rating-boost',
			rating: 'charm',
			maxValue: 2,
		},
		{
			id: 'spooky-imp-cool',
			label: 'Get +1 Cool, max +2',
			isAdvanced: false,
			type: 'rating-boost',
			rating: 'cool',
			maxValue: 2,
		},
		{
			id: 'spooky-imp-sharp',
			label: 'Get +1 Sharp, max +2',
			isAdvanced: false,
			type: 'rating-boost',
			rating: 'sharp',
			maxValue: 2,
		},
		{
			id: 'spooky-imp-move1',
			label: 'Take another Spooky move',
			isAdvanced: false,
			type: 'playbook-move',
		},
		{
			id: 'spooky-imp-move2',
			label: 'Take another Spooky move',
			isAdvanced: false,
			type: 'playbook-move',
		},
		{
			id: 'spooky-imp-darkside',
			label: 'Change some, or all, your dark side tags',
			isAdvanced: false,
			type: 'playbook-specific',
		},
		{
			id: 'spooky-imp-haven',
			label: "Get a mystical library, like the Expert's haven option",
			isAdvanced: false,
			type: 'haven-option',
		},
		{
			id: 'spooky-imp-cross1',
			label: 'Take a move from another playbook',
			isAdvanced: false,
			type: 'cross-playbook-move',
		},
		{
			id: 'spooky-imp-cross2',
			label: 'Take a move from another playbook',
			isAdvanced: false,
			type: 'cross-playbook-move',
		},
	],

	advancedImprovements: [
		{
			id: 'spooky-adv-stat',
			label: 'Get +1 to any rating, max +3',
			isAdvanced: true,
			type: 'rating-boost',
			rating: 'any',
			maxValue: 3,
		},
		{
			id: 'spooky-adv-change',
			label: 'Change this hunter to a new type',
			isAdvanced: true,
			type: 'change-playbook',
		},
		{
			id: 'spooky-adv-second',
			label: 'Create a second hunter to play as well as this one',
			isAdvanced: true,
			type: 'second-hunter',
		},
		{
			id: 'spooky-adv-advanced1',
			label: 'Mark two of the basic moves as advanced',
			isAdvanced: true,
			type: 'advanced-moves',
		},
		{
			id: 'spooky-adv-advanced2',
			label: 'Mark two of the basic moves as advanced',
			isAdvanced: true,
			type: 'advanced-moves',
		},
		{
			id: 'spooky-adv-retire',
			label: 'Retire this hunter to safety',
			isAdvanced: true,
			type: 'retire',
		},
		{
			id: 'spooky-adv-darkside',
			label:
				'You discover how to use your powers at a lower price. Delete one dark side tag permanently.',
			isAdvanced: true,
			type: 'playbook-specific',
		},
		{
			id: 'spooky-adv-luck',
			label: 'Get back one used Luck point',
			isAdvanced: true,
			type: 'luck-recovery',
		},
	],

	customSections: [
		{
			type: 'pick',
			key: 'dark-side',
			title: 'The Dark Side',
			description:
				"Your powers have an unsavory source, and sometimes you get tempted to do things you shouldn't. These could be orders from whatever granted your power, or urges that bubble up from your subconscious. Pick three tags for your dark side:",
			pickCount: 3,
			options: [
				{ label: 'Violence' },
				{ label: 'Depression' },
				{ label: 'Secrets' },
				{ label: 'Lust' },
				{ label: 'Dark bargain' },
				{ label: 'Guilt' },
				{ label: 'Soulless' },
				{ label: 'Addiction' },
				{ label: 'Mood swings' },
				{ label: 'Rage' },
				{ label: 'Self-destruction' },
				{ label: 'Greed for power' },
				{ label: 'Poor impulse control' },
				{ label: 'Hallucinations' },
				{ label: 'Pain' },
				{ label: 'Paranoia' },
			],
		},
	],

	historyOptions: [
		'They taught you to control your powers, to the extent that you can control them at all.',
		'You are blood-kin. Decide together exactly what.',
		'You are married, or romantically involved. Decide together the exact relationship.',
		"You're old friends, and trust each other completely.",
		'You used your powers on them one time. Decide if it was for selfish reasons or not, and tell them if they found out about it.',
		"You've known each other some time, but since your powers manifested, you keep them at a distance emotionally.",
		'You hope they can help you control your powers.',
		'They saw you use your powers for selfish or vindictive reasons. Ask them who the victim was, and then tell them what you did.',
	],
};
