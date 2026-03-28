import { useEffect, useState } from "react";
import {
  Container,
  Box,
  Paper,
  TextField,
  Dialog,
  DialogContent,
  IconButton as MuiIconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CastleIcon from "@mui/icons-material/Castle";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import AttributeField from "components/AttributeField";
import Dice from "components/Dice";
import NumberStepper from "components/NumberStepper";
import type { IAttribute, ICharacter } from "interfaces/character";
import { DEFAULT_CHARACTER } from "constants/character";
import type { IMonster } from "interfaces/monster";

const STORAGE_KEYS = {
  character: "ff-character",
  monsters: "ff-monsters",
};

function App() {
  const [dice, setDice] = useState<[number, number]>([1, 1]);
  const [rolling, setRolling] = useState(false);
  const [openMonsters, setOpenMonsters] = useState(false);
  const [character, setCharacter] = useState<ICharacter>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.character);
    return saved
      ? { ...DEFAULT_CHARACTER, ...JSON.parse(saved) }
      : DEFAULT_CHARACTER;
  });

  const [monsters, setMonsters] = useState<IMonster[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.monsters);
    return saved ? JSON.parse(saved) : [{ skill: 0, energy: 0 }];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.character, JSON.stringify(character));
  }, [character]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.monsters, JSON.stringify(monsters));
  }, [monsters]);

  const addMonster = () => {
    setMonsters((prev) => [...prev, { skill: 0, energy: 0 }]);
  };

  const removeMonster = (index: number) => {
    setMonsters((prev) => prev.filter((_, i) => i !== index));
  };

  const updateMonster = (
    index: number,
    field: "skill" | "energy",
    value: number
  ) => {
    setMonsters((prev) =>
      prev.map((m, i) =>
        i === index ? { ...m, [field]: value } : m
      )
    );
  };

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
      <MuiIconButton
        onClick={() => setOpenMonsters(true)}
        sx={{ position: "absolute", right: 8, top: 8 }}
      >
        <CastleIcon />
      </MuiIconButton>

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
      <Dialog
        open={openMonsters}
        onClose={() => setOpenMonsters(false)}
        fullScreen
        sx={{
          "& .MuiDialog-container": {
            alignItems: "flex-end",
          },
        }}
        slotProps={{
          paper: {
            sx: {
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              p: 1,
              maxHeight: "70vh",
            },
          },
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" px={1}>
          Monstros
          <MuiIconButton onClick={() => setOpenMonsters(false)}>
            <CloseIcon />
          </MuiIconButton>
        </Box>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 1, p: 1, pt: 0 }}>
          <Box
            sx={{
              width: 40,
              height: 4,
              backgroundColor: "rgba(255,255,255,0.3)",
              borderRadius: 2,
              alignSelf: "center",
              mb: 1,
            }}
          />
          {monsters.map((monster, index) => (
            <Box
              key={index}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              gap={1}
            >
              <Box display="flex" justifyContent="space-around" flex={1} gap={1}>
                <NumberStepper
                  label="Habilidade"
                  value={monster.skill}
                  min={0}
                  onChange={(v) =>
                    updateMonster(index, "skill", v)
                  }
                  width={100}
                />

                <NumberStepper
                  label="Energia"
                  value={monster.energy}
                  min={0}
                  onChange={(v) =>
                    updateMonster(index, "energy", v)
                  }
                  width={100}
                />
              </Box>
              <MuiIconButton
                onClick={() => removeMonster(index)}
                disabled={monsters.length === 1}
              >
                <DeleteIcon />
              </MuiIconButton>
            </Box>
          ))}
          <Box display="flex" justifyContent="center">
            <MuiIconButton onClick={addMonster}>
              <AddIcon />
            </MuiIconButton>
          </Box>
        </DialogContent>
      </Dialog>
    </Container>
  );
}

export default App;
