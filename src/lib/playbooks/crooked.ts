import type { PlaybookDefinition } from './types';

export const crooked: PlaybookDefinition = {
	id: 'crooked',
	displayName: 'The Crooked',
	description:
		"Yeah, I've been around the block. A bit of this, a bit of that. When I came across the secret underworld of monsters and magic... well... it wasn't so different from the underworld I already knew. It was easy to find an angle, just like before.",
	luckSpecial:
		'Whenever you spend a Luck point, someone from your past will re-appear in your life. Soon.',

	ratingLines: [
		{ charm: 1, cool: 1, sharp: 2, tough: 0, weird: -1 },
		{ charm: -1, cool: 1, sharp: 1, tough: 2, weird: 0 },
		{ charm: -1, cool: 2, sharp: 2, tough: 0, weird: -1 },
		{ charm: 2, cool: 1, sharp: 1, tough: 0, weird: -1 },
		{ charm: 2, cool: 0, sharp: 1, tough: -1, weird: 1 },
	],

	looks: [
		{
			label: 'Eyes',
			options: [
				'Hard eyes',
				'friendly eyes',
				'watchful eyes',
				'smiling eyes',
				'calculating eyes',
			],
			allowCustom: true,
		},
		{
			label: 'Clothes',
			options: [
				'Street wear',
				'tailored suit',
				'cheap suit',
				'tracksuit',
				'nondescript clothes',
			],
			allowCustom: true,
		},
	],

	mandatoryMoves: [],

	optionalMoves: [
		{
			id: 'crooked-artifact',
			name: 'Artifact',
			description:
				"You 'found' a magical artifact with handy powers, and kept it. Pick one: Protective amulet (1-armour magic recharge), Lucky charm (may be used as a Luck point, once only), Grimoire (studying the book gives +1 forward to use magic), Skeleton key (opens any magically sealed lock), Imp stone (A weak demon is bound to serve the holder. The imp must be summoned with the use magic move).",
		},
		{
			id: 'crooked-crew',
			name: 'Crew',
			description:
				'You have a regular crew, a team of three or four people who will help you out with pretty much anything. They count as a team (see page 119).',
		},
		{
			id: 'crooked-deal-with-the-devil',
			name: 'Deal with the Devil',
			description:
				'You sold your soul to the Devil. Pick one or two things you got out of the deal: wealth, fame, youth, sensual gratification, skill (add +1 to two ratings). Payment is due either when you die, in six months (if you picked two things) or otherwise in a year.',
		},
		{
			id: 'crooked-friends-on-the-force',
			name: 'Friends on the Force',
			description:
				'You know a few cops who can be persuaded to look the other way, or do you a favour, for certain considerations. You can act under pressure to get in touch with them when you need to divert any law enforcement attention. There will be a cost, although maybe not right now.',
		},
		{
			id: 'crooked-made',
			name: 'Made',
			description:
				"You're \"made\" in a gang. Name the gang and describe how their operations tie into your background. You can call on gang members to help you out, but they'll expect to be paid. Your bosses will have requests for you now and again, but you'll be paid. Minor trouble will be overlooked, but you better not screw over any other made gangsters.",
		},
		{
			id: 'crooked-driver',
			name: 'Driver',
			description:
				'You have +1 ongoing while driving, plus you can hotwire anything (the older it is, the fewer tools you need to do it). You also own two handy, widely-available vehicles (perhaps a sportscar and a van).',
		},
		{
			id: 'crooked-home-ground',
			name: 'Home Ground',
			description:
				"Your crew made a point of keeping the locals happy\u2014keeping them safe, ensuring things always went down okay. When you're back in your old neighbourhood, you can always find people who will hide you or help you with a minor favour, no questions asked.",
		},
		{
			id: 'crooked-notorious',
			name: 'Notorious',
			description:
				'You have a reputation from your criminal past. When you reveal who you are, your terrifying reputation counts as a reason for people to do what you ask, for the manipulate someone move. Revealing your identity to someone can create other problems later, of course.',
		},
	],
	pickMovesCount: 2,

	startingGearOptions: [
		{
			label: 'Effective weapons (pick three)',
			pickCount: 3,
			options: [
				{
					name: '.22 revolver',
					harm: 1,
					ranges: ['close'],
					tags: ['reload', 'small'],
				},
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
					name: 'Big knife',
					harm: 1,
					ranges: ['hand'],
					tags: [],
				},
				{
					name: 'Baseball bat',
					harm: 1,
					ranges: ['hand'],
					tags: [],
				},
				{
					name: 'Submachinegun',
					harm: 2,
					ranges: ['close'],
					tags: ['reload', 'area'],
				},
				{
					name: 'Assault rifle',
					harm: 3,
					ranges: ['close', 'far'],
					tags: ['area'],
				},
			],
		},
	],

	improvements: [
		{
			id: 'crooked-imp-sharp',
			label: 'Get +1 Sharp, max +3',
			isAdvanced: false,
			type: 'rating-boost',
			rating: 'sharp',
			maxValue: 3,
		},
		{
			id: 'crooked-imp-tough',
			label: 'Get +1 Tough, max +2',
			isAdvanced: false,
			type: 'rating-boost',
			rating: 'tough',
			maxValue: 2,
		},
		{
			id: 'crooked-imp-cool',
			label: 'Get +1 Cool, max +2',
			isAdvanced: false,
			type: 'rating-boost',
			rating: 'cool',
			maxValue: 2,
		},
		{
			id: 'crooked-imp-charm',
			label: 'Get +1 Charm, max +2',
			isAdvanced: false,
			type: 'rating-boost',
			rating: 'charm',
			maxValue: 2,
		},
		{
			id: 'crooked-imp-move1',
			label: 'Take another Crooked move',
			isAdvanced: false,
			type: 'playbook-move',
		},
		{
			id: 'crooked-imp-move2',
			label: 'Take another Crooked move',
			isAdvanced: false,
			type: 'playbook-move',
		},
		{
			id: 'crooked-imp-ally',
			label: 'Gain an ally: one of your old crew',
			isAdvanced: false,
			type: 'gain-ally',
		},
		{
			id: 'crooked-imp-stash',
			label:
				'Recover a stash of money from the old days, enough to live without care... for a year or two.',
			isAdvanced: false,
			type: 'playbook-specific',
		},
		{
			id: 'crooked-imp-cross1',
			label: 'Take a move from another playbook',
			isAdvanced: false,
			type: 'cross-playbook-move',
		},
		{
			id: 'crooked-imp-cross2',
			label: 'Take a move from another playbook',
			isAdvanced: false,
			type: 'cross-playbook-move',
		},
	],

	advancedImprovements: [
		{
			id: 'crooked-adv-stat',
			label: 'Get +1 to any rating, max +3',
			isAdvanced: true,
			type: 'rating-boost',
			rating: 'any',
			maxValue: 3,
		},
		{
			id: 'crooked-adv-change',
			label: 'Change this hunter to a new type',
			isAdvanced: true,
			type: 'change-playbook',
		},
		{
			id: 'crooked-adv-second',
			label: 'Create a second hunter to play as well as this one',
			isAdvanced: true,
			type: 'second-hunter',
		},
		{
			id: 'crooked-adv-advanced1',
			label: 'Mark two of the basic moves as advanced',
			isAdvanced: true,
			type: 'advanced-moves',
		},
		{
			id: 'crooked-adv-advanced2',
			label: 'Mark two of the basic moves as advanced',
			isAdvanced: true,
			type: 'advanced-moves',
		},
		{
			id: 'crooked-adv-retire',
			label: 'Retire this hunter to safety',
			isAdvanced: true,
			type: 'retire',
		},
		{
			id: 'crooked-adv-luck',
			label: 'Erase one used luck mark from your playbook',
			isAdvanced: true,
			type: 'luck-recovery',
		},
	],

	customSections: [
		{
			type: 'pick',
			key: 'background',
			title: 'Background',
			description:
				'You worked a less-than-legal job before you became a monster hunter. What did you do? Pick one:',
			pickCount: 1,
			options: [
				{
					label: 'Hoodlum',
					description:
						'You can use Tough instead of Charm to manipulate someone with threats of violence.',
				},
				{
					label: 'Burglar',
					description:
						'When you break into a secure location, roll +Sharp. On a 10+ pick three, on a 7-9 pick two: you get in undetected, you get out undetected, you don\'t leave a mess, you find what you were after.',
					rollType: 'SHARP',
				},
				{
					label: 'Grifter',
					description:
						'When you are about to manipulate someone, you can ask the Keeper "What will convince this person to do what I want?" The Keeper must answer honestly, but not necessarily completely.',
				},
				{
					label: 'Fixer',
					description:
						'If you need to buy something, sell something, or hire someone, roll +Charm. On a 10+ you know just the person who will be interested. On a 7-9 you know the only person who can do it, but there\'s a complication. Pick one: you owe them; they screwed you over; you screwed them over. On a miss, the only person who can help is someone who absolutely hates you.',
					rollType: 'CHARM',
				},
				{
					label: 'Assassin',
					description:
						'When you take your first shot at an unsuspecting target, do +2 Harm.',
				},
				{
					label: 'Charlatan',
					description:
						'When you want people to think you are using magic, roll +Cool. On a 10 or more, your audience is amazed and fooled by your illusion. On a 7-9 you tripped up a couple of times, maybe someone will notice. You may also manipulate people with fortune telling. When you do that, ask "What are they hoping for right now?" as a free question (even on a miss).',
					rollType: 'COOL',
				},
				{
					label: 'Pickpocket',
					description:
						'When you steal something small, roll +Charm. On a 10 or more, you get it and they didn\'t notice you taking it. On a 7-9 either you don\'t grab it, you grab the wrong thing, or they remember you later: your choice.',
					rollType: 'CHARM',
				},
			],
		},
		{
			type: 'pick',
			key: 'heat',
			title: 'Heat',
			description:
				"You didn't get here without making enemies. Pick at least two of these and name the people involved:",
			pickCount: 2,
			options: [
				{
					label: 'A police detective has made it a personal goal to put you away.',
					hasTextInput: true,
				},
				{
					label: 'You have a rival from your background who never misses a chance to screw you over.',
					hasTextInput: true,
				},
				{
					label: "You pissed off a well-connected criminal, and they'll do whatever they can to destroy you.",
					hasTextInput: true,
				},
				{
					label: 'Someone with special powers, a person or monster, who you took advantage of.',
					hasTextInput: true,
				},
				{
					label: 'An old partner you betrayed in the middle of a job.',
					hasTextInput: true,
				},
			],
		},
		{
			type: 'pick',
			key: 'underworld',
			title: 'Underworld',
			description:
				'Pick how you discovered about the real underworld. Keep this in mind when you select your moves in the next section, so that everything fits together.',
			pickCount: 1,
			options: [
				{
					label: 'The target of a job was a dangerous creature. Pick one: vampire, werewolf, troll, reptiloid.',
				},
				{
					label: 'You worked with someone who was more than they seemed. Pick one: sorcerer, demon, faerie, psychic.',
				},
				{
					label: 'You were hired by something weird. Pick one: immortal, god, outsider, witch.',
				},
				{
					label: 'Things went south on a job\u2014including, but not limited to, running into (choose one): a horde of goblins, a hunger of ghouls, a dream-eater, a salamander.',
				},
			],
		},
	],

	historyOptions: [
		'This hunter knows about your criminal past. Tell them what crimes they saw you commit.',
		'This hunter was there when you decided to give up the life and hunt monsters instead. Work out together what happened.',
		'This hunter is your younger sibling or child (possibly adopted). You look out for them.',
		'This hunter is a cousin or more distant relative.',
		'This hunter saved your life when a monster had the drop on you. Now you owe them one.',
		'This hunter worked with you on a semi-legal or illegal job. Work out what it was.',
		'This hunter is your moral compass. When you talk over things with them, their advice keeps you on the straight and narrow.',
		"You're powerfully attracted to this hunter. Maybe someday you'll deserve them.",
	],
};
