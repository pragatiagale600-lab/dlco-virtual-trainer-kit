with open('app.js', 'r', encoding='utf-8') as f:
    c = f.read()

target = """        } else {
          const prevQa = state.qa;
          // Divide by 2: negative edge on CKA
          if (state.lastCka === 1 && cka === 0) {
            state.qa = state.qa === 1 ? 0 : 1;
          }
          // Divide by 5: triggered on negative edge of CKB (or QA falling edge if cascaded)
          if (state.lastCkb === 1 && ckb === 0) {
            state.b5Count = (state.b5Count + 1) % 5;
          } else if (prevQa === 1 && state.qa === 0) {
            state.b5Count = (state.b5Count + 1) % 5;
          }
        }

        if (cka !== 'Z') state.lastCka = cka;
        if (ckb !== 'Z') state.lastCkb = ckb;"""

replacement = """        } else {
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
        }"""

if target in c:
    c = c.replace(target, replacement)
    print("Exact replacement successful")
else:
    import re
    c = re.sub(r"\} else \{[\s\S]*?if \(ckb !== 'Z'\) state\.lastCkb = ckb;", replacement.strip(), c)
    print("Regex replacement executed")

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(c)
with open('DLCO_Pin_to_Pin_Virtual_Trainer/app.js', 'w', encoding='utf-8') as f:
    f.write(c)
print("Files updated successfully")
