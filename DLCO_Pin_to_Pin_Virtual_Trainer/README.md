# DLCO Virtual IC Trainer Kit Simulator

**An authentic, interactive Digital Logic & Computer Organization Virtual Trainer Kit with real pin-to-pin wiring, IC simulation, power rails, clock pulser, and output indicators.**

Designed and built to precisely match the hardware layout of the physical engineering college DLCO laboratory trainer kit.

---

## 🌟 Key Features

1. **Realistic Hardware Faceplate & Briefcase Enclosure**:
   - Styled after the real college trainer board photograph with wooden casing, top hinges, metallic screws, and industrial lab silkscreen labels.
   - Responsive and zoomable without wire distortion.

2. **6 Fixed IC Sockets (U1 to U6)**:
   - Sockets exist permanently on the board (U1–U5 standard DIP-16/20, U6 expansion DIP-28/40).
   - Real Zero Insertion Force (ZIF) sockets with locking levers.
   - Seating an IC shows the notch, part number, and dynamically labels all socket pin terminals with authentic pin numbers and functional pin names (e.g. `1: 1A`, `2: 1B`, `3: 1Y`, `7: GND`, `14: VCC`).
   - Clean IC ejection mechanism that safely removes all attached wires without ghost connections.

3. **Multiple Functional VCC & GND Terminals**:
   - **10 VCC (+5V) banana terminals** along the red top rail.
   - **10 GND (0V) banana terminals** along the green bottom rail.
   - **Meaningful Power Simulation**: ICs are NOT magically powered invisibly. Each IC requires its VCC and GND pins to be physically wired to the power rails. If power is missing, the IC is flagged as unpowered, outputs become High-Z (`Z`), and diagnostic alerts are logged.

4. **16 Input Logic Switches (S16 to S1)**:
   - Heavy-duty toggle switches with nickel levers, status LEDs (glowing red when HIGH), logic labels, and connection terminals `IP16` to `IP1`.
   - Floating/unconnected inputs do NOT silently become 0; they remain `Z` (undefined) with advisory warnings.

5. **16 Output LEDs (L16 to L1)**:
   - Output terminals `OP16` to `OP1` connected directly to domed LED lamps.
   - True digital states: ON for HIGH (1), OFF for LOW (0), and visual contention warning for bus conflicts.

6. **Sequential Clock & Manual Pulser**:
   - Manual single-pulse pushbutton (`PULSER`) with LED indicator and pulse counter.
   - Continuous variable-frequency clock (`0.2 Hz` to `5.0 Hz`) with RUN/STOP toggle and active `CLK` and `CLK̅` output terminals.

7. **Dual 7-Segment Displays & Logic Probe**:
   - Hex/BCD 7-Segment Displays A and B with BCD input jacks (`A3..A0`, `B3..B0`).
   - Logic Probe with `H` (Red) and `L` (Green) LED indicators and probe input terminal.

8. **Interactive SVG Patch Wires Engine**:
   - Click one terminal, then another to connect realistic curved patch wires.
   - Wire selection, wire deletion (via `Delete` / `Backspace` key), color-coded wires (auto VCC=red, GND=green, Clock=amber, Signal=blue), and wire clearing.

9. **Complete Curriculum of 19 Practical DLCO Experiments**:
   - Built-in Laboratory Reference Drawer covering all 19 engineering practicals with aims, pinouts, step-by-step wiring guides, truth tables, common mistakes, and viva questions.
   - One-click **"Setup ICs For This Lab"**, **"Auto-Wire Reference Circuit"**, and **"Check My Wiring & Truth Table"** verification engine.

10. **Real-Time Electrical Diagnostics**:
    - Continuously audits power integrity, floating inputs, bus contention, and short circuits.

---

## 📋 Supported TTL IC Models

