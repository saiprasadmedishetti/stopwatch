import { useEffect, useRef, useState } from "react";

type CircleProps = {
  height?: number;
  width?: number;
  duration?: number;
  isPlay?: boolean;
  onComplete?: () => void;
};

export default function Circle({
  height = 400,
  width = 400,
  duration = 60,
  isPlay = true,
  onComplete,
}: CircleProps) {
  const [timer, setTimer] = useState(duration);
  const [stroke, setStroke] = useState({
    dashArray: "",
    dashOffset: "",
  });
  const circleRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    setTimer(duration);
    setStroke({
      dashArray: "",
      dashOffset: "",
    });
  }, [duration]);

  useEffect(() => {
    const diff = 1 - timer / duration;

    if (!circleRef.current || !diff) return;

    setStroke((prev) => ({
      ...prev,
      dashOffset: +prev.dashArray * diff + "",
    }));

    if (timer === 0) {
      onComplete?.();
    }
  }, [duration, timer, onComplete]);

  useEffect(() => {
    setStroke((prev) => ({
      ...prev,
      dashArray:
        2 * Math.PI * +circleRef.current!.r.baseVal.value.toString() + "",
    }));
    let timerId: number;
    if (isPlay) {
      timerId = setInterval(() => {
        setTimer((prevTimer) => (prevTimer === 0 ? 0 : prevTimer - 1));
      }, 1000);
    } else {
      clearInterval(timerId!);
    }

    return () => {
      clearInterval(timerId);
    };
  }, [isPlay]);

  return (
    <svg height={height} width={width} viewBox="0 0 24 24">
      <circle
        ref={circleRef}
        cx="12"
        cy="12"
        r="10"
        strokeWidth="1.3"
        className="stroke-green-500 transition-[stroke-dashoffset] duration-2 ease-linear"
        strokeDasharray={stroke.dashArray}
        strokeDashoffset={stroke.dashOffset}
        // style={{
        //   transition: "stroke-dashoffset 0.2s linear",
        // }}
      />
      <text
        x="12"
        y="12"
        r="10"
        textAnchor="middle"
        dominantBaseline="middle"
        dy="1"
        fontSize="10"
        fontWeight="900"
        className="fill-green-500"
      >
        {timer}
      </text>
    </svg>
  );
}
