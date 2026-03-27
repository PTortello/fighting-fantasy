import { Box, Typography, LinearProgress } from "@mui/material";
import NumberStepper from "components/NumberStepper";

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
  const percentage = max > 0 ? (current / max) * 100 : 0;

  const getColor = () => {
    if (percentage > 60) return "success";
    if (percentage > 30) return "warning";
    return "error";
  };

  return (
    <Box display="flex" flexDirection="column" gap={0.5}>
      <Box display="flex" alignItems="center" gap={1}>
        <Typography variant="subtitle1" sx={{ minWidth: 80, fontWeight: 600 }}>
          {label}
        </Typography>

        <LinearProgress
          variant="determinate"
          value={percentage}
          color={getColor()}
          sx={{
            flex: 1,
            height: 6,
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
      </Box>

      <Box display="flex" justifyContent="space-between" gap={1}>
        <NumberStepper
          label="Máximo"
          value={max}
          min={0}
          onChange={(v) => onChangeMax?.(v)}
        />
        <NumberStepper
          label="Atual"
          value={current}
          min={0}
          max={max}
          onChange={onChangeCurrent}
        />
      </Box>
    </Box>
  );
}

export default AttributeField;
