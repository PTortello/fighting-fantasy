import { Box, IconButton, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

interface INumberStepperProps {
  label: string;
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  width?: number;
}

function NumberStepper({
  label,
  value,
  min = 0,
  max = 99,
  onChange,
  width = 90,
}: INumberStepperProps) {
  const handleChange = (delta: number) => {
    const newValue = Math.max(min, Math.min(value + delta, max));
    onChange(newValue);
  };

  return (
    <Box display="flex" alignItems="center" gap={1.5}>
      <TextField
        label={label}
        type="number"
        value={value}
        onChange={(e) => {
          const v = Number(e.target.value);
          onChange(Math.max(min, Math.min(v, max)));
        }}
        sx={{
          width,
          "& .MuiInputBase-root": {
            height: 42,
          },
        }}
        slotProps={{
          htmlInput: {
            style: { textAlign: "center", padding: "8px" },
          },
        }}
      />

      <Box display="flex" flexDirection="column" gap={0.5}>
        <IconButton
          size="small"
          onClick={() => handleChange(1)}
          disabled={value >= max}
          sx={{ backgroundColor: "rgba(0,0,0,0.05)" }}
        >
          <AddIcon fontSize="small" />
        </IconButton>

        <IconButton
          size="small"
          onClick={() => handleChange(-1)}
          disabled={value <= min}
          sx={{ backgroundColor: "rgba(0,0,0,0.05)" }}
        >
          <RemoveIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
}

export default NumberStepper;
