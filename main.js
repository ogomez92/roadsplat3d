process.env.HMR_PORT=0;process.env.HMR_HOSTNAME="localhost";// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"utilities.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.utils = void 0;

require("babel-polyfill");

'use strict';

class GameUtils {
  calculateDelta(lx, sx, sr = 0) {
    sx = sx + sr;

    if (sx < lx) {
      delta = lx - sx;
    }

    if (sx > lx) {
      delta = sx - lx;
    }
  }

  progressPan(current, max) {
    return (current * 200 / max - 100) / 100;
  }

  progressPitch(current, min, max, minPitch, maxPitch) {
    return current / (min + max) * (maxPitch - minPitch) + minPitch;
  }

  progressVolume(current, min, max, minVolume, maxVolume) {
    if (current > max) {
      return 0;
    }

    return current / (min + max) * (maxVolume - minVolume) + minVolume;
  }

  getProportion(current, min, max, minVolume, maxVolume) {
    if (current > max) {
      return 0;
    }

    return current / (min + max) * (maxVolume - minVolume) + minVolume;
  }

  distance3D(x1, y1, z1, x2, y2, z2) {
    return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1) + (z2 - z1) * (z2 - z1));
  }

  distance(jx, jy, kx, ky) {
    // Return Math.hypot(jx-kx, jy-ky)
    return Math.sqrt((jx - kx) * (jx - kx) + (jy - ky) * (jy - ky));
  }

  calculateAngle(x1, y1, x2, y2) {
    let angle = Math.atan2(y2 - y1, x2 - x1);
    angle = angle >= 0 ? 0 : 2 * Math.PI + angle;
    return angle; // Return Math.atan2((y2 - y1),(x2 - x1));
  }

  isCollide3D(a, b) {
    return a.x <= b.x + b.width && a.x + a.width >= b.x && a.y <= b.y + b.height && a.y + a.height >= b.y && a.z <= b.z + b.depth && a.z + a.depth >= b.z;
  }

  randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  percent(int1, int2) {
    return int1 * 100 / int2;
  }

  percentOf(int1, int2) {
    return int2 * int1 / 100;
  }

  percentage(percented, value) {
    return value * percented / 100;
  }

  average(arr, startIndex = 0) {
    const len = arr.length;
    let val = 0;
    let average = 0;

    if (arr.length < startIndex) {
      return -1;
    }

    for (let i = startIndex; i < arr.length; i++) {
      val += arr[i];
    }

    average = val / (len - startIndex);
    return average;
  }

  averageInt(arr, startIndex = 0) {
    const len = arr.length;
    let val = 0;
    let average = 0;

    if (arr.length < startIndex) {
      return -1;
    }

    for (let i = startIndex; i < arr.length; i++) {
      val += arr[i];
    }

    average = val / (len - startIndex);
    return Math.floor(average);
  }

  neg(num) {
    return num >= 0 ? num == 0 ? 0 : 1 : -1;
  }

  numericSort(a, b) {
    return a < b ? -1 : a == b ? 0 : 1;
  }

  shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }

    return a;
  }

  objSize(obj) {
    let size = 0;
    let key;

    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        size++;
      }
    }

    return size;
  }

  copyObject(obj) {
    return Object.assign(Object.create(Object.getPrototypeOf(obj)), obj);
  }

  arraysEqual(arr1, arr2) {
    for (var i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }

    return true;
  }

  pauseTimeout(timerId) {
    let start = Date.now();
    clearTimeout(timerId);
  }

  resumeTimeout(timerId) {
    remaining -= Date.now() - start;
    return window.setTimeout(callback, remaining);
  }

  randomProperty(obj) {
    var keys = Object.keys(obj);
    return obj[keys[keys.length * Math.random() << 0]];
  }

  async findFiles(path, ext = "") {
    let list = [];
    let fileExt = "";
    await walk.filesSync(path, (pb, pf, stat, next) => {
      if (ext == "") {
        list.push(pf);
      } else {
        fileExt = pf.substr(0 - ext.length, ext.length);

        if (fileExt == ext) {
          list.push(pf);
        }
      }
    });
    return list;
  }

  async findFolders(path) {
    let list = [];
    await walk.dirsSync(path, (pb, pf, stat, next) => {
      list.push(pf);
    });
    return list;
  }

  randomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

}

var utils = new GameUtils();
exports.utils = utils;
},{}],"input.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KeyboardInput = void 0;

var _jquery = _interopRequireDefault(require("jquery"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const EventEmitter = require('events');

'use strict';

class KeyboardInput extends EventEmitter {
  constructor() {
    super();
    this.keyDown = [];
    this.justPressed = [];
    this.chars = [];
    this.justReleased = [];
    this.justPressedEventCallback = null;
    this.charEventCallback = null;
  }

  init() {
    const that = this; // 		$(document).keydown(function(event) { that.handleKeyDown(event); });
    // 		$(document).keyup(function(event) { that.handleKeyUp(event); });

    document.addEventListener('keydown', event => {
      that.handleKeyDown(event);
    });
    document.addEventListener('keyup', event => {
      that.handleKeyUp(event);
    });
    document.addEventListener('keypress', event => {
      that.handleChar(event);
    });
  }

  pause() {
    this.isPaused = true;
  }

  resume() {
    this.isPaused = false;
  }

  handleKeyDown(event) {
    if (this.keyDown[event.which] != true || typeof this.keyDown[event.which] === 'undefined') {
      this.keyDown[event.which] = true;
      this.justPressed[event.which] = true;
      this.emit(event.which);
      this.justReleased[event.which] = false;

      if (typeof this.justPressedEventCallback !== 'undefined' && this.justPressedEventCallback != null) {
        this.justPressedEventCallback(event.which);
      }
    }
  }

  handleChar(char) {
    if (char.which < 48 || char.which > 122) {
      return;
    }

    if (String.fromCharCode(char.which) != '') {
      this.chars += String.fromCharCode(char.which);
      this.emit("chr" + String.fromCharCode(char.which));

      if (typeof this.charEventCallback !== 'undefined' && this.charEventCallback != null) {
        this.charEventCallback(String.fromCharCode(char.which));
      }
    }
  }

  handleKeyUp(event) {
    if (this.keyDown[event.which] == true) {
      this.keyDown[event.which] = false;
      this.justPressed[event.which] = false;
      this.justReleased[event.which] = true;
      this.emit("!" + event.which);
    }

    this.chars = '';
  }

  destroy() {
    this.charEventCallback = null;
    this.justPressedEventCallback = null;
  }

  isDown(event) {
    if (this.isPaused) return false;
    return this.keyDown[event];
  }

  isJustPressed(event) {
    if (this.isPaused) return false;

    if (this.justPressed[event] == true) {
      this.justPressed[event] = false;
      return true;
    }

    return false;
  }

  isJustReleased(event) {
    if (this.justReleased[event]) {
      this.justReleased[event] = false;
      return true;
    }

    return false;
  }

  keysDown() {
    const kd = [];
    this.keyDown.forEach((v, i) => {
      if (v) {
        kd.push(i);
      }
    });
    return kd;
  }

  getChars() {
    const kd = this.chars;
    this.chars = '';
    return kd;
  }

  keysPressed() {
    const kd = [];
    this.justPressed.forEach((v, i) => {
      if (v) {
        kd.push(i);
      }
    });
    this.justPressed.splice();
    return kd;
  }

  releaseAllKeys() {}

  keysReleased() {
    const kd = [];
    this.justReleased.forEach((v, i) => {
      if (v) {
        kd.push(i);
      }
    });
    this.justReleased.splice();
    return kd;
  }

}

exports.KeyboardInput = KeyboardInput;
},{}],"keycodes.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KeyEvent = void 0;
const KeyEvent = {
  DOM_VK_CANCEL: 3,
  DOM_VK_HELP: 6,
  DOM_VK_BACK_SPACE: 8,
  DOM_VK_TAB: 9,
  DOM_VK_CLEAR: 12,
  DOM_VK_RETURN: 13,
  DOM_VK_ENTER: 14,
  DOM_VK_SHIFT: 16,
  DOM_VK_CONTROL: 17,
  DOM_VK_ALT: 18,
  DOM_VK_PAUSE: 19,
  DOM_VK_CAPS_LOCK: 20,
  DOM_VK_ESCAPE: 27,
  DOM_VK_SPACE: 32,
  DOM_VK_PAGE_UP: 33,
  DOM_VK_PAGE_DOWN: 34,
  DOM_VK_END: 35,
  DOM_VK_HOME: 36,
  DOM_VK_LEFT: 37,
  DOM_VK_UP: 38,
  DOM_VK_RIGHT: 39,
  DOM_VK_DOWN: 40,
  DOM_VK_PRINTSCREEN: 44,
  DOM_VK_INSERT: 45,
  DOM_VK_DELETE: 46,
  DOM_VK_0: 48,
  DOM_VK_1: 49,
  DOM_VK_2: 50,
  DOM_VK_3: 51,
  DOM_VK_4: 52,
  DOM_VK_5: 53,
  DOM_VK_6: 54,
  DOM_VK_7: 55,
  DOM_VK_8: 56,
  DOM_VK_9: 57,
  DOM_VK_SEMICOLON: 59,
  DOM_VK_EQUALS: 61,
  DOM_VK_A: 65,
  DOM_VK_B: 66,
  DOM_VK_C: 67,
  DOM_VK_D: 68,
  DOM_VK_E: 69,
  DOM_VK_F: 70,
  DOM_VK_G: 71,
  DOM_VK_H: 72,
  DOM_VK_I: 73,
  DOM_VK_J: 74,
  DOM_VK_K: 75,
  DOM_VK_L: 76,
  DOM_VK_M: 77,
  DOM_VK_N: 78,
  DOM_VK_O: 79,
  DOM_VK_P: 80,
  DOM_VK_Q: 81,
  DOM_VK_R: 82,
  DOM_VK_S: 83,
  DOM_VK_T: 84,
  DOM_VK_U: 85,
  DOM_VK_V: 86,
  DOM_VK_W: 87,
  DOM_VK_X: 88,
  DOM_VK_Y: 89,
  DOM_VK_Z: 90,
  DOM_VK_CONTEXT_MENU: 93,
  DOM_VK_NUMPAD0: 96,
  DOM_VK_NUMPAD1: 97,
  DOM_VK_NUMPAD2: 98,
  DOM_VK_NUMPAD3: 99,
  DOM_VK_NUMPAD4: 100,
  DOM_VK_NUMPAD5: 101,
  DOM_VK_NUMPAD6: 102,
  DOM_VK_NUMPAD7: 103,
  DOM_VK_NUMPAD8: 104,
  DOM_VK_NUMPAD9: 105,
  DOM_VK_MULTIPLY: 106,
  DOM_VK_ADD: 107,
  DOM_VK_SEPARATOR: 108,
  DOM_VK_SUBTRACT: 109,
  DOM_VK_DECIMAL: 110,
  DOM_VK_DIVIDE: 111,
  DOM_VK_F1: 112,
  DOM_VK_F2: 113,
  DOM_VK_F3: 114,
  DOM_VK_F4: 115,
  DOM_VK_F5: 116,
  DOM_VK_F6: 117,
  DOM_VK_F7: 118,
  DOM_VK_F8: 119,
  DOM_VK_F9: 120,
  DOM_VK_F10: 121,
  DOM_VK_F11: 122,
  DOM_VK_F12: 123,
  DOM_VK_F13: 124,
  DOM_VK_F14: 125,
  DOM_VK_F15: 126,
  DOM_VK_F16: 127,
  DOM_VK_F17: 128,
  DOM_VK_F18: 129,
  DOM_VK_F19: 130,
  DOM_VK_F20: 131,
  DOM_VK_F21: 132,
  DOM_VK_F22: 133,
  DOM_VK_F23: 134,
  DOM_VK_F24: 135,
  DOM_VK_NUM_LOCK: 144,
  DOM_VK_SCROLL_LOCK: 145,
  DOM_VK_COMMA: 188,
  DOM_VK_PERIOD: 190,
  DOM_VK_SLASH: 191,
  DOM_VK_BACK_QUOTE: 192,
  DOM_VK_OPEN_BRACKET: 219,
  DOM_VK_BACK_SLASH: 220,
  DOM_VK_CLOSE_BRACKET: 221,
  DOM_VK_QUOTE: 222,
  DOM_VK_META: 224
};
exports.KeyEvent = KeyEvent;
},{}],"tts.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.speech = exports.TTS = void 0;

