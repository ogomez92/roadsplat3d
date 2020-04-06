'use strict';
import { lang } from './main';
import { utils } from './utilities';
import { speech } from './tts';
import { ScrollingText } from './scrollingText';

class Strings {
	constructor() {
		this.strings = {};
		this.strings[1] = {
			// New English
			iJumps: "You have %1 hyperjumps",
			emptyInventory: "Your inventory is empty",
			mainMenu: "Use arrows to move, enter to continue.",
			mStart: "Start Game",
			mShop: "Item Shop (You have %1 coins)",
			upArrowMove: "Press a number between 1 and 5 to start moving, 1 being the slowest speed possible. Letter s to check your score, h checks your health, l to check level.",
			bonus1: "Health bonus!",
			bonus2: "Hyper jump!",
			selectVoice: "%1 voices available, use the up and down arrows to select a voice, enter when you're done.",
			mSelectVoice: "text to speech voice",
			mLang: 'Change language',
			newUpdate: 'There is a new version available! You have version %1, version %2 is available.',
			mSapi: 'Use text to speech for the game',
			mReader: 'Use your screen reader for the game',
			newRate: 'This is a text to speech rate test. Please press enter when done',
			rating: 'Press right and left arrow keys to change the rate. Press enter when done',
			mRate: 'Change speech rate',

			K: 'king',
			Q: 'queen',
			A: 'ace',
			J: 'jack',
			cspades: 'spades',
			cdiamonds: 'diamonds',
			cclubs: 'clubs',
			chearts: 'hearts',
			dq: 'This is a game of risk. You will risk losing %1 beatcoins. Continue?',
			lang: 'English',
			langs: 'Select your language',
			mSelect: 'Please select',
			mBack: 'go back',
			mStart: 'Start Game',
			yes: 'Yes',
			no: 'no',
			ok: 'ok',
		};
		this.strings[2] = {
			// New Spanish
			mStart: "Empezar juego",
			mShop: "Tienda (Tienes %1 monedas)",
			mainMenu: "Menú Principal. Flechas para navegar, enter para continuar.",
		};
	}

	get(what, rep = []) {
		let str;
		if (typeof this.strings[lang][what] !== 'undefined') {
			str = this.strings[lang][what];
		} else if (typeof this.strings[1][what] !== 'undefined') {
			str = this.strings[1][what];
		} else {
			return what;
		}
		rep.forEach((v, i) => {
			const i1 = Number(i) + 1;
			str = str.replace('%' + i1, v);
		});
		return str;
	}

	speak(what, rep = []) {
		let str;
		if (typeof this.strings[lang][what] !== 'undefined') {
			str = this.strings[lang][what];
		} else if (typeof this.strings[1][what] !== 'undefined') {
			str = this.strings[1][what];
		} else {
			speech.speak(what);
		}
		rep.forEach((v, i) => {
			const i1 = Number(i) + 1;
			str = str.replace('%' + i1, v);
		});
		speech.speak(str);
	}

	async check(lng) {
		const len = utils.objSize(this.strings) - 2;
		for (const i in this.strings[1]) {
			if (!this.strings[lng].hasOwnProperty(i)) {
				await new ScrollingText(i + ': ' + this.strings[1][i]);
			}
		}
	}
}
export var strings = new Strings();
