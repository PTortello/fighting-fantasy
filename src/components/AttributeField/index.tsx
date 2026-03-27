import { useRef } from "react";
import {
  Box,
  TextField,
  Typography,
  IconButton,
  LinearProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

interface IAttributeFieldProps {
  label: string;
  current: number;
  max: number;
  onChangeCurrent: (value: number) => void;
  onChangeMax?: (value: number) => void;
}

function AttributeField({
  label,
  current,
  max,
  onChangeCurrent,
  onChangeMax,
}: IAttributeFieldProps) {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const percentage = max > 0 ? (current / max) * 100 : 0;

  const getColor = () => {
    if (percentage > 60) return "success";
    if (percentage > 30) return "warning";
    return "error";
  };

  const handleChange = (delta: number) => {
    const newValue = current + delta;
    if (newValue >= 0 && newValue <= max) {
      onChangeCurrent(newValue);
    }
  };

  const startChanging = (delta: number) => {
    handleChange(delta);

    intervalRef.current = setInterval(() => {
      handleChange(delta);
    }, 150);
  };

  const stopChanging = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap={1}>
      <Typography variant="h6">{label}</Typography>

      <LinearProgress
        variant="determinate"
        value={percentage}
        color={getColor()}
        sx={{
          height: 10,
          borderRadius: 5,
          transition: "all 0.3s ease",
          ...(percentage <= 30 && {
            "& .MuiLinearProgress-bar": {
              animation: "pulse 1s infinite",
            },
          }),
          "@keyframes pulse": {
            "0%": { opacity: 1 },
            "50%": { opacity: 0.4 },
            "100%": { opacity: 1 },
          },
        }}
      />

      <Typography variant="caption">
        {current} / {max}
      </Typography>

      <Box display="flex" gap={1} alignItems="center">
        <IconButton
          onMouseDown={() => startChanging(-1)}
          onMouseUp={stopChanging}
          onMouseLeave={stopChanging}
          onTouchStart={() => startChanging(-1)}
          onTouchEnd={stopChanging}
          disabled={current === 0}
        >
          <RemoveIcon />
        </IconButton>

        <TextField
          label="Atual"
          type="number"
          value={current}
          onChange={(e) => onChangeCurrent(Number(e.target.value))}
          fullWidth
        />

        <IconButton
          onMouseDown={() => startChanging(1)}
          onMouseUp={stopChanging}
          onMouseLeave={stopChanging}
          onTouchStart={() => startChanging(1)}
          onTouchEnd={stopChanging}
          disabled={current >= max}
        >
          <AddIcon />
        </IconButton>

        <TextField
          label="Máximo"
          type="number"
          value={max}
          onChange={(e) => onChangeMax?.(Number(e.target.value))}
          fullWidth
        />
      </Box>
    </Box>
  );
}

export default AttributeField;