| IC Part | Description | Package | Power Pins | Modeled Behavior |
| :--- | :--- | :--- | :--- | :--- |
| **7400** | Quad 2-Input NAND | 14-Pin DIP | VCC: 14, GND: 7 | 4 independent NAND gates; handles 'Z' floating inputs |
| **7404** | Hex Inverter (NOT) | 14-Pin DIP | VCC: 14, GND: 7 | 6 independent inverter gates |
| **7408** | Quad 2-Input AND | 14-Pin DIP | VCC: 14, GND: 7 | 4 independent AND gates |
| **7432** | Quad 2-Input OR | 14-Pin DIP | VCC: 14, GND: 7 | 4 independent OR gates |
| **7486** | Quad 2-Input XOR | 14-Pin DIP | VCC: 14, GND: 7 | 4 independent XOR gates |
| **74151** | 8:1 Multiplexer | 16-Pin DIP | VCC: 16, GND: 8 | 8 data inputs D0-D7, 3 select lines C/B/A, Strobe G̅, true Y & inverted W outputs |
| **7476** | Dual JK Flip-Flop | 16-Pin DIP | VCC: 5, GND: 13 | Negative-edge clock, J-K toggle/set/reset, active-low Preset & Clear |
| **7490** | BCD Decade Counter | 14-Pin DIP | VCC: 5, GND: 10 | Div-by-2 (CKA) and Div-by-5 (CKB), Master Reset (0000), Master Set (1001), full decade 0-9 sequence |

---

## 🔬 Supported 19 Laboratory Practicals

1. **Full Adder** (Sum & Carry using 7486 XOR, 7408 AND, 7432 OR)
2. **Full Subtractor** (Difference & Borrow using 7486, 7404, 7408, 7432)
3. **3-bit Binary to Gray Code Converter** (using 7486 XOR gates)
4. **4-bit Binary to Gray Code Converter** (using 7486 XOR gates)
5. **1-bit Magnitude Comparator** (A > B, A = B, A < B using 7404, 7408, 7486)
6. **Even Parity Generator and Checker** (using 7486 XOR gates)
7. **Odd Parity Generator and Checker** (using 7486 XOR and 7404 NOT)
8. **8-to-1 Multiplexer Verification** (using IC 74151)
9. **Boolean Function Realization: F(A,B,C) = Σm(0,3,5,6)** via IC 74151
10. **Boolean Function Realization: F(A,B,C,D) = Σm(1,2,4,7,8,10,11,13,15)** via IC 74151 and 7404
11. **2-bit Asynchronous Ripple Up Counter** (using IC 7476 Dual JK Flip-Flop)
12. **3-bit Asynchronous Ripple Up Counter** (counts 0 to 7 using two 7476 ICs)
13. **4-bit Asynchronous Ripple Up Counter** (MOD-16, counts 0 to 15 / 0 to F on 7-Segment)
14. **2-bit Asynchronous Ripple Down Counter** (using IC 7476)
15. **3-bit Asynchronous Ripple Down Counter** (counts 7 down to 0)
16. **4-bit Asynchronous Ripple Down Counter** (counts 15 down to 0)
17. **2-bit Asynchronous Ripple Up-Down Counter** (using steering logic)
18. **4-bit Asynchronous Ripple Up-Down Counter** (counts up/down)
19. **MOD-N Decade & Modulo-6 Counter using IC 7490** (BCD 0 to 9 & digital clock reset at 6)

---

## 🚀 How to Run the Project Locally

### Option A: Using VS Code Live Server (Recommended)
1. Extract the downloaded `DLCO_Virtual_Trainer_Kit.zip` folder.
2. Open the folder in **VS Code**: `File -> Open Folder...`.
3. If not already installed, install the **Live Server** extension (by Ritwick Dey) from the VS Code Extensions marketplace (`Ctrl+Shift+X`).
4. Right-click `index.html` in the file explorer and select **"Open with Live Server"** (or click **"Go Live"** in the bottom blue status bar).
5. The application will immediately launch in your default web browser (typically at `http://127.0.0.1:5500/index.html`).

### Option B: Using Python Local Server
1. Open PowerShell or Command Prompt in the project folder.
2. Run:
   ```bash
   python -m http.server 8080
   ```
3. Open your browser and navigate to: `http://localhost:8080/index.html`.

### Option C: Direct File Opening
1. Double click `index.html` to open directly in Google Chrome, Microsoft Edge, or Mozilla Firefox.

---

## 🔌 How to Operate the Virtual Trainer Board

### 1. Inserting an IC
- Click any empty green ZIF socket (`U1` to `U6`).
- An **IC Selector Modal** will open. Click any TTL chip (e.g. `7400 Quad NAND`, `7486 XOR`, `74151 MUX`, `7476 JK`, `7490 Counter`).
- The IC is seated into the socket. The socket pins will display their pin numbers and functional names (e.g. `1A`, `1B`, `1Y`, `VCC`, `GND`).