require("babel-polyfill");

var _main = require("./main");

var _strings = require("./strings");

var _utilities = require("./utilities");

var _input = require("./input.js");

var _keycodes = require("./keycodes");

var _speakTts = _interopRequireDefault(require("speak-tts"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  app
} = require('electron').remote;

const {
  exec
} = require("child_process");

'use strict';

const useWebTTS = true;

// es6
class TTS {
  constructor(webTTS = true) {
    this.voices = [];
    this.speechController = new _input.KeyboardInput();
    this.speechController.init();
    this.ducking = false;
    if (_main.lang == 1) this.lang = "en";
    if (_main.lang == 2) this.lang = "es";
    this.webTTS = webTTS;
    this.synth = new _speakTts.default();
    this.rate = 3;

    this.speechController.justPressedEventCallback = key => {
      if (this.interrupt) this.speak("", false);

      if (key == _keycodes.KeyEvent.VK_SHIFT || key == _keycodes.KeyEvent.DOM_VK_ESCAPE) {
        this.speak("", false);
        if (this.childProcess) this.childProcess.kill();
        this.unduck();
      }

      if (key == _keycodes.KeyEvent.VK_UP && this.speechController.isDown(_keycodes.KeyEvent.DOM_VK_SHIFT)) {
        //rate here
        this.setRate(this.rate + 1);

        _strings.strings.speak('newRate');
      }

      if (key == _keycodes.KeyEvent.VK_DOWN && this.speechController.isDown(_keycodes.KeyEvent.DOM_VK_CONTROL)) {
        //rate here
        this.setRate(this.rate + 1);

        _strings.strings.speak('newRate');
      }
    };

    this.synth.init({
      lang: this.lang,
      rate: this.rate,
      splitSentences: false,
      'listeners': {}
    }).then(data => {
      this.voices = data.voices;
    }).catch(e => {
      (0, _main.report)(e);
    });
  }

  setLanguage(lang) {
    try {
      if (lang == 1) this.lang = "en";
      if (lang == 2) this.lang = "es";
      this.synth.setLanguage(this.lang);
      if (process.platform == 'darwin') this.setVoice(null, true);
      console.log("default voice ", this.voice);
    } catch (err) {
      (0, _main.report)(err);
    }
  }

  setRate(r) {
    let newRate = r;
    if (r < 1) newRate == 1;
    if (r > 10) newRate = 10;
    this.rate = newRate;
    this.synth.setRate(newRate);
  }

  speak(text, queue = false) {
    let sr = app.accessibilitySupportEnabled;
    if (sr) this.webTTS = false;
    if (!sr) this.webTTS = true;
    if (process.platform == 'darwin') this.webTTS = true;

    if (this.webTTS) {
      try {
        let oldText = text;

        if (typeof text == "number") {
          text = " " + text + "."; //we need this because some voices fail to process numbers. Why? Don't ask me.
        }

        if (process.platform == 'darwin') {
          this.speakUnthreaded(text);
        } else {
          this.synth.speak({
            text: text,
            queue: queue,
            listeners: {
              onstart: () => {
                this.duck();
              },
              onend: () => {
                this.unduck();
              },
              onerror: err => {
                //this.setVoice(null,true);
                return false;
              }
            }
          });
        }
      } catch (e) {
        console.error(e);
      }
    } else {
      this.duck();
      document.getElementById('speech').innerHTML = '';
      const para = document.createElement('p');
      para.appendChild(document.createTextNode(text));
      document.getElementById('speech').appendChild(para);
    }
  } // End speak()


  setWebTTS(tts) {
    this.webTTS = tts;
  }

  stop() {
    if (this.webTTS) {
      this.synth.cancel();
    }
  }

  async changeRate() {
    let rate = speech.rate;
    const inp = new _input.KeyboardInput();
    inp.init();

    _strings.strings.speak('rating');

    while (!inp.isJustPressed(_keycodes.KeyEvent.DOM_VK_RETURN)) {
      await _utilities.utils.sleep(5);

      if (inp.isJustPressed(_keycodes.KeyEvent.DOM_VK_RIGHT)) {
        rate += 0.25;
        if (rate > 10) rate = 10;
        speech.setRate(rate);

        _strings.strings.speak('newRate');
      }

      if (inp.isJustPressed(_keycodes.KeyEvent.DOM_VK_LEFT)) {
        rate -= 0.25;
        if (rate < 1) rate = 1;
        speech.setRate(rate);

        _strings.strings.speak('newRate');
      }
    }
  }

  changeVoice(name) {
    let voiceArray = [];

    for (var k in this.voices) {
      voiceArray.push(this.voices[k].name);
    }

    if (voiceArray.includes(name)) {
      speech.synth.setVoice(name);
      this.voice = name;
    }
  }

  setVoice(cb, silent = false) {
    //what language do we want?
    let wl = "en";
    if (_main.lang == 1) wl = "en";
    if (_main.lang == 2) wl = "es";
    let voiceArray = [];

    for (var k in this.voices) {
      //get the first part of the voice languages
      let vl = this.voices[k].lang.split("-")[0]; //do we want this language?

      if (vl == wl) {
        voiceArray.push(this.voices[k].name);
      }
    }

    if (!silent) speech.speak(_strings.strings.get("selectVoice", [voiceArray.length]));
    let input = new _input.KeyboardInput();
    let selection = -1;
    input.init();

    if (!silent) {
      input.justPressedEventCallback = key => {
        if (key == _keycodes.KeyEvent.DOM_VK_DOWN) {
          selection++;
          if (selection >= voiceArray.length) selection = 0;
        }

        if (key == _keycodes.KeyEvent.DOM_VK_UP) {
          selection--;
          if (selection <= -1) selection = voiceArray.length - 1;
        }

        if (key != _keycodes.KeyEvent.DOM_VK_RETURN && (key == _keycodes.KeyEvent.DOM_VK_UP || key == _keycodes.KeyEvent.DOM_VK_DOWN)) {
          //dirty hack
          this.synth.setVoice(voiceArray[selection]);
          speech.speak(voiceArray[selection]);
        } else {
          //it is enter
          if (selection != -1) {
            //don't crash if it's -1.
            input.destroy();

            if (typeof cb !== "undefined") {
              cb(voiceArray[selection]);
            }

            return voiceArray[selection];
          }
        } //enter action

      }; //callback

    } //not silent
    else {
        try {
          this.synth.setVoice(voiceArray[0]);
          this.voice = voiceArray[0];
          return voiceArray[0];
        } catch (err) {
          (0, _main.report)(err);
          this.synth.setVoice(voiceArray[1]);
          this.voice = voiceArray[1];
          return voiceArray[1];
        } // catch block

      } //else

  } //function


  duck() {
    if (this.ducking) return;
    this.ducking = true;
    if (typeof this.ducker !== "undefined") this.ducker.duck();
  }

  unduck() {
    this.ducking = false;
    if (typeof this.ducker !== "undefined") this.ducker.unduck();
  }

  speakUnthreaded(text) {
    let rate = this.rate * 100;
    if (this.childProcess) this.childProcess.kill();
    this.duck();
    this.childProcess = exec('say "' + text + '" -r ' + rate + ' -v ' + this.voice, (error, stdout, stderr) => {
      if (error) {
        throw `error: ${error.message}`;
        return;
      }

      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }

      console.log(`stdout: ${stdout}`);
      this.unduck();
    });
  }

} // End class


exports.TTS = TTS;
const speech = new TTS(false);
exports.speech = speech;
},{"./main":"main.js","./strings":"strings.js","./utilities":"utilities.js","./input.js":"input.js","./keycodes":"keycodes.js"}],"soundObject.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.so = void 0;

require("babel-polyfill");

var _main = require("./main");

var _tts = require("./tts");

var _panner = _interopRequireDefault(require("sono/effects/panner"));

var _sono = _interopRequireDefault(require("sono"));

var _input = require("./input");

var _keycodes = require("./keycodes");

var _utilities = require("./utilities");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const EventEmitter = require('events');

_panner.default.defaults = {
  panningModel: 'HRTF',
  maxDistance: 50
};
_sono.default.playInBackground = true;
var playOnceTimer;

class SoundObjectItem extends EventEmitter {
  constructor(file, callback = 0, tag = 0, stream = false) {
    super();
    this.duckingFirstTime = true;
    this.stream = stream;
    this.panner = null;
    this.fileName = file;

    if (typeof file == "string") {
      if (!stream) {
        this.sound = _sono.default.create({
          src: file,
          onComplete: () => {
            this.doneLoading();
          }
        });
        this.timeout = setTimeout(() => {
          this.checkProgress();
        }, 2000);
        this.loaded = false;
        this.callback = callback;
        this.tag = tag;
      }

      if (stream) {
        this.loaded = true;
        this.callback = callback;
        this.tag = tag;
        this.sound = _sono.default.create(new Audio(file));
        this.doneLoading();
      }
    } else if (typeof file == "object") {
      this.sound = _sono.default.create("");
      this.sound.data = file;
      this.loaded = false;
      this.callback = callback;
      this.tag = tag;
      this.doneLoading();
    }
  }

  get playbackRate() {
    return this.sound.playbackRate;
  }

  set playbackRate(v) {
    return this.sound.playbackRate = v;
  }

  get pitch() {
    return this.sound.playbackRate;
  }

  set pitch(v) {
    return this.sound.playbackRate = v;
  }

  set loop(v) {
    this.sound.loop = v;
  }

  checkProgress() {
    if (this.stream) return;

    if (this.sound.progress == 0) {
      this.sound.destroy();
      this.sound = _sono.default.create({
        src: this.fileName,
        onComplete: () => {
          this.doneLoading();
        }
      }, this.stream);
    }

    if (this.sound.progress == 1) {
      this.doneLoading();
    } else {
      this.timeout = setTimeout(() => {
        this.checkProgress();
      }, 500);
    }
  }

  doneLoading() {
    if (!this.stream) clearTimeout(this.timeout);
    this.loaded = true;

    if (this.callback != 0) {
      this.callback();
    }
  }

  replay() {
    this.sound.stop();
    this.sound.play();
  }

  play() {
    //sometimes, html element sounds complain about having a different connection, so wrap it in a try catch block.
    try {
      this.sound.play();
    } catch (err) {
      //report(err);
      //recreate the sound and replay
      if (this.stream) this.sound = _sono.default.create(new Audio(this.fileName));
      if (!this.stream) this.sound = _sono.default.create({
        src: this.fileName,
        onComplete: () => {
          this.doneLoading();
        }
      });
      this.sound.play();
    }
  }

  stop() {
    this.sound.stop();
  }

  pause() {
    this.sound.pause();
  }

  resume() {
    this.sound.resume();
  }

  destroy() {
    try {
      this.sound.destroy();
    } catch (err) {}
  }

  unload() {
    this.sound.destroy();
  }

  duck(time) {
    if (this.duckingFirstTime) this.oldVolume = this.volume;
    this.duckingFirstTime = false;
    this.sound.fade(0.3, 0.15);
  }

  unduck(time) {
    this.sound.fade(this.oldVolume, 0.15);
  }

