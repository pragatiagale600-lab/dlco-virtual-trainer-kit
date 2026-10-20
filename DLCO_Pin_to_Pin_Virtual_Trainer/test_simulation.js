/**
 * Automated Verification Test Suite for DLCO Virtual IC Trainer Kit
 * Tests all 8 IC models, netlist resolution, power validation, sequential clocking, and practicals.
 */

const fs = require('fs');
const path = require('path');

console.log('====================================================');
console.log('RUNNING DLCO VIRTUAL IC TRAINER AUTOMATED TEST SUITE');
console.log('====================================================\n');

// Load app.js and extract IC_DEFINITIONS and EXPERIMENTS
const appJsContent = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8');

// Use a sandboxed VM or eval to extract definitions
const vm = require('vm');
const sandbox = {
  document: {
    addEventListener: () => {},
    getElementById: () => ({ addEventListener: () => {}, classList: { add: () => {}, remove: () => {} } }),
    querySelector: () => null,
    querySelectorAll: () => []
  },
  window: { addEventListener: () => {} }
};

// Extract IC_DEFINITIONS and EXPERIMENTS using regex or eval
const icDefMatch = appJsContent.match(/const IC_DEFINITIONS = (\{[\s\S]*?\r?\n  \};)/);
const expMatch = appJsContent.match(/const EXPERIMENTS = (\{[\s\S]*?\r?\n  \};)/);

if (!icDefMatch || !expMatch) {
  console.error('FAILED to extract IC_DEFINITIONS or EXPERIMENTS from app.js');
  process.exit(1);
}

const IC_DEFINITIONS = vm.runInNewContext('(' + icDefMatch[1].replace(/;\s*$/, '') + ')');
const EXPERIMENTS = vm.runInNewContext('(' + expMatch[1].replace(/;\s*$/, '') + ')');

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
// Rising edge (0 -> 1): No change
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
// TEST GROUP 5: VERIFY ALL 19 PRACTICALS DEFINITIONS
// ---------------------------------------------------------
console.log('\nTEST GROUP 5: Verification of all 19 DLCO Practicals');
const expKeys = Object.keys(EXPERIMENTS);
assert(expKeys.length === 19, `Total 19 Practicals Defined (Found: ${expKeys.length})`);

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
// TEST GROUP 6: END-TO-END CIRCUIT NETLIST SIMULATION
// ---------------------------------------------------------
console.log('\nTEST GROUP 6: End-to-End Circuit Simulation (Full Adder & Gray Code)');

// Solver function simulating the exact logic from app.js runSimulation()
function solveCircuit(sockets, wires, switches) {
  const parent = {};
  function find(x) {
    if (parent[x] === undefined) parent[x] = x;
    if (parent[x] !== x) parent[x] = find(parent[x]);
    return parent[x];
  }
  function union(a, b) {
    const ra = find(a), rb = find(b);
    if (ra !== rb) parent[rb] = ra;
  }
  wires.forEach(w => union(w.from, w.to));

  const netDrivers = {};
  function addDriver(tid, val) {
    const net = find(tid);
    if (!netDrivers[net]) netDrivers[net] = [];
    netDrivers[net].push(val);
  }

  // Power rails
  for (let i = 1; i <= 10; i++) {
    addDriver(`vcc:${i}`, 1);
    addDriver(`gnd:${i}`, 0);
  }

  // Switches
  Object.keys(switches).forEach(k => {
    addDriver(`in:${k}`, switches[k]);
  });

  // Power check
  const isPowered = {};
  Object.keys(sockets).forEach(s => {
    const ic = sockets[s];
    const def = IC_DEFINITIONS[ic];
    const vccNet = find(`${s}:p${def.vccPin}`);
    const gndNet = find(`${s}:p${def.gndPin}`);
    const hasVcc = Object.keys(parent).some(t => t.startsWith('vcc:') && find(t) === vccNet);
    const hasGnd = Object.keys(parent).some(t => t.startsWith('gnd:') && find(t) === gndNet);
    isPowered[s] = hasVcc && hasGnd;
  });

  const pinValues = {};
  let changed = true, it = 0;
  while (changed && it++ < 20) {
    changed = false;
    const netVals = {};
    Object.keys(netDrivers).forEach(net => {
      const d = netDrivers[net];
      if (d.includes(1) && d.includes(0)) netVals[net] = 'CONFLICT';
      else if (d.includes(1)) netVals[net] = 1;
      else if (d.includes(0)) netVals[net] = 0;
      else netVals[net] = 'Z';
    });

    function readT(tid) {
      const net = find(tid);
      return netVals[net] !== undefined ? netVals[net] : 'Z';
    }

    Object.keys(sockets).forEach(s => {
      if (!isPowered[s]) return;
      const def = IC_DEFINITIONS[sockets[s]];
      if (def.gates) {
        def.gates.forEach(g => {
          const inV = g.inputs.map(p => readT(`${s}:p${p}`));
          const outV = g.fn(...inV);
          const outTid = `${s}:p${g.output}`;
          if (pinValues[outTid] !== outV) {
            pinValues[outTid] = outV;
            changed = true;
          }
          if (outV !== 'Z') addDriver(outTid, outV);
        });
      }
    });
  }

  function readOut(tid) {
    const net = find(tid);
    const d = netDrivers[net] || [];
    if (d.includes(1) && d.includes(0)) return 'CONFLICT';
    if (d.includes(1)) return 1;
    if (d.includes(0)) return 0;
    return 'Z';
  }

  return { readOut, isPowered };
}

// 6.1 Test Full Adder for all 8 combinations of A, B, Cin
const faExp = EXPERIMENTS['exp1'];
let faPassed = 0;
faExp.truthTable.forEach(row => {
  const result = solveCircuit(
    faExp.socketLayout,
    faExp.referenceWires,
    { 1: row.A, 2: row.B, 3: row.Cin }
  );
  const sum = result.readOut('out:1');
  const carry = result.readOut('out:2');
  if (sum === row.SUM && carry === row.CARRY) faPassed++;
});
assert(faPassed === 8, `Full Adder Circuit: All 8/8 truth table rows verified via netlist solver!`);

// 6.2 Test Power Dependency: If U1 Pin 14 (VCC) is disconnected, Full Adder outputs 'Z'
const faNoPowerWires = faExp.referenceWires.filter(w => !(w.from === 'vcc:1' && w.to === 'U1:p14'));
const unpoweredResult = solveCircuit(
  faExp.socketLayout,
  faNoPowerWires,
  { 1: 1, 2: 1, 3: 0 }
);
assert(!unpoweredResult.isPowered['U1'], 'Full Adder: Disconnecting VCC causes U1 to be reported as UNPOWERED');
assert(unpoweredResult.readOut('out:1') === 'Z', 'Full Adder: Unpowered U1 results in high-Z (Z) floating output, not false 0 or 1');

// 6.3 Test 3-Bit Binary to Gray Code Converter (Exp 3)
const bgExp = EXPERIMENTS['exp3'];
let bgPassed = 0;
bgExp.truthTable.forEach(row => {
  const result = solveCircuit(
    bgExp.socketLayout,
    bgExp.referenceWires,
    { 3: row.B2, 2: row.B1, 1: row.B0 }
  );
  const g2 = result.readOut('out:3');
  const g1 = result.readOut('out:2');
  const g0 = result.readOut('out:1');
  if (g2 === row.G2 && g1 === row.G1 && g0 === row.G0) bgPassed++;
});
assert(bgPassed === 8, `3-Bit Binary to Gray Circuit: All 8/8 test rows verified via netlist solver!`);

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
