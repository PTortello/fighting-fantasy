import { Box } from "@mui/material";

interface IDiceProps {
  value: number; // 1 a 6
  size?: number;
}

const pipPositions: Record<number, [number, number][]> = {
  1: [[50, 50]],
  2: [
    [25, 25],
    [75, 75],
  ],
  3: [
    [25, 25],
    [50, 50],
    [75, 75],
  ],
  4: [
    [25, 25],
    [75, 25],
    [25, 75],
    [75, 75],
  ],
  5: [
    [25, 25],
    [75, 25],
    [50, 50],
    [25, 75],
    [75, 75],
  ],
  6: [
    [25, 25],
    [75, 25],
    [25, 50],
    [75, 50],
    [25, 75],
    [75, 75],
  ],
};

function Dice({ value, size = 32 }: IDiceProps) {
  return (
    <Box
      sx={{
        width: size,
        height: size,
        backgroundColor: "#fff",
        borderRadius: 2,
        border: "2px solid #333",
        position: "relative",
      }}
    >
      {pipPositions[value]?.map(([x, y], i) => (
        <Box
          key={i}
          sx={{
            width: size * 0.15,
            height: size * 0.15,
            backgroundColor: "#333",
            borderRadius: "50%",
            position: "absolute",
            top: `${y}%`,
            left: `${x}%`,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
    </Box>
  );
}

export default Dice;
