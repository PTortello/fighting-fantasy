import { useState } from "react";
import {
  Container,
  Box,
  Paper,
  TextField,
} from "@mui/material";
import AttributeField from "components/AttributeField";
import Dice from "components/Dice";
import NumberStepper from "components/NumberStepper";
import type { IAttribute, ICharacter } from "interfaces/character";

function App() {
  const [dice, setDice] = useState<[number, number]>([1, 1]);
  const [rolling, setRolling] = useState(false);

  const [character, setCharacter] = useState<ICharacter>({
    skill: { current: 0, max: 0 },
    energy: { current: 0, max: 0 },
    luck: { current: 0, max: 0 },
    gold: 0,
    rations: 10,
    equipment: "espada, armadura de couro, lampião",
  });

  const roll2d6 = () => {
    if (rolling) return;
    setRolling(true);

    let rolls = 0;

    const interval = setInterval(() => {
      const r1 = Math.floor(Math.random() * 6) + 1;
      const r2 = Math.floor(Math.random() * 6) + 1;

      setDice([r1, r2]);
      rolls++;

      if (rolls > 10) {
        clearInterval(interval);
        setRolling(false);
      }
    }, 80);
  };

  const updateAttribute = (
    key: keyof ICharacter,
    field: "current" | "max",
    value: number
  ) => {
    setCharacter((prev) => {
      const attr = prev[key] as IAttribute;

      let newValue = value;

      if (field === "current") {
        newValue = Math.max(0, Math.min(value, attr.max));
      }

      if (field === "max") {
        newValue = Math.max(0, value);
      }

      const updatedAttr = {
        ...attr,
        [field]: newValue,
      };

      if (field === "max" && updatedAttr.current > newValue) {
        updatedAttr.current = newValue;
      }

      return { ...prev, [key]: updatedAttr };
    });
  };

  return (
    <Container maxWidth="sm" sx={{ py: 2 }}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={2}
        mb={2}
        onClick={roll2d6}
      >
        <Dice value={dice[0]} />
        <Dice value={dice[1]} />
      </Box>

      <Paper sx={{ p: 2, display: "flex", flexDirection: "column", gap: 3 }}>
        <AttributeField
          label="Habilidade"
          current={character.skill.current}
          max={character.skill.max}
          onChangeCurrent={(v) =>
            updateAttribute("skill", "current", v)
          }
          onChangeMax={(v) =>
            updateAttribute("skill", "max", v)
          }
        />

        <AttributeField
          label="Energia"
          current={character.energy.current}
          max={character.energy.max}
          onChangeCurrent={(v) =>
            updateAttribute("energy", "current", v)
          }
          onChangeMax={(v) =>
            updateAttribute("energy", "max", v)
          }
        />

        <AttributeField
          label="Sorte"
          current={character.luck.current}
          max={character.luck.max}
          onChangeCurrent={(v) =>
            updateAttribute("luck", "current", v)
          }
          onChangeMax={(v) =>
            updateAttribute("luck", "max", v)
          }
        />

        <Box display="flex" justifyContent="space-between">
          <NumberStepper
            label="Ouro"
            value={character.gold}
            min={0}
            onChange={(v) =>
              setCharacter({ ...character, gold: v })
            }
          />

          <NumberStepper
            label="Provisões"
            value={character.rations}
            min={0}
            onChange={(v) =>
              setCharacter({ ...character, rations: v })
            }
          />
        </Box>

        <TextField
          label="Equipamentos"
          multiline
          minRows={3}
          value={character.equipment}
          onChange={(e) =>
            setCharacter({
              ...character,
              equipment: e.target.value,
            })
          }
          fullWidth
        />
      </Paper>
    </Container>
  );
}

export default App;
