/**
 * Automated Verification Test Suite for DLCO Virtual IC Trainer Kit
 * Tests all IC models, netlist resolution, power validation, sequential clocking,
 * and comprehensive verification of ALL Asynchronous Counters (UP, DOWN, UP/DOWN, MOD-10, MOD-100, Configurable MOD-N).
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('====================================================');
console.log('RUNNING DLCO VIRTUAL IC TRAINER AUTOMATED TEST SUITE');
console.log('====================================================\n');

// Load app.js and extract IC_DEFINITIONS, createModNExperiment, and EXPERIMENTS
const appJsContent = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8');

const icDefMatch = appJsContent.match(/const IC_DEFINITIONS = (\{[\s\S]*?\r?\n  \};)/);
const modNMatch = appJsContent.match(/function createModNExperiment\(N\) \{[\s\S]*?\r?\n  \}/);
const expMatch = appJsContent.match(/const EXPERIMENTS = (\{[\s\S]*?\r?\n  \};)/);

if (!icDefMatch || !expMatch) {
  console.error('FAILED to extract IC_DEFINITIONS or EXPERIMENTS from app.js');
  process.exit(1);
}

const sandbox = {
  document: {
    addEventListener: () => {},
    getElementById: () => ({ addEventListener: () => {}, classList: { add: () => {}, remove: () => {} } }),
    querySelector: () => null,
    querySelectorAll: () => []
  },
  window: { addEventListener: () => {} }
};

const ctx = vm.createContext(sandbox);
if (modNMatch) {
  vm.runInContext('let currentModN = 12;\n' + modNMatch[0], ctx);
}
const IC_DEFINITIONS = vm.runInContext('(' + icDefMatch[1].replace(/;\s*$/, '') + ')', ctx);
const EXPERIMENTS = vm.runInContext('(' + expMatch[1].replace(/;\s*$/, '') + ')', ctx);
const createModNExperiment = sandbox.createModNExperiment;

let totalTests = 0;
let passedTests = 0;

function assert(condition, testName) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✓ PASS: ${testName}`);
  } else {
    console.error(`  ✗ FAIL: ${testName}`);
  }
}

// ---------------------------------------------------------
// TEST GROUP 1: COMBINATIONAL GATE IC MODELS
// ---------------------------------------------------------
console.log('TEST GROUP 1: Combinational Gate ICs (7400, 7404, 7408, 7432, 7486)');

// 1.1 IC 7400 (Quad NAND)
const nandGate = IC_DEFINITIONS['7400'].gates[0];
assert(nandGate.fn(0, 0) === 1, '7400 NAND(0,0) = 1');
assert(nandGate.fn(0, 1) === 1, '7400 NAND(0,1) = 1');
assert(nandGate.fn(1, 0) === 1, '7400 NAND(1,0) = 1');
assert(nandGate.fn(1, 1) === 0, '7400 NAND(1,1) = 0');
assert(nandGate.fn('Z', 1) === 'Z', '7400 NAND(Z,1) = Z (Floating input detected)');

// 1.2 IC 7404 (Hex NOT)
const notGate = IC_DEFINITIONS['7404'].gates[0];
assert(notGate.fn(0) === 1, '7404 NOT(0) = 1');
assert(notGate.fn(1) === 0, '7404 NOT(1) = 0');
assert(notGate.fn('Z') === 'Z', '7404 NOT(Z) = Z');

// 1.3 IC 7408 (Quad AND)
const andGate = IC_DEFINITIONS['7408'].gates[0];
assert(andGate.fn(0, 0) === 0, '7408 AND(0,0) = 0');
assert(andGate.fn(0, 1) === 0, '7408 AND(0,1) = 0');
assert(andGate.fn(1, 0) === 0, '7408 AND(1,0) = 0');
assert(andGate.fn(1, 1) === 1, '7408 AND(1,1) = 1');
assert(andGate.fn('Z', 1) === 'Z', '7408 AND(Z,1) = Z');

// 1.4 IC 7432 (Quad OR)
const orGate = IC_DEFINITIONS['7432'].gates[0];
assert(orGate.fn(0, 0) === 0, '7432 OR(0,0) = 0');
assert(orGate.fn(0, 1) === 1, '7432 OR(0,1) = 1');
assert(orGate.fn(1, 0) === 1, '7432 OR(1,0) = 1');
assert(orGate.fn(1, 1) === 1, '7432 OR(1,1) = 1');
assert(orGate.fn(0, 'Z') === 'Z', '7432 OR(0,Z) = Z');

// 1.5 IC 7486 (Quad XOR)
const xorGate = IC_DEFINITIONS['7486'].gates[0];
assert(xorGate.fn(0, 0) === 0, '7486 XOR(0,0) = 0');
assert(xorGate.fn(0, 1) === 1, '7486 XOR(0,1) = 1');
assert(xorGate.fn(1, 0) === 1, '7486 XOR(1,0) = 1');
assert(xorGate.fn(1, 1) === 0, '7486 XOR(1,1) = 0');
assert(xorGate.fn(1, 'Z') === 'Z', '7486 XOR(1,Z) = Z');

// ---------------------------------------------------------
// TEST GROUP 2: COMPLEX & MULTIPLEXER IC (74151)
// ---------------------------------------------------------
console.log('\nTEST GROUP 2: IC 74151 8-Line to 1-Line Data Selector / Multiplexer');
const mux = IC_DEFINITIONS['74151'];

// Strobe HIGH = Disabled (Y=0, W=1)
const disabledMux = mux.evaluate({ 7: 1, 9: 0, 10: 0, 11: 0 });
assert(disabledMux[5] === 0 && disabledMux[6] === 1, '74151 Strobe G=1 -> Disabled (Y=0, W=1)');

// Select D3 (C=0, B=1, A=1): Pin 9=0, 10=1, 11=1; D3 is Pin 1
const testMux1 = mux.evaluate({
  7: 0, // Strobe active low
  9: 0, 10: 1, 11: 1, // Select 3 (CBA = 011)
  1: 1, // D3 = 1
  2: 0, 3: 0, 4: 0, 12: 0, 13: 0, 14: 0, 15: 0
});
assert(testMux1[5] === 1 && testMux1[6] === 0, '74151 Select 3 (011) with D3=1 -> Y=1, W=0');

const testMux0 = mux.evaluate({
  7: 0,
  9: 0, 10: 1, 11: 1,
  1: 0, // D3 = 0
  2: 1, 3: 1, 4: 1, 12: 1, 13: 1, 14: 1, 15: 1
});
assert(testMux0[5] === 0 && testMux0[6] === 1, '74151 Select 3 (011) with D3=0 -> Y=0, W=1');

// ---------------------------------------------------------
// TEST GROUP 3: SEQUENTIAL JK FLIP-FLOP (IC 7476)
// ---------------------------------------------------------
console.log('\nTEST GROUP 3: IC 7476 Dual J-K Flip-Flop with Preset & Clear');
const jk = IC_DEFINITIONS['7476'];
let jkState = jk.initInternalState();

// 3.1 Asynchronous Preset (PRE=0, CLR=1) -> Q=1, Q_bar=0
let outPreset = jk.evaluateSequential(jkState, { 4: 0, 6: 1, 1: 1, 2: 0, 3: 0 }, false);
assert(outPreset[7] === 1 && outPreset[8] === 0, '7476 Asynchronous Preset: PRE=0, CLR=1 -> Q=1, Q̅=0');

// 3.2 Asynchronous Clear (PRE=1, CLR=0) -> Q=0, Q_bar=1
let outClear = jk.evaluateSequential(jkState, { 4: 1, 6: 0, 1: 1, 2: 0, 3: 0 }, false);
assert(outClear[7] === 0 && outClear[8] === 1, '7476 Asynchronous Clear: PRE=1, CLR=0 -> Q=0, Q̅=1');

// 3.3 Synchronous Toggle Mode (J=1, K=1, PRE=1, CLR=1, Negative Clock Edge)
// Initial high clock: no edge
jk.evaluateSequential(jkState, { 4: 1, 6: 1, 1: 1, 2: 1, 3: 1 }, false);
assert(jkState.ff1.q === 0, '7476 Toggle: Clock high (no falling edge) -> Q remains 0');

// Falling edge 1 -> 0: Toggle to 1!
jk.evaluateSequential(jkState, { 4: 1, 6: 1, 1: 0, 2: 1, 3: 1 }, true);
assert(jkState.ff1.q === 1 && jkState.ff1.qBar === 0, '7476 Toggle: Falling clock edge 1->0 -> Q toggles to 1');

// Next falling edge: Reset clk to 1 then falling to 0 -> Toggle to 0!
jk.evaluateSequential(jkState, { 4: 1, 6: 1, 1: 1, 2: 1, 3: 1 }, false);
jk.evaluateSequential(jkState, { 4: 1, 6: 1, 1: 0, 2: 1, 3: 1 }, true);
assert(jkState.ff1.q === 0 && jkState.ff1.qBar === 1, '7476 Toggle: Second falling clock edge -> Q toggles back to 0');

// ---------------------------------------------------------
// TEST GROUP 4: SEQUENTIAL DECADE COUNTER (IC 7490)
// ---------------------------------------------------------
console.log('\nTEST GROUP 4: IC 7490 BCD Decade Counter');
const c90 = IC_DEFINITIONS['7490'];
let c90State = c90.initInternalState();

// Master reset: R0(1)=1, R0(2)=1 -> 0000 (QA=0 so CKB=0)
c90.evaluateSequential(c90State, { 2: 1, 3: 1, 6: 0, 7: 0, 14: 1, 1: 0 }, false);
assert(c90State.qa === 0 && c90State.b5Count === 0, '7490 Master Reset: R0(1)=1, R0(2)=1 -> Count 0000');

// Simulate 10 Clock pulses in BCD Decade Counter configuration (QA cascaded to CKB)
let counts = [];
for (let p = 1; p <= 10; p++) {
  // Clock HIGH (14: 1)
  c90.evaluateSequential(c90State, { 2: 0, 3: 0, 6: 0, 7: 0, 14: 1 }, false);
  // Clock LOW (14: 0) - falling edge
  const out = c90.evaluateSequential(c90State, { 2: 0, 3: 0, 6: 0, 7: 0, 14: 0 }, true);
  const val = (out[11] << 3) | (out[8] << 2) | (out[9] << 1) | out[12];
  counts.push(val);
}
assert(counts.slice(0, 10).join(',') === '1,2,3,4,5,6,7,8,9,0', `7490 Decade Count Sequence: ${counts.join(' -> ')}`);

// ---------------------------------------------------------
// TEST GROUP 5: VERIFY ALL 21 PRACTICALS DEFINITIONS
// ---------------------------------------------------------
console.log('\nTEST GROUP 5: Verification of all 21 DLCO Practicals');
const expKeys = Object.keys(EXPERIMENTS);
assert(expKeys.length === 21, `Total 21 Practicals Defined (Found: ${expKeys.length})`);

expKeys.forEach((key, idx) => {
  const exp = EXPERIMENTS[key];
  const hasAim = exp.aim && exp.aim.length > 10;
  const hasIcs = exp.requiredIcs && exp.requiredIcs.length > 0;
  const hasWires = exp.referenceWires && exp.referenceWires.length > 0;
  const hasTable = exp.truthTable && exp.truthTable.length > 0;
  const hasViva = exp.viva && exp.viva.length >= 2;
  assert(hasAim && hasIcs && hasWires && hasTable && hasViva, `Exp ${idx+1} (${exp.title}): Complete schema verified`);
});

// ---------------------------------------------------------
// TEST GROUP 6: END-TO-END CIRCUIT NETLIST SIMULATION (Combinational)
// ---------------------------------------------------------
console.log('\nTEST GROUP 6: End-to-End Combinational Circuit Simulation');

// General circuit solver matching app.js simulation engine
function createCircuitSimulator(socketsConfig, wiresConfig, initialSwitches = {}) {
  const sockets = {};
  Object.keys(socketsConfig).forEach(s => {
    const ic = socketsConfig[s];
    const def = IC_DEFINITIONS[ic];
    sockets[s] = {
      ic,
      icState: def && def.initInternalState ? def.initInternalState() : null,
      isPowered: true
    };
  });

  const state = {
    sockets,
    wires: wiresConfig.map(w => ({ from: w.from, to: w.to })),
    switches: { ...initialSwitches },
    pulser: 1,
    clock: 0
  };

  function step(pulseLow) {
    state.pulser = pulseLow ? 0 : 1;
    runSimulation();
  }

  function pulse() {
    step(true);  // Falling edge
    step(false); // Return high
  }

  function runSimulation() {
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
    state.wires.forEach(w => union(w.from, w.to));

    // Terminal drivers map: tid -> { val, desc }
    const terminalDrivers = {};
    for (let i = 1; i <= 10; i++) {
      terminalDrivers[`vcc:${i}`] = { val: 1, desc: 'VCC' };
      terminalDrivers[`gnd:${i}`] = { val: 0, desc: 'GND' };
    }
    for (let i = 1; i <= 16; i++) {
      terminalDrivers[`in:${i}`] = { val: state.switches[i] !== undefined ? state.switches[i] : 0, desc: `S${i}` };
    }
    terminalDrivers['clk:main'] = { val: state.clock, desc: 'Clock' };
    terminalDrivers['clk:bar'] = { val: state.clock === 1 ? 0 : 1, desc: 'Clock Bar' };
    terminalDrivers['clk:pulse'] = { val: state.pulser, desc: 'Pulser' };

    // Check power for each socket
    const isPowered = {};
    Object.keys(state.sockets).forEach(s => {
      const ic = state.sockets[s].ic;
      const def = IC_DEFINITIONS[ic];
      const vccNet = find(`${s}:p${def.vccPin}`);
      const gndNet = find(`${s}:p${def.gndPin}`);
      const hasVcc = Object.keys(parent).some(t => t.startsWith('vcc:') && find(t) === vccNet);
      const hasGnd = Object.keys(parent).some(t => t.startsWith('gnd:') && find(t) === gndNet);
      isPowered[s] = hasVcc && hasGnd;
      state.sockets[s].isPowered = isPowered[s];
    });

    const pinValues = {};
    let iteration = 0;
    let changed = true;

    while (changed && iteration++ < 35) {
      changed = false;

      // Group drivers by net
      const netDrivers = {};
      Object.keys(terminalDrivers).forEach(tid => {
        const net = find(tid);
        if (!netDrivers[net]) netDrivers[net] = [];
        netDrivers[net].push(terminalDrivers[tid]);
      });

      const netValues = {};
      Object.keys(netDrivers).forEach(net => {
        const drivers = netDrivers[net];
        const has1 = drivers.some(d => d.val === 1);
        const has0 = drivers.some(d => d.val === 0);
        if (has1 && has0) netValues[net] = 'CONFLICT';
        else if (has1) netValues[net] = 1;
        else if (has0) netValues[net] = 0;
        else netValues[net] = 'Z';
      });

      function readTerminal(tid) {
        const net = find(tid);
        return netValues[net] !== undefined ? netValues[net] : 'Z';
      }

      Object.keys(state.sockets).forEach(sockId => {
        const sock = state.sockets[sockId];
        if (!sock.ic || !sock.isPowered) return;
        const icDef = IC_DEFINITIONS[sock.ic];

        // Combinational gates
        if (icDef.gates) {
          icDef.gates.forEach(g => {
            const inVals = g.inputs.map(p => readTerminal(`${sockId}:p${p}`));
            const outVal = g.fn(...inVals);
            const outTid = `${sockId}:p${g.output}`;
            const prev = pinValues[outTid];
            if (prev !== outVal) {
              pinValues[outTid] = outVal;
              changed = true;
            }
            if (outVal !== 'Z') {
              terminalDrivers[outTid] = { val: outVal, desc: `${sockId}:p${g.output}` };
            } else {
              delete terminalDrivers[outTid];
            }
          });
        }
        // 7476 JK Flip-Flop
        else if (sock.ic === '7476') {
          const inputMap = {};
          for (let p = 1; p <= 16; p++) {
            inputMap[p] = readTerminal(`${sockId}:p${p}`);
          }
          const outMap = icDef.evaluateSequential(sock.icState, inputMap, false);
          [7, 8, 10, 9].forEach(p => {
            const outTid = `${sockId}:p${p}`;
            const outVal = outMap[p];
            const prev = pinValues[outTid];
            if (prev !== outVal) {
              pinValues[outTid] = outVal;
              changed = true;
            }
            if (outVal !== 'Z') {
              terminalDrivers[outTid] = { val: outVal, desc: `${sockId}:p${p}` };
            } else {
              delete terminalDrivers[outTid];
            }
          });
        }
        // 7490 Decade Counter
        else if (sock.ic === '7490') {
          const inputMap = {};
          for (let p = 1; p <= 14; p++) {
            inputMap[p] = readTerminal(`${sockId}:p${p}`);
          }
          const outMap = icDef.evaluateSequential(sock.icState, inputMap, false);
          [12, 9, 8, 11].forEach(p => {
            const outTid = `${sockId}:p${p}`;
            const outVal = outMap[p];
            const prev = pinValues[outTid];
            if (prev !== outVal) {
              pinValues[outTid] = outVal;
              changed = true;
            }
            if (outVal !== 'Z') {
              terminalDrivers[outTid] = { val: outVal, desc: `${sockId}:p${p}` };
            } else {
              delete terminalDrivers[outTid];
            }
          });
        }
      });
    }

    function readOut(tid) {
      const net = find(tid);
      const drivers = [];
      Object.keys(terminalDrivers).forEach(t => {
        if (find(t) === net) drivers.push(terminalDrivers[t]);
      });
      const has1 = drivers.some(d => d.val === 1);
      const has0 = drivers.some(d => d.val === 0);
      if (has1 && has0) return 'CONFLICT';
      if (has1) return 1;
      if (has0) return 0;
      return 'Z';
    }

    return { readOut, pinValues, isPowered };
  }

  function getOutputs(keys) {
    const res = runSimulation();
    const out = {};
    keys.forEach(k => { out[k] = res.readOut(k); });
    return out;
  }

  // Initial settle
  runSimulation();

  return { state, step, pulse, getOutputs, runSimulation };
}

// 6.1 Test Full Adder for all 8 combinations of A, B, Cin
const faExp = EXPERIMENTS['exp1'];
let faPassed = 0;
faExp.truthTable.forEach(row => {
  const sim = createCircuitSimulator(faExp.socketLayout, faExp.referenceWires);
  sim.state.switches = { 1: row.A, 2: row.B, 3: row.Cin };
  const res = sim.runSimulation();
  const sum = res.readOut('out:1');
  const carry = res.readOut('out:2');
  if (sum === row.SUM && carry === row.CARRY) faPassed++;
});
assert(faPassed === 8, `Full Adder Circuit: All 8/8 truth table rows verified via netlist solver!`);

// 6.2 Test Power Dependency: If U1 Pin 14 (VCC) is disconnected, Full Adder outputs 'Z'
const faNoPowerWires = faExp.referenceWires.filter(w => !(w.from === 'vcc:1' && w.to === 'U1:p14'));
const unpoweredSim = createCircuitSimulator(faExp.socketLayout, faNoPowerWires);
unpoweredSim.state.switches = { 1: 1, 2: 1, 3: 0 };
const unpoweredRes = unpoweredSim.runSimulation();
assert(!unpoweredRes.isPowered['U1'], 'Full Adder: Disconnecting VCC causes U1 to be reported as UNPOWERED');
assert(unpoweredRes.readOut('out:1') === 'Z', 'Full Adder: Unpowered U1 results in high-Z (Z) floating output');

// 6.3 Test 3-Bit Binary to Gray Code Converter (Exp 3)
const bgExp = EXPERIMENTS['exp3'];
let bgPassed = 0;
bgExp.truthTable.forEach(row => {
  const sim = createCircuitSimulator(bgExp.socketLayout, bgExp.referenceWires);
  sim.state.switches = { 3: row.B2, 2: row.B1, 1: row.B0 };
  const res = sim.runSimulation();
  const g2 = res.readOut('out:3');
  const g1 = res.readOut('out:2');
  const g0 = res.readOut('out:1');
  if (g2 === row.G2 && g1 === row.G1 && g0 === row.G0) bgPassed++;
});
assert(bgPassed === 8, `3-Bit Binary to Gray Circuit: All 8/8 test rows verified via netlist solver!`);

// ---------------------------------------------------------
// TEST GROUP 7: ASYNCHRONOUS UP COUNTERS (IC 7476)
// ---------------------------------------------------------
console.log('\nTEST GROUP 7: Asynchronous UP Counters (2-bit, 3-bit, 4-bit)');

// 7.1 2-Bit Asynchronous UP Counter (Exp 11)
{
  const exp = EXPERIMENTS['exp11'];
  const sim = createCircuitSimulator(exp.socketLayout, exp.referenceWires);
  const sequence = [];
  for (let p = 0; p <= 4; p++) {
    const outs = sim.getOutputs(['out:1', 'out:2']);
    sequence.push(`${outs['out:2']}${outs['out:1']}`);
    if (p < 4) sim.pulse();
  }
  const expected = ['00', '01', '10', '11', '00'];
  const pass = sequence.join(',') === expected.join(',');
  assert(pass, `2-Bit UP Counter sequence: ${sequence.join(' -> ')} (expected: ${expected.join(' -> ')})`);
}

// 7.2 3-Bit Asynchronous UP Counter (Exp 12)
{
  const exp = EXPERIMENTS['exp12'];
  const sim = createCircuitSimulator(exp.socketLayout, exp.referenceWires);
  const sequence = [];
  for (let p = 0; p <= 8; p++) {
    const outs = sim.getOutputs(['out:1', 'out:2', 'out:3']);
    sequence.push(`${outs['out:3']}${outs['out:2']}${outs['out:1']}`);
    if (p < 8) sim.pulse();
  }
  const expected = ['000', '001', '010', '011', '100', '101', '110', '111', '000'];
  const pass = sequence.join(',') === expected.join(',');
  assert(pass, `3-Bit UP Counter sequence: ${sequence.join(' -> ')} (expected: ${expected.join(' -> ')})`);
}

// 7.3 4-Bit Asynchronous UP Counter (Exp 13)
{
  const exp = EXPERIMENTS['exp13'];
  const sim = createCircuitSimulator(exp.socketLayout, exp.referenceWires);
  const sequence = [];
  for (let p = 0; p <= 16; p++) {
    const outs = sim.getOutputs(['out:1', 'out:2', 'out:3', 'out:4']);
    const val = (outs['out:4'] << 3) | (outs['out:3'] << 2) | (outs['out:2'] << 1) | outs['out:1'];
    sequence.push(val);
    if (p < 16) sim.pulse();
  }
  const expected = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];
  const pass = sequence.join(',') === expected.join(',');
  assert(pass, `4-Bit UP Counter sequence: ${sequence.join(' -> ')} (all 16 states + rollover verified)`);
}

// ---------------------------------------------------------
// TEST GROUP 8: ASYNCHRONOUS DOWN COUNTERS (IC 7476)
// ---------------------------------------------------------
console.log('\nTEST GROUP 8: Asynchronous DOWN Counters (2-bit, 3-bit, 4-bit)');

// 8.1 2-Bit Asynchronous DOWN Counter (Exp 14)
{
  const exp = EXPERIMENTS['exp14'];
  const sim = createCircuitSimulator(exp.socketLayout, exp.referenceWires);
  const sequence = [];
  for (let p = 1; p <= 5; p++) {
    sim.pulse();
    const outs = sim.getOutputs(['out:1', 'out:2']);
    sequence.push(`${outs['out:2']}${outs['out:1']}`);
  }
  const expected = ['11', '10', '01', '00', '11'];
  const pass = sequence.join(',') === expected.join(',');
  assert(pass, `2-Bit DOWN Counter sequence: ${sequence.join(' -> ')} (expected: ${expected.join(' -> ')})`);
}

// 8.2 3-Bit Asynchronous DOWN Counter (Exp 15)
{
  const exp = EXPERIMENTS['exp15'];
  const sim = createCircuitSimulator(exp.socketLayout, exp.referenceWires);
  const sequence = [];
  for (let p = 1; p <= 9; p++) {
    sim.pulse();
    const outs = sim.getOutputs(['out:1', 'out:2', 'out:3']);
    sequence.push(`${outs['out:3']}${outs['out:2']}${outs['out:1']}`);
  }
  const expected = ['111', '110', '101', '100', '011', '010', '001', '000', '111'];
  const pass = sequence.join(',') === expected.join(',');
  assert(pass, `3-Bit DOWN Counter sequence: ${sequence.join(' -> ')} (expected: ${expected.join(' -> ')})`);
}

// 8.3 4-Bit Asynchronous DOWN Counter (Exp 16)
{
  const exp = EXPERIMENTS['exp16'];
  const sim = createCircuitSimulator(exp.socketLayout, exp.referenceWires);
  const sequence = [];
  for (let p = 1; p <= 17; p++) {
    sim.pulse();
    const outs = sim.getOutputs(['out:1', 'out:2', 'out:3', 'out:4']);
    const val = (outs['out:4'] << 3) | (outs['out:3'] << 2) | (outs['out:2'] << 1) | outs['out:1'];
    sequence.push(val);
  }
  const expected = [15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 15];
  const pass = sequence.join(',') === expected.join(',');
  assert(pass, `4-Bit DOWN Counter sequence: ${sequence.join(' -> ')} (all 16 states + rollover verified)`);
}

// ---------------------------------------------------------
// TEST GROUP 9: 2-BIT ASYNCHRONOUS UP/DOWN COUNTER (Exp 17)
// ---------------------------------------------------------
console.log('\nTEST GROUP 9: 2-Bit Asynchronous UP/DOWN Counter with Steering Logic (Exp 17)');

// 9.1 UP Mode (S1 = 1)
{
  const exp = EXPERIMENTS['exp17'];
  const sim = createCircuitSimulator(exp.socketLayout, exp.referenceWires, { 1: 1 });
  const sequence = [];
  for (let p = 0; p <= 4; p++) {
    const outs = sim.getOutputs(['out:1', 'out:2']);
    sequence.push(`${outs['out:2']}${outs['out:1']}`);
    if (p < 4) sim.pulse();
  }
  const expected = ['00', '01', '10', '11', '00'];
  const pass = sequence.join(',') === expected.join(',');
  assert(pass, `Exp 17 UP Mode (S1=1): ${sequence.join(' -> ')} (expected: ${expected.join(' -> ')})`);
}

// 9.2 DOWN Mode (S1 = 0)
{
  const exp = EXPERIMENTS['exp17'];
  const sim = createCircuitSimulator(exp.socketLayout, exp.referenceWires, { 1: 0 });
  const sequence = [];
  for (let p = 1; p <= 5; p++) {
    sim.pulse();
    const outs = sim.getOutputs(['out:1', 'out:2']);
    sequence.push(`${outs['out:2']}${outs['out:1']}`);
  }
  const expected = ['11', '10', '01', '00', '11'];
  const pass = sequence.join(',') === expected.join(',');
  assert(pass, `Exp 17 DOWN Mode (S1=0): ${sequence.join(' -> ')} (expected: ${expected.join(' -> ')})`);
}

// 9.3 Direction Switching Mid-Count (Switch S1 during counting)
{
  const exp = EXPERIMENTS['exp17'];
  const sim = createCircuitSimulator(exp.socketLayout, exp.referenceWires, { 1: 1 });
  sim.pulse(); // -> 01
  sim.pulse(); // -> 10
  let outs = sim.getOutputs(['out:1', 'out:2']);
  assert(`${outs['out:2']}${outs['out:1']}` === '10', 'Exp 17 Direction Switch: Counted UP to 10');

  // Now switch to DOWN mode (M = 0)
  sim.state.switches[1] = 0;
  sim.runSimulation();
  sim.pulse(); // Next pulse in DOWN mode should go from 10 -> 01
  outs = sim.getOutputs(['out:1', 'out:2']);
  assert(`${outs['out:2']}${outs['out:1']}` === '01', 'Exp 17 Direction Switch: After switching to DOWN, next state is 01');

  sim.pulse(); // -> 00
  outs = sim.getOutputs(['out:1', 'out:2']);
  assert(`${outs['out:2']}${outs['out:1']}` === '00', 'Exp 17 Direction Switch: Down count reaches 00');

  sim.pulse(); // -> 11 (wraparound in DOWN mode)
  outs = sim.getOutputs(['out:1', 'out:2']);
  assert(`${outs['out:2']}${outs['out:1']}` === '11', 'Exp 17 Direction Switch: Down count rolls over to 11');
}

// ---------------------------------------------------------
// TEST GROUP 10: MOD-10 DECADE COUNTER (Exp 19 - IC 7490)
// ---------------------------------------------------------
console.log('\nTEST GROUP 10: MOD-10 Decade Counter (Exp 19 - IC 7490)');
{
  const exp = EXPERIMENTS['exp19'];
  const sim = createCircuitSimulator(exp.socketLayout, exp.referenceWires);
  const sequence = [];
  for (let p = 0; p <= 10; p++) {
    const outs = sim.getOutputs(['out:1', 'out:2', 'out:3', 'out:4']);
    const val = (outs['out:4'] << 3) | (outs['out:3'] << 2) | (outs['out:2'] << 1) | outs['out:1'];
    sequence.push(val);
    if (p < 10) sim.pulse();
  }
  const expected = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const pass = sequence.join(',') === expected.join(',');
  assert(pass, `MOD-10 Decade Counter sequence: ${sequence.join(' -> ')} (resets at count 10 to 0)`);
}

// ---------------------------------------------------------
// TEST GROUP 11: MOD-100 TWO-DIGIT DECIMAL COUNTER (Exp 20)
// ---------------------------------------------------------
console.log('\nTEST GROUP 11: MOD-100 Two-Digit Decimal Counter (Exp 20 - Cascaded 7490s)');
{
  const exp = EXPERIMENTS['exp20'];
  const sim = createCircuitSimulator(exp.socketLayout, exp.referenceWires);
  let allStatesCorrect = true;
  let errorMsg = '';

  for (let pulseCount = 0; pulseCount <= 103; pulseCount++) {
    const outs = sim.getOutputs([
      'out:1', 'out:2', 'out:3', 'out:4', // Units
      'out:5', 'out:6', 'out:7', 'out:8'  // Tens
    ]);
    const u = (outs['out:4'] << 3) | (outs['out:3'] << 2) | (outs['out:2'] << 1) | outs['out:1'];
    const t = (outs['out:8'] << 3) | (outs['out:7'] << 2) | (outs['out:6'] << 1) | outs['out:5'];
    const val = t * 10 + u;
    const expectedVal = pulseCount % 100;

    if (val !== expectedVal) {
      allStatesCorrect = false;
      errorMsg = `At pulse ${pulseCount}: expected ${expectedVal} (T=${Math.floor(expectedVal/10)}, U=${expectedVal%10}), got ${val} (T=${t}, U=${u})`;
      break;
    }

    if (pulseCount < 103) sim.pulse();
  }

  assert(allStatesCorrect, allStatesCorrect
    ? 'MOD-100 Counter: Verified full 00 -> 99 sequence, tens rollover, and reset to 00 across 103 pulses'
    : `MOD-100 Counter FAILED: ${errorMsg}`);
}

// ---------------------------------------------------------
// TEST GROUP 12: CONFIGURABLE MOD-N COUNTERS (Exp 21 - MOD-10 to MOD-99)
// ---------------------------------------------------------
console.log('\nTEST GROUP 12: Configurable MOD-N Decimal Counters (MOD-10 to MOD-99)');

// 12.1 Representative MOD Values: 10, 12, 16, 25, 50, 75, 99
const testModValues = [10, 12, 16, 25, 50, 75, 99];
testModValues.forEach(modN => {
  const exp = createModNExperiment(modN);
  const sim = createCircuitSimulator(exp.socketLayout, exp.referenceWires);

  let passed = true;
  let failDetail = '';

  for (let p = 0; p <= modN + 2; p++) {
    const outs = sim.getOutputs([
      'out:1', 'out:2', 'out:3', 'out:4', // Units
      'out:5', 'out:6', 'out:7', 'out:8'  // Tens
    ]);
    const u = (outs['out:4'] << 3) | (outs['out:3'] << 2) | (outs['out:2'] << 1) | outs['out:1'];
    const t = (outs['out:8'] << 3) | (outs['out:7'] << 2) | (outs['out:6'] << 1) | outs['out:5'];
    const count = t * 10 + u;
    const expected = p % modN;

    if (count !== expected) {
      passed = false;
      failDetail = `Pulse ${p}: Expected ${expected}, got ${count} (T=${t}, U=${u})`;
      break;
    }

    if (p <= modN + 1) sim.pulse();
  }

  assert(passed, `Configurable MOD-${modN}: Exactly ${modN} states (00 to ${String(modN - 1).padStart(2, '0')}) -> resets to 00 ${passed ? '✓' : '✗ ' + failDetail}`);
});

// 12.2 Input Validation & Clamping for Configurable MOD-N
{
  const belowRange = createModNExperiment(5); // Below minimum 10
  assert(belowRange.title.includes('MOD-10'), 'MOD-N Clamping: Values < 10 clamp safely to MOD-10');

  const aboveRange = createModNExperiment(150); // Above maximum 99
  assert(aboveRange.title.includes('MOD-99'), 'MOD-N Clamping: Values > 99 clamp safely to MOD-99');

  const invalidInput = createModNExperiment('invalid_text');
  assert(invalidInput.title.includes('MOD-12'), 'MOD-N Fallback: Non-numeric input safely defaults to valid MOD');
}

// 12.3 Full Sweep Across Intermediate Values: verify structural validity for all MOD-10 through MOD-99
{
  let allModValid = true;
  for (let n = 10; n <= 99; n++) {
    const cfg = createModNExperiment(n);
    if (!cfg.requiredIcs.includes('7490') || !cfg.referenceWires.length || !cfg.truthTable.length) {
      allModValid = false;
      break;
    }
  }
  assert(allModValid, 'MOD-N Range: All 90 modulus values (MOD-10 through MOD-99) generate valid simulated circuit configurations');
}

// ---------------------------------------------------------
// TEST SUMMARY
// ---------------------------------------------------------
console.log('\n====================================================');
console.log(`TEST RESULTS: ${passedTests} / ${totalTests} TESTS PASSED (${((passedTests/totalTests)*100).toFixed(1)}%)`);
console.log('====================================================\n');

if (passedTests === totalTests) {
  process.exit(0);
} else {
  process.exit(1);
}
