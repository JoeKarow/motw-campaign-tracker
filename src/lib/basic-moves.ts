import type { MoveRollType } from './hunter-types';

export interface BasicMove {
	id: string;
	name: string;
	description: string;
	rollType: MoveRollType;
}

export const basicMoves: BasicMove[] = [
	{
		id: 'basic-kick-ass',
		name: 'Kick Some Ass',
		description:
			'When you get into a fight and kick some ass, roll +Tough. On a 10+ you and whatever you\'re fighting inflict harm on each other. On a 7-9 you also pick one extra consequence.',
		rollType: 'TOUGH',
	},
	{
		id: 'basic-act-under-pressure',
		name: 'Act Under Pressure',
		description:
			'When you act under pressure, roll +Cool. On a 10+ you do what you set out to. On a 7-9 the Keeper is going to give you a worse outcome, hard choice, or price to pay.',
		rollType: 'COOL',
	},
	{
		id: 'basic-help-out',
		name: 'Help Out',
		description:
			'When you help another hunter, roll +Cool. On a 10+ your help grants them +1 to their roll. On a 7-9 your help grants +1 but you also expose yourself to trouble or danger.',
		rollType: 'COOL',
	},
	{
		id: 'basic-investigate',
		name: 'Investigate A Mystery',
		description:
			'When you investigate a mystery, roll +Sharp. On a 10+ hold 2. On a 7-9 hold 1. Spend holds to ask the Keeper questions about the mystery.',
		rollType: 'SHARP',
	},
	{
		id: 'basic-manipulate',
		name: 'Manipulate Someone',
		description:
			'When you manipulate someone, roll +Charm. On a 10+ they\'ll do what you want if you give them a reason. On a 7-9 they\'ll do it, but only if you do something for them first.',
		rollType: 'CHARM',
	},
	{
		id: 'basic-protect',
		name: 'Protect Someone',
		description:
			'When you prevent harm to another character, roll +Tough. On a 10+ you protect them and choose one benefit. On a 7-9 you protect them but suffer some or all of the harm.',
		rollType: 'TOUGH',
	},
	{
		id: 'basic-read-situation',
		name: 'Read A Bad Situation',
		description:
			'When you look around and read a bad situation, roll +Sharp. On a 10+ hold 3. On a 7-9 hold 1. Spend holds to ask the Keeper questions about the situation.',
		rollType: 'SHARP',
	},
	{
		id: 'basic-use-magic',
		name: 'Use Magic',
		description:
			'When you use magic, roll +Weird. On a 10+ the magic works without issues. On a 7-9 it works but choose a glitch. On a miss, the Keeper decides what happens.',
		rollType: 'WEIRD',
	},
];