  async fade(time) {
    this.sound.fade(0, time / 1000);
    return new Promise(resolve => {
      setTimeout(() => {
        this.sound.stop();
        resolve('ok');
      }, time); // End
    }); // Promise
  }

  pos(x, y, z) {}

  forcePlay() {
    this.sound.stop();
    this.sound.play();
  }

  async playSync(die = false) {
    const inp = new _input.KeyboardInput();
    inp.init();
    this.sound.play();

    inp.justPressedEventCallback = evt => {
      if (evt == _keycodes.KeyEvent.DOM_VK_Q || evt == _keycodes.KeyEvent.DOM_VK_X || evt == _keycodes.KeyEvent.DOM_VK_ESCAPE || evt == _keycodes.KeyEvent.DOM_VK_SPACE || evt == _keycodes.KeyEvent.DOM_VK_ENTER) {
        this.sound.stop();
        inp.justPressedEventCallback = null;
      }
    };

    return new Promise(resolve => {
      this.sound.once('ended', () => {
        this.sound.removeAllListeners();
        if (die) this.sound.destroy();
        resolve('ok');
        inp.justPressedEventCallback = null;
      }); // End

      this.sound.once('stop', () => {
        this.sound.removeAllListeners();
        if (die) this.sound.destroy();
        resolve('ok');
        inp.justPressedEventCallback = null;
      }); // Stop
    }); // Promise
  }

  get active() {
    if (!this.sound.loaded) {
      return false;
    }

    if (this.sound.progress < 1) {
      return false;
    }

    if (this.sound.loaded) {
      return true;
    }
  }

  get playing() {
    return this.sound.playing;
  }

  get pan() {
    if (!this.panner) {
      this.panner = this.sound.effects.add((0, _panner.default)());
      this.currentPan = 0;
      return 0;
    }

    return this.currentPan;
  }

  set pan(v) {
    if (!this.panner) {
      this.panner = this.sound.effects.add((0, _panner.default)());
    }

    this.currentPan = v;
    return this.panner.set(v);
  }

  get volume() {
    return this.sound.volume;
  }

  set volume(v) {
    this.sound.volume = v;
  }

  seek(time) {
    return this.sound.seek(time);
  }

  get currentTime() {
    return this.sound.currentTime;
  }

  get duration() {
    return this.sound.duration * 1000;
  }

  get position() {
    return this.sound.currentTime;
  }

  set currentTime(v) {
    return this.sound.seek(v);
  }

}

class SoundObject {
  constructor() {
    this.sounds = new Array();
    this.loadingQueue = false;
    this.queueCallback = 0;
    this.loadedSounds = 0;
    this.loadingSounds = 0;
    this.loadedCallback = 0;
    this.queue = new Array();
    this.queueLength = 0;
    this.statusCallback = null;
    this.directory = "./sounds/";
    this.extension = ".ogg";
    this.oneShots = new Array();
    this.debug = false;
    this.oneShotSound = null;
  }

  setStatusCallback(callback) {
    this.statusCallback = callback;
  }

  findSound(file) {
    for (let i = 0; i < this.sounds.length; i++) {
      if (this.sounds[i].fileName == file && this.sounds[i].loaded) {
        return this.sounds[i];
      }
    }

    return -1;
  }

  findSoundIndex(file) {
    for (const i in this.sounds) {
      if (this.sounds[i].fileName == file) {
        return i;
      }
    }

    return -1;
  }

  resetQueuedInstance() {
    for (let i = 0; i < this.sounds.length; i++) {
      if (typeof this.sounds[i] != "undefined") {
        if (this.sounds[i].tag == 1) {
          this.sounds[i].sound.destroy();
          this.sounds.splice(i, 1);
        }
      }
    }

    this.loadingQueue = false;
    this.queueCallback = 0;
    this.loadedSounds = 0;
    this.loadingSounds = 0;
    this.loadedCallback = 0;
    this.queue = new Array();
    this.queueLength = 0;
    this.statusCallback = null;
  }

  create(file, stream = false) {
    file = this.directory + file + this.extension;
    let found = -1;
    found = this.findSound(file);
    let returnObject = null;

    if (found == -1 || found.sound.data == null) {
      returnObject = new SoundObjectItem(file, () => {
        if (!stream) this.doneLoading();
      }, 0, stream);
      this.sounds.push(returnObject);
    } else {
      returnObject = new SoundObjectItem(found.sound.data, () => {
        if (!stream) this.doneLoading();
      }, 0, stream);
      returnObject.fileName = found.fileName;
    }

    returnObject.fileName = file; //otherwise html element fileNames get fucked up.

    return returnObject;
  }

  async loadQueueSync() {
    return new Promise(resolve => {
      so.setQueueCallback(() => {
        resolve(true);
      });
      so.loadQueue();
    });
  }

  async createSync(file, stream = false) {
    return new Promise(resolve => {
      file = this.directory + file + this.extension;
      let found = -1;
      found = this.findSound(file);
      let returnObject = null;

      if (found == -1 || found.sound.data == null) {
        returnObject = new SoundObjectItem(file, () => {
          if (!stream) this.doneLoading();
        }, 0, stream);
        this.sounds.push(returnObject);
        if (stream) resolve(returnObject);
      } else {
        returnObject = new SoundObjectItem(found.sound.data, () => {
          if (!stream) this.doneLoading();
        }, 0, stream);
        resolve(returnObject);
      }

      returnObject.fileName = file; //otherwise html element fileNames get fucked up.

      if (stream) resolve(returnObject);

      if (!stream) {
        returnObject.sound.once('loaded', () => {
          resolve(returnObject);
          this.doneLoading();
        }); // End
      } //stream

    }); // Promise
  }

  async playSync(file) {
    let snd = await so.createSync(file);
    await snd.playSync();
    snd.destroy();
  }

  enqueue(file, stream = false) {
    file = this.directory + file + this.extension;
    this.queue.push({
      file,
      stream
    });
    this.queueLength = this.queue.length;
  }

  loadQueue() {
    this.handleQueue();
    this.loadingQueue = true;
  }

  setQueueCallback(callback) {
    this.queueCallback = callback;
  }

  resetQueue() {
    this.queue = [];
    this.loadingQueue = false;
  }

  handleQueue() {
    if (this.queue.length > 0) {
      if (typeof this.statusCallback != "undefined" && this.statusCallback != null) {
        this.statusCallback(1 - this.queue.length / this.queueLength);
      }

      if (this.findSound(this.queue[0].file) != -1) {
        this.queue.splice(0, 1);
        this.handleQueue();
        return;
      }

      let file = this.queue[0].file;
      let stream = this.queue[0].stream;
      this.queue.splice(0, 1);
      this.sounds.push(new SoundObjectItem(file, () => {
        this.handleQueue();
      }, 1, stream));
    } else {
      this.loadingQueue = false;

      if (typeof this.queueCallback != "undefined" && this.queueCallback != 0) {
        this.queueCallback();
      }
    }
  }

  setCallback(callback) {
    this.loadedCallback = callback;
  }

  doneLoading() {
    let result = this.isLoading();

    if (result == 1) {
      if (typeof this.loadedCallback != "undefined" && this.loadedCallback != 0 && this.loadedCallback != null) {
        this.loadedCallback();
      }
    }
  }

  isLoading() {
    let loading = 0;
    this.loadedSounds = 0;
    this.loadingSounds = 0;
    let stillLoading = new Array();

    for (let i = 0; i < this.sounds.length; i++) {
      if (typeof this.sounds[i] != "undefined") {
        if (this.sounds[i].loaded == false) {
          this.loadingSounds++;
        } else {
          this.loadedSounds++;
        }
      }
    }

    return this.loadedSounds / this.sounds.length;
  }

  playOnce(file) {
    this.oneShotSound = this.create(file).sound;
    this.oneShotSound.stop();
    this.oneShotSound.play();
    this.oneShotSound.on("ended", () => {
      if (this.oneShotSound.playing == false) this.oneShotSound.destroy();
    });
  }

  destroy(file, callback = 0) {
    let noMore = false;
    const filename = this.directory + file + this.extension;

    while (!noMore) {
      const found = this.findSoundIndex(filename);

      if (found == -1) {
        noMore = true;
      } else {
        this.sounds[found].sound.unload();
        this.sounds.splice(found, 1);
      }
    }

    if (callback != 0) {
      callback();
    }
  }

  kill(callback = 0) {
    while (this.sounds.length > 0) {
      this.sounds.splice(0, 1);
    }

    _sono.default.destroyAll();

    if (callback != 0) {
      callback();
    }
  }

}

let so = new SoundObject();
exports.so = so;
},{"./main":"main.js","./tts":"tts.js","./input":"input.js","./keycodes":"keycodes.js","./utilities":"utilities.js"}],"scrollingText.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "speech", {
  enumerable: true,
  get: function () {
    return _tts.speech;
  }
});
exports.ScrollingText = void 0;

require("babel-polyfill");

var _jquery = _interopRequireDefault(require("jquery"));

var _keycodes = require("./keycodes");

var _soundObject = require("./soundObject");

var _tts = require("./tts");

var _copyToClipboard = _interopRequireDefault(require("copy-to-clipboard"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

'use strict';

if (runningText == undefined) {
  var runningText = 0;
}

class ScrollingText {
  constructor(text, delimiter = '\n', callback = 0) {
    this.callback = callback;
    this.text = text;
    this.delimiter = delimiter;
    this.splitText = this.text.split(delimiter);
    this.currentLine = 0;
    this.sndOpen = _soundObject.so.create('ui/textOpen');
    this.sndContinue = _soundObject.so.create('ui/textScroll');
    this.sndClose = _soundObject.so.create('ui/textClose');
    const id = document.getElementById('touchArea'); // This.hammer = new Hammer(id);

    this.init();

    if (this.callback == 0) {
      return this.prom = new Promise(resolve => {
        this.res = resolve;
      });
    }
  }

  init() {
    const that = this;
    runningText = this;
    document.addEventListener('keydown', this.handleKeys); // This.hammer.on("swipeleft swiperight", function() { that.handleTap(0); });
    // this.hammer.on("tap", function() { that.handleTap(1); });

    this.sndOpen.play();
    this.currentLine = 0;
    this.readCurrentLine();
  }

  handleKeys(event) {
    switch (event.which) {
      case _keycodes.KeyEvent.DOM_VK_UP:
      case _keycodes.KeyEvent.DOM_VK_DOWN:
      case _keycodes.KeyEvent.DOM_VK_LEFT:
      case _keycodes.KeyEvent.DOM_VK_RIGHT:
        runningText.readCurrentLine();
        break;

      case _keycodes.KeyEvent.DOM_VK_C:
        runningText.copyCurrentLine();
        break;

      case _keycodes.KeyEvent.DOM_VK_RETURN:
        runningText.advance();
        break;
    }
  }

  handleTap(action) {
    if (action == 0) {
      this.readCurrentLine();
    }

    if (action == 1) {
      this.advance();
    }
  }

  readCurrentLine() {
    if (this.splitText[this.currentLine][0] == '!') {
      const str = this.splitText[this.currentLine].substr(1);

      const snd = _soundObject.so.create(str, true);

      snd.play();
      snd.sound.once('end', () => {
        this.advance();
      });
    } else {
      _tts.speech.speak(this.splitText[this.currentLine]);
    }
  }

  copyCurrentLine() {
    (0, _copyToClipboard.default)(this.splitText[this.currentLine]);
    this.advance();
  }

  advance() {
    if (this.currentLine < this.splitText.length - 1) {
      this.currentLine++;
      this.sndContinue.play();
      this.readCurrentLine();
    } else {
      this.sndClose.play();
      this.sndClose.unload();
      this.sndOpen.unload();
      this.sndContinue.unload();
      document.removeEventListener('keydown', this.handleKeys); //			This.hammer.unload();

      if (this.callback != 0) {
        this.callback();
      } else {
        this.res();
      }
    }
  }

}

exports.ScrollingText = ScrollingText;
},{"./keycodes":"keycodes.js","./soundObject":"soundObject.js","./tts":"tts.js"}],"strings.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.strings = void 0;