### 2. Powering the IC (VCC & GND)
- Click the IC's **VCC pin** (e.g., Pin 14 on 7400/04/08/32/86, Pin 16 on 74151, Pin 5 on 7476/7490).
- Click any red **VCC terminal** on the upper red power rail. A red wire will connect them.
- Click the IC's **GND pin** (e.g., Pin 7 on 7400/04/08/32/86, Pin 8 on 74151, Pin 13 on 7476, Pin 10 on 7490).
- Click any green **GND terminal** on the lower green power rail. A green wire will connect them.
- The socket header will immediately switch from `⚠ NO POWER` to `⚡ POWERED`.

### 3. Wiring Inputs & Outputs
- To connect a switch: Click an input terminal (e.g., `IP1` on Switch S1), then click an IC input pin (e.g., Pin 1 `1A`).
- To cascade gates: Click an IC output pin (e.g., Pin 3 `1Y`), then click another IC's input pin.
- To connect an output LED: Click an IC output pin, then click an output terminal (e.g., `OP1` on LED L1).

### 4. Operating Switches & Observing Signals
- Click any input toggle switch (`S1` to `S16`). The switch lever flips up/down, the status LED turns on/off, and the connected circuit re-evaluates in real time.
- The output LEDs (`L1` to `L16`) glow bright red for logic 1 and remain dark for logic 0.

### 5. Managing Wires
- **Wire Selection**: Click any wire directly. It will illuminate with a glowing dashed line.
- **Delete Wire**: Press `Delete` or `Backspace` on your keyboard, or click the **"Delete Wire"** button in the bottom status bar.
- **Cancel Connection**: Press `Escape` or click **"Cancel Wire"**.
- **Clear Wires**: Click the **"Clear Wires"** button in the top toolbar to remove all wires with confirmation.

### 6. Using the Clock & Pulser
- **Manual Pulser**: Click the blue round **"PUSH"** button. A clean falling-edge pulse (1 -> 0 -> 1) is generated on terminal `clk:pulse`, and the pulse counter increments.
- **Continuous Clock**: Click the **"RUN"** button. The clock toggles at the frequency set by the slider (`0.2 Hz` to `5.0 Hz`), blinking the clock LED and driving sequential circuits connected to `CLK` or `CLK̅`.

### 7. Conducting Lab Practicals
- Click **"📖 Lab Practicals & Viva (19 Experiments)"** in the top bar.
- Select your practical from the dropdown (e.g. *1. Full Adder*).
- Click **"⚡ Setup ICs For This Lab"** to auto-insert the necessary ICs into sockets.
- Follow the step-by-step wiring guide, or click **"🔌 Auto-Wire Reference Circuit"** to see the full working laboratory circuit.
- Click **"✓ Check My Wiring & Truth Table"** to verify your circuit against the expected truth table.
- Review the **Lab Viva Voce Questions & Answers** for lab exams.

---

## 🛠️ Verification & Test Suite

An automated test suite (`test_simulation.js`) verifies all components:
```bash
node test_simulation.js
```
**Results: 57 / 57 Tests Passed (100.0%)**
- 23 Gate Combinational & Floating-Input Tests
- 3 Multiplexer 74151 Logic & Select Routing Tests
- 5 Sequential 7476 Dual JK Flip-Flop State Tests
- 2 Sequential 7490 BCD Decade Counter State & Sequence Tests
- 20 Practical Schema & Verification Tests
- 4 End-to-End Netlist Circuit Solver Tests (Full Adder 8/8 truth table cases, VCC disconnect protection, 3-bit Binary-to-Gray code converter)

---

## 📁 Project Structure

```
DLCO_Pin_to_Pin_Virtual_Trainer/
├── index.html            # Main hardware trainer kit faceplate & interface
├── style.css             # Authentic physical lab instrument styling
├── app.js                # Core simulation, netlist solver & practicals database
├── test_simulation.js    # Automated unit and integration test suite
├── README.md             # Comprehensive user guide and documentation
├── README.txt            # Plain-text quickstart instructions
├── TEST_REPORT.md        # Detailed software testing & verification report
└── KNOWN_LIMITATIONS.md  # Engineering disclosures and electrical boundaries
```
