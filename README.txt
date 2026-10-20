================================================================================
DLCO VIRTUAL IC TRAINER KIT SIMULATOR — QUICKSTART GUIDE
Digital Logic & Computer Organization Practical Laboratory Instrument
================================================================================

HOW TO RUN THE APPLICATION:
1. Extract the downloaded ZIP archive (DLCO_Virtual_Trainer_Kit.zip).
2. Open the extracted folder in VS Code: File -> Open Folder.
3. Install the "Live Server" extension in VS Code if you don't already have it.
4. Right-click index.html and select "Open with Live Server" (or click "Go Live" at the bottom right).
5. The virtual trainer board will open in your default browser.
   (Alternatively, double-click index.html or run "python -m http.server 8080").

HOW TO OPERATE THE TRAINER BOARD:
1. INSERTING AN IC:
   - Click any empty green ZIF socket (U1 to U6).
   - In the IC Selector Modal, select an IC (7400, 7404, 7408, 7432, 7486, 74151, 7476, 7490).
   - The chip will seat into the socket with its pin numbers and functional pin names.

2. CONNECTING POWER (VCC & GND):
   - Click the IC's VCC pin (Pin 14 for 7400/04/08/32/86, Pin 16 for 74151, Pin 5 for 7476/7490).
   - Click any red VCC terminal (+5V) along the top red rail.
   - Click the IC's GND pin (Pin 7 for 7400/04/08/32/86, Pin 8 for 74151, Pin 13 for 7476, Pin 10 for 7490).
   - Click any green GND terminal (0V) along the bottom green rail.
   - The socket status will turn to "POWERED". (Unpowered ICs will NOT simulate).

3. WIRING SIGNALS:
   - Click an input switch terminal (IP1 to IP16).
   - Click the destination IC input pin. A wire is drawn.
   - Connect IC outputs to other IC inputs, or to output LED terminals (OP1 to OP16).
   - Click a wire to select it; press Delete or Backspace to remove it.

4. INPUT SWITCHES & OUTPUT LEDS:
   - Click any switch lever (S1 to S16) to toggle between logic 0 (DOWN) and logic 1 (UP).
   - Output LEDs (L1 to L16) glow red when driven HIGH (1) by the circuit.

5. CLOCK & PULSER FOR SEQUENTIAL CIRCUITS:
   - Press the round blue "PUSH" button for single clean clock pulses.
   - Or click "RUN" for continuous clocking (speed adjustable from 0.2 Hz to 5.0 Hz).

6. 19 DLCO PRACTICALS & VIVA HELPER:
   - Click the top button: "Lab Practicals & Viva (19 Experiments)".
   - Select any practical to view the aim, components, step-by-step wiring guide,
     truth table, common mistakes, and viva questions.
   - Click "Setup ICs For This Lab" to insert the required chips automatically.
   - Click "Auto-Wire Reference Circuit" to test the fully wired reference circuit.
   - Click "Check My Wiring & Truth Table" to verify your manual circuit.

AUTOMATED TEST SUITE:
Run: node test_simulation.js (100% tests passing).
================================================================================