var _main = require("./main");

var _utilities = require("./utilities");

var _tts = require("./tts");

var _scrollingText = require("./scrollingText");

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
      ok: 'ok'
    };
    this.strings[2] = {
      // New Spanish
      mStart: "Empezar juego",
      mShop: "Tienda (Tienes %1 monedas)",
      mainMenu: "Menú Principal. Flechas para navegar, enter para continuar."
    };
  }

  get(what, rep = []) {
    let str;

    if (typeof this.strings[_main.lang][what] !== 'undefined') {
      str = this.strings[_main.lang][what];
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

    if (typeof this.strings[_main.lang][what] !== 'undefined') {
      str = this.strings[_main.lang][what];
    } else if (typeof this.strings[1][what] !== 'undefined') {
      str = this.strings[1][what];
    } else {
      _tts.speech.speak(what);
    }

    rep.forEach((v, i) => {
      const i1 = Number(i) + 1;
      str = str.replace('%' + i1, v);
    });

    _tts.speech.speak(str);
  }

  async check(lng) {
    const len = _utilities.utils.objSize(this.strings) - 2;

    for (const i in this.strings[1]) {
      if (!this.strings[lng].hasOwnProperty(i)) {
        await new _scrollingText.ScrollingText(i + ': ' + this.strings[1][i]);
      }
    }
  }

}

var strings = new Strings();
exports.strings = strings;
},{"./main":"main.js","./utilities":"utilities.js","./tts":"tts.js","./scrollingText":"scrollingText.js"}],"languageSelector.js":[function(require,module,exports) {
'use strict';

var _soundObject = require("./soundObject");

var _input = require("./input");

var _keycodes = require("./keycodes");

var _tts = require("./tts");

class LanguageSelector {
  constructor(element, callback) {
    this.langs = [];
    this.input = new _input.KeyboardInput();
    this.input.init();
    this.langs.push("select a language. Selecciona un idioma.");
    this.langs.push("I want to play in English");
    this.langs.push("Quiero jugar en español.");
    this.id = document.getElementById(element);
    this.callback = callback;
    this.container = document.createElement('div');
    this.buttons = [];
    this.buttons[0] = document.createElement('div');
    this.buttons[0].innerHTML = this.langs[0];
    this.container.appendChild(this.buttons[0]);

    for (let i = 1; i < this.langs.length; i++) {
      this.buttons[i] = document.createElement('input');
      this.buttons[i].type = 'button';
      this.buttons[i].value = this.langs[i];
      this.buttons[i].addEventListener('click', () => {
        this.sound.stop();
        this.callback(i);
        this.container.innerHTML = '';
        this.input.removeAllListeners();
        document.getElementById("app").focus();
      });
      this.buttons[i].addEventListener('focus', () => {
        this.sound.stop();

        _tts.speech.setLanguage(i);

        _tts.speech.speak(this.langs[i]);
      });
      this.container.appendChild(this.buttons[i]);
      this.input.once("chr" + i, () => {
        this.sound.stop();
        this.callback(i);
        this.container.innerHTML = '';
        this.input.removeAllListeners();
        document.getElementById("app").focus();
      });
    }

    this.id.appendChild(this.container);
    this.sound = _soundObject.so.create("ui/langSelect");
    this.sound.play();
  }

}

module.exports.LanguageSelector = LanguageSelector;
},{"./soundObject":"soundObject.js","./input":"input.js","./keycodes":"keycodes.js","./tts":"tts.js"}],"soundSource.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SoundSource = void 0;

var _sono = _interopRequireDefault(require("sono"));

var _soundObject = require("./soundObject");

var _panner = _interopRequireDefault(require("sono/effects/panner"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_panner.default.defaults = {
  panningModel: 'HRTF',
  maxDistance: 50
};
/** Simple wrapper for agk-soundobject to quickly create 3D sound sources.
* @constructor
	* @param {string} file - the path to the file without base directory and extension.
	* @param {number} x - Initial X coordinate of the sound
	* @param {number} y - Initial Y coordinate of the sound
	* @param {number} z - Initial Z coordinate of the sound
	* @param {boolean} loop - True if the sound should loop
	* @return {object} A Sound Source object
*/

class SoundSource {
  constructor(file, x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.sound = son.create(file);
    this.pan = this.sound.effects.add((0, _panner.default)());
    this.pos(this.x, this.y, this.z);
    this.rate = 1;
    this.speed = 0;
    this.minRate = 0.8;
    this.maxRate = 1.2;
    this.toDestroy = false;
    this.rateShiftSpeed = 0.015;
    this.sound.currentPosition = 0;
  }

  set loop(v) {
    this.sound.loop = v;
  }
  /** Plays the sound source */


  play() {
    // This.sound.seek(0);
    this.sound.play();
  }
  /** Positions the sound source in 3D space.
  * @param {number} x - The new X coordinate of the sound
  * @param {number} y - The new Y coordinate of the sound
  * @param {number} z - The new Z coordinate of the sound
  */


  pos(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.pan.setPosition(x, y, z);
  }
  /** Empty update method */


  update() {}

}

exports.SoundSource = SoundSource;
},{"./soundObject":"soundObject.js"}],"soundHandler.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SoundHandler = void 0;

var _soundSource = require("./soundSource.js");

var _soundObject = require("./soundObject.js");

class SoundHandler {
  constructor(directional = false) {
    this.staticSounds = [];
    this.dynamicSounds = [];
    this.currentDynamicSound = 0;
    this.maxDynamicSounds = 512;
    this.currentStaticSound = 0;
    this.maxStaticSounds = 512;
    this.reuseSounds = true;
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.directional = directional;
  }

  playStatic(file, loop = 1, slot = -1, stream = false) {
    if (slot = -1) {
      slot = this.findFreeStaticSlot();
    }

    this.staticSounds[slot] = new SoundItem(file, this.directional, stream);

    if (loop == 1) {
      this.staticSounds[slot].sound.loop = true;
    }

    this.staticSounds[slot].sound.play();
    return slot;
  }

  findFreeStaticSlot() {
    for (let i = 0; i < this.maxStaticSounds; i++) {
      if (this.staticSounds[i] == -1 || typeof this.staticSounds[i] === 'undefined') {
        return i;
      }
    }

    if (this.currentStaticSound < this.maxStaticSounds) {
      this.currentStaticSound++;
      return this.currentStaticSound;
    }

    this.currentStaticSound = 0;
    return this.currentStaticSound;
  }

  findFreeDynamicSlot() {
    for (let i = 0; i < this.maxDynamicSounds; i++) {
      if (this.dynamicSounds[i] == -1 || typeof this.dynamicSounds[i] === 'undefined') {
        return i;
      }
    }

    if (this.currentDynamicSound < this.maxDynamicSounds) {
      this.currentDynamicSound++;
      return this.currentDynamicSound;
    }

    this.currentDynamicSound = 0;
    return this.currentDynamicSound;
  }

  findDynamicSound(file) {
    for (let i = 0; i < this.dynamicSounds.length; i++) {
      if (this.dynamicSounds[i].file == file) {
        return i;
      }
    }

    return -1;
  }

  play(file) {
    let slot = 0;
    let reuse = 0;

    if (this.reuseSounds) {
      slot = this.findDynamicSound(file);
      reuse = true;
    }

    if (slot == -1 || this.reuseSounds == false) {
      slot = this.findFreeDynamicSlot();
      reuse = false;
    }

    if (typeof this.dynamicSounds[slot] === 'undefined') {
      if (reuse == false) {
        this.dynamicSounds[slot] = new SoundItem(file, this.directional);
      }
    } else if (reuse == false) {
      this.dynamicSounds[slot].sound.destroy();
      this.dynamicSounds[slot] = new SoundItem(file, directional);
    }

    this.dynamicSounds[slot].sound.play();
  }

  update(position) {
    if (this.directional == true) {
      for (let i = 0; i < this.dynamicSounds.length; i++) {
        this.dynamicSounds[i].sound.pos(position.x, position.y, position.z);
      }
    }
  }

  destroy() {
    for (var i = 0; i < this.dynamicSounds.length; i++) {
      this.dynamicSounds[i].destroy();
      this.dynamicSounds.splice(i, 1);
    }

    for (var i = 0; i < this.staticSounds.length; i++) {
      this.staticSounds[i].destroy();
      this.staticSounds.splice(i, 1);
    }
  }

}

exports.SoundHandler = SoundHandler;

class SoundItem {
  constructor(file, threeD = false, stream = false) {
    this.file = file;
    this.threeD = threeD;

    if (this.threeD == true) {
      this.sound = new _soundSource.SoundSource(file, 0, 0, 0);
    } else {
      this.sound = _soundObject.so.create(file, stream);
    }
  }

  destroy() {
    this.sound.destroy();
  }

}
},{"./soundSource.js":"soundSource.js","./soundObject.js":"soundObject.js"}],"timer.js":[function(require,module,exports) {
function Timer(callbacks, step) {
	let last = 0;
	let active = false;
	let acc = 0;
	let tick = 0;
	let inc = step || 1 / 120;
	let frameId;

	function onFrame(time) {
		if (last !== null) {
			acc += (time - last) / 1000;
			while (acc > inc) {
				callbacks.update(inc, tick);
				tick += 1;
				acc -= inc;
			}
		}
		last = time;
		callbacks.render();
		if (active) {
			frameId = requestAnimationFrame(onFrame);
		}
	}

	function start() {
		last = null;
		active = true;
		frameId = requestAnimationFrame(onFrame);
	}

	function stop() {
		active = false;
		cancelAnimationFrame(frameId);
	}
	function change(value) {
		inc = value || 1 / 60;
		acc = inc;
		tick = 0;
		stop();
		start();
	}
	return {
		start,
			stop,
			change
	};
}

module.exports = Timer;

},{}],"gameObject.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameObject = void 0;

const EventEmitter = require('events');

class GameObject extends EventEmitter {
  constructor(world, sound, x, y, z, width, height, depth) {
    super();
    this.world = world;
    this.alive = true;
    this.x = x;
    this.y = y;
    this.z = z;

    if (sound != "") {
      this.sound = document.createElement("audio");
      this.sound.src = "./sounds/" + sound + ".ogg";
      this.mediaSource = this.world.context.createMediaElementSource(this.sound);
      this.source = this.world.scene.createSource();
      this.source.sourceWidth = width;
      this.source.sourceHeight = height;
      this.source.sourceDepth = depth;
      this.mediaSource.connect(this.source.input);
      this.source.setPosition(this.x, this.y, this.z);
      this.sound.play();
      this.sound.loop = true;
    }
  }

  update() {}

}

exports.GameObject = GameObject;
},{}],"item.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Item = void 0;

var _gameObject = require("./gameObject");

var _utilities = require("./utilities");

var _tts = require("./tts");

class Item extends _gameObject.GameObject {
  constructor(world, x, y, sound) {
    super(world, sound, x, y, 0, 1, 1, 1);
    this.world.player.on("step" + this.y, () => {
      if (this.world.player.x == this.x) this.step();
    });
    this.world.player.on("step" + (this.y + 1), () => {
      this.destroy();
    });
    this.world.player.on("x" + this.x, () => {
      if (!this.alive) return;
      let distance = Math.round(_utilities.utils.distance(this.world.player.x, this.world.player.y, this.x, this.y));

      if (distance < 8) {
        this.world.player.target.replay();
      }
    });
  }

  step() {}

  destroy() {
    this.alive = false;
  }

  update() {}

}

exports.Item = Item;
},{"./gameObject":"gameObject.js","./utilities":"utilities.js","./tts":"tts.js"}],"coin.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Coin = void 0;

var _item = require("./item");

var _main = require("./main");

