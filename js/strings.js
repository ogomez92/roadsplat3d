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
			bankedScore: "With a saved score of",
			ws: "world size",
			bonus7: "Stopper",
			iStoppers: "%1 Stoppers",
			noBombs: "You don't have any bombs!",
			noStoppers: "You don't have any stoppers",
			shopbombs: "Bombs, to make cars explode by pressing the b key. Also allows unlocking of explosion sounds in the explosions gallery",
			bonus3: "Slowdown",
			bonus4: "Nothing!",
			bonus5: "bomb",
			bonus6: "Coffee rush",
			coins: "coins",
			iBombs: "%1 Bombs",
			mShopBack: "Leave shop (You have %1 coins)",
			mShopIntro: "Welcome to the item shop! Press enter on any item to buy it.",
			shophyperjump: "Hyper jumps: Allows collecting of hyperjump items, which save you from being hit by incoming cars",
			shopgalleryMembership: "Explosions gallery lifetime membership",
			shopshortfuse: "Short fuse: Divides the time it takes for bombs to explode by 3.",
			galleryLocked: "The explosions gallery will remain locked until you buy a membership from the store. Darn!",
			mBullet: "Explosions gallery",
			locked: "Locked!",
			bulletIntro: "Welcome to the explosions gallery! You have unlocked %1 out of %2 possible explosions. Press enter to go back to the main menu.",
			iJumps: "%1 hyperjumps",
			emptyInventory: "Your inventory is empty",
			mainMenu: "Use arrows to move, enter to continue.",
			mStart: "Start Game",
			mShop: "Item Shop (You have %1 coins)",
			level: "Level",
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
			noBombs: "No tienes bombas!",
			shopbombs: "Bombas, para hacer explotar los coches con la tecla b. También podrás desbloquear los sonidos de las explosiones",
			selectVoice: "%1 voces disponibles. Usa las flechas y enter para cambiar la voz",
			mSelectVoice: "Voz de la tts",
			mLang: "Cambiar Idioma",
			newUpdate: "Nueva versión disponible! Tienes la %1, la %2 está disponible",
			mSapi: "Usar SAPI para el juego",
			mReader: "Usar lector de pantalla",
			newRate: "Prueba de la velocidad de la voz. Pulsa enter para dejarla así",
			rating: "Pulsa las flechas izquierda y derecha para cambiar la velocidad y enter para aceptar",
			mRate: "Cambiar velocidad de la voz.",
			mSelect: "Por favor, selecciona",
			mBack: "Volver",
			yes: "sí",
			no: "no",
			ok: "aceptar",
			iStoppers: "Frenados %1",
			coins: "Monedas",
			iBombs: "%1 Bombas",
			mShopBack: "Salir de la tienda (tienes %1 monedas)",
			mShopIntro: "Te doy la bienvenida a la tienda, donde puedes comprar mejoras para el juego. Pulsa énter en cualquier item para comprarlo.",
			shophyperjump: "Hipersaltos: Permite obtener los bonus de hipersalto, que saltarán los autos automáticamente.",
			shopgalleryMembership: "Pase de oro para la galería de explosiones",
			shopshortfuse: "Mecha corta, divide el tiempo de explosión de las bombas por 3",
			galleryLocked: "La galería de explosiones estará bloqueada hasta que compres el pase de oro. ¡Vaya!",
			mBullet: "Galería de explosiones",
			locked: "Bloqueado",
			bulletIntro: "Te doy la bienvenida a la galería de explosiones! Has desbloqueado %1 de %2 explosiones posibles. Pulsa enter para volver al menú",
			iJumps: "Tienes %1 hipersaltos",
			emptyInventory: "Tu inventario está vacío.",
			upArrowMove: "Pulsa un número del 1 al 5 para empezar a moverte, 1 el más lento. S para ver la puntuación, h para la energía, l para el nivel, i para el inventario.",
			bonus1: "Bonus de energía",
			bonus2: "Hipersalto",
			bonus3: "Ralentizado",
			bonus4: "Nada!",
			bonus5: "bomba",

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
