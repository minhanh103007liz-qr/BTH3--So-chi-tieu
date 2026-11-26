import { useClock } from "../hooks/useClock";

export default function Clock() {
  const now = useClock();
  return <span className="clock">{now.toLocaleTimeString("vi-VN")}</span>;
}
