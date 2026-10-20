# DLCO Virtual IC Trainer Kit — Known Limitations & Technical Disclosures

This document outlines the scope, modeling assumptions, and engineering boundaries of the DLCO Virtual IC Trainer Kit Simulator.

---

## 1. Electrical Simulation Scope

### 1.1 Digital Logic vs. Analog Spice Simulation
- The simulator is an **idealized digital logic netlist simulator with physical pin-level fidelity**, not an analog SPICE/transistor-level simulator.
- Logic levels are modeled using a 4-state digital system:
  - `1`: Valid TTL HIGH (nominal +5V)
  - `0`: Valid TTL LOW (nominal 0V)
  - `'Z'`: High-Impedance / Floating / Unconnected
  - `'CONFLICT'`: Bus Contention / Short Circuit
- Intermediate analog voltages (e.g. 1.8V undefined TTL threshold zone) and analog rise/fall transition waveforms are not computed.

### 1.2 Unconnected TTL Inputs
- In real physical 74LS series bipolar TTL circuits, an open/unconnected input typically floats to a weak HIGH state due to the internal pull-up resistor/emitter structure.
- However, for pedagogical and lab grading purposes, open inputs in this simulator are explicitly designated as **`'Z'` (Floating)** to alert students that an input was left unwired, rather than silently assuming it is LOW or HIGH.

### 1.3 Propagation Delay and Glitches
- Gate delays are evaluated instantaneously using a multi-pass topological relaxation solver (up to 25 iterations) to resolve combinational cascades, ripple adders, and parity trees.
- Nanosecond race-condition glitches (hazards) that occur in physical TTL ICs due to sub-nanosecond delay mismatches are not rendered as analog spikes.

---

## 2. Integrated Circuit Packages and Variants

### 2.1 Modeled IC Device Variants
The simulation engine models standard Low-Power Schottky (74LS) TTL specifications:
- **7400**: Quad 2-Input NAND Gate (14-pin PDIP)
- **7404**: Hex Inverter (14-pin PDIP)
- **7408**: Quad 2-Input AND Gate (14-pin PDIP)
- **7432**: Quad 2-Input OR Gate (14-pin PDIP)
- **7486**: Quad 2-Input XOR Gate (14-pin PDIP)
- **74151**: 8-Line to 1-Line Data Selector / Multiplexer (16-pin PDIP)
- **7476 / 74LS76A**: Dual J-K Flip-Flop with Preset & Clear (16-pin PDIP). Note: Negative edge-triggered per SN74LS76A specifications.
- **7490 / 74LS90**: Decade & Binary Counter (14-pin PDIP)

### 2.2 Sockets U1 to U6
- Sockets `U1` through `U5` feature standard 16/20-pin DIP configurations accommodating all 14-pin and 16-pin TTL chips.
- Socket `U6` is reserved for future expansion ICs (e.g. 28-pin / 40-pin microcontrollers or EPROMs).

---

## 3. Clock and Pulse Timing
- The manual pulser generates clean debounce-free pulses (single falling-edge transition). Real physical pushbuttons without Schmitt triggers suffer from contact bounce, which is omitted here to prevent student confusion.
- The continuous clock runs in the range of `0.2 Hz` to `5.0 Hz` to allow students to observe state transitions and counting visually on output LEDs and 7-segment displays. MHz/GHz high-frequency RF behavior is outside the educational scope of this bench trainer.
