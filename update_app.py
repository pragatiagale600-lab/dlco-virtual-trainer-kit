# Python script to update app.js with comprehensive viva questions for all 19 practicals and refined 7490 model
import re

file_path = r'c:\Users\Pragati\Downloads\DLCO_Pin_to_Pin_Virtual_Trainer\DLCO_Pin_to_Pin_Virtual_Trainer\app.js'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update 7490 model
old_7490 = """    '7490': {
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
        lastCkb: 1
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
        }
        // Master Set: R9(1)=1 AND R9(2)=1 => 1001 (9)
        else if (r91 === 1 && r92 === 1) {
          state.qa = 1;
          state.b5Count = 4; // QD=1, QC=0, QB=0, QA=1
        } else {
          // Divide by 2: negative edge on CKA
          if (state.lastCka === 1 && cka === 0) {
            state.qa = state.qa === 1 ? 0 : 1;
          }
          // Divide by 5: negative edge on CKB
          if (state.lastCkb === 1 && ckb === 0) {
            state.b5Count = (state.b5Count + 1) % 5;
          }
        }

        if (cka !== 'Z') state.lastCka = cka;
        if (ckb !== 'Z') state.lastCkb = ckb;

        // Decode divide-by-5 state into B, C, D bits:
        // b5Count: 0 -> QD=0, QC=0, QB=0
        //          1 -> QD=0, QC=0, QB=1
        //          2 -> QD=0, QC=1, QB=0
        //          3 -> QD=0, QC=1, QB=1
        //          4 -> QD=1, QC=0, QB=0
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
    }"""

new_7490 = """    '7490': {
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
          const prevQa = state.qa;
          // Divide by 2: negative edge on CKA
          if (state.lastCka === 1 && cka === 0) {
            state.qa = state.qa === 1 ? 0 : 1;
          }
          // Divide by 5: triggered on negative edge of CKB (or QA falling edge if cascaded)
          if (state.lastCkb === 1 && ckb === 0) {
            state.b5Count = (state.b5Count + 1) % 5;
          } else if (prevQa === 1 && state.qa === 0 && (ckb === 0 || ckb === 'Z')) {
            state.b5Count = (state.b5Count + 1) % 5;
          }
        }

        if (cka !== 'Z') state.lastCka = cka;
        if (ckb !== 'Z') state.lastCkb = ckb;

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
    }"""

if old_7490 in content:
    content = content.replace(old_7490, new_7490)
    print("Replaced 7490 model successfully")
else:
    print("WARNING: old_7490 string not found exactly, performing regex replace")
    content = re.sub(r"'7490': \{[\s\S]*?\n    \}", new_7490.strip(), content)

# 2. Add extra Viva questions to Exp 4, 5, 7, 9, 10, 12, 13, 14, 15, 16, 17, 18
viva_exp4 = """      viva: [
        { q: 'What is a Gray code?', a: 'A reflective binary code in which successive values differ by only 1 bit position.' },
        { q: 'How is Gray code converted back to binary?', a: 'B3 = G3; B2 = B3 ⊕ G2; B1 = B2 ⊕ G1; B0 = B1 ⊕ G0.' },
        { q: 'What is the advantage of Gray code in shaft position encoders?', a: 'It eliminates ambiguous states and glitches caused by multiple mechanical bits changing at slightly different times.' },
        { q: 'How many 2-input XOR gates are required for an n-bit binary to Gray converter?', a: '(n - 1) XOR gates. For a 4-bit converter, exactly 3 XOR gates are needed.' }
      ]"""
content = re.sub(r"exp4: \{[\s\S]*?viva: \[[\s\S]*?\]\s*\}", lambda m: re.sub(r"viva: \[[\s\S]*?\]", viva_exp4.strip(), m.group(0)), content)

viva_exp5 = """      viva: [
        { q: 'What is a magnitude comparator?', a: 'A combinational logic circuit that compares two binary numbers and determines whether A > B, A = B, or A < B.' },
        { q: 'What is the boolean expression for A = B in a 1-bit comparator?', a: 'A = B is given by the XNOR function: (A ⊕ B)̅ = (A · B) + (A̅ · B̅).' },
        { q: 'What are the expressions for A > B and A < B?', a: 'A > B is A · B̅; A < B is A̅ · B.' },
        { q: 'Which standard TTL IC is a dedicated 4-bit magnitude comparator?', a: 'IC 7485 is a standard 4-bit magnitude comparator with cascading inputs.' }
      ]"""
content = re.sub(r"exp5: \{[\s\S]*?viva: \[[\s\S]*?\]\s*\}", lambda m: re.sub(r"viva: \[[\s\S]*?\]", viva_exp5.strip(), m.group(0)), content)