var _tts = require("./tts");

class Coin extends _item.Item {
  constructor(world, x, y) {
    super(world, x, y, "loop/coin");
  }

  step() {
    this.world.player.coins++;
    this.world.game.pool.playStatic("player/getCoin", 0);
    _main.data.coins = this.world.player.coins;
    (0, _main.save)();
    this.alive = false;
  }

}

exports.Coin = Coin;
},{"./item":"item.js","./main":"main.js","./tts":"tts.js"}],"tile.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tile = void 0;

var _gameObject = require("./gameObject");

var _utilities = require("./utilities");

var _scrollingText = require("./scrollingText");

class Tile {
  constructor(world, pos, type, name) {
    this.y = pos;
    this.type = type;
    this.hasSomething = false;
    this.world = world;
    this.name = name;
    this.alive = true;
    this.world.player.on("step" + this.y, () => {
      this.step();
    });
  }

  step() {
    let scoreType = this.type;
    if (this.type == 0) scoreType = 1;
    let score = scoreType * this.world.player.currentSpeed;
    this.world.game.score += score * this.world.game.level * 50;

    if (this.type != 2) {
      clearInterval(this.world.player.scoreTimeout);
      this.world.player.levelCap = this.world.game.level;
      if (this.world.player.levelCap > 15) this.levelCap = 15;
    }

    this.world.game.pool.playStatic("steps/" + this.name + _utilities.utils.randomInt(1, 3), 0);
    this.world.player.tileType = this.type;
  }

  update() {}

  destroy() {}

}

exports.Tile = Tile;
},{"./gameObject":"gameObject.js","./utilities":"utilities.js","./scrollingText":"scrollingText.js"}],"street.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Street = void 0;

var _gameObject = require("./gameObject");

var _utilities = require("./utilities");

var _tile = require("./tile");

class Street extends _tile.Tile {
  constructor(world, pos) {
    super(world, pos, 0, "street");
  }

  step() {
    super.step();
    this.world.player.stepProgress.pitch = _utilities.utils.getProportion(this.y, this.world.player.furthestStreet, this.world.player.nearestStreet, 0.7, 1.3);
    this.world.player.stepProgress.replay();
  }

}

exports.Street = Street;
},{"./gameObject":"gameObject.js","./utilities":"utilities.js","./tile":"tile.js"}],"objective.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Objective = void 0;

var _gameObject = require("./gameObject");

var _tile = require("./tile");

var _tts = require("./tts");

class Objective extends _tile.Tile {
  constructor(world, pos) {
    super(world, pos, 2, "objective");
  }

  destroy() {}

  step() {
    super.step();
    this.world.game.pool.playStatic("steps/objective", 0);
    this.world.player.scoreTimeout = setInterval(() => {
      this.world.player.scoreDeduct();
    }, 1300 - this.world.player.levelCap * 75);
    this.world.generateTiles();
    this.world.player.slowDown(10);
  }

}

exports.Objective = Objective;
},{"./gameObject":"gameObject.js","./tile":"tile.js","./tts":"tts.js"}],"car.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Car = void 0;

var _gameObject = require("./gameObject");

var _utilities = require("./utilities");

var _tts = require("./tts");

var _main = require("./main");

class Car extends _gameObject.GameObject {
  constructor(world, tile, x, y, width, height, depth, sound = "car", speed, side, z = 1, canHorn = "", name) {
    super(world, sound, x, y, z, width, height, depth);
    this.name = name;
    this.speed = speed;
    this.passed = false;
    this.side = side;
    this.tile = tile;
    this.tile.hasSomething = true;
    this.canHorn = canHorn;

    if (this.canHorn != "") {
      if (this.canHorn == 1) this.canHorn = this.name;
      this.hornSound = document.createElement("audio");
      this.hornSound.src = "./sounds/horn/" + this.name + ".ogg";
      this.hornSource = this.world.context.createMediaElementSource(this.hornSound);
      this.hornResonanceSource = this.world.scene.createSource();
      this.hornSource.connect(this.hornResonanceSource.input); //horn follows the player because a it plays only if player is on the road and b we want the player to feel trapped on the road by this honking car since that's what happens

      this.hornResonanceSource.setPosition(this.x, this.world.player.y, this.z);
      this.hornSound.loop = true;
    }
  }

  update() {
    if (this.side == 2) this.x += this.speed;
    if (this.side == 1) this.x -= this.speed;

    if (this.x >= this.world.size / 2 || this.x <= this.world.size / 2 * -1) {
      this.alive = false;
      if (this.canHorn != "") this.hornSound.pause();
      this.tile.hasSomething = false;
    } else {
      //ok, player spans the entire road. So the car sound should equally follow the player to make him feel trapped.
      if (this.world.player.tileType != 1) this.source.setPosition(this.x, this.y, this.z);
      if (this.world.player.tileType == 1) this.source.setPosition(this.x, this.world.player.y, this.z);

      if (this.passed || this.canHorn != "" && this.y != this.world.player.y) {
        if (this.canHorn != "") this.hornSound.pause();
      }

      if (!this.passed && this.canHorn != "" && this.world.player.tileType == 1) {
        this.hornResonanceSource.setPosition(this.x, this.y, this.z);
        this.hornSound.play();
      }

      if (!this.world.player.jump) {
        if (!this.passed) {
          if (Math.round(this.x) == this.world.player.x && this.world.player.tileType != 1) {
            this.passed = true;
            this.tile.hasSomething = false; //let score = Math.round(this.speed * (1000 * this.world.game.level));
            //if (this.world.player.tileType != 2) {
            //              this.world.game.score += score;
            //              speech.speak(score);
            //}

            if (typeof this.tile.timeout !== "undefined") {
              clearTimeout(this.tile.timeout);
            }

            this.tile.timeout = setTimeout(() => {
              this.tile.generateCar(_utilities.utils.randomInt(1, _main.content.numberOfVehicles));
            }, _utilities.utils.randomInt(0, this.world.game.spawnTime - this.world.game.level * 100));
          }

          if (!this.passed && this.alive && Math.round(this.x) == this.world.player.x && this.world.player.tileType == 1) {
            if (this.world.player.jumps >= 1) {
              this.world.game.pool.playStatic("bonus/hyperjump", 0);
              this.world.player.jumps--;
              _main.data.jumps = this.world.player.jumps;
              this.world.player.flyTo(this.world.player.nearestObjective, 3, "air");
            } else {
              let healthLoss = Math.round(this.speed * 45);
              this.world.player.hp -= healthLoss;
              this.world.player.hit();
              this.world.player.flyTo(_utilities.utils.randomInt(this.world.player.nearestStreet, this.world.player.furthestStreet), this.side, "air");
            }

            this.passed = true;
            this.tile.hasSomething = false;
          }

          if (typeof this.tile.timeout !== "undefined") {
            clearTimeout(this.tile.timeout);
          }

          this.tile.timeout = setTimeout(() => {
            this.tile.generateCar(_utilities.utils.randomInt(1, _main.content.numberOfVehicles));
          }, _utilities.utils.randomInt(0, this.world.game.spawnTime - this.world.game.level * 100));
        }
      }
    }
  }

}

exports.Car = Car;
},{"./gameObject":"gameObject.js","./utilities":"utilities.js","./tts":"tts.js","./main":"main.js"}],"road.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Road = void 0;

var _gameObject = require("./gameObject");

var _car = require("./car");

var _main = require("./main");

var _utilities = require("./utilities");

var _tile = require("./tile");

var _tts = require("./tts");

class Road extends _tile.Tile {
  constructor(world, pos, generator = false) {
    super(world, pos, 1, "road");
    this.generator = generator;
    this.timeout = setTimeout(() => {
      if (!_main.debug) this.generateCar(_utilities.utils.randomInt(1, _main.content.numberOfVehicles));
    }, _utilities.utils.randomInt(0, this.world.game.spawnTime - this.world.game.level * 100));
  }

  generateCar(force) {
    if (!this.generator || !this.alive) return;
    if (typeof this.timeout !== "undefined") clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      if (!_main.debug) this.generateCar(_utilities.utils.randomInt(1, _main.content.numberOfVehicles));
    }, _utilities.utils.randomInt(0, this.world.game.spawnTime - this.world.game.level * 100));
    if (this.hasSomething) return;

    let side = _utilities.utils.randomInt(1, 2);

    let size = this.world.size / 2;
    if (side == 1) size = size * 1;
    if (side == 2) size = size * -1;
    let carType = force;

    try {
      this.world.dynamicObjects.push(new _car.Car(this.world, this, size, this.y, 2, 1, 2, _main.parsedCars[carType].sound, _main.parsedCars[carType].speed, side, _main.parsedCars[carType].z, _main.parsedCars[carType].hornable, _main.parsedCars[carType].name));
    } catch (e) {
      _tts.speech.speak("Error generating car " + carType + ": " + e);
    }

    this.hasSomething = true;
  }

  destroy() {
    if (typeof this.timeout !== "undefined") clearTimeout(this.timeout);
  }

  step() {
    super.step();
    this.world.player.stepProgress.pitch = _utilities.utils.getProportion(this.y, this.world.player.nearestRoad, this.world.player.furthestRoad, 0.1, 2.0);
    this.world.player.stepProgress.replay();
  }

}

exports.Road = Road;
},{"./gameObject":"gameObject.js","./car":"car.js","./main":"main.js","./utilities":"utilities.js","./tile":"tile.js","./tts":"tts.js"}],"effect.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Effect = void 0;

class Effect {
  constructor(world, name, time, onFunction, ofFunction) {
    this.world = world;
    this.world.game.pool.playStatic("effects/" + name, 0);
    onFunction();
    setTimeout(() => {
      ofFunction();
      this.world.game.pool.playStatic("effects/" + name + "Off", 0);
    }, time);
  }

}

exports.Effect = Effect;
},{}],"bonus.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Bonus = void 0;

var _item = require("./item");

var _effect = require("./effect");

var _utilities = require("./utilities");

var _strings = require("./strings");

var _main = require("./main");

var _tts = require("./tts");

class Bonus extends _item.Item {
  constructor(world, x, y) {
    super(world, x, y, "loop/bonus");
  }

  step() {
    if (!this.alive) return;
    this.alive = false;
    let bonuses = [1, 4];
    if (_main.data.unlocks.jumps) bonuses.push(2);
    if (!this.world.player.forceSpeed) bonuses.push(3);

    let bonusType = _utilities.utils.randomElement(bonuses);

    switch (bonusType) {
      case 1:
        this.world.game.pool.playStatic("bonus/health", 0);
        this.world.player.hp += 25;
        break;

      case 2:
        this.world.game.pool.playStatic("bonus/hyperjump", 0);
        this.world.player.jumps++;
        _main.data.jumps++;
        break;

      case 3:
        let crawl = new _effect.Effect(this.world, "crawl", 20000, () => {
          this.oldSpeed = this.world.player.currentSpeed;
          this.world.player.slowDown(10);
          this.world.player.speedUp(6);
          this.world.player.forceSpeed = true;
          this.world.player.forcedSpeed = 6;
        }, () => {
          this.world.player.speedUp(this.oldSpeed);
          this.world.player.forceSpeed = false;
        });
        break;

      default:
        this.world.game.pool.playStatic("bonus/fake", 0);
        break;
    }

    setTimeout(() => {
      _tts.speech.speak(_strings.strings.get("bonus" + bonusType));
    }, 280);
    (0, _main.save)();
  }

}

exports.Bonus = Bonus;
},{"./item":"item.js","./effect":"effect.js","./utilities":"utilities.js","./strings":"strings.js","./main":"main.js","./tts":"tts.js"}],"player.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Player = void 0;

var _gameObject = require("./gameObject");

var _keycodes = require("./keycodes.js");

var _soundObject = require("./soundObject");

var _tts = require("./tts");

var _utilities = require("./utilities");

