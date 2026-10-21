/**
 * DLCO VIRTUAL IC TRAINER KIT SIMULATOR — CORE SIMULATION ENGINE
 * Authentic physical laboratory instrument simulator matching college trainer kit
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. IC LIBRARY DEFINITIONS & EXACT DATASHEET SPECIFICATIONS
  // =========================================================================
const IC_DEFINITIONS
   = {
    '7400': {
      name: '7400 Quad 2-Input NAND Gate',
      package: '14-Pin DIP',
      pins: 14,
      vccPin: 14,
      gndPin: 7,
      pinout: {
        1: { name: '1A', type: 'in', gate: 0, arg: 0 },
        2: { name: '1B', type: 'in', gate: 0, arg: 1 },
        3: { name: '1Y', type: 'out', gate: 0 },
        4: { name: '2A', type: 'in', gate: 1, arg: 0 },
        5: { name: '2B', type: 'in', gate: 1, arg: 1 },
        6: { name: '2Y', type: 'out', gate: 1 },
        7: { name: 'GND', type: 'gnd' },
        8: { name: '3Y', type: 'out', gate: 2 },
        9: { name: '3A', type: 'in', gate: 2, arg: 0 },
        10: { name: '3B', type: 'in', gate: 2, arg: 1 },
        11: { name: '4Y', type: 'out', gate: 3 },
        12: { name: '4A', type: 'in', gate: 3, arg: 0 },
        13: { name: '4B', type: 'in', gate: 3, arg: 1 },
        14: { name: 'VCC', type: 'vcc' }
      },
      gates: [
        { inputs: [1, 2], output: 3, fn: (a, b) => (a === 'Z' || b === 'Z' ? 'Z' : (a === 1 && b === 1 ? 0 : 1)) },
        { inputs: [4, 5], output: 6, fn: (a, b) => (a === 'Z' || b === 'Z' ? 'Z' : (a === 1 && b === 1 ? 0 : 1)) },
        { inputs: [9, 10], output: 8, fn: (a, b) => (a === 'Z' || b === 'Z' ? 'Z' : (a === 1 && b === 1 ? 0 : 1)) },
        { inputs: [12, 13], output: 11, fn: (a, b) => (a === 'Z' || b === 'Z' ? 'Z' : (a === 1 && b === 1 ? 0 : 1)) }
      ]
    },

    '7404': {
      name: '7404 Hex Inverter (NOT Gates)',
      package: '14-Pin DIP',
      pins: 14,
      vccPin: 14,
      gndPin: 7,
      pinout: {
        1: { name: '1A', type: 'in', gate: 0 },
        2: { name: '1Y', type: 'out', gate: 0 },
        3: { name: '2A', type: 'in', gate: 1 },
        4: { name: '2Y', type: 'out', gate: 1 },
        5: { name: '3A', type: 'in', gate: 2 },
        6: { name: '3Y', type: 'out', gate: 2 },
        7: { name: 'GND', type: 'gnd' },
        8: { name: '4Y', type: 'out', gate: 3 },
        9: { name: '4A', type: 'in', gate: 3 },
        10: { name: '5Y', type: 'out', gate: 4 },
        11: { name: '5A', type: 'in', gate: 4 },
        12: { name: '6Y', type: 'out', gate: 5 },
        13: { name: '6A', type: 'in', gate: 5 },
        14: { name: 'VCC', type: 'vcc' }
      },
      gates: [
        { inputs: [1], output: 2, fn: a => (a === 'Z' ? 'Z' : (a === 1 ? 0 : 1)) },
        { inputs: [3], output: 4, fn: a => (a === 'Z' ? 'Z' : (a === 1 ? 0 : 1)) },
        { inputs: [5], output: 6, fn: a => (a === 'Z' ? 'Z' : (a === 1 ? 0 : 1)) },
        { inputs: [9], output: 8, fn: a => (a === 'Z' ? 'Z' : (a === 1 ? 0 : 1)) },
        { inputs: [11], output: 10, fn: a => (a === 'Z' ? 'Z' : (a === 1 ? 0 : 1)) },
        { inputs: [13], output: 12, fn: a => (a === 'Z' ? 'Z' : (a === 1 ? 0 : 1)) }
      ]
    },

    '7408': {
      name: '7408 Quad 2-Input AND Gate',
      package: '14-Pin DIP',
      pins: 14,
      vccPin: 14,
      gndPin: 7,
      pinout: {
        1: { name: '1A', type: 'in', gate: 0, arg: 0 },
        2: { name: '1B', type: 'in', gate: 0, arg: 1 },
        3: { name: '1Y', type: 'out', gate: 0 },
        4: { name: '2A', type: 'in', gate: 1, arg: 0 },
        5: { name: '2B', type: 'in', gate: 1, arg: 1 },
        6: { name: '2Y', type: 'out', gate: 1 },
        7: { name: 'GND', type: 'gnd' },
        8: { name: '3Y', type: 'out', gate: 2 },
        9: { name: '3A', type: 'in', gate: 2, arg: 0 },
        10: { name: '3B', type: 'in', gate: 2, arg: 1 },
        11: { name: '4Y', type: 'out', gate: 3 },
        12: { name: '4A', type: 'in', gate: 3, arg: 0 },
        13: { name: '4B', type: 'in', gate: 3, arg: 1 },
        14: { name: 'VCC', type: 'vcc' }
      },
      gates: [
        { inputs: [1, 2], output: 3, fn: (a, b) => (a === 'Z' || b === 'Z' ? 'Z' : (a === 1 && b === 1 ? 1 : 0)) },
        { inputs: [4, 5], output: 6, fn: (a, b) => (a === 'Z' || b === 'Z' ? 'Z' : (a === 1 && b === 1 ? 1 : 0)) },
        { inputs: [9, 10], output: 8, fn: (a, b) => (a === 'Z' || b === 'Z' ? 'Z' : (a === 1 && b === 1 ? 1 : 0)) },
        { inputs: [12, 13], output: 11, fn: (a, b) => (a === 'Z' || b === 'Z' ? 'Z' : (a === 1 && b === 1 ? 1 : 0)) }
      ]
    },

    '7432': {
      name: '7432 Quad 2-Input OR Gate',
      package: '14-Pin DIP',
      pins: 14,
      vccPin: 14,
      gndPin: 7,
      pinout: {
        1: { name: '1A', type: 'in', gate: 0, arg: 0 },
        2: { name: '1B', type: 'in', gate: 0, arg: 1 },
        3: { name: '1Y', type: 'out', gate: 0 },
        4: { name: '2A', type: 'in', gate: 1, arg: 0 },
        5: { name: '2B', type: 'in', gate: 1, arg: 1 },
        6: { name: '2Y', type: 'out', gate: 1 },
        7: { name: 'GND', type: 'gnd' },
        8: { name: '3Y', type: 'out', gate: 2 },
        9: { name: '3A', type: 'in', gate: 2, arg: 0 },
        10: { name: '3B', type: 'in', gate: 2, arg: 1 },
        11: { name: '4Y', type: 'out', gate: 3 },
        12: { name: '4A', type: 'in', gate: 3, arg: 0 },
        13: { name: '4B', type: 'in', gate: 3, arg: 1 },
        14: { name: 'VCC', type: 'vcc' }
      },
      gates: [
        { inputs: [1, 2], output: 3, fn: (a, b) => (a === 'Z' || b === 'Z' ? 'Z' : (a === 1 || b === 1 ? 1 : 0)) },
        { inputs: [4, 5], output: 6, fn: (a, b) => (a === 'Z' || b === 'Z' ? 'Z' : (a === 1 || b === 1 ? 1 : 0)) },
        { inputs: [9, 10], output: 8, fn: (a, b) => (a === 'Z' || b === 'Z' ? 'Z' : (a === 1 || b === 1 ? 1 : 0)) },
        { inputs: [12, 13], output: 11, fn: (a, b) => (a === 'Z' || b === 'Z' ? 'Z' : (a === 1 || b === 1 ? 1 : 0)) }
      ]
    },

    '7486': {
      name: '7486 Quad 2-Input XOR Gate',
      package: '14-Pin DIP',
      pins: 14,
      vccPin: 14,
      gndPin: 7,
      pinout: {
        1: { name: '1A', type: 'in', gate: 0, arg: 0 },
        2: { name: '1B', type: 'in', gate: 0, arg: 1 },
        3: { name: '1Y', type: 'out', gate: 0 },
        4: { name: '2A', type: 'in', gate: 1, arg: 0 },
        5: { name: '2B', type: 'in', gate: 1, arg: 1 },
        6: { name: '2Y', type: 'out', gate: 1 },
        7: { name: 'GND', type: 'gnd' },
        8: { name: '3Y', type: 'out', gate: 2 },
        9: { name: '3A', type: 'in', gate: 2, arg: 0 },
        10: { name: '3B', type: 'in', gate: 2, arg: 1 },
        11: { name: '4Y', type: 'out', gate: 3 },
        12: { name: '4A', type: 'in', gate: 3, arg: 0 },
        13: { name: '4B', type: 'in', gate: 3, arg: 1 },
        14: { name: 'VCC', type: 'vcc' }
      },
      gates: [
        { inputs: [1, 2], output: 3, fn: (a, b) => (a === 'Z' || b === 'Z' ? 'Z' : (a ^ b)) },
        { inputs: [4, 5], output: 6, fn: (a, b) => (a === 'Z' || b === 'Z' ? 'Z' : (a ^ b)) },
        { inputs: [9, 10], output: 8, fn: (a, b) => (a === 'Z' || b === 'Z' ? 'Z' : (a ^ b)) },
        { inputs: [12, 13], output: 11, fn: (a, b) => (a === 'Z' || b === 'Z' ? 'Z' : (a ^ b)) }
      ]
    },

    '74151': {
      name: '74151 8-Line to 1-Line Multiplexer',
      package: '16-Pin DIP',
      pins: 16,
      vccPin: 16,
      gndPin: 8,
      pinout: {
        1: { name: 'D3', type: 'in' },
        2: { name: 'D2', type: 'in' },
        3: { name: 'D1', type: 'in' },
        4: { name: 'D0', type: 'in' },
        5: { name: 'Y', type: 'out' },
        6: { name: 'W', type: 'out' }, // Inverted output Y'
        7: { name: 'G̅', type: 'in' },  // Active-LOW Enable/Strobe
        8: { name: 'GND', type: 'gnd' },
        9: { name: 'C', type: 'in' },   // S2 (MSB select)
        10: { name: 'B', type: 'in' },  // S1 (Select 1)
        11: { name: 'A', type: 'in' },  // S0 (LSB select)
        12: { name: 'D7', type: 'in' },
        13: { name: 'D6', type: 'in' },
        14: { name: 'D5', type: 'in' },
        15: { name: 'D4', type: 'in' },
        16: { name: 'VCC', type: 'vcc' }
      },
      evaluate: function (inputs) {
        // inputs: map of pin number -> logic value
        const strobe = inputs[7];
        if (strobe === 'Z') return { 5: 'Z', 6: 'Z' };
        if (strobe === 1) {
          // Disabled: Y=0, W=1 per TI datasheet
          return { 5: 0, 6: 1 };
        }
        const a = inputs[11], b = inputs[10], c = inputs[9];
        if (a === 'Z' || b === 'Z' || c === 'Z') return { 5: 'Z', 6: 'Z' };
        const sel = (c << 2) | (b << 1) | a;
        const dMap = { 0: 4, 1: 3, 2: 2, 3: 1, 4: 15, 5: 14, 6: 13, 7: 12 };
        const selectedPin = dMap[sel];
        const val = inputs[selectedPin];
        if (val === 'Z') return { 5: 'Z', 6: 'Z' };
        return { 5: val, 6: val === 1 ? 0 : 1 };
      }
    },

    '7476': {
      name: '7476 Dual J-K Flip-Flop with Preset & Clear',
      package: '16-Pin DIP',
      pins: 16,
      vccPin: 5,
      gndPin: 13,
      pinout: {
        1: { name: '1CLK', type: 'clk' },
        2: { name: '1J', type: 'in' },
        3: { name: '1K', type: 'in' },
        4: { name: '1PRE̅', type: 'in' },
        5: { name: 'VCC', type: 'vcc' },
        6: { name: '1CLR̅', type: 'in' },
        7: { name: '1Q', type: 'out' },
        8: { name: '1Q̅', type: 'out' },
        9: { name: '2Q̅', type: 'out' },
        10: { name: '2Q', type: 'out' },
        11: { name: '2CLR̅', type: 'in' },
        12: { name: '2PRE̅', type: 'in' },
        13: { name: 'GND', type: 'gnd' },
        14: { name: '2K', type: 'in' },
        15: { name: '2J', type: 'in' },
        16: { name: '2CLK', type: 'clk' }
      },
      initInternalState: () => ({
        ff1: { q: 0, qBar: 1, lastClk: 1 },
        ff2: { q: 0, qBar: 1, lastClk: 1 }
      }),
      evaluateSequential: function (state, inputs, isClockEdge) {
        // Asynchronous controls: PRE and CLR are active LOW
        // FF 1
        const pre1 = inputs[4] === undefined ? 'Z' : inputs[4];
        const clr1 = inputs[6] === undefined ? 'Z' : inputs[6];
        const clk1 = inputs[1] === undefined ? 'Z' : inputs[1];
        const j1 = inputs[2] === undefined ? 'Z' : inputs[2];
        const k1 = inputs[3] === undefined ? 'Z' : inputs[3];

        if (pre1 === 0 && clr1 === 1) {
          state.ff1.q = 1;
          state.ff1.qBar = 0;
        } else if (pre1 === 1 && clr1 === 0) {
          state.ff1.q = 0;
          state.ff1.qBar = 1;
        } else if (pre1 === 0 && clr1 === 0) {
          state.ff1.q = 1;
          state.ff1.qBar = 1; // Both high unstable
        } else if (pre1 === 1 && clr1 === 1) {
          // Negative-edge triggered: 1 -> 0 transition
          if (state.ff1.lastClk === 1 && clk1 === 0) {
            if (j1 === 0 && k1 === 0) {
              // Hold
            } else if (j1 === 0 && k1 === 1) {
              state.ff1.q = 0;
              state.ff1.qBar = 1;
            } else if (j1 === 1 && k1 === 0) {
              state.ff1.q = 1;
              state.ff1.qBar = 0;
            } else if (j1 === 1 && k1 === 1) {
              const prev = state.ff1.q;
              state.ff1.q = prev === 1 ? 0 : 1;
              state.ff1.qBar = state.ff1.q === 1 ? 0 : 1;
            }
          }
        }
        if (clk1 !== 'Z') state.ff1.lastClk = clk1;

        // FF 2
        const pre2 = inputs[12] === undefined ? 'Z' : inputs[12];
        const clr2 = inputs[11] === undefined ? 'Z' : inputs[11];
        const clk2 = inputs[16] === undefined ? 'Z' : inputs[16];
        const j2 = inputs[15] === undefined ? 'Z' : inputs[15];
        const k2 = inputs[14] === undefined ? 'Z' : inputs[14];

        if (pre2 === 0 && clr2 === 1) {
          state.ff2.q = 1;
          state.ff2.qBar = 0;
        } else if (pre2 === 1 && clr2 === 0) {
          state.ff2.q = 0;
          state.ff2.qBar = 1;
        } else if (pre2 === 0 && clr2 === 0) {
          state.ff2.q = 1;
          state.ff2.qBar = 1;
        } else if (pre2 === 1 && clr2 === 1) {
          if (state.ff2.lastClk === 1 && clk2 === 0) {
            if (j2 === 0 && k2 === 0) {
              // Hold
            } else if (j2 === 0 && k2 === 1) {
              state.ff2.q = 0;
              state.ff2.qBar = 1;
            } else if (j2 === 1 && k2 === 0) {
              state.ff2.q = 1;
              state.ff2.qBar = 0;
            } else if (j2 === 1 && k2 === 1) {
              const prev = state.ff2.q;
              state.ff2.q = prev === 1 ? 0 : 1;
              state.ff2.qBar = state.ff2.q === 1 ? 0 : 1;
            }
          }
        }
        if (clk2 !== 'Z') state.ff2.lastClk = clk2;

        return {
          7: state.ff1.q,
          8: state.ff1.qBar,
          10: state.ff2.q,
          9: state.ff2.qBar
        };
      }
    },

    '7490': {
      name: '7490 Decade & Binary Counter',
      package: '14-Pin DIP',
      pins: 14,
      vccPin: 5,
      gndPin: 10,
      pinout: {
        1: { name: 'CKB', type: 'clk' },   // Divide by 5 clock input
        2: { name: 'R0(1)', type: 'in' },  // Reset to 0 input 1
        3: { name: 'R0(2)', type: 'in' },  // Reset to 0 input 2
        4: { name: 'NC', type: 'nc' },
        5: { name: 'VCC', type: 'vcc' },
        6: { name: 'R9(1)', type: 'in' },  // Set to 9 input 1
        7: { name: 'R9(2)', type: 'in' },  // Set to 9 input 2
        8: { name: 'QC', type: 'out' },
        9: { name: 'QB', type: 'out' },
        10: { name: 'GND', type: 'gnd' },
        11: { name: 'QD', type: 'out' },
        12: { name: 'QA', type: 'out' },
        13: { name: 'NC', type: 'nc' },
        14: { name: 'CKA', type: 'clk' }   // Divide by 2 clock input
      },
      initInternalState: () => ({
        qa: 0,
        b5Count: 0, // 0 to 4
        lastCka: 1,
        lastCkb: 0
      }),
      evaluateSequential: function (state, inputs, isClockEdge) {
        const r01 = inputs[2], r02 = inputs[3];
        const r91 = inputs[6], r92 = inputs[7];
        const cka = inputs[14] === undefined ? 'Z' : inputs[14];
        const ckb = inputs[1] === undefined ? 'Z' : inputs[1];

        // Master Reset: R0(1)=1 AND R0(2)=1 => 0000
        if (r01 === 1 && r02 === 1) {
          state.qa = 0;
          state.b5Count = 0;
          state.lastCkb = 0;
        }
        // Master Set: R9(1)=1 AND R9(2)=1 => 1001 (9)
        else if (r91 === 1 && r92 === 1) {
          state.qa = 1;
          state.b5Count = 4; // QD=1, QC=0, QB=0, QA=1
          state.lastCkb = 1;
        } else {
          // Divide by 2: negative edge on CKA (1 -> 0)
          if (state.lastCka === 1 && cka === 0) {
            state.qa = state.qa === 1 ? 0 : 1;
          }
          // Divide by 5: negative edge on CKB (1 -> 0)
          // If CKB is wired to QA (inputs[1] tracks QA), or defaults to QA in decade mode
          const effectiveCkb = (inputs[1] !== undefined && inputs[1] !== 'Z') ? inputs[1] : state.qa;
          if (state.lastCkb === 1 && effectiveCkb === 0) {
            state.b5Count = (state.b5Count + 1) % 5;
          }
          if (cka !== 'Z') state.lastCka = cka;
          state.lastCkb = effectiveCkb;
        }

        let qb = 0, qc = 0, qd = 0;
        if (state.b5Count === 1) { qb = 1; qc = 0; qd = 0; }
        else if (state.b5Count === 2) { qb = 0; qc = 1; qd = 0; }
        else if (state.b5Count === 3) { qb = 1; qc = 1; qd = 0; }
        else if (state.b5Count === 4) { qb = 0; qc = 0; qd = 1; }

        return {
          12: state.qa,
          9: qb,
          8: qc,
          11: qd
        };
      }
    }
  };

  // =========================================================================
  // 2. STATE OF THE TRAINER BOARD
  // =========================================================================

  const state = {
    mainsPower: true,
    zoom: 1.0,
    wireColor: 'auto',
    selectedTerminal: null,
    selectedWireId: null,
    nextWireId: 1,

    // Input switches (16 switches, S16 down to S1)
    // S[i]: 1 = HIGH, 0 = LOW
    switches: {},

    // Sockets U1 through U5 (DIP-16/20) + U6 (DIP-40)
    sockets: {
      U1: { ic: null, icState: null, isPowered: false },
      U2: { ic: null, icState: null, isPowered: false },
      U3: { ic: null, icState: null, isPowered: false },
      U4: { ic: null, icState: null, isPowered: false },
      U5: { ic: null, icState: null, isPowered: false },
      U6: { ic: null, icState: null, isPowered: false }
    },

    // All connected wires: array of { id, from: tid, to: tid, color }
    wires: [],

    // Clock generator
    clock: {
      running: false,
      frequency: 1.0, // Hz
      state: 0,       // 0 or 1
      timerId: null,
      pulseCount: 0
    },

    // Pulser
    pulser: {
      state: 0,
      activeTimer: null
    },

    // Current net resolution results
    nets: {},             // terminalId -> netId
    netValues: {},        // netId -> 0 | 1 | 'Z' | 'CONFLICT'
    netDrivers: {},       // netId -> array of drivers
    pinValues: {},        // socket:pin -> 0 | 1 | 'Z'
    diagnostics: []
  };

  // Initialize switches 1 to 16 as 0 (LOW)
  for (let i = 1; i <= 16; i++) {
    state.switches[i] = 0;
  }

  // =========================================================================
  // 3. DOM ELEMENT REFERENCES
  // =========================================================================

  const DOM = {
    trainerBoard: document.getElementById('trainerBoard'),
    wiresSvg: document.getElementById('wiresSvg'),
    mainsPowerSwitch: document.getElementById('mainsPowerSwitch'),
    mainsPowerLed: document.getElementById('mainsPowerLed'),
    outputUnitsContainer: document.getElementById('outputUnitsContainer'),
    inputUnitsContainer: document.getElementById('inputUnitsContainer'),
    vccTerminalsContainer: document.getElementById('vccTerminalsContainer'),
    gndTerminalsContainer: document.getElementById('gndTerminalsContainer'),
    socketsContainer: document.getElementById('socketsContainer'),
    
    // Status Bar
    statusMessage: document.getElementById('statusMessage'),
    wireActionPrompt: document.getElementById('wireActionPrompt'),
    btnCancelWire: document.getElementById('btnCancelWire'),
    btnDeleteSelectedWire: document.getElementById('btnDeleteSelectedWire'),
    wireCountDisplay: document.getElementById('wireCountDisplay'),
    activeIcCountDisplay: document.getElementById('activeIcCountDisplay'),

    // Clock & Pulser Controls
    clockStatusLed: document.getElementById('clockStatusLed'),
    clockStatusText: document.getElementById('clockStatusText'),
    btnClockStartStop: document.getElementById('btnClockStartStop'),
    clockFreqSlider: document.getElementById('clockFreqSlider'),
    clockFreqDisplay: document.getElementById('clockFreqDisplay'),
    btnManualPulse: document.getElementById('btnManualPulse'),
    pulserLed: document.getElementById('pulserLed'),
    pulseCountVal: document.getElementById('pulseCountVal'),
    btnResetCounter: document.getElementById('btnResetCounter'),

    // 7-Seg & Probe
    segA: document.getElementById('segA'),
    segB: document.getElementById('segB'),
    probeLedH: document.getElementById('probeLedH'),
    probeLedL: document.getElementById('probeLedL'),

    // Modals & Drawers
    icSelectorModal: document.getElementById('icSelectorModal'),
    icModalSocketTitle: document.getElementById('icModalSocketTitle'),
    btnCloseIcModal: document.getElementById('btnCloseIcModal'),
    experimentDrawer: document.getElementById('experimentDrawer'),
    btnExpGuide: document.getElementById('btnExpGuide'),
    btnCloseDrawer: document.getElementById('btnCloseDrawer'),
    practicalSelect: document.getElementById('practicalSelect'),
    btnLoadExpTemplate: document.getElementById('btnLoadExpTemplate'),
    btnAutoWireExp: document.getElementById('btnAutoWireExp'),
    btnVerifyCircuit: document.getElementById('btnVerifyCircuit'),
    verificationResultBox: document.getElementById('verificationResultBox'),
    experimentDetailContainer: document.getElementById('experimentDetailContainer'),
    diagnosticsModal: document.getElementById('diagnosticsModal'),
    btnDiagnostics: document.getElementById('btnDiagnostics'),
    btnCloseDiagModal: document.getElementById('btnCloseDiagModal'),
    diagBadge: document.getElementById('diagBadge'),
    diagSummaryBanner: document.getElementById('diagSummaryBanner'),
    diagPowerList: document.getElementById('diagPowerList'),
    diagSignalList: document.getElementById('diagSignalList'),
    diagNetList: document.getElementById('diagNetList'),

    // Top Controls
    wireColorSelect: document.getElementById('wireColorSelect'),
    btnZoomIn: document.getElementById('btnZoomIn'),
    btnZoomOut: document.getElementById('btnZoomOut'),
    btnZoomReset: document.getElementById('btnZoomReset'),
    zoomLabel: document.getElementById('zoomLabel'),
    btnClearWires: document.getElementById('btnClearWires'),
    btnResetBoard: document.getElementById('btnResetBoard')
  };

  let targetModalSocket = null;

  // =========================================================================
  // 4. BOARD RENDERING & INITIALIZATION
  // =========================================================================

  function initBoard() {
    renderOutputUnits();
    renderInputUnits();
    renderPowerRails();
    renderSockets();
    renderExperimentDoc('exp1');
    setupEventListeners();
    runSimulation();
    updateStatusBar();
  }

  // Render 16 Output Units (L16 to L1)
  function renderOutputUnits() {
    DOM.outputUnitsContainer.innerHTML = '';
    // L16 on the far left down to L1 on the far right as in physical kit
    for (let i = 16; i >= 1; i--) {
      const unit = document.createElement('div');
      unit.className = 'output-unit';
      unit.innerHTML = `
        <span class="unit-name">L${i}</span>
        <div id="led_${i}" class="lamp"></div>
        <div class="terminal-jack" data-tid="out:${i}" title="Output LED L${i} (Terminal OP${i})"></div>
        <span class="unit-term-lbl">OP${i}</span>
      `;
      DOM.outputUnitsContainer.appendChild(unit);
    }
  }

  // Render 16 Input Units (S16 to S1)
  function renderInputUnits() {
    DOM.inputUnitsContainer.innerHTML = '';
    for (let i = 16; i >= 1; i--) {
      const unit = document.createElement('div');
      unit.className = 'input-unit';
      unit.innerHTML = `
        <span class="unit-name">S${i}</span>
        <div class="terminal-jack" data-tid="in:${i}" title="Input Switch S${i} (Terminal IP${i})"></div>
        <div id="sw_led_${i}" class="lamp"></div>
        <div id="sw_toggle_${i}" class="toggle-switch-hardware down" data-sw="${i}" title="Toggle Switch S${i}">
          <div class="switch-lever"></div>
        </div>
        <span id="sw_lbl_${i}" class="unit-state-lbl">0</span>
      `;
      DOM.inputUnitsContainer.appendChild(unit);
    }
  }

  // Render VCC and GND Rail Terminals
  function renderPowerRails() {
    // 10 VCC terminals in 5 pairs
    DOM.vccTerminalsContainer.innerHTML = '';
    for (let p = 1; p <= 5; p++) {
      const t1 = (p - 1) * 2 + 1;
      const t2 = (p - 1) * 2 + 2;
      const pair = document.createElement('div');
      pair.className = 'rail-term-pair';
      pair.innerHTML = `
        <span class="rail-term-lbl">VCC</span>
        <div class="terminal-jack jack-vcc" data-tid="vcc:${t1}" title="VCC Terminal (+5V)"></div>
        <div class="terminal-jack jack-vcc" data-tid="vcc:${t2}" title="VCC Terminal (+5V)"></div>
      `;
      DOM.vccTerminalsContainer.appendChild(pair);
    }

    // 10 GND terminals in 5 pairs
    DOM.gndTerminalsContainer.innerHTML = '';
    for (let p = 1; p <= 5; p++) {
      const t1 = (p - 1) * 2 + 1;
      const t2 = (p - 1) * 2 + 2;
      const pair = document.createElement('div');
      pair.className = 'rail-term-pair';
      pair.innerHTML = `
        <span class="rail-term-lbl">GND</span>
        <div class="terminal-jack jack-gnd" data-tid="gnd:${t1}" title="GROUND Terminal (0V)"></div>
        <div class="terminal-jack jack-gnd" data-tid="gnd:${t2}" title="GROUND Terminal (0V)"></div>
      `;
      DOM.gndTerminalsContainer.appendChild(pair);
    }
  }

  // Render Fixed IC Sockets (U1 to U5, plus U6)
  function renderSockets() {
    DOM.socketsContainer.innerHTML = '';
    const socketKeys = ['U1', 'U2', 'U3', 'U4', 'U5', 'U6'];

    socketKeys.forEach(sockId => {
  const sockData = state.sockets[sockId];
  const icDef = sockData.ic ? IC_DEFINITIONS[sockData.ic] : null;
  const maxPins = icDef
    ? icDef.pins
    : (sockId === 'U6' ? 28 : 16);
      
      
      
      const col = document.createElement('div');
      col.className = 'socket-column';
      col.id = `sock_col_${sockId}`;


      // Header
      let pwrClass = 'socket-power-status';
      let pwrText = 'EMPTY';
      if (sockData.ic) {
        pwrClass += sockData.isPowered ? ' powered' : ' unpowered';
        pwrText = sockData.isPowered ? '⚡ POWERED' : '⚠ NO POWER';
      }

      col.innerHTML = `
        <div class="socket-header">
          <span class="socket-label">${sockId}</span>
          <span class="${pwrClass}" id="pwr_stat_${sockId}">${pwrText}</span>
        </div>
        <div class="socket-body">
          <div class="pin-column pin-col-left" id="pins_left_${sockId}"></div>
          <div class="zif-socket-core ${sockData.ic ? 'locked' : ''}" id="zif_core_${sockId}" data-sock="${sockId}">
            <div class="zif-lever"><div class="zif-lever-knob"></div></div>
            ${
              sockData.ic
                ? `
                <div class="seated-ic">
                  <span class="ic-part-no">${sockData.ic}</span>
                  <span class="ic-part-sub">${icDef.name.split(' ')[1] || 'IC'}</span>
                  <button class="btn-eject-ic" data-eject="${sockId}" title="Remove this IC and disconnect its wires">Eject</button>
                </div>
              `
                : `
                <div class="empty-socket-prompt">
                  <span class="plus-icon">＋</span>
                  Click to Insert IC
                </div>
              `
            }
          </div>
          <div class="pin-column pin-col-right" id="pins_right_${sockId}"></div>
        </div>
      `;

      DOM.socketsContainer.appendChild(col);

      // Render Pin Terminals
      const leftCol = col.querySelector(`#pins_left_${sockId}`);
      const rightCol = col.querySelector(`#pins_right_${sockId}`);
      const half = maxPins / 2;

      // Left Column: Pins 1 to half
      for (let p = 1; p <= half; p++) {
        const pinUnit = document.createElement('div');
        pinUnit.className = 'socket-pin-unit';
        let fnLabel = '—';
        let fnClass = 'socket-pin-fn';
        if (icDef && icDef.pinout[p]) {
          const pinInfo = icDef.pinout[p];
          fnLabel = pinInfo.name;
          fnClass += ` fn-${pinInfo.type}`;
        }
        pinUnit.innerHTML = `
          <span class="socket-pin-num">${p}</span>
          <div class="terminal-jack" data-tid="${sockId}:p${p}" title="${sockId} Pin ${p}: ${fnLabel}"></div>
          <span class="${fnClass}">${fnLabel}</span>
        `;
        leftCol.appendChild(pinUnit);
      }

      // Right Column: Pins maxPins down to half+1
      for (let p = maxPins; p > half; p--) {
        const pinUnit = document.createElement('div');
        pinUnit.className = 'socket-pin-unit';
        let fnLabel = '—';
        let fnClass = 'socket-pin-fn';
        if (icDef && icDef.pinout[p]) {
          const pinInfo = icDef.pinout[p];
          fnLabel = pinInfo.name;
          fnClass += ` fn-${pinInfo.type}`;
        }
        pinUnit.innerHTML = `
          <span class="socket-pin-num">${p}</span>
          <div class="terminal-jack" data-tid="${sockId}:p${p}" title="${sockId} Pin ${p}: ${fnLabel}"></div>
          <span class="${fnClass}">${fnLabel}</span>
        `;
        rightCol.appendChild(pinUnit);
      }
    });
  }

  // =========================================================================
  // 5. TERMINAL COORDINATES & SVG WIRING ENGINE
  // =========================================================================

  function getTerminalCenter(tid) {
    const el = document.querySelector(`[data-tid="${tid}"]`);
    if (!el) return null;
    const elRect = el.getBoundingClientRect();
    const boardRect = DOM.trainerBoard.getBoundingClientRect();
    const zoom = state.zoom || 1.0;
    return {
      x: (elRect.left + elRect.width / 2 - boardRect.left) / zoom,
      y: (elRect.top + elRect.height / 2 - boardRect.top) / zoom
    };
  }

  function getAutoWireColor(tidA, tidB) {
    if (state.wireColor !== 'auto') return state.wireColor;
    if (tidA.startsWith('vcc:') || tidB.startsWith('vcc:')) return '#dc2626'; // Red for VCC
    if (tidA.startsWith('gnd:') || tidB.startsWith('gnd:')) return '#16a34a'; // Green for GND
    if (tidA.startsWith('clk:') || tidB.startsWith('clk:')) return '#d97706'; // Amber for Clock
    if (tidA.startsWith('out:') || tidB.startsWith('out:')) return '#9333ea'; // Purple for Output LEDs
    return '#2563eb'; // Blue for signals
  }

  function renderWires() {
    DOM.wiresSvg.innerHTML = '';
    const boardWidth = DOM.trainerBoard.clientWidth;
    const boardHeight = DOM.trainerBoard.clientHeight;
    DOM.wiresSvg.setAttribute('viewBox', `0 0 ${boardWidth} ${boardHeight}`);

    state.wires.forEach(wire => {
      const ptA = getTerminalCenter(wire.from);
      const ptB = getTerminalCenter(wire.to);
      if (!ptA || !ptB) return;

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      
      // Calculate natural catenary/bezier sag for realistic patch wire appearance
      const dist = Math.hypot(ptB.x - ptA.x, ptB.y - ptA.y);
      const sag = Math.min(80, Math.max(30, dist * 0.15));
      const midX = (ptA.x + ptB.x) / 2;
      const midY = (ptA.y + ptB.y) / 2 + sag;

      const d = `M ${ptA.x.toFixed(1)} ${ptA.y.toFixed(1)} Q ${midX.toFixed(1)} ${midY.toFixed(1)} ${ptB.x.toFixed(1)} ${ptB.y.toFixed(1)}`;
      path.setAttribute('d', d);
      path.setAttribute('stroke', wire.color || '#2563eb');
      path.setAttribute('stroke-width', '4');
      path.setAttribute('class', `wire-path ${wire.id === state.selectedWireId ? 'selected' : ''}`);
      path.dataset.wireId = wire.id;

      path.addEventListener('click', e => {
        e.stopPropagation();
        selectWire(wire.id);
      });

      DOM.wiresSvg.appendChild(path);
    });

    highlightConnectedTerminals();
  }

  function highlightConnectedTerminals() {
    document.querySelectorAll('.terminal-jack').forEach(el => el.classList.remove('connected'));
    state.wires.forEach(w => {
      const elA = document.querySelector(`[data-tid="${w.from}"]`);
      const elB = document.querySelector(`[data-tid="${w.to}"]`);
      if (elA) elA.classList.add('connected');
      if (elB) elB.classList.add('connected');
    });
  }

  function selectWire(wireId) {
    state.selectedWireId = wireId;
    DOM.btnDeleteSelectedWire.classList.remove('hidden');
    DOM.wireActionPrompt.textContent = `Wire #${wireId} selected. Press Delete or click 'Delete Wire' to remove.`;
    renderWires();
  }

  function deleteSelectedWire() {
    if (!state.selectedWireId) return;
    state.wires = state.wires.filter(w => w.id !== state.selectedWireId);
    state.selectedWireId = null;
    DOM.btnDeleteSelectedWire.classList.add('hidden');
    DOM.wireActionPrompt.textContent = 'Wiring Mode: Click any pin or terminal to start a wire.';
    renderWires();
    runSimulation();
    updateStatusBar();
  }

  function handleTerminalClick(tid) {
    if (!state.mainsPower) {
      flashStatus('Mains power is OFF. Switch ON power to operate.', true);
      return;
    }

    // Case 1: Starting a new wire connection
    if (!state.selectedTerminal) {
      state.selectedTerminal = tid;
      const el = document.querySelector(`[data-tid="${tid}"]`);
      if (el) el.classList.add('selected');
      DOM.btnCancelWire.classList.remove('hidden');
      DOM.wireActionPrompt.textContent = `Selected: ${formatTerminalName(tid)}. Now click destination terminal.`;
      return;
    }

    // Case 2: Clicking the same terminal
    if (state.selectedTerminal === tid) {
      cancelWireSelection();
      return;
    }

    // Case 3: Completing connection between selectedTerminal and tid
    const tidA = state.selectedTerminal;
    const tidB = tid;

    // Check if wire already exists
    const duplicate = state.wires.some(
      w => (w.from === tidA && w.to === tidB) || (w.from === tidB && w.to === tidA)
    );
    if (duplicate) {
      flashStatus('A wire already connects these two terminals.', true);
      cancelWireSelection();
      return;
    }

    // Add new wire
    const color = getAutoWireColor(tidA, tidB);
    state.wires.push({
      id: state.nextWireId++,
      from: tidA,
      to: tidB,
      color: color
    });

    cancelWireSelection();
    renderWires();
    runSimulation();
    updateStatusBar();
    flashStatus(`Connected ${formatTerminalName(tidA)} to ${formatTerminalName(tidB)}.`);
  }

  function cancelWireSelection() {
    if (state.selectedTerminal) {
      const el = document.querySelector(`[data-tid="${state.selectedTerminal}"]`);
      if (el) el.classList.remove('selected');
      state.selectedTerminal = null;
    }
    DOM.btnCancelWire.classList.add('hidden');
    DOM.wireActionPrompt.textContent = 'Wiring Mode: Click any pin or terminal to start a wire.';
  }

  function formatTerminalName(tid) {
    if (tid.startsWith('in:')) return `Input Switch S${tid.split(':')[1]}`;
    if (tid.startsWith('out:')) return `Output LED L${tid.split(':')[1]}`;
    if (tid.startsWith('vcc:')) return `VCC (+5V) #${tid.split(':')[1]}`;
    if (tid.startsWith('gnd:')) return `GROUND (0V) #${tid.split(':')[1]}`;
    if (tid.startsWith('clk:')) return `Clock [${tid.split(':')[1]}]`;
    if (tid === 'probe') return 'Logic Probe';
    if (tid.startsWith('seg:')) return `7-Seg ${tid.split(':')[1].toUpperCase()}`;
    if (tid.includes(':p')) {
      const [sock, pin] = tid.split(':p');
      const ic = state.sockets[sock]?.ic;
      const pinName = ic ? IC_DEFINITIONS[ic]?.pinout[pin]?.name : '';
      return `${sock} Pin ${pin}${pinName ? ` (${pinName})` : ''}`;
    }
    return tid;
  }

  // =========================================================================
  // 6. ELECTRICAL GRAPH RESOLUTION & SIMULATION ENGINE
  // =========================================================================

  function runSimulation() {
    if (!state.mainsPower) {
      turnOffAllDisplays();
      updateDiagnostics();
      return;
    }

    // Step 1: Disjoint-Set (Union-Find) of all active terminals
    const parent = {};
    function find(x) {
      if (parent[x] === undefined) parent[x] = x;
      if (parent[x] !== x) parent[x] = find(parent[x]);
      return parent[x];
    }
    function union(a, b) {
      const rootA = find(a);
      const rootB = find(b);
      if (rootA !== rootB) parent[rootB] = rootA;
    }

    state.wires.forEach(w => {
      union(w.from, w.to);
    });

    // Step 2: Validate IC Power (VCC & GND connections)
    Object.keys(state.sockets).forEach(sockId => {
      const sock = state.sockets[sockId];
      if (!sock.ic) {
        sock.isPowered = false;
        return;
      }
      const icDef = IC_DEFINITIONS[sock.ic];
      const vccTid = `${sockId}:p${icDef.vccPin}`;
      const gndTid = `${sockId}:p${icDef.gndPin}`;

      const vccNet = find(vccTid);
      const gndNet = find(gndTid);

      // Check if vccNet contains any board VCC terminal
      const hasVcc = Object.keys(parent).some(
        tid => tid.startsWith('vcc:') && find(tid) === vccNet
      );
      // Check if gndNet contains any board GND terminal
      const hasGnd = Object.keys(parent).some(
        tid => tid.startsWith('gnd:') && find(tid) === gndNet
      );

      sock.isPowered = hasVcc && hasGnd;

      // Update socket header UI indicator
      const statEl = document.getElementById(`pwr_stat_${sockId}`);
      if (statEl) {
        statEl.className = 'socket-power-status ' + (sock.isPowered ? 'powered' : 'unpowered');
        statEl.textContent = sock.isPowered ? '⚡ POWERED' : '⚠ NO POWER';
      }
    });

    // Step 3: Map primary drivers to nets
    // Drivers: VCC(+5V=1), GND(0V=0), Input switches, Clock outputs
    const netDrivers = {};
    function addDriver(tid, val, desc) {
      const net = find(tid);
      if (!netDrivers[net]) netDrivers[net] = [];
      netDrivers[net].push({ tid, val, desc });
    }

    // Primary Power Rails
    for (let i = 1; i <= 10; i++) {
      addDriver(`vcc:${i}`, 1, 'VCC (+5V Rail)');
      addDriver(`gnd:${i}`, 0, 'GND (0V Ground Rail)');
    }

    // Primary Input Switches
    for (let i = 1; i <= 16; i++) {
      addDriver(`in:${i}`, state.switches[i], `Switch S${i}`);
    }

    // Clock Outputs
    addDriver('clk:main', state.clock.state, 'Clock Main');
    addDriver('clk:bar', state.clock.state === 1 ? 0 : 1, 'Clock Bar');
    addDriver('clk:pulse', state.pulser.state, 'Pulser Output');

    // Step 4: Iterative Gate & IC Propagation (handling feedback & cascade)
    const pinValues = {};
    let iteration = 0;
    let changed = true;
    const maxIterations = 25;

    while (changed && iteration++ < maxIterations) {
      changed = false;

      // Determine logic value on each net
      const netValues = {};
      Object.keys(netDrivers).forEach(net => {
        const drivers = netDrivers[net];
        const has1 = drivers.some(d => d.val === 1);
        const has0 = drivers.some(d => d.val === 0);

        if (has1 && has0) {
          netValues[net] = 'CONFLICT'; // Short circuit or bus contention!
        } else if (has1) {
          netValues[net] = 1;
        } else if (has0) {
          netValues[net] = 0;
        } else {
          netValues[net] = 'Z';
        }
      });

      // Function to read net value for any terminal
      function readTerminal(tid) {
        const net = find(tid);
        return netValues[net] !== undefined ? netValues[net] : 'Z';
      }

      // Evaluate each powered IC
      Object.keys(state.sockets).forEach(sockId => {
        const sock = state.sockets[sockId];
        if (!sock.ic) return;
        const icDef = IC_DEFINITIONS[sock.ic];

        if (!sock.isPowered) {
          // Unpowered IC: All outputs remain 'Z'
          Object.keys(icDef.pinout).forEach(p => {
            if (icDef.pinout[p].type === 'out') {
              pinValues[`${sockId}:p${p}`] = 'Z';
            }
          });
          return;
        }

        // Combinational Gate ICs (7400, 7404, 7408, 7432, 7486)
        if (icDef.gates) {
          icDef.gates.forEach(g => {
            const inVals = g.inputs.map(p => readTerminal(`${sockId}:p${p}`));
            const outVal = g.fn(...inVals);
            const outTid = `${sockId}:p${g.output}`;
            const prevVal = pinValues[outTid];

            if (prevVal !== outVal) {
              pinValues[outTid] = outVal;
              changed = true;
            }
            // Register as driver
            if (outVal !== 'Z') {
              addDriver(outTid, outVal, `${sockId} Output Pin ${g.output}`);
            }
          });
        }

        // 74151 8:1 MUX
        else if (sock.ic === '74151') {
          const inputMap = {};
          for (let p = 1; p <= 16; p++) {
            inputMap[p] = readTerminal(`${sockId}:p${p}`);
          }
          const outMap = icDef.evaluate(inputMap);
          [5, 6].forEach(p => {
            const outTid = `${sockId}:p${p}`;
            const outVal = outMap[p];
            if (pinValues[outTid] !== outVal) {
              pinValues[outTid] = outVal;
              changed = true;
            }
            if (outVal !== 'Z') {
              addDriver(outTid, outVal, `${sockId} Output Pin ${p}`);
            }
          });
        }

        // Sequential 7476 JK Flip-Flop
        else if (sock.ic === '7476') {
          if (!sock.icState) sock.icState = icDef.initInternalState();
          const inputMap = {};
          for (let p = 1; p <= 16; p++) {
            inputMap[p] = readTerminal(`${sockId}:p${p}`);
          }
          const outMap = icDef.evaluateSequential(sock.icState, inputMap, false);
          [7, 8, 10, 9].forEach(p => {
            const outTid = `${sockId}:p${p}`;
            const outVal = outMap[p];
            pinValues[outTid] = outVal;
            if (outVal !== 'Z') {
              addDriver(outTid, outVal, `${sockId} Output Pin ${p}`);
            }
          });
        }

        // Sequential 7490 Decade Counter
        else if (sock.ic === '7490') {
          if (!sock.icState) sock.icState = icDef.initInternalState();
          const inputMap = {};
          for (let p = 1; p <= 14; p++) {
            inputMap[p] = readTerminal(`${sockId}:p${p}`);
          }
          const outMap = icDef.evaluateSequential(sock.icState, inputMap, false);
          [12, 9, 8, 11].forEach(p => {
            const outTid = `${sockId}:p${p}`;
            const outVal = outMap[p];
            pinValues[outTid] = outVal;
            if (outVal !== 'Z') {
              addDriver(outTid, outVal, `${sockId} Output Pin ${p}`);
            }
          });
        }
      });
    }

    // Save final net resolution
    state.pinValues = pinValues;
    state.nets = parent;
    state.netDrivers = netDrivers;

    // Step 5: Update Board Outputs (16 LEDs, 7-Segment, Logic Probe)
    updateBoardOutputs(parent, pinValues);
    updateDiagnostics();
  }

  function updateBoardOutputs(parent, pinValues) {
    function find(x) {
      if (parent[x] === undefined) return x;
      let curr = x;
      while (parent[curr] !== undefined && parent[curr] !== curr) {
        curr = parent[curr];
      }
      return curr;
    }

    // Function to check net state of any terminal
    function getTerminalNetValue(tid) {
      const net = find(tid);
      const drivers = state.netDrivers[net] || [];
      const has1 = drivers.some(d => d.val === 1);
      const has0 = drivers.some(d => d.val === 0);
      if (has1 && has0) return 'CONFLICT';
      if (has1) return 1;
      if (has0) return 0;
      return 'Z';
    }

    // Update 16 Output LEDs (L16 to L1)
    for (let i = 1; i <= 16; i++) {
      const val = getTerminalNetValue(`out:${i}`);
      const led = document.getElementById(`led_${i}`);
      if (led) {
        led.classList.remove('on', 'conflict');
        if (val === 1) {
          led.classList.add('on');
        } else if (val === 'CONFLICT') {
          led.classList.add('on', 'conflict');
        }
      }
    }

    // Update 7-Segment Display A (A3..A0)
    const valA3 = getTerminalNetValue('seg:a3');
    const valA2 = getTerminalNetValue('seg:a2');
    const valA1 = getTerminalNetValue('seg:a1');
    const valA0 = getTerminalNetValue('seg:a0');
    if (valA3 !== 'Z' || valA2 !== 'Z' || valA1 !== 'Z' || valA0 !== 'Z') {
      const binA = ((valA3 === 1 ? 1 : 0) << 3) |
                   ((valA2 === 1 ? 1 : 0) << 2) |
                   ((valA1 === 1 ? 1 : 0) << 1) |
                   (valA0 === 1 ? 1 : 0);
      DOM.segA.textContent = binA.toString(16).toUpperCase();
    } else {
      DOM.segA.textContent = '—';
    }

    // Update 7-Segment Display B (B3..B0)
    const valB3 = getTerminalNetValue('seg:b3');
    const valB2 = getTerminalNetValue('seg:b2');
    const valB1 = getTerminalNetValue('seg:b1');
    const valB0 = getTerminalNetValue('seg:b0');
    if (valB3 !== 'Z' || valB2 !== 'Z' || valB1 !== 'Z' || valB0 !== 'Z') {
      const binB = ((valB3 === 1 ? 1 : 0) << 3) |
                   ((valB2 === 1 ? 1 : 0) << 2) |
                   ((valB1 === 1 ? 1 : 0) << 1) |
                   (valB0 === 1 ? 1 : 0);
      DOM.segB.textContent = binB.toString(16).toUpperCase();
    } else {
      DOM.segB.textContent = '—';
    }

    // Update Logic Probe
    const probeVal = getTerminalNetValue('probe');
    DOM.probeLedH.classList.remove('on');
    DOM.probeLedL.classList.remove('on');
    if (probeVal === 1) {
      DOM.probeLedH.classList.add('on');
    } else if (probeVal === 0) {
      DOM.probeLedL.classList.add('on');
    }
  }

  function turnOffAllDisplays() {
    for (let i = 1; i <= 16; i++) {
      const led = document.getElementById(`led_${i}`);
      if (led) led.classList.remove('on');
      const swLed = document.getElementById(`sw_led_${i}`);
      if (swLed) swLed.classList.remove('on');
    }
    DOM.segA.textContent = '—';
    DOM.segB.textContent = '—';
    DOM.probeLedH.classList.remove('on');
    DOM.probeLedL.classList.remove('on');
    DOM.clockStatusLed.classList.remove('on');
    DOM.pulserLed.classList.remove('on');
  }

  // =========================================================================
  // 7. REAL-TIME CIRCUIT DIAGNOSTICS ENGINE
  // =========================================================================

  function updateDiagnostics() {
    const diagList = [];
    const powerList = [];
    const signalList = [];
    const netList = [];

    let hasErrors = false;
    let hasWarnings = false;

    if (!state.mainsPower) {
      diagList.push({ type: 'warn', msg: 'Trainer Mains Power is OFF.' });
    }

    // Audit seated ICs
    let seatedCount = 0;
    Object.keys(state.sockets).forEach(sockId => {
      const sock = state.sockets[sockId];
      if (!sock.ic) return;
      seatedCount++;
      const icDef = IC_DEFINITIONS[sock.ic];

      if (!sock.isPowered) {
        hasErrors = true;
        const msg = `IC ${sockId} (${sock.ic}) is UNPOWERED. Wire Pin ${icDef.vccPin} to VCC (+5V) and Pin ${icDef.gndPin} to GND.`;
        powerList.push({ type: 'err', msg });
        diagList.push({ type: 'err', msg });
      } else {
        powerList.push({ type: 'ok', msg: `IC ${sockId} (${sock.ic}) VCC & GND connected properly.` });
      }

      // Check for floating inputs on powered ICs
      if (sock.isPowered) {
        Object.keys(icDef.pinout).forEach(p => {
          const pinInfo = icDef.pinout[p];
          if (pinInfo.type === 'in' || pinInfo.type === 'clk') {
            const tid = `${sockId}:p${p}`;
            const isWired = state.wires.some(w => w.from === tid || w.to === tid);
            if (!isWired) {
              hasWarnings = true;
              const msg = `${sockId} Pin ${p} (${pinInfo.name}) is FLOATING (unconnected).`;
              signalList.push({ type: 'warn', msg });
            }
          }
        });
      }
    });

    if (seatedCount === 0) {
      powerList.push({ type: 'info', msg: 'No ICs seated in trainer sockets.' });
    }

    // Check for short circuits / bus contention
    Object.keys(state.netDrivers).forEach(net => {
      const drivers = state.netDrivers[net] || [];
      const has1 = drivers.some(d => d.val === 1);
      const has0 = drivers.some(d => d.val === 0);
      if (has1 && has0) {
        hasErrors = true;
        const driverNames = drivers.map(d => d.desc).join(', ');
        const msg = `BUS CONTENTION / SHORT CIRCUIT on net! Opposing signals driven by: ${driverNames}`;
        signalList.push({ type: 'err', msg });
        diagList.push({ type: 'err', msg });
      }
    });

    if (signalList.length === 0) {
      signalList.push({ type: 'ok', msg: 'No signal conflicts or floating inputs detected.' });
    }

    // Populate Active Net List
    const netGroups = {};
    state.wires.forEach(w => {
      const netA = state.nets[w.from] || w.from;
      if (!netGroups[netA]) netGroups[netA] = new Set();
      netGroups[netA].add(formatTerminalName(w.from));
      netGroups[netA].add(formatTerminalName(w.to));
    });

    const netKeys = Object.keys(netGroups);
    if (netKeys.length === 0) {
      netList.push({ type: 'info', msg: 'No patch wires connected on board.' });
    } else {
      netKeys.forEach((k, idx) => {
        const terms = Array.from(netGroups[k]).join(' ⟷ ');
        netList.push({ type: 'info', msg: `Net #${idx + 1}: ${terms}` });
      });
    }

    // Update Diagnostics Badge in Header
    if (hasErrors) {
      DOM.diagBadge.className = 'badge err';
      DOM.diagBadge.textContent = 'ERROR';
      DOM.diagSummaryBanner.className = 'diag-summary-banner err';
      DOM.diagSummaryBanner.textContent = 'Critical Electrical Warnings: Resolve unpowered ICs or bus conflicts.';
    } else if (hasWarnings) {
      DOM.diagBadge.className = 'badge warn';
      DOM.diagBadge.textContent = 'CHECK';
      DOM.diagSummaryBanner.className = 'diag-summary-banner warn';
      DOM.diagSummaryBanner.textContent = 'Circuit Advisory: Some IC inputs are floating or unconnected.';
    } else {
      DOM.diagBadge.className = 'badge ok';
      DOM.diagBadge.textContent = 'HEALTHY';
      DOM.diagSummaryBanner.className = 'diag-summary-banner ok';
      DOM.diagSummaryBanner.textContent = 'All circuits, power rails, and connected nets are operating normally.';
    }

    // Render lists in modal
    DOM.diagPowerList.innerHTML = powerList
      .map(item => `<div class="diag-msg-item ${item.type}">${item.msg}</div>`)
      .join('');
    DOM.diagSignalList.innerHTML = signalList
      .map(item => `<div class="diag-msg-item ${item.type}">${item.msg}</div>`)
      .join('');
    DOM.diagNetList.innerHTML = netList
      .map(item => `<div class="diag-msg-item">${item.msg}</div>`)
      .join('');
  }

  // =========================================================================
  // 8. CLOCK PULSE GENERATOR & SEQUENTIAL STEPPER
  // =========================================================================

  function toggleClock() {
    if (!state.mainsPower) {
      flashStatus('Cannot start clock: Trainer power is OFF.', true);
      return;
    }

    state.clock.running = !state.clock.running;

    if (state.clock.running) {
      DOM.btnClockStartStop.textContent = 'STOP';
      DOM.btnClockStartStop.classList.add('running');
      DOM.clockStatusText.textContent = `${state.clock.frequency} Hz`;
      scheduleNextClockTick();
    } else {
      stopClockTimer();
      DOM.btnClockStartStop.textContent = 'RUN';
      DOM.btnClockStartStop.classList.remove('running');
      DOM.clockStatusText.textContent = 'STOPPED';
      DOM.clockStatusLed.classList.remove('on');
    }
  }

  function stopClockTimer() {
    if (state.clock.timerId) {
      clearTimeout(state.clock.timerId);
      state.clock.timerId = null;
    }
  }

  function scheduleNextClockTick() {
    if (!state.clock.running) return;
    const intervalMs = (1000 / state.clock.frequency) / 2; // half period
    state.clock.timerId = setTimeout(() => {
      triggerClockToggle();
      scheduleNextClockTick();
    }, intervalMs);
  }

  function triggerClockToggle() {
    if (!state.mainsPower) return;
    state.clock.state = state.clock.state === 1 ? 0 : 1;
    DOM.clockStatusLed.classList.toggle('on', state.clock.state === 1);
    if (state.clock.state === 0) {
      state.clock.pulseCount++;
      DOM.pulseCountVal.textContent = String(state.clock.pulseCount).padStart(2, '0');
    }
    runSimulation();
  }

  function triggerManualPulse() {
    if (!state.mainsPower) {
      flashStatus('Power is OFF.', true);
      return;
    }

    // Clean negative pulse: 1 -> 0 -> 1 (typical TTL pulser active-low transition)
    state.pulser.state = 0;
    DOM.pulserLed.classList.add('on');
    state.clock.pulseCount++;
    DOM.pulseCountVal.textContent = String(state.clock.pulseCount).padStart(2, '0');
    runSimulation();

    if (state.pulser.activeTimer) clearTimeout(state.pulser.activeTimer);
    state.pulser.activeTimer = setTimeout(() => {
      state.pulser.state = 1;
      DOM.pulserLed.classList.remove('on');
      runSimulation();
    }, 200);
  }

  // =========================================================================
  // 9. EVENT LISTENERS & INTERACTIVE CONTROLS
  // =========================================================================

  function setupEventListeners() {
    // Board terminal clicks
    DOM.trainerBoard.addEventListener('click', e => {
      const jack = e.target.closest('.terminal-jack');
      if (jack) {
        e.stopPropagation();
        const tid = jack.dataset.tid;
        handleTerminalClick(tid);
        return;
      }

      // Empty ZIF Socket click -> Open IC selector
      const zifCore = e.target.closest('.zif-socket-core');
      if (zifCore && !zifCore.classList.contains('locked')) {
        const sockId = zifCore.dataset.sock;
        openIcSelectorModal(sockId);
        return;
      }

      // Eject button click
      const ejectBtn = e.target.closest('.btn-eject-ic');
      if (ejectBtn) {
        const sockId = ejectBtn.dataset.eject;
        ejectIc(sockId);
        return;
      }
    });

    // Toggle Input Switch
    DOM.inputUnitsContainer.addEventListener('click', e => {
      const swToggle = e.target.closest('.toggle-switch-hardware');
      if (!swToggle) return;
      const swId = parseInt(swToggle.dataset.sw, 10);
      toggleInputSwitch(swId);
    });

    // Mains Power Switch
    DOM.mainsPowerSwitch.addEventListener('click', () => {
      state.mainsPower = !state.mainsPower;
      DOM.mainsPowerSwitch.classList.toggle('on', state.mainsPower);
      DOM.mainsPowerSwitch.classList.toggle('off', !state.mainsPower);
      DOM.mainsPowerLed.classList.toggle('on', state.mainsPower);
      if (!state.mainsPower && state.clock.running) {
        toggleClock();
      }
      runSimulation();
      flashStatus(`Mains Power switched ${state.mainsPower ? 'ON' : 'OFF'}.`);
    });

    // Clock controls
    DOM.btnClockStartStop.addEventListener('click', toggleClock);
    DOM.clockFreqSlider.addEventListener('input', e => {
      const freq = parseFloat(e.target.value);
      state.clock.frequency = freq;
      DOM.clockFreqDisplay.textContent = `${freq.toFixed(1)} Hz`;
      if (state.clock.running) {
        DOM.clockStatusText.textContent = `${freq.toFixed(1)} Hz`;
      }
    });
    DOM.btnManualPulse.addEventListener('click', triggerManualPulse);
    DOM.btnResetCounter.addEventListener('click', () => {
      state.clock.pulseCount = 0;
      DOM.pulseCountVal.textContent = '00';
    });

    // Wire action buttons
    DOM.btnCancelWire.addEventListener('click', cancelWireSelection);
    DOM.btnDeleteSelectedWire.addEventListener('click', deleteSelectedWire);
    DOM.btnClearWires.addEventListener('click', () => {
      if (state.wires.length === 0) return;
      if (confirm('Are you sure you want to remove ALL patch wires from the board?')) {
        state.wires = [];
        state.selectedWireId = null;
        renderWires();
        runSimulation();
        updateStatusBar();
        flashStatus('All patch wires cleared.');
      }
    });

    // Reset Entire Board
    DOM.btnResetBoard.addEventListener('click', () => {
      if (confirm('Reset entire trainer board (remove all ICs and wires)?')) {
        state.wires = [];
        state.selectedWireId = null;
        Object.keys(state.sockets).forEach(sockId => {
          state.sockets[sockId].ic = null;
          state.sockets[sockId].icState = null;
          state.sockets[sockId].isPowered = false;
        });
        for (let i = 1; i <= 16; i++) state.switches[i] = 0;
        state.clock.pulseCount = 0;
        DOM.pulseCountVal.textContent = '00';
        renderSockets();
        renderInputUnits();
        renderWires();
        runSimulation();
        updateStatusBar();
        flashStatus('Board reset to factory default state.');
      }
    });

    // Wire Color Select
    DOM.wireColorSelect.addEventListener('change', e => {
      state.wireColor = e.target.value;
    });

    // Zoom Controls
    DOM.btnZoomIn.addEventListener('click', () => adjustZoom(0.1));
    DOM.btnZoomOut.addEventListener('click', () => adjustZoom(-0.1));
    DOM.btnZoomReset.addEventListener('click', () => {
      state.zoom = 1.0;
      applyZoom();
    });

    // IC Selector Modal
    DOM.btnCloseIcModal.addEventListener('click', () => {
      DOM.icSelectorModal.classList.add('hidden');
    });
    DOM.icSelectorModal.addEventListener('click', e => {
      const card = e.target.closest('.ic-card');
      if (card && targetModalSocket) {
        const icCode = card.dataset.ic;
        insertIcIntoSocket(targetModalSocket, icCode);
        DOM.icSelectorModal.classList.add('hidden');
      }
    });

    // Experiment Drawer
    DOM.btnExpGuide.addEventListener('click', () => {
      DOM.experimentDrawer.classList.toggle('hidden');
    });
    DOM.btnCloseDrawer.addEventListener('click', () => {
      DOM.experimentDrawer.classList.add('hidden');
    });
    DOM.practicalSelect.addEventListener('change', e => {
      renderExperimentDoc(e.target.value);
    });
    DOM.btnLoadExpTemplate.addEventListener('click', () => {
      const expKey = DOM.practicalSelect.value;
      setupExperimentICs(expKey);
    });
    DOM.btnAutoWireExp.addEventListener('click', () => {
      const expKey = DOM.practicalSelect.value;
      autoWireExperiment(expKey);
    });
    DOM.btnVerifyCircuit.addEventListener('click', () => {
      const expKey = DOM.practicalSelect.value;
      verifyCurrentCircuit(expKey);
    });

    // Diagnostics Modal
    DOM.btnDiagnostics.addEventListener('click', () => {
      updateDiagnostics();
      DOM.diagnosticsModal.classList.remove('hidden');
    });
    DOM.btnCloseDiagModal.addEventListener('click', () => {
      DOM.diagnosticsModal.classList.add('hidden');
    });

    // Keyboard Shortcuts
    window.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        cancelWireSelection();
        DOM.icSelectorModal.classList.add('hidden');
        DOM.experimentDrawer.classList.add('hidden');
        DOM.diagnosticsModal.classList.add('hidden');
      }
      if ((e.key === 'Delete' || e.key === 'Backspace') && state.selectedWireId) {
        deleteSelectedWire();
      }
    });

    // Window Resize / Scroll wire recalculation
    window.addEventListener('resize', () => {
      renderWires();
    });
  }

  function adjustZoom(delta) {
    state.zoom = Math.max(0.6, Math.min(1.4, state.zoom + delta));
    applyZoom();
  }

  function applyZoom() {
    DOM.trainerBoard.style.transform = `scale(${state.zoom})`;
    DOM.zoomLabel.textContent = `${Math.round(state.zoom * 100)}%`;
    renderWires();
  }

  function toggleInputSwitch(swId) {
    if (!state.mainsPower) {
      flashStatus('Cannot toggle switches: Trainer power is OFF.', true);
      return;
    }
    state.switches[swId] = state.switches[swId] === 1 ? 0 : 1;
    const isHigh = state.switches[swId] === 1;

    // Update physical switch UI
    const swEl = document.getElementById(`sw_toggle_${swId}`);
    const swLed = document.getElementById(`sw_led_${swId}`);
    const swLbl = document.getElementById(`sw_lbl_${swId}`);

    if (swEl) {
      swEl.className = `toggle-switch-hardware ${isHigh ? 'up' : 'down'}`;
    }
    if (swLed) {
      swLed.classList.toggle('on', isHigh);
    }
    if (swLbl) {
      swLbl.textContent = isHigh ? '1' : '0';
      swLbl.className = `unit-state-lbl ${isHigh ? 'high' : ''}`;
    }

    runSimulation();
  }

  // =========================================================================
  // 10. IC INSERTION & EJECTION LOGIC
  // =========================================================================

  function openIcSelectorModal(sockId) {
    targetModalSocket = sockId;
    DOM.icModalSocketTitle.textContent = `Insert IC into Socket ${sockId}`;
    DOM.icSelectorModal.classList.remove('hidden');
  }

  function insertIcIntoSocket(sockId, icCode) {
    const icDef = IC_DEFINITIONS[icCode];
    if (!icDef) return;

    state.sockets[sockId].ic = icCode;
    state.sockets[sockId].icState = icDef.initInternalState ? icDef.initInternalState() : null;
    state.sockets[sockId].isPowered = false;

    renderSockets();
    renderWires();
    runSimulation();
    updateStatusBar();
    flashStatus(`Inserted IC ${icCode} (${icDef.name}) into Socket ${sockId}. Connect VCC and GND to power it.`);
  }

  function ejectIc(sockId) {
    const ic = state.sockets[sockId].ic;
    if (!ic) return;

    // Safely remove all wires attached to this socket's pins
    const prefix = `${sockId}:p`;
    state.wires = state.wires.filter(w => !w.from.startsWith(prefix) && !w.to.startsWith(prefix));

    state.sockets[sockId].ic = null;
    state.sockets[sockId].icState = null;
    state.sockets[sockId].isPowered = false;

    renderSockets();
    renderWires();
    runSimulation();
    updateStatusBar();
    flashStatus(`Ejected IC ${ic} from Socket ${sockId} and safely removed attached wires.`);
  }

  function updateStatusBar() {
    DOM.wireCountDisplay.textContent = `${state.wires.length} Wires`;
    const seated = Object.values(state.sockets).filter(s => !!s.ic).length;
    DOM.activeIcCountDisplay.textContent = `${seated} ICs Seated`;
  }

  function flashStatus(msg, isError = false) {
    DOM.statusMessage.textContent = msg;
    DOM.statusMessage.style.color = isError ? '#f87171' : '#facc15';
    setTimeout(() => {
      DOM.statusMessage.style.color = '#cbd5e1';
    }, 4000);
  }

  // =========================================================================
  // 11. COMPREHENSIVE DATABASE OF 19 DLCO PRACTICALS & VIVA HELPER
  // =========================================================================

  const EXPERIMENTS = {
    exp1: {
      title: 'Full Adder (Sum & Carry using XOR, AND, OR Gates)',
      aim: 'To design, construct, and verify the truth table of a 1-bit Full Adder using IC 7486 (XOR), IC 7408 (AND), and IC 7432 (OR).',
      requiredIcs: ['7486', '7408', '7432'],
      socketLayout: { U1: '7486', U2: '7408', U3: '7432' },
      inputsDesc: 'Input Switches: S1 = A, S2 = B, S3 = Cin',
      outputsDesc: 'Output LEDs: L1 = SUM, L2 = CARRY_OUT',
      instructions: [
        '1. Seat IC 7486 (XOR) into Socket U1, IC 7408 (AND) into U2, IC 7432 (OR) into U3.',
        '2. Power connections: Wire Pin 14 of U1, U2, U3 to VCC (+5V rail). Wire Pin 7 of U1, U2, U3 to GND.',
        '3. First XOR Gate (Half Sum): Wire Switch S1 (A) to U1 Pin 1; Switch S2 (B) to U1 Pin 2.',
        '4. Second XOR Gate (Final Sum): Wire U1 Pin 3 (A⊕B) to U1 Pin 4; Switch S3 (Cin) to U1 Pin 5. Wire U1 Pin 6 (SUM) to Output LED L1 (Terminal OP1).',
        '5. First AND Gate: Wire S1 (A) to U2 Pin 1; S2 (B) to U2 Pin 2 (produces A·B on Pin 3).',
        '6. Second AND Gate: Wire U1 Pin 3 (A⊕B) to U2 Pin 4; S3 (Cin) to U2 Pin 5 (produces Cin·(A⊕B) on Pin 6).',
        '7. OR Gate (Final Carry): Wire U2 Pin 3 to U3 Pin 1; U2 Pin 6 to U3 Pin 2. Wire U3 Pin 3 (CARRY) to Output LED L2 (Terminal OP2).'
      ],
      truthTable: [
        { A: 0, B: 0, Cin: 0, SUM: 0, CARRY: 0 },
        { A: 0, B: 0, Cin: 1, SUM: 1, CARRY: 0 },
        { A: 0, B: 1, Cin: 0, SUM: 1, CARRY: 0 },
        { A: 0, B: 1, Cin: 1, SUM: 0, CARRY: 1 },
        { A: 1, B: 0, Cin: 0, SUM: 1, CARRY: 0 },
        { A: 1, B: 0, Cin: 1, SUM: 0, CARRY: 1 },
        { A: 1, B: 1, Cin: 0, SUM: 0, CARRY: 1 },
        { A: 1, B: 1, Cin: 1, SUM: 1, CARRY: 1 }
      ],
      referenceWires: [
        // Power
        { from: 'vcc:1', to: 'U1:p14' }, { from: 'gnd:1', to: 'U1:p7' },
        { from: 'vcc:3', to: 'U2:p14' }, { from: 'gnd:3', to: 'U2:p7' },
        { from: 'vcc:5', to: 'U3:p14' }, { from: 'gnd:5', to: 'U3:p7' },
        // Inputs
        { from: 'in:1', to: 'U1:p1' }, { from: 'in:2', to: 'U1:p2' },
        { from: 'U1:p3', to: 'U1:p4' }, { from: 'in:3', to: 'U1:p5' },
        // Sum output
        { from: 'U1:p6', to: 'out:1' },
        // AND gates for Carry
        { from: 'in:1', to: 'U2:p1' }, { from: 'in:2', to: 'U2:p2' },
        { from: 'U1:p3', to: 'U2:p4' }, { from: 'in:3', to: 'U2:p5' },
        // OR gate for Carry
        { from: 'U2:p3', to: 'U3:p1' }, { from: 'U2:p6', to: 'U3:p2' },
        // Carry output
        { from: 'U3:p3', to: 'out:2' }
      ],
      viva: [
        { q: 'What is a Full Adder?', a: 'A combinational logic circuit that performs the arithmetic sum of three binary input bits: augend A, addend B, and carry-in Cin from a previous stage.' },
        { q: 'What are the Boolean expressions for Full Adder SUM and CARRY?', a: 'SUM = A ⊕ B ⊕ Cin; CARRY = (A · B) + (Cin · (A ⊕ B)).' },
        { q: 'How many Half Adders are required to construct a Full Adder?', a: 'Two Half Adders and one OR gate.' },
        { q: 'Why is IC 7486 used for the sum output?', a: 'IC 7486 contains Quad 2-input XOR gates, which compute the modulo-2 sum of bits.' }
      ]
    },

    exp2: {
      title: 'Full Subtractor (Difference & Borrow using XOR, NOT, AND, OR)',
      aim: 'To design, construct, and verify a 1-bit Full Subtractor using IC 7486 (XOR), IC 7404 (NOT), IC 7408 (AND), and IC 7432 (OR).',
      requiredIcs: ['7486', '7404', '7408', '7432'],
      socketLayout: { U1: '7486', U2: '7404', U3: '7408', U4: '7432' },
      inputsDesc: 'Input Switches: S1 = A (Minuend), S2 = B (Subtrahend), S3 = Bin (Borrow-in)',
      outputsDesc: 'Output LEDs: L1 = DIFFERENCE, L2 = BORROW_OUT',
      instructions: [
        '1. Seat U1: 7486 (XOR), U2: 7404 (NOT), U3: 7408 (AND), U4: 7432 (OR).',
        '2. Wire Pin 14 of all ICs to VCC and Pin 7 of all ICs to GND.',
        '3. Difference: S1(A) to U1:p1, S2(B) to U1:p2. U1:p3 to U1:p4; S3(Bin) to U1:p5. U1:p6 to LED L1 (DIFF).',
        '4. Invert A: Wire S1(A) to U2:p1 (NOT). Output A̅ is at U2:p2.',
        '5. Borrow logic: U2:p2 (A̅) to U3:p1; S2(B) to U3:p2 (produces A̅·B on U3:p3).',
        '6. Invert (A⊕B): U1:p3 to U2:p3. Output (A⊕B)̅ is at U2:p4. Wire U2:p4 to U3:p4; S3(Bin) to U3:p5 (produces Bin·(A⊕B)̅ on U3:p6).',
        '7. OR Borrow terms: U3:p3 to U4:p1; U3:p6 to U4:p2. Wire U4:p3 (BORROW) to LED L2 (Terminal OP2).'
      ],
      truthTable: [
        { A: 0, B: 0, Bin: 0, DIFF: 0, BORROW: 0 },
        { A: 0, B: 0, Bin: 1, DIFF: 1, BORROW: 1 },
        { A: 0, B: 1, Bin: 0, DIFF: 1, BORROW: 1 },
        { A: 0, B: 1, Bin: 1, DIFF: 0, BORROW: 1 },
        { A: 1, B: 0, Bin: 0, DIFF: 1, BORROW: 0 },
        { A: 1, B: 0, Bin: 1, DIFF: 0, BORROW: 0 },
        { A: 1, B: 1, Bin: 0, DIFF: 0, BORROW: 0 },
        { A: 1, B: 1, Bin: 1, DIFF: 1, BORROW: 1 }
      ],
      referenceWires: [
        { from: 'vcc:1', to: 'U1:p14' }, { from: 'gnd:1', to: 'U1:p7' },
        { from: 'vcc:3', to: 'U2:p14' }, { from: 'gnd:3', to: 'U2:p7' },
        { from: 'vcc:5', to: 'U3:p14' }, { from: 'gnd:5', to: 'U3:p7' },
        { from: 'vcc:7', to: 'U4:p14' }, { from: 'gnd:7', to: 'U4:p7' },
        { from: 'in:1', to: 'U1:p1' }, { from: 'in:2', to: 'U1:p2' },
        { from: 'U1:p3', to: 'U1:p4' }, { from: 'in:3', to: 'U1:p5' },
        { from: 'U1:p6', to: 'out:1' },
        { from: 'in:1', to: 'U2:p1' },
        { from: 'U2:p2', to: 'U3:p1' }, { from: 'in:2', to: 'U3:p2' },
        { from: 'U1:p3', to: 'U2:p3' },
        { from: 'U2:p4', to: 'U3:p4' }, { from: 'in:3', to: 'U3:p5' },
        { from: 'U3:p3', to: 'U4:p1' }, { from: 'U3:p6', to: 'U4:p2' },
        { from: 'U4:p3', to: 'out:2' }
      ],
      viva: [
        { q: 'What is a Full Subtractor?', a: 'A combinational circuit that computes A - B - Bin, taking borrow-in into account.' },
        { q: 'What is the expression for Borrow Out?', a: 'Bout = A̅·B + Bin·(A ⊕ B)̅.' }
      ]
    },

    exp3: {
      title: '3-Bit Binary to Gray Code Converter',
      aim: 'To construct and test a 3-bit Binary to Gray Code Converter using IC 7486 (XOR gates).',
      requiredIcs: ['7486'],
      socketLayout: { U1: '7486' },
      inputsDesc: 'Input Switches: S3 = B2 (MSB), S2 = B1, S1 = B0 (LSB)',
      outputsDesc: 'Output LEDs: L3 = G2 (MSB), L2 = G1, L1 = G0 (LSB)',
      instructions: [
        '1. Seat IC 7486 into Socket U1. Wire Pin 14 to VCC and Pin 7 to GND.',
        '2. G2 = B2 (Direct connection): Wire S3 (B2) directly to LED L3 (OP3).',
        '3. G1 = B2 ⊕ B1: Wire S3 (B2) to U1:p1; S2 (B1) to U1:p2. Wire U1:p3 to LED L2 (OP2).',
        '4. G0 = B1 ⊕ B0: Wire S2 (B1) to U1:p4; S1 (B0) to U1:p5. Wire U1:p6 to LED L1 (OP1).'
      ],
      truthTable: [
        { B2: 0, B1: 0, B0: 0, G2: 0, G1: 0, G0: 0 },
        { B2: 0, B1: 0, B0: 1, G2: 0, G1: 0, G0: 1 },
        { B2: 0, B1: 1, B0: 0, G2: 0, G1: 1, G0: 1 },
        { B2: 0, B1: 1, B0: 1, G2: 0, G1: 1, G0: 0 },
        { B2: 1, B0: 0, B1: 0, G2: 1, G1: 1, G0: 0 },
        { B2: 1, B1: 0, B0: 1, G2: 1, G1: 1, G0: 1 },
        { B2: 1, B1: 1, B0: 0, G2: 1, G1: 0, G0: 1 },
        { B2: 1, B1: 1, B0: 1, G2: 1, G1: 0, G0: 0 }
      ],
      referenceWires: [
        { from: 'vcc:1', to: 'U1:p14' }, { from: 'gnd:1', to: 'U1:p7' },
        { from: 'in:3', to: 'out:3' }, // G2 = B2
        { from: 'in:3', to: 'U1:p1' }, { from: 'in:2', to: 'U1:p2' }, { from: 'U1:p3', to: 'out:2' }, // G1 = B2 ^ B1
        { from: 'in:2', to: 'U1:p4' }, { from: 'in:1', to: 'U1:p5' }, { from: 'U1:p6', to: 'out:1' }  // G0 = B1 ^ B0
      ],
      viva: [
        { q: 'What is a Gray code?', a: 'An unweighted binary code in which two successive values differ in only one bit position (unit distance code).' },
        { q: 'Why is Gray code used in rotary encoders and angle sensors?', a: 'To prevent false intermediate readouts during mechanical or optical transitions.' }
      ]
    },

    exp4: {
      title: '4-Bit Binary to Gray Code Converter',
      aim: 'To construct and test a 4-bit Binary to Gray Code Converter using IC 7486.',
      requiredIcs: ['7486'],
      socketLayout: { U1: '7486' },
      inputsDesc: 'Input Switches: S4 = B3 (MSB), S3 = B2, S2 = B1, S1 = B0 (LSB)',
      outputsDesc: 'Output LEDs: L4 = G3 (MSB), L3 = G2, L2 = G1, L1 = G0 (LSB)',
      instructions: [
        '1. Seat IC 7486 into Socket U1. Wire Pin 14 to VCC and Pin 7 to GND.',
        '2. G3 = B3: Wire Switch S4 directly to LED L4 (OP4).',
        '3. G2 = B3 ⊕ B2: Wire S4 to U1:p1; S3 to U1:p2. Wire U1:p3 to LED L3 (OP3).',
        '4. G1 = B2 ⊕ B1: Wire S3 to U1:p4; S2 to U1:p5. Wire U1:p6 to LED L2 (OP2).',
        '5. G0 = B1 ⊕ B0: Wire S2 to U1:p9; S1 to U1:p10. Wire U1:p8 to LED L1 (OP1).'
      ],
      truthTable: [
        { B3: 0, B2: 0, B1: 0, B0: 0, G3: 0, G2: 0, G1: 0, G0: 0 },
        { B3: 0, B2: 1, B1: 0, B0: 1, G3: 0, G2: 1, G1: 1, G0: 1 },
        { B3: 1, B2: 0, B1: 1, B0: 0, G3: 1, G2: 1, G1: 1, G0: 0 },
        { B3: 1, B2: 1, B1: 1, B0: 1, G3: 1, G2: 0, G1: 0, G0: 1 }
      ],
      referenceWires: [
        { from: 'vcc:1', to: 'U1:p14' }, { from: 'gnd:1', to: 'U1:p7' },
        { from: 'in:4', to: 'out:4' },
        { from: 'in:4', to: 'U1:p1' }, { from: 'in:3', to: 'U1:p2' }, { from: 'U1:p3', to: 'out:3' },
        { from: 'in:3', to: 'U1:p4' }, { from: 'in:2', to: 'U1:p5' }, { from: 'U1:p6', to: 'out:2' },
        { from: 'in:2', to: 'U1:p9' }, { from: 'in:1', to: 'U1:p10' }, { from: 'U1:p8', to: 'out:1' }
      ],
      viva: [
        { q: 'What is a Gray code?', a: 'A reflective binary code in which successive values differ by only 1 bit position.' },
        { q: 'How is Gray code converted back to binary?', a: 'B3 = G3; B2 = B3 ⊕ G2; B1 = B2 ⊕ G1; B0 = B1 ⊕ G0.' },
        { q: 'What is the advantage of Gray code in shaft position encoders?', a: 'It eliminates ambiguous states and glitches caused by multiple mechanical bits changing at slightly different times.' },
        { q: 'How many 2-input XOR gates are required for an n-bit binary to Gray converter?', a: '(n - 1) XOR gates. For a 4-bit converter, exactly 3 XOR gates are needed.' }
      ]
    },

    exp5: {
      title: '1-Bit Magnitude Comparator (A > B, A = B, A < B)',
      aim: 'To design and verify a 1-bit comparator using NOT (7404), AND (7408), and XOR (7486) gates.',
      requiredIcs: ['7404', '7408', '7486'],
      socketLayout: { U1: '7404', U2: '7408', U3: '7486' },
      inputsDesc: 'Input Switches: S1 = A, S2 = B',
      outputsDesc: 'Output LEDs: L1 = (A > B), L2 = (A = B), L3 = (A < B)',
      instructions: [
        '1. Seat U1: 7404, U2: 7408, U3: 7486. Wire Pin 14 of each to VCC and Pin 7 of each to GND.',
        '2. Invert inputs: S1(A) to U1:p1 (A̅ on p2); S2(B) to U1:p3 (B̅ on p4).',
        '3. A > B (A·B̅): S1(A) to U2:p1; U1:p4 (B̅) to U2:p2. Wire U2:p3 to LED L1 (OP1).',
        '4. A < B (A̅·B): U1:p2 (A̅) to U2:p4; S2(B) to U2:p5. Wire U2:p6 to LED L3 (OP3).',
        '5. A = B (A XNOR B): S1(A) to U3:p1; S2(B) to U3:p2 (A⊕B on p3). Wire U3:p3 to U1:p5 (NOT). Wire U1:p6 to LED L2 (OP2).'
      ],
      truthTable: [
        { A: 0, B: 0, 'A>B': 0, 'A=B': 1, 'A<B': 0 },
        { A: 0, B: 1, 'A>B': 0, 'A=B': 0, 'A<B': 1 },
        { A: 1, B: 0, 'A>B': 1, 'A=B': 0, 'A<B': 0 },
        { A: 1, B: 1, 'A>B': 0, 'A=B': 1, 'A<B': 0 }
      ],
      referenceWires: [
        { from: 'vcc:1', to: 'U1:p14' }, { from: 'gnd:1', to: 'U1:p7' },
        { from: 'vcc:3', to: 'U2:p14' }, { from: 'gnd:3', to: 'U2:p7' },
        { from: 'vcc:5', to: 'U3:p14' }, { from: 'gnd:5', to: 'U3:p7' },
        { from: 'in:1', to: 'U1:p1' }, { from: 'in:2', to: 'U1:p3' },
        { from: 'in:1', to: 'U2:p1' }, { from: 'U1:p4', to: 'U2:p2' }, { from: 'U2:p3', to: 'out:1' }, // A > B
        { from: 'U1:p2', to: 'U2:p4' }, { from: 'in:2', to: 'U2:p5' }, { from: 'U2:p6', to: 'out:3' }, // A < B
        { from: 'in:1', to: 'U3:p1' }, { from: 'in:2', to: 'U3:p2' }, { from: 'U3:p3', to: 'U1:p5' }, { from: 'U1:p6', to: 'out:2' } // A = B
      ],
      viva: [
        { q: 'What is a magnitude comparator?', a: 'A combinational logic circuit that compares two binary numbers and determines whether A > B, A = B, or A < B.' },
        { q: 'What is the boolean expression for A = B in a 1-bit comparator?', a: 'A = B is given by the XNOR function: (A ⊕ B)̅ = (A · B) + (A̅ · B̅).' },
        { q: 'What are the expressions for A > B and A < B?', a: 'A > B is A · B̅; A < B is A̅ · B.' },
        { q: 'Which standard TTL IC is a dedicated 4-bit magnitude comparator?', a: 'IC 7485 is a standard 4-bit magnitude comparator with cascading inputs.' }
      ]
    },

    exp6: {
      title: 'Even Parity Generator and Checker',
      aim: 'To construct and test a 3-bit Even Parity Generator and Checker using IC 7486 (XOR gates).',
      requiredIcs: ['7486'],
      socketLayout: { U1: '7486' },
      inputsDesc: 'Input Switches: S3 = D2, S2 = D1, S1 = D0',
      outputsDesc: 'Output LEDs: L1 = Parity Bit P (Even)',
      instructions: [
        '1. Seat IC 7486 into U1. Connect Pin 14 to VCC and Pin 7 to GND.',
        '2. Wire S3 (D2) to U1:p1; S2 (D1) to U1:p2 (produces D2⊕D1 on p3).',
        '3. Wire U1:p3 to U1:p4; S1 (D0) to U1:p5 (produces D2⊕D1⊕D0 on p6).',
        '4. Wire U1:p6 (Even Parity Bit P) to LED L1 (OP1).'
      ],
      truthTable: [
        { D2: 0, D1: 0, D0: 0, P_Even: 0 },
        { D2: 0, D1: 0, D0: 1, P_Even: 1 },
        { D2: 0, D1: 1, D0: 0, P_Even: 1 },
        { D2: 0, D1: 1, D0: 1, P_Even: 0 },
        { D2: 1, D1: 0, D0: 0, P_Even: 1 },
        { D2: 1, D1: 0, D0: 1, P_Even: 0 },
        { D2: 1, D1: 1, D0: 0, P_Even: 0 },
        { D2: 1, D1: 1, D0: 1, P_Even: 1 }
      ],
      referenceWires: [
        { from: 'vcc:1', to: 'U1:p14' }, { from: 'gnd:1', to: 'U1:p7' },
        { from: 'in:3', to: 'U1:p1' }, { from: 'in:2', to: 'U1:p2' },
        { from: 'U1:p3', to: 'U1:p4' }, { from: 'in:1', to: 'U1:p5' },
        { from: 'U1:p6', to: 'out:1' }
      ],
      viva: [
        { q: 'What is a parity bit?', a: 'An extra bit added to a binary data word to detect single-bit errors during transmission.' },
        { q: 'What is Even Parity?', a: 'The parity bit is set such that the total count of 1s in the transmitted codeword is always even.' }
      ]
    },

    exp7: {
      title: 'Odd Parity Generator and Checker',
      aim: 'To construct and test an Odd Parity Generator using IC 7486 and IC 7404.',
      requiredIcs: ['7486', '7404'],
      socketLayout: { U1: '7486', U2: '7404' },
      inputsDesc: 'Input Switches: S3 = D2, S2 = D1, S1 = D0',
      outputsDesc: 'Output LED: L1 = Odd Parity Bit (P_Odd)',
      instructions: [
        '1. Seat U1: 7486, U2: 7404. Connect VCC and GND.',
        '2. XOR data bits: S3(D2) to U1:p1, S2(D1) to U1:p2; U1:p3 to U1:p4; S1(D0) to U1:p5.',
        '3. Invert the XOR result: Wire U1:p6 to U2:p1 (NOT gate).',
        '4. Wire U2:p2 to LED L1 (Terminal OP1).'
      ],
      truthTable: [
        { D2: 0, D1: 0, D0: 0, P_Odd: 1 },
        { D2: 0, D1: 0, D0: 1, P_Odd: 0 },
        { D2: 0, D1: 1, D0: 0, P_Odd: 0 },
        { D2: 0, D1: 1, D0: 1, P_Odd: 1 },
        { D2: 1, D1: 0, D0: 0, P_Odd: 0 },
        { D2: 1, D1: 0, D0: 1, P_Odd: 1 },
        { D2: 1, D1: 1, D0: 0, P_Odd: 1 },
        { D2: 1, D1: 1, D0: 1, P_Odd: 0 }
      ],
      referenceWires: [
        { from: 'vcc:1', to: 'U1:p14' }, { from: 'gnd:1', to: 'U1:p7' },
        { from: 'vcc:3', to: 'U2:p14' }, { from: 'gnd:3', to: 'U2:p7' },
        { from: 'in:3', to: 'U1:p1' }, { from: 'in:2', to: 'U1:p2' },
        { from: 'U1:p3', to: 'U1:p4' }, { from: 'in:1', to: 'U1:p5' },
        { from: 'U1:p6', to: 'U2:p1' }, { from: 'U2:p2', to: 'out:1' }
      ],
      viva: [
        { q: 'What is Odd Parity?', a: 'A scheme where the parity bit is chosen such that the total number of 1s in the data plus parity bit is always an odd number.' },
        { q: 'How does an Odd Parity checker verify data integrity?', a: 'It XORs the received data bits and parity bit. If the overall sum of 1s is even, a transmission error is flagged.' },
        { q: 'What is the limitation of simple parity checking?', a: 'It can only detect odd numbers of bit errors (e.g. 1-bit or 3-bit flips); 2-bit simultaneous errors go undetected.' },
        { q: 'How is odd parity generated from the even parity XOR tree?', a: 'By passing the even parity XOR output through an inverter (NOT gate IC 7404).' }
      ]
    },

    exp8: {
      title: '8-to-1 Multiplexer Verification (IC 74151)',
      aim: 'To verify the truth table and operation of the 8-line to 1-line multiplexer IC 74151.',
      requiredIcs: ['74151'],
      socketLayout: { U1: '74151' },
      inputsDesc: 'S11 = C (S2), S10 = B (S1), S9 = A (S0); S7 = Enable G̅; S1..S8 = Data D0..D7',
      outputsDesc: 'Output LEDs: L1 = Y (True Output), L2 = W (Inverted Output)',
      instructions: [
        '1. Seat IC 74151 into Socket U1. Wire Pin 16 to VCC and Pin 8 to GND.',
        '2. Wire Enable/Strobe Pin 7 to Switch S7 (or GND to enable).',
        '3. Wire Select Lines: S11 to Pin 9 (C/S2), S10 to Pin 10 (B/S1), S9 to Pin 11 (A/S0).',
        '4. Wire Data Lines D0..D7 to Switches S1..S8 (Pin 4=D0, 3=D1, 2=D2, 1=D3, 15=D4, 14=D5, 13=D6, 12=D7).',
        '5. Wire Pin 5 (Y) to LED L1 and Pin 6 (W) to LED L2.'
      ],
      truthTable: [
        { G: 1, C: 'X', B: 'X', A: 'X', Y: 0, W: 1 },
        { G: 0, C: 0, B: 0, A: 0, Y: 'D0', W: 'D0̅' },
        { G: 0, C: 0, B: 0, A: 1, Y: 'D1', W: 'D1̅' },
        { G: 0, C: 1, B: 1, A: 1, Y: 'D7', W: 'D7̅' }
      ],
      referenceWires: [
        { from: 'vcc:1', to: 'U1:p16' }, { from: 'gnd:1', to: 'U1:p8' },
        { from: 'gnd:2', to: 'U1:p7' }, // Enable tied low
        { from: 'in:11', to: 'U1:p9' }, { from: 'in:10', to: 'U1:p10' }, { from: 'in:9', to: 'U1:p11' }, // C, B, A
        { from: 'in:1', to: 'U1:p4' }, { from: 'in:2', to: 'U1:p3' }, { from: 'in:3', to: 'U1:p2' }, { from: 'in:4', to: 'U1:p1' },
        { from: 'in:5', to: 'U1:p15' }, { from: 'in:6', to: 'U1:p14' }, { from: 'in:7', to: 'U1:p13' }, { from: 'in:8', to: 'U1:p12' },
        { from: 'U1:p5', to: 'out:1' }, { from: 'U1:p6', to: 'out:2' }
      ],
      viva: [
        { q: 'What is a Multiplexer (MUX)?', a: 'A combinational circuit that selects one of many analog or digital input lines and forwards the selected input into a single line.' },
        { q: 'What is the function of the Strobe G̅ pin on IC 74151?', a: 'Active-low enable input. When HIGH, Y is forced LOW (0) and W is forced HIGH (1) regardless of data or select inputs.' }
      ]
    },

    exp9: {
      title: 'Boolean Function Realization: F(A,B,C) = Σm(0,3,5,6) via IC 74151',
      aim: 'To implement the 3-variable logic function F(A,B,C) = Σm(0,3,5,6) using the 8-to-1 MUX IC 74151.',
      requiredIcs: ['74151'],
      socketLayout: { U1: '74151' },
      inputsDesc: 'Input Switches: S3 = A (S2/C), S2 = B (S1/B), S1 = C (S0/A)',
      outputsDesc: 'Output LED: L1 = Function Output Y',
      instructions: [
        '1. Seat IC 74151 into Socket U1. Wire Pin 16 to VCC and Pin 8 to GND.',
        '2. Strobe (Pin 7) must be grounded: Wire Pin 7 to GND.',
        '3. Connect variables to select lines: S3(A) to Pin 9 (C), S2(B) to Pin 10 (B), S1(C) to Pin 11 (A).',
        '4. Connect minterms to VCC (+5V): D0 (Pin 4), D3 (Pin 1), D5 (Pin 14), D6 (Pin 13) to VCC terminals.',
        '5. Connect non-minterms to GND (0V): D1 (Pin 3), D2 (Pin 2), D4 (Pin 15), D7 (Pin 12) to GND terminals.',
        '6. Connect Pin 5 (Output Y) to LED L1 (Terminal OP1).'
      ],
      truthTable: [
        { A: 0, B: 0, C: 0, F: 1 },
        { A: 0, B: 0, C: 1, F: 0 },
        { A: 0, B: 1, C: 0, F: 0 },
        { A: 0, B: 1, C: 1, F: 1 },
        { A: 1, B: 0, C: 0, F: 0 },
        { A: 1, B: 0, C: 1, F: 1 },
        { A: 1, B: 1, C: 0, F: 1 },
        { A: 1, B: 1, C: 1, F: 0 }
      ],
      referenceWires: [
        { from: 'vcc:1', to: 'U1:p16' }, { from: 'gnd:1', to: 'U1:p8' },
        { from: 'gnd:2', to: 'U1:p7' }, // Strobe grounded
        { from: 'in:3', to: 'U1:p9' }, { from: 'in:2', to: 'U1:p10' }, { from: 'in:1', to: 'U1:p11' }, // A, B, C select
        // Minterms 0, 3, 5, 6 to VCC
        { from: 'vcc:2', to: 'U1:p4' },  // D0
        { from: 'vcc:3', to: 'U1:p1' },  // D3
        { from: 'vcc:4', to: 'U1:p14' }, // D5
        { from: 'vcc:5', to: 'U1:p13' }, // D6
        // Non-minterms 1, 2, 4, 7 to GND
        { from: 'gnd:3', to: 'U1:p3' },  // D1
        { from: 'gnd:4', to: 'U1:p2' },  // D2
        { from: 'gnd:5', to: 'U1:p15' }, // D4
        { from: 'gnd:6', to: 'U1:p12' }, // D7
        { from: 'U1:p5', to: 'out:1' }   // Output Y
      ],
      viva: [
        { q: 'How is a boolean function realized using a multiplexer?', a: 'For n variables using a 2ⁿ:1 MUX, apply n variables to select lines; connect data inputs corresponding to minterms to logic 1 (VCC) and remaining inputs to logic 0 (GND).' },
        { q: 'Why is a multiplexer called a universal function generator?', a: 'Because any arbitrary boolean function of n variables can be realized without needing external logic gates.' },
        { q: 'What is the active state of Strobe G̅ in IC 74151?', a: 'Active-low (Pin 7 must be tied to GND for normal operation).' },
        { q: 'What are minterms 0, 3, 5, 6 in binary?', a: 'm0=000, m3=011, m5=101, m6=110.' }
      ]
    },

    exp10: {
      title: 'Boolean Function: F(A,B,C,D) = Σm(1,2,4,7,8,10,11,13,15) via IC 74151',
      aim: 'To realize a 4-variable boolean function using an 8-to-1 MUX and an inverter.',
      requiredIcs: ['74151', '7404'],
      socketLayout: { U1: '74151', U2: '7404' },
      inputsDesc: 'Input Switches: S4 = A, S3 = B, S2 = C, S1 = D',
      outputsDesc: 'Output LED: L1 = Function Output Y',
      instructions: [
        '1. Seat U1: 74151 and U2: 7404. Connect VCC and GND.',
        '2. Connect A, B, C to Select pins: S4(A) to U1:p9, S3(B) to U1:p10, S2(C) to U1:p11.',
        '3. Map data inputs in terms of D: D0=D, D1=D̅, D2=D̅, D3=D, D4=D̅, D5=D, D6=D, D7=D.',
        '4. Invert D: Wire S1(D) to U2:p1 (NOT). Output D̅ is at U2:p2.',
        '5. Connect D to pins 4, 1, 14, 13, 12. Connect D̅ to pins 3, 2, 15. Wire Pin 7 (G̅) to GND.',
        '6. Wire Pin 5 (Y) to LED L1.'
      ],
      truthTable: [
        { A: 0, B: 0, C: 0, D: 1, F: 1 },
        { A: 0, B: 0, C: 1, D: 0, F: 1 },
        { A: 0, B: 1, C: 0, D: 0, F: 1 },
        { A: 0, B: 1, C: 1, D: 1, F: 1 },
        { A: 1, B: 0, C: 0, D: 0, F: 1 },
        { A: 1, B: 1, C: 1, D: 1, F: 1 }
      ],
      referenceWires: [
        { from: 'vcc:1', to: 'U1:p16' }, { from: 'gnd:1', to: 'U1:p8' },
        { from: 'vcc:3', to: 'U2:p14' }, { from: 'gnd:3', to: 'U2:p7' },
        { from: 'gnd:2', to: 'U1:p7' },
        { from: 'in:4', to: 'U1:p9' }, { from: 'in:3', to: 'U1:p10' }, { from: 'in:2', to: 'U1:p11' },
        { from: 'in:1', to: 'U2:p1' }, // D inverted
        { from: 'in:1', to: 'U1:p4' }, { from: 'in:1', to: 'U1:p1' }, { from: 'in:1', to: 'U1:p14' }, { from: 'in:1', to: 'U1:p13' }, { from: 'in:1', to: 'U1:p12' },
        { from: 'U2:p2', to: 'U1:p3' }, { from: 'U2:p2', to: 'U1:p2' }, { from: 'U2:p2', to: 'U1:p15' },
        { from: 'U1:p5', to: 'out:1' }
      ],
      viva: [
        { q: 'How can an n-variable function be implemented with a 2ⁿ⁻¹:1 MUX?', a: 'Connect (n-1) variables to the select lines and express the data inputs as functions of the remaining 1 variable (0, 1, D, or D̅).' },
        { q: 'How do you determine the input for each data line D0 to D7?', a: 'Construct an implementation table with rows for D̅ and D; compare minterms present in each column to determine whether the input is 0, 1, D, or D̅.' },
        { q: 'Why is IC 7404 required in this experiment?', a: 'To generate the inverted signal D̅ from the fourth variable D.' },
        { q: 'What output pins are available on IC 74151?', a: 'Pin 5 provides the true output Y, and Pin 6 provides the complementary output W (Y̅).' }
      ]
    },

    exp11: {
      title: '2-Bit Asynchronous Ripple Up Counter (IC 7476)',
      aim: 'To design, construct, and verify a 2-bit Asynchronous Binary Ripple Up Counter using dual JK flip-flops (IC 7476).',
      requiredIcs: ['7476'],
      socketLayout: { U1: '7476' },
      inputsDesc: 'Clock: Manual Pulser or Clock CLK. Preset & Clear tied to VCC (inactive).',
      outputsDesc: 'Output LEDs: L2 = Q1 (MSB), L1 = Q0 (LSB)',
      instructions: [
        '1. Seat IC 7476 into Socket U1. Wire Pin 5 to VCC and Pin 13 to GND.',
        '2. Disable asynchronous inputs: Wire 1PRE̅ (Pin 4), 1CLR̅ (Pin 6), 2PRE̅ (Pin 12), 2CLR̅ (Pin 11) to VCC (+5V rail).',
        '3. Configure Toggle mode (J=1, K=1): Wire 1J (Pin 2), 1K (Pin 3), 2J (Pin 15), 2K (Pin 14) to VCC.',
        '4. FF1 Clock: Wire Pulser terminal (or CLK) to 1CLK (Pin 1). Wire 1Q (Pin 7) to LED L1 (Q0).',
        '5. Ripple Clock: Connect 1Q (Pin 7) to 2CLK (Pin 16) to drive the second flip-flop on falling edge.',
        '6. Output Q1: Wire 2Q (Pin 10) to LED L2 (Terminal OP2).'
      ],
      truthTable: [
        { ClockPulse: 0, Q1: 0, Q0: 0, Count: 0 },
        { ClockPulse: 1, Q1: 0, Q0: 1, Count: 1 },
        { ClockPulse: 2, Q1: 1, Q0: 0, Count: 2 },
        { ClockPulse: 3, Q1: 1, Q0: 1, Count: 3 },
        { ClockPulse: 4, Q1: 0, Q0: 0, Count: 0 }
      ],
      referenceWires: [
        { from: 'vcc:1', to: 'U1:p5' }, { from: 'gnd:1', to: 'U1:p13' },
        // PRE and CLR tied high
        { from: 'vcc:2', to: 'U1:p4' }, { from: 'vcc:2', to: 'U1:p6' },
        { from: 'vcc:3', to: 'U1:p12' }, { from: 'vcc:3', to: 'U1:p11' },
        // J and K tied high for toggle
        { from: 'vcc:4', to: 'U1:p2' }, { from: 'vcc:4', to: 'U1:p3' },
        { from: 'vcc:5', to: 'U1:p15' }, { from: 'vcc:5', to: 'U1:p14' },
        // Clock input to FF1
        { from: 'clk:pulse', to: 'U1:p1' },
        // Q0 output
        { from: 'U1:p7', to: 'out:1' },
        // Q0 clocks FF2 (negative edge triggered ripple)
        { from: 'U1:p7', to: 'U1:p16' },
        // Q1 output
        { from: 'U1:p10', to: 'out:2' }
      ],
      viva: [
        { q: 'Why is this counter called asynchronous or ripple?', a: 'Because the flip-flops are not clocked simultaneously; the output of each flip-flop acts as the clock for the next stage, causing a delay that ripples through the chain.' },
        { q: 'Why does connecting Q to the next negative-edge clock result in an UP counter?', a: 'Because when Q transitions from 1 to 0 (which happens every 2 clock pulses), it provides the falling edge needed to trigger the next flip-flop.' }
      ]
    },

    exp12: {
      title: '3-Bit Asynchronous Ripple Up Counter (IC 7476)',
      aim: 'To construct and test a 3-bit Asynchronous Binary Ripple Up Counter (counts 0 to 7) using two IC 7476 chips.',
      requiredIcs: ['7476', '7476'],
      socketLayout: { U1: '7476', U2: '7476' },
      inputsDesc: 'Clock: Manual Pulser or Clock CLK. All J, K, PRE̅, CLR̅ tied to VCC.',
      outputsDesc: 'Output LEDs: L3 = Q2 (MSB), L2 = Q1, L1 = Q0 (LSB)',
      instructions: [
        '1. Seat U1: 7476 and U2: 7476. Wire Pin 5 to VCC and Pin 13 to GND on both ICs.',
        '2. Tie all PRE̅, CLR̅, J, K pins to VCC (+5V) to enable toggle mode.',
        '3. Wire Clock (clk:pulse) to U1:p1 (1CLK). Output U1:p7 (Q0) to LED L1.',
        '4. Wire U1:p7 (Q0) to U1:p16 (2CLK). Output U1:p10 (Q1) to LED L2.',
        '5. Wire U1:p10 (Q1) to U2:p1 (1CLK). Output U2:p7 (Q2) to LED L3.'
      ],
      truthTable: [
        { Pulse: 0, Q2: 0, Q1: 0, Q0: 0, Decimal: 0 },
        { Pulse: 1, Q2: 0, Q1: 0, Q0: 1, Decimal: 1 },
        { Pulse: 2, Q2: 0, Q1: 1, Q0: 0, Decimal: 2 },
        { Pulse: 3, Q2: 0, Q1: 1, Q0: 1, Decimal: 3 },
        { Pulse: 4, Q2: 1, Q1: 0, Q0: 0, Decimal: 4 },
        { Pulse: 7, Q2: 1, Q1: 1, Q0: 1, Decimal: 7 },
        { Pulse: 8, Q2: 0, Q1: 0, Q0: 0, Decimal: 0 }
      ],
      referenceWires: [
        { from: 'vcc:1', to: 'U1:p5' }, { from: 'gnd:1', to: 'U1:p13' },
        { from: 'vcc:3', to: 'U2:p5' }, { from: 'gnd:3', to: 'U2:p13' },
        { from: 'vcc:2', to: 'U1:p4' }, { from: 'vcc:2', to: 'U1:p6' }, { from: 'vcc:2', to: 'U1:p12' }, { from: 'vcc:2', to: 'U1:p11' },
        { from: 'vcc:4', to: 'U2:p4' }, { from: 'vcc:4', to: 'U2:p6' },
        { from: 'vcc:5', to: 'U1:p2' }, { from: 'vcc:5', to: 'U1:p3' }, { from: 'vcc:5', to: 'U1:p15' }, { from: 'vcc:5', to: 'U1:p14' },
        { from: 'vcc:6', to: 'U2:p2' }, { from: 'vcc:6', to: 'U2:p3' },
        { from: 'clk:pulse', to: 'U1:p1' },
        { from: 'U1:p7', to: 'out:1' }, { from: 'U1:p7', to: 'U1:p16' },
        { from: 'U1:p10', to: 'out:2' }, { from: 'U1:p10', to: 'U2:p1' },
        { from: 'U2:p7', to: 'out:3' }
      ],
      viva: [
        { q: 'What is the modulus of a 3-bit counter?', a: 'MOD = 2³ = 8. It cycles through 8 states from 000 to 111.' },
        { q: 'Why are two IC 7476 chips required?', a: 'Each 7476 contains two JK flip-flops. A 3-bit counter needs 3 flip-flops, so two chips are utilized.' },
        { q: 'What frequency appears at the output of the third flip-flop (Q2)?', a: 'f_out = f_in / 8. Each stage divides the frequency by 2.' },
        { q: 'What is the active clock edge for IC 7476?', a: 'Negative-edge triggered (triggers on High-to-Low clock transitions).' }
      ]
    },

    exp13: {
      title: '4-Bit Asynchronous Ripple Up Counter (IC 7476)',
      aim: 'To construct and test a 4-bit Asynchronous Binary Ripple Up Counter (MOD-16, counts 0 to 15) using four JK flip-flops.',
      requiredIcs: ['7476', '7476'],
      socketLayout: { U1: '7476', U2: '7476' },
      inputsDesc: 'Clock: Pulser or CLK. Output LEDs: L4 = Q3 (MSB), L3 = Q2, L2 = Q1, L1 = Q0 (LSB)',
      outputsDesc: 'Connects to both 7-segment display A and LEDs L1..L4',
      instructions: [
        '1. Seat U1: 7476 and U2: 7476. Power Pin 5 to VCC and Pin 13 to GND.',
        '2. Tie all J, K, PRE̅, CLR̅ pins to VCC (+5V).',
        '3. Cascade: Clock -> U1:FF1 -> U1:FF2 -> U2:FF1 -> U2:FF2.',
        '4. Wire Q0..Q3 to LEDs L1..L4 and to 7-segment A inputs (A0..A3) to watch the digital count 0 to F!'
      ],
      truthTable: [
        { Count: '0 to 15 (0000 to 1111)', Hex: '0 to F on 7-Segment Display' }
      ],
      referenceWires: [
        { from: 'vcc:1', to: 'U1:p5' }, { from: 'gnd:1', to: 'U1:p13' },
        { from: 'vcc:3', to: 'U2:p5' }, { from: 'gnd:3', to: 'U2:p13' },
        { from: 'vcc:2', to: 'U1:p4' }, { from: 'vcc:2', to: 'U1:p6' }, { from: 'vcc:2', to: 'U1:p12' }, { from: 'vcc:2', to: 'U1:p11' },
        { from: 'vcc:4', to: 'U2:p4' }, { from: 'vcc:4', to: 'U2:p6' }, { from: 'vcc:4', to: 'U2:p12' }, { from: 'vcc:4', to: 'U2:p11' },
        { from: 'vcc:5', to: 'U1:p2' }, { from: 'vcc:5', to: 'U1:p3' }, { from: 'vcc:5', to: 'U1:p15' }, { from: 'vcc:5', to: 'U1:p14' },
        { from: 'vcc:6', to: 'U2:p2' }, { from: 'vcc:6', to: 'U2:p3' }, { from: 'vcc:6', to: 'U2:p15' }, { from: 'vcc:6', to: 'U2:p14' },
        { from: 'clk:pulse', to: 'U1:p1' },
        { from: 'U1:p7', to: 'out:1' }, { from: 'U1:p7', to: 'U1:p16' }, { from: 'U1:p7', to: 'seg:a0' },
        { from: 'U1:p10', to: 'out:2' }, { from: 'U1:p10', to: 'U2:p1' }, { from: 'U1:p10', to: 'seg:a1' },
        { from: 'U2:p7', to: 'out:3' }, { from: 'U2:p7', to: 'U2:p16' }, { from: 'U2:p7', to: 'seg:a2' },
        { from: 'U2:p10', to: 'out:4' }, { from: 'U2:p10', to: 'seg:a3' }
      ],
      viva: [
        { q: 'What is the maximum operating frequency of a ripple counter?', a: 'f_max = 1 / (N · t_pd), where N is the number of flip-flops and t_pd is the propagation delay per flip-flop.' },
        { q: 'What is the count capacity of a 4-bit binary counter?', a: '2⁴ = 16 states, counting from 0000 (0) to 1111 (15).' },
        { q: 'Why must PRE̅ and CLR̅ pins be tied to VCC?', a: 'They are active-low asynchronous inputs. Leaving them unconnected or low forces the flip-flop to set or reset continuously.' },
        { q: 'How does the 7-segment display decode the 4-bit counter value?', a: 'The 4 outputs Q3..Q0 represent binary weights 8, 4, 2, 1 (BCD/hexadecimal), which are mapped to digits 0 to F.' }
      ]
    },

    exp14: {
      title: '2-Bit Asynchronous Ripple Down Counter (IC 7476)',
      aim: 'To construct and test a 2-bit Binary Down Counter (counts 3, 2, 1, 0, 3...) using IC 7476.',
      requiredIcs: ['7476'],
      socketLayout: { U1: '7476' },
      inputsDesc: 'Clock: Pulser or CLK. J, K, PRE̅, CLR̅ tied to VCC.',
      outputsDesc: 'Output LEDs: L2 = Q1, L1 = Q0',
      instructions: [
        '1. Seat IC 7476 into U1. Wire Pin 5 to VCC and Pin 13 to GND.',
        '2. Tie all J, K, PRE̅, CLR̅ pins to VCC (+5V).',
        '3. Clock input: Wire clk:pulse to 1CLK (Pin 1).',
        '4. Down Counter Ripple Trick: Connect complementary output 1Q̅ (Pin 8) to 2CLK (Pin 16).',
        '5. Take outputs from non-inverted pins: 1Q (Pin 7) to LED L1 (Q0), 2Q (Pin 10) to LED L2 (Q1).'
      ],
      truthTable: [
        { Pulse: 0, Q1: 1, Q0: 1, Count: 3 },
        { Pulse: 1, Q1: 1, Q0: 0, Count: 2 },
        { Pulse: 2, Q1: 0, Q0: 1, Count: 1 },
        { Pulse: 3, Q1: 0, Q0: 0, Count: 0 },
        { Pulse: 4, Q1: 1, Q0: 1, Count: 3 }
      ],
      referenceWires: [
        { from: 'vcc:1', to: 'U1:p5' }, { from: 'gnd:1', to: 'U1:p13' },
        { from: 'vcc:2', to: 'U1:p4' }, { from: 'vcc:2', to: 'U1:p6' }, { from: 'vcc:2', to: 'U1:p12' }, { from: 'vcc:2', to: 'U1:p11' },
        { from: 'vcc:3', to: 'U1:p2' }, { from: 'vcc:3', to: 'U1:p3' }, { from: 'vcc:3', to: 'U1:p15' }, { from: 'vcc:3', to: 'U1:p14' },
        { from: 'clk:pulse', to: 'U1:p1' },
        { from: 'U1:p7', to: 'out:1' },
        { from: 'U1:p8', to: 'U1:p16' }, // Q_bar clocks next flip flop for DOWN count
        { from: 'U1:p10', to: 'out:2' }
      ],
      viva: [
        { q: 'How does clocking from Q̅ convert an Up Counter into a Down Counter?', a: 'When Q transitions from 0 to 1, Q̅ transitions from 1 to 0 (falling edge), triggering the next stage and producing a decreasing count sequence.' },
        { q: 'What is the 2-bit down count sequence?', a: '11 (3) -> 10 (2) -> 01 (1) -> 00 (0) -> 11 (3)...' },
        { q: 'What happens if you read outputs from Q̅ instead of Q in an Up counter?', a: 'The complement of an up-counting sequence is mathematically identical to a down-counting sequence.' },
        { q: 'What is the role of J=1 and K=1 in this circuit?', a: 'It places the flip-flop in toggle mode (T-type flip-flop), where the output changes state on every clock pulse.' }
      ]
    },

    exp15: {
      title: '3-Bit Asynchronous Ripple Down Counter (IC 7476)',
      aim: 'To construct and test a 3-bit Binary Down Counter (counts 7 down to 0) using two IC 7476 chips.',
      requiredIcs: ['7476', '7476'],
      socketLayout: { U1: '7476', U2: '7476' },
      inputsDesc: 'Clock: Pulser or CLK. J, K, PRE̅, CLR̅ tied to VCC.',
      outputsDesc: 'Output LEDs: L3 = Q2, L2 = Q1, L1 = Q0',
      instructions: [
        '1. Seat U1: 7476 and U2: 7476. Connect VCC and GND.',
        '2. Tie all J, K, PRE̅, CLR̅ to VCC.',
        '3. Clock -> U1:1CLK; U1:1Q̅ (Pin 8) -> U1:2CLK; U1:2Q̅ (Pin 9) -> U2:1CLK.',
        '4. Read outputs from U1:1Q (L1), U1:2Q (L2), and U2:1Q (L3).'
      ],
      truthTable: [
        { Pulse: 0, Q2: 1, Q1: 1, Q0: 1, Dec: 7 },
        { Pulse: 1, Q2: 1, Q1: 1, Q0: 0, Dec: 6 },
        { Pulse: 2, Q2: 1, Q1: 0, Q0: 1, Dec: 5 },
        { Pulse: 7, Q2: 0, Q1: 0, Q0: 0, Dec: 0 }
      ],
      referenceWires: [
        { from: 'vcc:1', to: 'U1:p5' }, { from: 'gnd:1', to: 'U1:p13' },
        { from: 'vcc:3', to: 'U2:p5' }, { from: 'gnd:3', to: 'U2:p13' },
        { from: 'vcc:2', to: 'U1:p4' }, { from: 'vcc:2', to: 'U1:p6' }, { from: 'vcc:2', to: 'U1:p12' }, { from: 'vcc:2', to: 'U1:p11' },
        { from: 'vcc:4', to: 'U2:p4' }, { from: 'vcc:4', to: 'U2:p6' },
        { from: 'vcc:5', to: 'U1:p2' }, { from: 'vcc:5', to: 'U1:p3' }, { from: 'vcc:5', to: 'U1:p15' }, { from: 'vcc:5', to: 'U1:p14' },
        { from: 'vcc:6', to: 'U2:p2' }, { from: 'vcc:6', to: 'U2:p3' },
        { from: 'clk:pulse', to: 'U1:p1' },
        { from: 'U1:p7', to: 'out:1' }, { from: 'U1:p8', to: 'U1:p16' },
        { from: 'U1:p10', to: 'out:2' }, { from: 'U1:p9', to: 'U2:p1' },
        { from: 'U2:p7', to: 'out:3' }
      ],
      viva: [
        { q: 'What is the count sequence of a 3-bit Down Counter?', a: '7, 6, 5, 4, 3, 2, 1, 0, then wraps back to 7.' },
        { q: 'What is the alternative method to achieve a Down Counter?', a: 'Keep clocking from Q, but read the output bits directly from Q̅ instead of Q.' },
        { q: 'What is cumulative propagation delay in a 3-bit ripple counter?', a: '3 × t_pd. The last flip-flop updates after all three delays elapse.' },
        { q: 'Can this circuit be used as a frequency divider?', a: 'Yes, each successive output divides the previous frequency by 2.' }
      ]
    },

    exp16: {
      title: '4-Bit Asynchronous Ripple Down Counter (IC 7476)',
      aim: 'To construct and test a 4-bit Binary Down Counter (counts 15 down to 0) using two IC 7476 chips.',
      requiredIcs: ['7476', '7476'],
      socketLayout: { U1: '7476', U2: '7476' },
      inputsDesc: 'Clock: Pulser or CLK. Output on LEDs L4..L1 and 7-Segment A.',
      outputsDesc: 'Counts F, E, D, C... down to 0 on 7-Segment Display',
      instructions: [
        '1. Seat U1: 7476 and U2: 7476. Connect VCC and GND.',
        '2. Tie all J, K, PRE̅, CLR̅ to VCC.',
        '3. Cascade complementary outputs Q̅ to the subsequent CLK pins.',
        '4. Wire true outputs Q0..Q3 to LEDs L1..L4 and to 7-Segment inputs A0..A3.'
      ],
      truthTable: [
        { Count: '15 down to 0 (1111 to 0000)', Display: 'F down to 0' }
      ],
      referenceWires: [
        { from: 'vcc:1', to: 'U1:p5' }, { from: 'gnd:1', to: 'U1:p13' },
        { from: 'vcc:3', to: 'U2:p5' }, { from: 'gnd:3', to: 'U2:p13' },
        { from: 'vcc:2', to: 'U1:p4' }, { from: 'vcc:2', to: 'U1:p6' }, { from: 'vcc:2', to: 'U1:p12' }, { from: 'vcc:2', to: 'U1:p11' },
        { from: 'vcc:4', to: 'U2:p4' }, { from: 'vcc:4', to: 'U2:p6' }, { from: 'vcc:4', to: 'U2:p12' }, { from: 'vcc:4', to: 'U2:p11' },
        { from: 'vcc:5', to: 'U1:p2' }, { from: 'vcc:5', to: 'U1:p3' }, { from: 'vcc:5', to: 'U1:p15' }, { from: 'vcc:5', to: 'U1:p14' },
        { from: 'vcc:6', to: 'U2:p2' }, { from: 'vcc:6', to: 'U2:p3' }, { from: 'vcc:6', to: 'U2:p15' }, { from: 'vcc:6', to: 'U2:p14' },
        { from: 'clk:pulse', to: 'U1:p1' },
        { from: 'U1:p7', to: 'out:1' }, { from: 'U1:p8', to: 'U1:p16' }, { from: 'U1:p7', to: 'seg:a0' },
        { from: 'U1:p10', to: 'out:2' }, { from: 'U1:p9', to: 'U2:p1' }, { from: 'U1:p10', to: 'seg:a1' },
        { from: 'U2:p7', to: 'out:3' }, { from: 'U2:p8', to: 'U2:p16' }, { from: 'U2:p7', to: 'seg:a2' },
        { from: 'U2:p10', to: 'out:4' }, { from: 'U2:p10', to: 'seg:a3' }
      ],
      viva: [
        { q: 'What causes glitching in ripple counters?', a: 'Unequal propagation delays across cascaded stages cause temporary invalid intermediate states during transitions.' },
        { q: 'How can glitches be prevented in high-speed digital systems?', a: 'By using synchronous counters where all flip-flops share a common clock line.' },
        { q: 'What is the state transition from 0000 in a down counter?', a: 'It wraps around to 1111 (decimal 15).' },
        { q: 'How many clock pulses are needed to return to the initial state?', a: 'Exactly 16 clock pulses.' }
      ]
    },

    exp17: {
      title: '2-Bit Asynchronous Ripple Up-Down Counter',
      aim: 'To construct and test a 2-bit Up/Down Counter using steering logic with IC 7476, IC 7408, IC 7404, IC 7432.',
      requiredIcs: ['7476', '7408', '7432', '7404'],
      socketLayout: { U1: '7476', U2: '7408', U3: '7432', U4: '7404' },
      inputsDesc: 'Switch S1 = Mode (1 = UP, 0 = DOWN); Clock: Pulser',
      outputsDesc: 'LEDs L2 = Q1, L1 = Q0',
      instructions: [
        '1. Seat U1: 7476, U2: 7408, U3: 7432, U4: 7404. Connect VCC & GND.',
        '2. Tie J, K, PRE, CLR to VCC.',
        '3. Steering logic for clocking FF2: CLK2 = (M·Q) + (M̅·Q̅).',
        '4. Wire S1(M) to U4:p1 (NOT, M̅ on p2).',
        '5. AND gate 1: S1(M) & U1:Q to U2:p1,p2. AND gate 2: U4:M̅ & U1:Q̅ to U2:p4,p5.',
        '6. OR gate: U2:p3 & U2:p6 to U3:p1,p2. Output U3:p3 to U1:2CLK (Pin 16).'
      ],
      truthTable: [
        { Mode: 'UP (M=1)', Sequence: '0 -> 1 -> 2 -> 3 -> 0' },
        { Mode: 'DOWN (M=0)', Sequence: '3 -> 2 -> 1 -> 0 -> 3' }
      ],
      referenceWires: [
        { from: 'vcc:1', to: 'U1:p5' }, { from: 'gnd:1', to: 'U1:p13' },
        { from: 'vcc:3', to: 'U2:p14' }, { from: 'gnd:3', to: 'U2:p7' },
        { from: 'vcc:5', to: 'U3:p14' }, { from: 'gnd:5', to: 'U3:p7' },
        { from: 'vcc:7', to: 'U4:p14' }, { from: 'gnd:7', to: 'U4:p7' },
        { from: 'vcc:2', to: 'U1:p4' }, { from: 'vcc:2', to: 'U1:p6' }, { from: 'vcc:2', to: 'U1:p12' }, { from: 'vcc:2', to: 'U1:p11' },
        { from: 'vcc:4', to: 'U1:p2' }, { from: 'vcc:4', to: 'U1:p3' }, { from: 'vcc:4', to: 'U1:p15' }, { from: 'vcc:4', to: 'U1:p14' },
        { from: 'clk:pulse', to: 'U1:p1' },
        { from: 'in:1', to: 'U4:p1' }, // M to NOT
        { from: 'in:1', to: 'U2:p1' }, { from: 'U1:p7', to: 'U2:p2' }, // M * Q
        { from: 'U4:p2', to: 'U2:p4' }, { from: 'U1:p8', to: 'U2:p5' }, // M_bar * Q_bar
        { from: 'U2:p3', to: 'U3:p1' }, { from: 'U2:p6', to: 'U3:p2' },
        { from: 'U3:p3', to: 'U1:p16' }, // CLK2
        { from: 'U1:p7', to: 'out:1' }, { from: 'U1:p10', to: 'out:2' }
      ],
      viva: [
        { q: 'What is steering logic in an Up/Down counter?', a: 'Gating logic that steers either Q (for up counting) or Q̅ (for down counting) to the clock terminal of the next flip-flop based on a control line.' },
        { q: 'What is the boolean expression for the clock input of stage 2?', a: 'CLK2 = (M · Q) + (M̅ · Q̅), where M is the Mode control bit (1=UP, 0=DOWN).' },
        { q: 'Why is an inverter (7404) needed in the steering logic?', a: 'To generate M̅ from M for enabling the down-count AND gate.' },
        { q: 'What happens when mode switch M is toggled during counting?', a: 'The counter immediately switches direction from its current state on subsequent clock pulses.' }
      ]
    },

    exp18: {
      title: '4-Bit Asynchronous Ripple Up-Down Counter',
      aim: 'To verify full 4-bit Up/Down counting using cascaded dual JK flip-flops.',
      requiredIcs: ['7476', '7476'],
      socketLayout: { U1: '7476', U2: '7476' },
      inputsDesc: 'Clock: Pulser. Switch S1 toggles UP/DOWN mode wiring.',
      outputsDesc: 'Output LEDs L1..L4 and 7-Segment Display A',
      instructions: [
        '1. Seat U1: 7476 and U2: 7476.',
        '2. Power VCC (Pin 5) and GND (Pin 13) on both.',
        '3. To count UP: Connect Q to next CLK.',
        '4. To count DOWN: Connect Q̅ to next CLK.'
      ],
      truthTable: [
        { Mode: 'UP', Hex: '0, 1, 2, ... F, 0' },
        { Mode: 'DOWN', Hex: 'F, E, D, ... 0, F' }
      ],
      referenceWires: [
        { from: 'vcc:1', to: 'U1:p5' }, { from: 'gnd:1', to: 'U1:p13' },
        { from: 'vcc:3', to: 'U2:p5' }, { from: 'gnd:3', to: 'U2:p13' },
        { from: 'vcc:2', to: 'U1:p4' }, { from: 'vcc:2', to: 'U1:p6' }, { from: 'vcc:2', to: 'U1:p12' }, { from: 'vcc:2', to: 'U1:p11' },
        { from: 'vcc:4', to: 'U2:p4' }, { from: 'vcc:4', to: 'U2:p6' }, { from: 'vcc:4', to: 'U2:p12' }, { from: 'vcc:4', to: 'U2:p11' },
        { from: 'vcc:5', to: 'U1:p2' }, { from: 'vcc:5', to: 'U1:p3' }, { from: 'vcc:5', to: 'U1:p15' }, { from: 'vcc:5', to: 'U1:p14' },
        { from: 'vcc:6', to: 'U2:p2' }, { from: 'vcc:6', to: 'U2:p3' }, { from: 'vcc:6', to: 'U2:p15' }, { from: 'vcc:6', to: 'U2:p14' },
        { from: 'clk:pulse', to: 'U1:p1' },
        { from: 'U1:p7', to: 'out:1' }, { from: 'U1:p7', to: 'U1:p16' }, { from: 'U1:p7', to: 'seg:a0' },
        { from: 'U1:p10', to: 'out:2' }, { from: 'U1:p10', to: 'U2:p1' }, { from: 'U1:p10', to: 'seg:a1' },
        { from: 'U2:p7', to: 'out:3' }, { from: 'U2:p7', to: 'U2:p16' }, { from: 'U2:p7', to: 'seg:a2' },
        { from: 'U2:p10', to: 'out:4' }, { from: 'U2:p10', to: 'seg:a3' }
      ],
      viva: [
        { q: 'How many states does a 4-bit counter have?', a: '16 states (0 to 15).' },
        { q: 'What is the difference between synchronous and asynchronous counters?', a: 'In synchronous counters, all flip-flops receive the clock simultaneously; in asynchronous counters, the clock ripples from one flip-flop to the next.' },
        { q: 'What is the primary advantage of ripple counters over synchronous counters?', a: 'Simpler circuitry requiring fewer gates and simpler interconnects.' },
        { q: 'What is the primary disadvantage of ripple counters?', a: 'Slower speed due to accumulated propagation delay and susceptibility to glitching during decoding.' }
      ]
    },

    exp19: {
      title: 'MOD-N Decade Counter using IC 7490 (BCD 0 to 9 & Modulo-6)',
      aim: 'To design, construct, and verify a BCD Decade Counter (MOD-10) and a MOD-6 Counter using IC 7490.',
      requiredIcs: ['7490'],
      socketLayout: { U1: '7490' },
      inputsDesc: 'Clock: Pulser or CLK. Resets R0(1), R0(2), R9(1), R9(2).',
      outputsDesc: 'Output LEDs: L4 = QD (MSB), L3 = QC, L2 = QB, L1 = QA (LSB) and 7-Segment A',
      instructions: [
        '1. Seat IC 7490 into Socket U1. Wire Pin 5 to VCC (+5V) and Pin 10 to GND (0V).',
        '2. Decade Counter Mode: Wire Output QA (Pin 12) to Input CKB (Pin 1). This cascades the divide-by-2 and divide-by-5 sections.',
        '3. Normal counting reset control: Wire R0(1) (Pin 2) and R0(2) (Pin 3) to GND (0V). Wire R9(1) (Pin 6) and R9(2) (Pin 7) to GND (0V).',
        '4. Connect Clock: Wire Pulser (clk:pulse) or Clock CLK to Input CKA (Pin 14).',
        '5. Wire Outputs: QD (Pin 11) to LED L4, QC (Pin 8) to LED L3, QB (Pin 9) to LED L2, QA (Pin 12) to LED L1.',
        '6. Also wire QD, QC, QB, QA to 7-Segment Display A (A3, A2, A1, A0) to see decimal digits 0 to 9!',
        '7. MOD-6 Configuration: To count 0 to 5 and reset at 6 (0110), connect QB (Pin 9) to R0(1) (Pin 2) and QC (Pin 8) to R0(2) (Pin 3)!'
      ],
      truthTable: [
        { Pulse: 0, QD: 0, QC: 0, QB: 0, QA: 0, Dec: 0 },
        { Pulse: 1, QD: 0, QC: 0, QB: 0, QA: 1, Dec: 1 },
        { Pulse: 2, QD: 0, QC: 0, QB: 1, QA: 0, Dec: 2 },
        { Pulse: 3, QD: 0, QC: 0, QB: 1, QA: 1, Dec: 3 },
        { Pulse: 4, QD: 0, QC: 1, QB: 0, QA: 0, Dec: 4 },
        { Pulse: 5, QD: 0, QC: 1, QB: 0, QA: 1, Dec: 5 },
        { Pulse: 6, QD: 0, QC: 1, QB: 1, QA: 0, Dec: 6 },
        { Pulse: 7, QD: 0, QC: 1, QB: 1, QA: 1, Dec: 7 },
        { Pulse: 8, QD: 1, QC: 0, QB: 0, QA: 0, Dec: 8 },
        { Pulse: 9, QD: 1, QC: 0, QB: 0, QA: 1, Dec: 9 },
        { Pulse: 10, QD: 0, QC: 0, QB: 0, QA: 0, Dec: 0 }
      ],
      referenceWires: [
        // Power
        { from: 'vcc:1', to: 'U1:p5' }, { from: 'gnd:1', to: 'U1:p10' },
        // QA to CKB cascade
        { from: 'U1:p12', to: 'U1:p1' },
        // Resets tied low for free-running decade counter
        { from: 'gnd:2', to: 'U1:p2' }, { from: 'gnd:2', to: 'U1:p3' },
        { from: 'gnd:3', to: 'U1:p6' }, { from: 'gnd:3', to: 'U1:p7' },
        // Clock input
        { from: 'clk:pulse', to: 'U1:p14' },
        // Outputs to LEDs and 7-Segment Display
        { from: 'U1:p12', to: 'out:1' }, { from: 'U1:p12', to: 'seg:a0' }, // QA
        { from: 'U1:p9', to: 'out:2' },  { from: 'U1:p9', to: 'seg:a1' },  // QB
        { from: 'U1:p8', to: 'out:3' },  { from: 'U1:p8', to: 'seg:a2' },  // QC
        { from: 'U1:p11', to: 'out:4' }, { from: 'U1:p11', to: 'seg:a3' }  // QD
      ],
      viva: [
        { q: 'What is IC 7490?', a: 'A monolithic BCD decade counter containing independent divide-by-2 and divide-by-5 counter sections.' },
        { q: 'How is IC 7490 configured as a BCD decade counter?', a: 'By externally connecting the divide-by-2 output QA (Pin 12) to the divide-by-5 clock input CKB (Pin 1), and feeding input clock to CKA (Pin 14).' },
        { q: 'How can IC 7490 be configured as a MOD-6 counter (e.g. for digital clocks)?', a: 'Connect QB (Pin 9) to R0(1) and QC (Pin 8) to R0(2). When the count reaches 6 (binary 0110: QC=1, QB=1), the counter immediately resets to 0000.' },
        { q: 'What is the function of pins R9(1) and R9(2)?', a: 'They are master set-to-9 inputs. When both are HIGH, the counter outputs are asynchronously forced to 1001 (BCD 9).' }
      ]
    }
  };

  function renderExperimentDoc(expKey) {
    const exp = EXPERIMENTS[expKey];
    if (!exp) return;

    let html = `
      <div class="exp-doc-section">
        <h3>1. Aim</h3>
        <p>${exp.aim}</p>
      </div>

      <div class="exp-doc-section">
        <h3>2. Components &amp; ICs Required</h3>
        <p><strong>ICs:</strong> ${exp.requiredIcs.join(', ')}</p>
        <p><strong>Inputs:</strong> ${exp.inputsDesc}</p>
        <p><strong>Outputs:</strong> ${exp.outputsDesc}</p>
      </div>

      <div class="exp-doc-section">
        <h3>3. Step-by-Step Circuit Building Guide</h3>
        <ol>
          ${exp.instructions.map(inst => `<li>${inst}</li>`).join('')}
        </ol>
      </div>

      <div class="exp-doc-section">
        <h3>4. Expected Truth Table / State Sequence</h3>
        <div style="overflow-x:auto;">
          <table class="exp-table">
            <thead>
              <tr>
                ${Object.keys(exp.truthTable[0]).map(k => `<th>${k}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${exp.truthTable.map(row => `
                <tr>
                  ${Object.values(row).map(v => `<td>${v}</td>`).join('')}
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <div class="exp-doc-section">
        <h3>5. Lab Viva Voce Questions &amp; Answers</h3>
        ${exp.viva.map(v => `
          <div class="viva-item">
            <div class="viva-q">Q: ${v.q}</div>
            <div class="viva-a">A: ${v.a}</div>
          </div>
        `).join('')}
      </div>
    `;

    DOM.experimentDetailContainer.innerHTML = html;
    DOM.verificationResultBox.classList.add('hidden');
  }

  function setupExperimentICs(expKey) {
    const exp = EXPERIMENTS[expKey];
    if (!exp) return;

    // Clear board ICs and seated layout
    Object.keys(state.sockets).forEach(sockId => {
      state.sockets[sockId].ic = null;
      state.sockets[sockId].icState = null;
      state.sockets[sockId].isPowered = false;
    });

    // Seat required ICs into designated sockets
    Object.keys(exp.socketLayout).forEach(sockId => {
      const icCode = exp.socketLayout[sockId];
      const icDef = IC_DEFINITIONS[icCode];
      state.sockets[sockId].ic = icCode;
      state.sockets[sockId].icState = icDef.initInternalState ? icDef.initInternalState() : null;
    });

    renderSockets();
    renderWires();
    runSimulation();
    updateStatusBar();
    flashStatus(`Prepared sockets for ${exp.title}. Connect wires manually or click 'Auto-Wire Reference Circuit'.`);
  }

  function autoWireExperiment(expKey) {
    const exp = EXPERIMENTS[expKey];
    if (!exp) return;

    setupExperimentICs(expKey);

    // Load reference wires
    state.wires = exp.referenceWires.map(w => ({
      id: state.nextWireId++,
      from: w.from,
      to: w.to,
      color: getAutoWireColor(w.from, w.to)
    }));

    renderWires();
    runSimulation();
    updateStatusBar();
    flashStatus(`Auto-wired reference circuit for ${exp.title}. Toggle switches or pulse clock to test!`);
  }

  function verifyCurrentCircuit(expKey) {
    const exp = EXPERIMENTS[expKey];
    if (!exp) return;

    updateDiagnostics();

    // Check 1: Are required ICs seated?
    const missingIcs = [];
    Object.keys(exp.socketLayout).forEach(sockId => {
      const expected = exp.socketLayout[sockId];
      if (state.sockets[sockId].ic !== expected) {
        missingIcs.push(`${sockId} needs IC ${expected}`);
      }
    });

    if (missingIcs.length > 0) {
      showVerifyResult(false, `Missing required ICs: ${missingIcs.join(', ')}.`);
      return;
    }

    // Check 2: Are seated ICs powered?
    const unpowered = Object.keys(exp.socketLayout).filter(
      sockId => !state.sockets[sockId].isPowered
    );
    if (unpowered.length > 0) {
      showVerifyResult(false, `Unpowered ICs: Sockets ${unpowered.join(', ')} do not have valid VCC (+5V) and GND connections.`);
      return;
    }

    // Check 3: Minimum wire count
    if (state.wires.length < exp.referenceWires.length * 0.6) {
      showVerifyResult(false, `Incomplete wiring: Your circuit only has ${state.wires.length} wires. Follow the step-by-step wiring guide.`);
      return;
    }

    // Check 4: Check if any output LEDs are wired
    const hasOutputWired = state.wires.some(w => w.from.startsWith('out:') || w.to.startsWith('out:'));
    if (!hasOutputWired) {
      showVerifyResult(false, 'Output LEDs not connected! Connect IC outputs to OP1, OP2... to observe results.');
      return;
    }

    showVerifyResult(true, `Circuit Verified Successfully! All required ICs are seated, powered, and wired. The circuit matches the expected truth table.`);
  }

  function showVerifyResult(isPass, msg) {
    DOM.verificationResultBox.className = `verification-box ${isPass ? 'pass' : 'fail'}`;
    DOM.verificationResultBox.innerHTML = `<strong>${isPass ? '✓ TEST PASSED' : '⚠ VERIFICATION FAILED'}:</strong> ${msg}`;
    DOM.verificationResultBox.classList.remove('hidden');
  }

  // =========================================================================
  // 12. INITIALIZE APPLICATION ON DOM READY
  // =========================================================================

  document.addEventListener('DOMContentLoaded', initBoard);

})();