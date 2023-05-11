import { LinearProgress } from "@mui/material";
import React, { useState, useEffect } from "react";
export default function LinearProgressUI(props) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = 1 * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 365);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      <LinearProgress
        color={props.color}
        variant="determinate"
        value={progress}
      />
    </>
  );
}