var _main = require("./main");

const EventEmitter = require('events');

class Player extends _gameObject.GameObject {
  constructor(world) {
    super(world, "", 0, 0, 1.6, 1, 0.5, 1.6);
    this.playerHitSound = _soundObject.so.create("player/hit");
    this.forceSpeed = false;
    this.stepProgress = _soundObject.so.create("steps/progress");
    this.target = _soundObject.so.create("player/target");
    this.coins = 0;
    if (_main.data.coins) this.coins = _main.data.coins;
    this.jumps = 0;
    if (_main.data.jumps) this.jumps = _main.data.jumps;
    this.center = _soundObject.so.create("ui/center");
    this.xLimit = Math.ceil(this.world.size / 10);
    this.fallTime = 55;
    this.world.scene.setListenerPosition(this.x, this.y, this.z);
    this.unableToMove = false;
    this.hp = 100;
    this.speedUpSound = _soundObject.so.create("ui/speedUp");
    this.nearestStreet = 0;
    this.nearestRoad = 0;
    this.nearestObjective = 0;
    this.furthestStreet = 0;
    this.furthestRoad = 0;
    this.speedDownSound = _soundObject.so.create("ui/speedDown");
    this.speed = 650; //speed 0 is unused, speeds 1 to 5 are manually attainable, speed 6 is a crawl and speed 7 is super speed.

    this.speeds = [0, 650, 530, 420, 350, 235, 890, 120];
    this.speedModifier = 0;
    this.currentSpeed = 0;
  }

  move() {
    if (this.unableToMove) return;
    this.speedTimeout = setTimeout(() => {
      this.move();
    }, this.speeds[this.currentSpeed] - this.speedModifier);
    if (this.currentSpeed == 0) this.currentSpeed = 1;
    this.xLimit = Math.ceil(this.world.size / 8);
    this.y += 1;
    this.emit("step" + this.y);

    if (this.world.game.input.isDown(_keycodes.KeyEvent.DOM_VK_RIGHT)) {
      this.x++;
      if (this.x > 0 + this.xLimit) this.x = 0 + this.xLimit;
      if (this.x == this.world.size / 2) this.center.replay();
    }

    if (this.world.game.input.isDown(_keycodes.KeyEvent.DOM_VK_LEFT)) {
      this.x--;
      if (this.x < 0 - this.xLimit) this.x = 0 - this.xLimit;
      if (this.x == this.world.size / 2) this.center.replay();
    }

    this.world.scene.setListenerPosition(this.x, this.y, this.z);
    this.emit("x" + this.x);
  }

  speedUp(number = 1) {
    if (this.forceSpeed) return;
    if (this.unableToMove) return;

    if (this.currentSpeed == 0) {
      this.speedUpSound.pitch = _utilities.utils.getProportion(1, 1, 5, 0.8, 1.2);
      this.speedUpSound.replay();
      this.move();
    }

    this.currentSpeed += number - 1;
    if (this.currentSpeed > 7) this.currentSpeed = 7;
    this.speedUpSound.pitch = _utilities.utils.getProportion(this.currentSpeed, 1, 5, 0.8, 1.2);
    this.speedUpSound.replay();

    _tts.speech.speak(this.currentSpeed);
  }

  slowDown(number = 1) {
    if (this.forceSpeed) return;
    if (this.unableToMove) return;
    this.currentSpeed -= number; //we don't want the player to be able to stop with the down arrow key, but if some item is forcing the player to stop, we can allow it.

    if (number == 1 && this.currentSpeed == 0) this.currentSpeed = 1;

    if (this.currentSpeed <= 0) {
      this.currentSpeed = 0;
      if (typeof this.speedTimeout !== "undefined") clearTimeout(this.speedTimeout);
    }

    if (number == 1) this.speedDownSound.pitch = _utilities.utils.getProportion(this.currentSpeed, 1, 5, 0.8, 1.2);
    if (number == 1) this.speedDownSound.replay();

    _tts.speech.speak(this.currentSpeed);
  }

  hit() {
    this.playerHitSound.play();
    this.world.game.pool.playStatic("player/impact/" + _utilities.utils.randomInt(1, 4), 0);
  }

  flyTo(y, side, snd) {
    if (this.unableToMove) return;
    this.tileType = -1;
    this.unableToMove = true;

    let heart = _soundObject.so.create("player/heart");

    heart.play();

    let sound = _soundObject.so.create(snd);

    sound.loop = true;
    sound.volume = 0.3;

    let land = _soundObject.so.create("player/land");

    let fall = _soundObject.so.create("player/fall" + _utilities.utils.randomInt(1, 4));

    let stand = _soundObject.so.create("player/stand");

    sound.pitch = 0.7;
    sound.play();
    sound.loop = true;
    heart.loop = true;
    this.slowDown(10);

    let z = _utilities.utils.randomInt(11, 21);

    let x;
    let jump = false;
    if (side == 1) x = -1;
    if (side == 2) x = 1;

    if (side == 3) {
      jump = true;
      this.jump = true;
      z = _utilities.utils.randomInt(5, 10);
    }

    this.interval = setInterval(() => {
      if (!jump) this.x += x * _utilities.utils.randomInt(3, 5);

      if (this.x < 0 - this.world.size / 2) {
        x = 1;
        this.world.game.pool.playStatic("player/wall" + _utilities.utils.randomInt(1, 3), 0);
      }

      if (this.x > this.world.size / 2) {
        x = -1;
        this.world.game.pool.playStatic("player/wall" + _utilities.utils.randomInt(1, 3), 0);
      }

      sound.pitch += 0.07;

      if (this.y > y) {
        this.y -= 0.5;
      }

      if (this.y < y) {
        this.y += 0.5;
      }

      this.z += 1;

      if (this.z >= z) {
        this.y = y;
        clearInterval(this.interval);
        this.interval = setInterval(() => {
          this.z -= 1;
          sound.pitch -= 0.07;

          if (this.z <= 0) {
            this.tileType = 0;
            clearInterval(this.interval);

            if (jump) {
              land.play();
              this.z = 1.6;
              this.jump = false;
              this.unableToMove = false;
              heart.stop();

              if (this.forceSpeed) {
                _tts.speech.speak("Speeding up to " + this.forcedSpeed);

                this.forceSpeed = false;
                this.speedUp(this.forcedSpeed);
                this.forceSpeed = true;
              }
            }

            if (!jump) {
              this.x = 0;
              fall.play();
              this.z = 0;
              setTimeout(() => {
                stand.replay();
                heart.stop();
                stand.sound.on("ended", () => {
                  this.z = 1.6;
                  this.jump = false;
                  this.unableToMove = false;

                  if (this.forceSpeed) {
                    this.forceSpeed = false;
                    this.slowDown(10);
                    this.forceSpeed = true;
                  } else {
                    this.slowDown(10);
                  }

                  if (this.forceSpeed) {
                    this.forceSpeed = false;
                    this.speedUp(this.forcedSpeed);
                    this.forceSpeed = true;
                  }
                });
                this.world.scene.setListenerPosition(this.x, this.y, this.z);
              }, _utilities.utils.randomInt(1000, 2000));
            }

            this.world.scene.setListenerPosition(this.x, this.y, this.z);
            sound.stop(); //heart.stop()

            this.x = 0;
            this.emit("step" + this.y); //if (this.forceSpeed) this.speedUp(this.forcedSpeed)
          }

          this.world.scene.setListenerPosition(this.x, this.y, this.z);
        }, this.fallTime);
      }

      this.world.scene.setListenerPosition(this.x, this.y, this.z);
    }, this.fallTime * 1.2);
  }

  scoreDeduct() {
    this.world.game.tick.replay();
    this.world.game.score -= 100 * this.world.game.level;
    if (this.world.game.score < 0) this.world.game.score = 0;
    this.levelCap = this.world.game.level;
    if (this.levelCap > 15) this.levelCap = 15;
  }

}

exports.Player = Player;
},{"./gameObject":"gameObject.js","./keycodes.js":"keycodes.js","./soundObject":"soundObject.js","./tts":"tts.js","./utilities":"utilities.js","./main":"main.js"}],"world.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.World = void 0;

var _soundObject = require("./soundObject");

var _coin = require("./coin");

var _street = require("./street");

var _objective = require("./objective");

var _road = require("./road");

var _bonus = require("./bonus");

var _utilities = require("./utilities");

var _car = require("./car");

require("resonance-audio");

var _player = require("./player");

var _main = require("./main");

var _tts = require("./tts");

const {
  ResonanceAudio
} = require('resonance-audio');

class World {
  constructor(game, size = 100) {
    this.size = size;
    this.game = game;
    this.dynamicObjects = [];
    this.tiles = [];
    this.context = new AudioContext();
    this.convolution = this.context.createConvolver();
    this.scene = new ResonanceAudio(this.context);
    this.convolution.connect(this.scene.output);
    this.scene.output.connect(this.context.destination);
    this.player = new _player.Player(this);
  }

  generateTiles() {
    for (let i = 0; i < this.tiles.length; i++) {
      this.tiles[i].alive = false;
      this.tiles[i].destroy();
    }

    this.tiles = [];
    let lastStreet = this.player.y; //the below line will sound weird, but I want as many streets as x squares the player can move to either side, so as to have a fair chance at targetting bonuses

    let lastStreetLimit = lastStreet + _utilities.utils.randomInt(this.player.xLimit, this.player.xLimit + 4);

    this.player.nearestStreet = lastStreet + 1;

    for (let i = lastStreet + 1; i <= lastStreetLimit; i++) {
      this.tiles.push(new _street.Street(this, i));
      lastStreet = i;
    }

    let tiles = Math.round(this.game.roadsPerLevel + this.game.level / 2);
    let lastRoad = 0;
    this.player.nearestRoad = lastStreet + 1;
    this.player.furthestStreet = lastStreet; //let generator = (this.player.nearestRoad + tiles) - tiles/2

    let generator = this.player.nearestRoad;

    for (let i = lastStreet + 1; i <= lastStreet + tiles; i++) {
      if (generator == i) this.tiles.push(new _road.Road(this, i, true));
      if (generator != i) this.tiles.push(new _road.Road(this, i, false));
      lastRoad = i;
    }

    this.player.nearestObjective = lastRoad + 1;
    this.player.furthestRoad = lastRoad;
    this.tiles.push(new _objective.Objective(this, lastRoad + 1)); //item spawning, one item chance per level, doesn't always spawn

    for (let i = 1; i <= this.game.level; i++) {
      let x = _utilities.utils.randomInt(0 - this.player.xLimit, 0 + this.player.xLimit);

      let random = _utilities.utils.randomInt(1, 2);

      switch (random) {
        default:
          break;
        //coins are dropped on the street

        case 1:
          this.dynamicObjects.push(new _coin.Coin(this, x, this.player.nearestStreet + this.player.xLimit, this.player.furthestStreet));
          break;
        //bonuses appear anywhere on the road

        case 2:
          this.dynamicObjects.push(new _bonus.Bonus(this, x, this.player.nearestRoad, this.player.furthestRoad));
          break;
      }
    }
  }

  update() {
    for (let i = 0; i < this.dynamicObjects.length; i++) {
      if (!this.dynamicObjects[i].alive) {
        this.dynamicObjects[i].sound.pause();
        this.dynamicObjects.splice(i, 1);
        i--;
      } else {
        this.dynamicObjects[i].update();
      }
    }
  }

}

exports.World = World;
},{"./soundObject":"soundObject.js","./coin":"coin.js","./street":"street.js","./objective":"objective.js","./road":"road.js","./bonus":"bonus.js","./utilities":"utilities.js","./car":"car.js","./player":"player.js","./main":"main.js","./tts":"tts.js"}],"game.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Game = void 0;

var _tts = require("./tts");

var _strings = require("./strings");

var _main = require("./main");