viva_exp7 = """      viva: [
        { q: 'What is Odd Parity?', a: 'A scheme where the parity bit is chosen such that the total number of 1s in the data plus parity bit is always an odd number.' },
        { q: 'How does an Odd Parity checker verify data integrity?', a: 'It XORs the received data bits and parity bit. If the overall sum of 1s is even, a transmission error is flagged.' },
        { q: 'What is the limitation of simple parity checking?', a: 'It can only detect odd numbers of bit errors (e.g. 1-bit or 3-bit flips); 2-bit simultaneous errors go undetected.' },
        { q: 'How is odd parity generated from the even parity XOR tree?', a: 'By passing the even parity XOR output through an inverter (NOT gate IC 7404).' }
      ]"""
content = re.sub(r"exp7: \{[\s\S]*?viva: \[[\s\S]*?\]\s*\}", lambda m: re.sub(r"viva: \[[\s\S]*?\]", viva_exp7.strip(), m.group(0)), content)

viva_exp9 = """      viva: [
        { q: 'How is a boolean function realized using a multiplexer?', a: 'For n variables using a 2ⁿ:1 MUX, apply n variables to select lines; connect data inputs corresponding to minterms to logic 1 (VCC) and remaining inputs to logic 0 (GND).' },
        { q: 'Why is a multiplexer called a universal function generator?', a: 'Because any arbitrary boolean function of n variables can be realized without needing external logic gates.' },
        { q: 'What is the active state of Strobe G̅ in IC 74151?', a: 'Active-low (Pin 7 must be tied to GND for normal operation).' },
        { q: 'What are minterms 0, 3, 5, 6 in binary?', a: 'm0=000, m3=011, m5=101, m6=110.' }
      ]"""
content = re.sub(r"exp9: \{[\s\S]*?viva: \[[\s\S]*?\]\s*\}", lambda m: re.sub(r"viva: \[[\s\S]*?\]", viva_exp9.strip(), m.group(0)), content)

viva_exp10 = """      viva: [
        { q: 'How can an n-variable function be implemented with a 2ⁿ⁻¹:1 MUX?', a: 'Connect (n-1) variables to the select lines and express the data inputs as functions of the remaining 1 variable (0, 1, D, or D̅).' },
        { q: 'How do you determine the input for each data line D0 to D7?', a: 'Construct an implementation table with rows for D̅ and D; compare minterms present in each column to determine whether the input is 0, 1, D, or D̅.' },
        { q: 'Why is IC 7404 required in this experiment?', a: 'To generate the inverted signal D̅ from the fourth variable D.' },
        { q: 'What output pins are available on IC 74151?', a: 'Pin 5 provides the true output Y, and Pin 6 provides the complementary output W (Y̅).' }
      ]"""
content = re.sub(r"exp10: \{[\s\S]*?viva: \[[\s\S]*?\]\s*\}", lambda m: re.sub(r"viva: \[[\s\S]*?\]", viva_exp10.strip(), m.group(0)), content)

viva_exp12 = """      viva: [
        { q: 'What is the modulus of a 3-bit counter?', a: 'MOD = 2³ = 8. It cycles through 8 states from 000 to 111.' },
        { q: 'Why are two IC 7476 chips required?', a: 'Each 7476 contains two JK flip-flops. A 3-bit counter needs 3 flip-flops, so two chips are utilized.' },
        { q: 'What frequency appears at the output of the third flip-flop (Q2)?', a: 'f_out = f_in / 8. Each stage divides the frequency by 2.' },
        { q: 'What is the active clock edge for IC 7476?', a: 'Negative-edge triggered (triggers on High-to-Low clock transitions).' }
      ]"""
content = re.sub(r"exp12: \{[\s\S]*?viva: \[[\s\S]*?\]\s*\}", lambda m: re.sub(r"viva: \[[\s\S]*?\]", viva_exp12.strip(), m.group(0)), content)

viva_exp13 = """      viva: [
        { q: 'What is the maximum operating frequency of a ripple counter?', a: 'f_max = 1 / (N · t_pd), where N is the number of flip-flops and t_pd is the propagation delay per flip-flop.' },
        { q: 'What is the count capacity of a 4-bit binary counter?', a: '2⁴ = 16 states, counting from 0000 (0) to 1111 (15).' },
        { q: 'Why must PRE̅ and CLR̅ pins be tied to VCC?', a: 'They are active-low asynchronous inputs. Leaving them unconnected or low forces the flip-flop to set or reset continuously.' },
        { q: 'How does the 7-segment display decode the 4-bit counter value?', a: 'The 4 outputs Q3..Q0 represent binary weights 8, 4, 2, 1 (BCD/hexadecimal), which are mapped to digits 0 to F.' }
      ]"""
content = re.sub(r"exp13: \{[\s\S]*?viva: \[[\s\S]*?\]\s*\}", lambda m: re.sub(r"viva: \[[\s\S]*?\]", viva_exp13.strip(), m.group(0)), content)

