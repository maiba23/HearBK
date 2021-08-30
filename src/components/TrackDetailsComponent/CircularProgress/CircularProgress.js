import React from "react";
import styles from "./circularProgress.style.scss";

function _Progress({
  progress = 0,
  total = 100,
  strokeWidth = 4,
  ballStrokeWidth = 16,
  reduction = 0.25,
  transitionDuration = 0.5,
  transitionTimingFunction = "ease",
  background = "#dde2e9",
  hideValue = false,
  subtitle = "",
  style,
  className,
  progressColor = "#FDD07A",
}) {
  let progressPercent = parseInt((progress * 100) / total);
  progressPercent = Math.round(progressPercent * 100) / 100;
  const width = 200;
  const center = width / 2;
  const height = 200 || center + center * Math.cos(reduction * Math.PI);
  const rotate = 270 + 180 * reduction;
  const r = center - strokeWidth / 2 - ballStrokeWidth / 2;
  const circumference = Math.PI * r * 2;
  const offset = (circumference * (100 - progressPercent * (1 - reduction))) / 100;

  const textOffset = progressPercent >= 100 ? 23 : progressPercent < 10 ? 19 : 21;

  return (
    <div className={`${className} ${styles.progress}`} style={style}>
      <svg viewBox={`0 0 ${width} ${height}`} className={styles.svg}>
        {subtitle && (
          <text fontSize="12" x={center} y={center - (13 * 3) / 4} textAnchor="middle" fill="#9c9c9c">
            {subtitle}
          </text>
        )}
        {!hideValue && (
          <text x={center - textOffset} y={center + (22 * 3) / 4} textAnchor="middle" fontSize="22" fill={progressColor}>
            {progress}
          </text>
        )}
        {!hideValue && (
          <text x={center + textOffset} y={center + (22 * 3) / 4} textAnchor="middle" fontSize="22" fill="#FFFFFF">
            / {total}
          </text>
        )}
        <circle
          transform={`rotate(${rotate} ${center} ${center})`}
          id="path"
          cx={center}
          cy={center}
          r={r}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference * reduction}
          fill="none"
          stroke={background}
          strokeLinecap="round"
        ></circle>
        <circle
          style={{ transition: `stroke-dashoffset ${transitionDuration}s ${transitionTimingFunction}` }}
          transform={`rotate(${rotate} ${center} ${center})`}
          id="path"
          cx={center}
          cy={center}
          r={r}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference}`}
          strokeDashoffset={offset}
          fill="none"
          stroke={progressColor}
          strokeLinecap="round"
        ></circle>
      </svg>
    </div>
  );
}

export const Progress = React.memo(_Progress);

// This code is taken from
// https://github.com/coupez/react-circle-progress-bar/tree/master/src/lib
// and refractored as per UI

export default Progress;