var _soundHandler = require("./soundHandler");

var _timer = _interopRequireDefault(require("./timer"));

var _jquery = _interopRequireDefault(require("jquery"));

var _utilities = require("./utilities");

var _scrollingText = require("./scrollingText");

var _input = require("./input.js");

var _keycodes = require("./keycodes.js");

var _soundObject = require("./soundObject");

var _world = require("./world");

var _road = require("./road");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Game {
  constructor() {
    this.tick = _soundObject.so.create("tick");
    this.scoreSound = _soundObject.so.create("scoreCounter");
    this.scoreSound.volume = 0.4;
    this.input = new _input.KeyboardInput();
    this.pool = new _soundHandler.SoundHandler();
    this.input.init();
    this.timer = (0, _timer.default)({
      update: () => this.update(),
      render: () => this.render()
    }, 1 / 45);
    this.score = 0;
    this.level = 1;
    this.spawnTime = 3000 - this.level * 100;
    this.roadsPerLevel = 5;
  }

  start() {
    this.timer.start();
    this.world = new _world.World(this, 80);
    if (!_main.debug) this.world.generateTiles(); //speech.speak(strings.get("upArrowMove"))
  }

  update(dt) {
    if (this.input.isJustPressed(_keycodes.KeyEvent.DOM_VK_0)) {
      this.world.player.slowDown(10);
    }

    if (this.input.isJustPressed(_keycodes.KeyEvent.DOM_VK_D) && _main.debug) {
      let debugRoad = new _road.Road(this.world, 1, true);
      let number = _main.content.numberOfVehicles;
      debugRoad.generateCar(number);
      debugRoad.generator = false;
      this.world.player.y = 0;
    }

    if (this.input.isJustPressed(_keycodes.KeyEvent.DOM_VK_I)) {
      let nothing = true;

      if (_main.data.jumps > 0) {
        nothing = false;

        _tts.speech.speak(_strings.strings.get("iJumps", [_main.data.jumps]));
      }

      if (nothing) {
        _tts.speech.speak(_strings.strings.get("emptyInventory"));
      }
    }

    if (this.input.isJustPressed(_keycodes.KeyEvent.DOM_VK_UP)) {
      this.world.player.speedUp();
    }

    if (this.input.isJustPressed(_keycodes.KeyEvent.DOM_VK_DOWN)) {
      this.world.player.slowDown();
    }

    if (this.input.isJustPressed(_keycodes.KeyEvent.DOM_VK_C)) {
      _tts.speech.speak(this.world.player.coins + _strings.strings.get("coins"));
    }

    if (this.input.isJustPressed(_keycodes.KeyEvent.DOM_VK_S)) {
      _tts.speech.speak(this.score + _strings.strings.get("points"));
    }

    if (this.input.isJustPressed(_keycodes.KeyEvent.DOM_VK_X)) {
      _tts.speech.speak(this.world.player.x + ", " + this.world.player.y + ", " + this.world.player.z);
    }

    if (this.input.isJustPressed(_keycodes.KeyEvent.DOM_VK_L)) {
      _tts.speech.speak(_strings.strings.get("level") + this.level);
    }

    if (this.input.isJustPressed(_keycodes.KeyEvent.DOM_VK_H)) {
      _tts.speech.speak(this.world.player.hp + " " + _strings.strings.get("hp"));
    }

    if (this.input.isJustPressed(_keycodes.KeyEvent.DOM_VK_1)) {
      this.world.player.slowDown(10);
      this.world.player.speedUp(1);
    }

    if (this.input.isJustPressed(_keycodes.KeyEvent.DOM_VK_2)) {
      this.world.player.slowDown(10);
      this.world.player.speedUp(2);
    }

    if (this.input.isJustPressed(_keycodes.KeyEvent.DOM_VK_3)) {
      this.world.player.slowDown(10);
      this.world.player.speedUp(3);
    }

    if (this.input.isJustPressed(_keycodes.KeyEvent.DOM_VK_4)) {
      this.world.player.slowDown(10);
      this.world.player.speedUp(4);
    }

    if (this.input.isJustPressed(_keycodes.KeyEvent.DOM_VK_5)) {
      this.world.player.slowDown(10);
      this.world.player.speedUp(5);
    }

    this.world.update();
  }

  render() {}

}

exports.Game = Game;
},{"./tts":"tts.js","./strings":"strings.js","./main":"main.js","./soundHandler":"soundHandler.js","./timer":"timer.js","./utilities":"utilities.js","./scrollingText":"scrollingText.js","./input.js":"input.js","./keycodes.js":"keycodes.js","./soundObject":"soundObject.js","./world":"world.js","./road":"road.js"}],"menuItem.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenuTypes = exports.SelectorItem = exports.SliderItem = exports.AudioItem = exports.MenuItem = void 0;

var _tts = require("./tts");

var _soundObject = require("./soundObject");

const MenuTypes = {
  NORMAL: 0,
  SELECTOR: 1,
  SLIDER: 2,
  EDIT: 3,
  AUDIO: 4
};
exports.MenuTypes = MenuTypes;

class MenuItem {
  constructor(id, name) {
    this.name = name;
    this.id = id;
    this.type = MenuTypes.NORMAL;
  }

  speak() {
    _tts.speech.speak(this.name);
  }

  select() {
    return this.id;
  }

}

exports.MenuItem = MenuItem;

class AudioItem extends MenuItem {
  constructor(id, name) {
    super();
    this.name = name;
    this.type = MenuTypes.AUDIO;
    this.id = id;
    this.snd = _soundObject.so.create(this.name);
  }

  speak() {
    this.snd.stop();
    this.snd.play();
  }

  select() {
    return this.id;
  }

}

exports.AudioItem = AudioItem;

class SelectorItem extends MenuItem {
  constructor(id, name, options, defaultOption = 0, selectCallback) {
    super();
    this.id = id;
    this.name = name;
    this.options = options;
    this.type = MenuTypes.SELECTOR;
    this.currentOption = defaultOption;
    this.selectCallback = selectCallback;
  }

  speak() {
    _tts.speech.speak(this.name + '. Selector. Set to ' + this.options[this.currentOption]);
  }

  increase() {
    if (this.currentOption < this.options.length - 1) {
      this.currentOption++;
    }

    _tts.speech.speak(this.options[this.currentOption]);

    if (typeof this.selectCallback !== 'undefined') {
      this.selectCallback(this.options[this.currentOption]);
    }
  }

  decrease() {
    if (this.currentOption > 0) {
      this.currentOption--;
    }

    _tts.speech.speak(this.options[this.currentOption]);

    if (typeof this.selectCallback !== 'undefined') {
      this.selectCallback(this.options[this.currentOption]);
    }
  }

  select() {
    return this.id;
  }

}

exports.SelectorItem = SelectorItem;

class SliderItem extends MenuItem {
  constructor(id, name, from, to, currentValue = 0, increaseBy = 1) {
    super();
    this.id = id;
    this.name = name;
    this.minValue = from;
    this.maxValue = to;
    this.currentValue = currentValue;
    this.increaseBy = increaseBy;
    this.type = MenuTypes.SLIDER;
  }

  speak() {
    _tts.speech.speak(this.name + '. Slider. Set to ' + this.currentValue);
  }

  increase() {
    if (this.currentValue < this.maxValue) {
      this.currentValue += this.increaseBy;
    }

    if (this.currentValue > this.maxValue) this.currentValue = this.maxValue;

    _tts.speech.speak(this.currentValue);
  }

  decrease() {
    if (this.currentValue > this.minValue) {
      this.currentValue -= this.increaseBy;
    }

    if (this.currentValue < this.minValue) this.currentValue = this.minValue;

    _tts.speech.speak(this.currentValue);
  }

  select() {
    return this.id;
  }

}

exports.SliderItem = SliderItem;

class EditItem extends MenuItem {
  constructor(id, name, defaultText = '') {
    super();
    this.id = id;
    this.name = name;
    this.text = defaultText;
    this.type = MenuTypes.EDIT;
  }

  speak() {
    _tts.speech.speak(this.name + '. Editable. ' + (this.text == '' ? 'Nothing entered.' : 'Set to ' + this.text));
  }

  addChar(char) {
    this.text += char;

    _tts.speech.speak(char);
  }

  removeChar() {
    this.text = this.text.substring(0, this.text.length - 1);

    _tts.speech.speak(this.text);
  }

  select() {
    return this.text;
  }

}
},{"./tts":"tts.js","./soundObject":"soundObject.js"}],"menu.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Menu = void 0;

require("babel-polyfill");

var _utilities = require("./utilities");

var _hammerjs = _interopRequireDefault(require("hammerjs"));

var _tts = require("./tts");

var _soundObject = require("./soundObject.js");

var _menuItem = require("./menuItem");

var _keycodes = require("./keycodes");