viva_exp14 = """      viva: [
        { q: 'How does clocking from Q̅ convert an Up Counter into a Down Counter?', a: 'When Q transitions from 0 to 1, Q̅ transitions from 1 to 0 (falling edge), triggering the next stage and producing a decreasing count sequence.' },
        { q: 'What is the 2-bit down count sequence?', a: '11 (3) -> 10 (2) -> 01 (1) -> 00 (0) -> 11 (3)...' },
        { q: 'What happens if you read outputs from Q̅ instead of Q in an Up counter?', a: 'The complement of an up-counting sequence is mathematically identical to a down-counting sequence.' },
        { q: 'What is the role of J=1 and K=1 in this circuit?', a: 'It places the flip-flop in toggle mode (T-type flip-flop), where the output changes state on every clock pulse.' }
      ]"""
content = re.sub(r"exp14: \{[\s\S]*?viva: \[[\s\S]*?\]\s*\}", lambda m: re.sub(r"viva: \[[\s\S]*?\]", viva_exp14.strip(), m.group(0)), content)

viva_exp15 = """      viva: [
        { q: 'What is the count sequence of a 3-bit Down Counter?', a: '7, 6, 5, 4, 3, 2, 1, 0, then wraps back to 7.' },
        { q: 'What is the alternative method to achieve a Down Counter?', a: 'Keep clocking from Q, but read the output bits directly from Q̅ instead of Q.' },
        { q: 'What is cumulative propagation delay in a 3-bit ripple counter?', a: '3 × t_pd. The last flip-flop updates after all three delays elapse.' },
        { q: 'Can this circuit be used as a frequency divider?', a: 'Yes, each successive output divides the previous frequency by 2.' }
      ]"""
content = re.sub(r"exp15: \{[\s\S]*?viva: \[[\s\S]*?\]\s*\}", lambda m: re.sub(r"viva: \[[\s\S]*?\]", viva_exp15.strip(), m.group(0)), content)

viva_exp16 = """      viva: [
        { q: 'What causes glitching in ripple counters?', a: 'Unequal propagation delays across cascaded stages cause temporary invalid intermediate states during transitions.' },
        { q: 'How can glitches be prevented in high-speed digital systems?', a: 'By using synchronous counters where all flip-flops share a common clock line.' },
        { q: 'What is the state transition from 0000 in a down counter?', a: 'It wraps around to 1111 (decimal 15).' },
        { q: 'How many clock pulses are needed to return to the initial state?', a: 'Exactly 16 clock pulses.' }
      ]"""
content = re.sub(r"exp16: \{[\s\S]*?viva: \[[\s\S]*?\]\s*\}", lambda m: re.sub(r"viva: \[[\s\S]*?\]", viva_exp16.strip(), m.group(0)), content)

viva_exp17 = """      viva: [
        { q: 'What is steering logic in an Up/Down counter?', a: 'Gating logic that steers either Q (for up counting) or Q̅ (for down counting) to the clock terminal of the next flip-flop based on a control line.' },
        { q: 'What is the boolean expression for the clock input of stage 2?', a: 'CLK2 = (M · Q) + (M̅ · Q̅), where M is the Mode control bit (1=UP, 0=DOWN).' },
        { q: 'Why is an inverter (7404) needed in the steering logic?', a: 'To generate M̅ from M for enabling the down-count AND gate.' },
        { q: 'What happens when mode switch M is toggled during counting?', a: 'The counter immediately switches direction from its current state on subsequent clock pulses.' }
      ]"""
content = re.sub(r"exp17: \{[\s\S]*?viva: \[[\s\S]*?\]\s*\}", lambda m: re.sub(r"viva: \[[\s\S]*?\]", viva_exp17.strip(), m.group(0)), content)

viva_exp18 = """      viva: [
        { q: 'How many states does a 4-bit counter have?', a: '16 states (0 to 15).' },
        { q: 'What is the difference between synchronous and asynchronous counters?', a: 'In synchronous counters, all flip-flops receive the clock simultaneously; in asynchronous counters, the clock ripples from one flip-flop to the next.' },
        { q: 'What is the primary advantage of ripple counters over synchronous counters?', a: 'Simpler circuitry requiring fewer gates and simpler interconnects.' },
        { q: 'What is the primary disadvantage of ripple counters?', a: 'Slower speed due to accumulated propagation delay and susceptibility to glitching during decoding.' }
      ]"""
content = re.sub(r"exp18: \{[\s\S]*?viva: \[[\s\S]*?\]\s*\}", lambda m: re.sub(r"viva: \[[\s\S]*?\]", viva_exp18.strip(), m.group(0)), content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

# Also write to root app.js
root_path = r'c:\Users\Pragati\Downloads\DLCO_Pin_to_Pin_Virtual_Trainer\app.js'
with open(root_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated both app.js files successfully!")