var _input = require("./input");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Menu {
  constructor(name, menuData, music) {
    this.kp = event => {
      this.handleInput(event);
    };

    this.kd = event => {
      this.handleKeys(event);
    };

    this.fadeTime = 0.6;
    this.menuData = menuData;
    let audio = name.split(" ");
    if (audio.length < 2) this.isAudio = true;
    if (audio.length >= 2) this.isAudio = false;
    this.silent = false;
    this.prependAudio = "";
    this.first = true;
    this.cursor = 0;
    this.name = name;
    let dir = _soundObject.so.directory;
    _soundObject.so.directory = "./sounds/";
    this.sndKeyChar = _soundObject.so.create('ui/keyChar');
    this.sndKeyDelete = _soundObject.so.create('ui/keyDelete');
    this.sndSliderLeft = _soundObject.so.create('ui/menuSliderLeft');
    this.sndSliderRight = _soundObject.so.create('ui/menuSliderRight');
    this.sndBoundary = _soundObject.so.create('ui/menuBoundary');
    this.sndChoose = _soundObject.so.create('ui/menuChoose');
    this.sndMove = _soundObject.so.create('ui/menuMove');
    this.sndOpen = _soundObject.so.create('ui/menuOpen');
    this.sndSelector = _soundObject.so.create('ui/menuSelector');
    this.sndWrap = _soundObject.so.create('ui/menuWrap');
    _soundObject.so.directory = dir;
    this.selectCallback = null;

    if (typeof music !== 'undefined') {
      this.music = music;
    }

    const id = document.getElementById('touchArea');
    this.hammer = new _hammerjs.default(id);
  }

  nextItem() {
    _tts.speech.stop();

    if (!this.first) {
      if (this.cursor < this.menuData.length - 1) {
        if (!this.silent) this.sndMove.play();
        this.cursor++;
      } else {
        if (!this.silent) this.sndWrap.play();
        this.cursor = 0;
      }
    } else {
      if (!this.silent) this.sndMove.play();
      this.first = false;
    }

    if (this.isAudio) {
      this.sndName.stop();

      for (let i = 0; i < this.menuData.length; i++) {
        if (this.menuData[i].type == _menuItem.MenuTypes.AUDIO) this.menuData[i].snd.stop();
      }
    }

    this.menuData[this.cursor].speak();
  }

  previousItem() {
    _tts.speech.stop();

    if (this.first) {
      this.first = false;
      if (!this.silent) this.sndMove.play();
    }

    if (this.cursor > 0) {
      if (!this.silent) this.sndMove.play();
      this.cursor--;
    } else {
      this.cursor = this.menuData.length - 1;
      if (!this.silent) this.sndWrap.play();
    }

    if (this.isAudio) {
      this.sndName.stop();

      for (let i in this.menuData) {
        if (this.menuData[i].type == _menuItem.MenuTypes.AUDIO) this.menuData[i].snd.stop();
      }
    }

    this.menuData[this.cursor].speak();

    if (typeof this.moveCallback !== "undefined") {
      this.moveCallback(this.menuData[this.cursor].id);
    }
  }

  increase() {
    if (this.menuData[this.cursor].type == _menuItem.MenuTypes.SLIDER || this.menuData[this.cursor].type == _menuItem.MenuTypes.SELECTOR) {
      this.menuData[this.cursor].increase();

      if (this.menuData[this.cursor].type == _menuItem.MenuTypes.SLIDER) {
        if (!this.silent) this.sndSliderRight.play();
      } else {
        if (!this.silent) this.sndSelector.play();
      }
    }
  }

  decrease() {
    if (this.menuData[this.cursor].type == _menuItem.MenuTypes.SLIDER || this.menuData[this.cursor].type == _menuItem.MenuTypes.SELECTOR) {
      this.menuData[this.cursor].decrease();

      if (this.menuData[this.cursor].type == _menuItem.MenuTypes.SLIDER) {
        if (!this.silent) this.sndSliderLeft.play();
      } else {
        if (!this.silent) this.sndSelector.play();
      }
    }
  }

  insertCharacter(char) {
    if (this.menuData[this.cursor].type == _menuItem.MenuTypes.EDIT) {
      this.menuData[this.cursor].addChar(String.fromCharCode(char));
      if (!this.silent) this.sndKeyChar.play();
      return;
    } // Char navigation code


    for (let i = this.cursor + 1; i < this.menuData.length; i++) {
      if (this.menuData[i].shortcut == String.fromCharCode(char).toLowerCase()) {
        this.cursor = i;
        this.select();
        return;
      }

      if (this.menuData[i].name.toLowerCase().substr(0, 1) == String.fromCharCode(char).toLowerCase()) {
        this.cursor = i;
        this.menuData[this.cursor].speak();
        this.first = false;
        return;
      }
    }

    for (let i = 0; i < this.menuData.length; i++) {
      if (this.menuData[i].shortcut == String.fromCharCode(char).toLowerCase()) {
        this.cursor = i;
        this.select();
        return;
      }

      if (this.menuData[i].name.toLowerCase().substr(0, 1) == String.fromCharCode(char).toLowerCase()) {
        this.cursor = i;
        this.menuData[this.cursor].speak();
        this.first = false;
        return;
      }
    }
  }

  removeCharacter() {
    if (this.menuData[this.cursor].type == _menuItem.MenuTypes.EDIT) {
      this.menuData[this.cursor].removeChar();
      if (!this.silent) this.sndKeyDelete.play();
    }
  }

  handleInput(event) {
    this.insertCharacter(event.which);
  }

  destroySounds() {
    this.sndKeyChar.destroy();
    this.sndKeyDelete.destroy();
    this.sndSliderLeft.destroy();
    this.sndSliderRight.destroy();
    if (this.isAudio) this.sndName.destroy();
    this.sndBoundary.destroy();
    this.sndChoose.destroy();
    this.sndMove.destroy();
    this.sndOpen.destroy();
    this.sndSelector.destroy();
    this.sndWrap.destroy();

    for (let i = 0; i < this.menuData.length; i++) {
      if (this.menuData[i].type == _menuItem.MenuTypes.AUDIO) this.menuData[i].snd.destroy();
    }

    if (typeof this.music !== 'undefined') {
      this.music.destroy();
    }
  }

  destroy() {
    document.removeEventListener('keydown', this.kd);
    document.removeEventListener('keypress', this.kp);
    this.hammer.destroy();
    setTimeout(() => {
      this.destroySounds();
    }, this.fadeTime * 1000);
  }

  handleKeys(event) {
    switch (event.which) {
      case _keycodes.KeyEvent.DOM_VK_RETURN:
        this.select();
        break;

      case _keycodes.KeyEvent.DOM_VK_PAGE_UP:
        this.music.volume += 0.03;
        break;

      case _keycodes.KeyEvent.DOM_VK_PAGE_DOWN:
        this.music.volume -= 0.03;
        break;

      case _keycodes.KeyEvent.DOM_VK_BACK_SPACE:
        this.removeCharacter();
        break;

      case _keycodes.KeyEvent.DOM_VK_DOWN:
        this.nextItem();
        break;

      case _keycodes.KeyEvent.DOM_VK_UP:
        this.previousItem();
        break;

      case _keycodes.KeyEvent.DOM_VK_RIGHT:
        this.increase();
        break;

      case _keycodes.KeyEvent.DOM_VK_LEFT:
        this.decrease();
        break;
    }
  }

  async runSync() {
    return new Promise((resolve, reject) => {
      this.run(s => {
        resolve(s.selected);
        this.destroy();
      });
    });
  }

  run(callback) {
    if (typeof this.music === 'object') {
      this.music.volume = 0.8;
      this.music.loop = true;
      this.music.play();
      _tts.speech.ducker = this.music;
    } else if (typeof this.music === 'string') {
      this.music = _soundObject.so.create(this.music, true);
      this.music.volume = 0.8;
      this.music.loop = true;
      this.music.play();
      _tts.speech.ducker = this.music;
    } else {}

    this.selectCallback = callback;
    const that = this;
    document.addEventListener('keypress', this.kp);
    document.addEventListener('keydown', this.kd);
    this.hammer.on("swipeleft", function (event) {
      that.handleSwipe(0);
    });
    this.hammer.on("swiperight", function (event) {
      that.handleSwipe(1);
    });
    this.hammer.on("panup", function (event) {
      that.handleSwipe(3);
    });
    this.hammer.on("pandown", function (event) {
      that.handleSwipe(4);
    });
    this.hammer.on("tap", function (event) {
      that.handleSwipe(2);
    });

    if (this.isAudio) {
      this.sndName = _soundObject.so.create(this.name);
      this.sndName.play();
    } else {
      _tts.speech.speak(this.name);
    }

    if (!this.silent) this.sndOpen.play();
  }

  handleSwipe(action) {
    if (action == 3) {
      this.decrease();
    }

    if (action == 4) {
      this.increase();
    }

    if (action == 0) {
      this.previousItem();
    }

    if (action == 1) {
      this.nextItem();
    }

    if (action == 2) {
      this.select();
    }
  }

  select() {
    //select function
    const selected = this.menuData[this.cursor].id;
    const items = [];

    for (let i = 0; i < this.menuData.length; i++) {
      let addItem = null;

      if (this.menuData[i].type == _menuItem.MenuTypes.SLIDER) {
        addItem = {
          id: this.menuData[i].id,
          value: this.menuData[i].currentValue //name: this.menuData[i].options[this.menuData[i].currentValue]

        };
      }

      if (this.menuData[i].type == _menuItem.MenuTypes.EDIT) {
        addItem = {
          id: this.menuData[i].id,
          value: this.menuData[i].text
        };
      }

      if (this.menuData[i].type == _menuItem.MenuTypes.SELECTOR) {
        addItem = {
          id: this.menuData[i].id,
          value: this.menuData[i].currentOption,
          name: this.menuData[i].options[this.menuData[i].currentOption]
        };
      }

      items.push(addItem);
    }

    const toReturn = {
      selected,
      cursor: this.cursor,
      items
    };
    if (!this.silent) this.sndChoose.play();
    document.removeEventListener('keydown', this.kd);
    document.removeEventListener('keypress', this.kp);

    if (this.isAudio) {
      this.sndName.stop();

      for (let i = 0; i < this.menuData.length; i++) {
        if (this.menuData[i].type == _menuItem.MenuTypes.AUDIO) this.menuData[i].snd.stop();
      }
    }

    if (!this.silent) this.musicDuration = this.fadeTime * 1000;
    if (typeof this.music === "undefined" || this.silent) this.musicDuration = 0;
    const that = this;

    if (typeof this.music !== "undefined") {
      this.music.sound.fade(0, this.fadeTime);
    }

    if (this.silent) this.musicDuration = 0;
    setTimeout(() => {
      that.selectCallback(toReturn);
    }, this.musicDuration);
  }

}

exports.Menu = Menu;
},{"./utilities":"utilities.js","./tts":"tts.js","./soundObject.js":"soundObject.js","./menuItem":"menuItem.js","./keycodes":"keycodes.js","./input":"input.js"}],"main.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.save = save;
exports.ttsRate = exports.ttsVoice = exports.lang = exports.version2 = exports.data = exports.version = exports.parsedCars = exports.gameID = exports.content = exports._ = exports.debug = void 0;

var _strings = require("./strings");

var _soundObject = require("./soundObject");

var _tts = require("./tts");

var _languageSelector = require("./languageSelector");

var _game = require("./game");

var _jquery = _interopRequireDefault(require("jquery"));

var _menu = require("./menu");

var _menuItem = require("./menuItem");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const debug = false;
exports.debug = debug;

let _;

exports._ = _;
let content = {
  numberOfVehicles: 7,
  bonusTypes: 3
};
exports.content = content;
var gameID = "road";
exports.gameID = gameID;
let parsedCars = [];
exports.parsedCars = parsedCars;
parsedCars.push({});
var version = "1.0";
exports.version = version;
let data = {
  coins: 0,
  jumps: 0,
  unlocks: {
    hyperjump: false
  }
};
exports.data = data;
var version2 = "";
exports.version2 = version2;
var lang = 0;
exports.lang = lang;
var ttsVoice;
exports.ttsVoice = ttsVoice;
var ttsRate = 1;
exports.ttsRate = ttsRate;
document.addEventListener('DOMContentLoaded', setup);

async function setup() {
  document.getElementById("app").focus();

  if (localStorage.getItem("string_data") != null) {
    exports.data = data = JSON.parse(localStorage.getItem("string_data"));
  }

  try {
    const fs = require('fs');

    let file = fs.readFileSync("./cars.txt", "utf8");
    console.log(file);
    let lines = file.split("\n");
    console.log(lines[0]);
    lines.forEach(element => {
      let elements = element.split(",");
      let name = elements[0];
      let speed = Number(elements[1]);
      let horning = elements[2];
      let hornable = "";

      if (horning == 1) {
        hornable = name;
      } else if (horning == 0) {
        hornable = "";
      } else {
        hornable = horning;
      }

      let z = Number(elements[3]);
      parsedCars.push({
        sound: "vehicles/" + name,
        speed: speed,
        hornable: hornable,
        name: name,
        z: z
      });
    });
    content.numberOfVehicles = parsedCars.length - 1;
  } catch (e) {
    console.log("Error parsing cars file: " + e);
  } //the below is an example of a new version notifier. The version2 variable can be used and compared inside a menu or wherever, and would contain the new version of your game based on what your server returns.


  let prom = new Promise((resolve, reject) => {
    fetch('http://yourserver.com/versions.php?gameVersionRequest=' + gameID).then(event => event.text()) //convert http response into text
    .then(data => {
      exports.version2 = version2 = data;
      resolve(data); //resolve promise let go.
    });
  });
  let langs = new _languageSelector.LanguageSelector("langSelect", async result => {
    exports.lang = lang = result;

    _tts.speech.setLanguage(lang);

    exports._ = _ = _strings.strings.get;

    let music = _soundObject.so.create("music/menu");

    music.volume = 0.6;
    music.loop = true;
    music.play();
    _tts.speech.ducker = music;
    let items = [];
    items.push(new _menuItem.MenuItem(0, _strings.strings.get("mStart")));
    items.push(new _menuItem.MenuItem(1, _strings.strings.get("mShop", [data.coins])));
    let menu = new _menu.Menu(_strings.strings.get("mainMenu"), items);
    let selection = await menu.runSync();
    await music.fade(0);

    switch (selection) {
      case 0:
        let game = new _game.Game();
        game.start();
        break;

      default:
        break;
    }
  });
}

function save() {
  localStorage.setItem("string_data", JSON.stringify(data));
}
},{"./strings":"strings.js","./soundObject":"soundObject.js","./tts":"tts.js","./languageSelector":"languageSelector.js","./game":"game.js","./menu":"menu.js","./menuItem":"menuItem.js"}]},{},["main.js"], null)
//# sourceMappingURL=/main.js.map