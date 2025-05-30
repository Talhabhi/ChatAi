import { stringToColor } from "@/lib/stringToColor";
import { motion } from "framer-motion";

function FollowPointer({
  x,
  y,
  info,
}: {
  x: number;
  y: number;
  info: {
    email: string;
    name: string;
    avatar: string;
  };
}) {
  const color = stringToColor(info.email || "1");
  return (
    <motion.div
      className="h-4 w-4 rounded-full bg-blue-500 absolute z-50 pointer-events-none"
      style={{
        top: y,
        left: x,
        pointerEvents: "none",
      }}
      initial={{ scale: 1, opacity: 2 }}
      animate={{
        scale: 1,
        opacity: 2,
      }}
      exit={{
        scale: 0,
        opacity: 0,
      }}
    >
      <svg
        stroke={color}
        fill={color}
        strokeWidth="1"
        viewBox="0 0 16 16"
        className={`h-6 w-6 text-[${color}] transform -rotate-[70deg] -translate-x-[1.25rem] -translate-y-[1px] stroke-[${color}]`}
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M14.882 2.182a.5 0 0 1 .183.557L8.528 15.467a.5 0 0 1-.917-.007L5.457a.5 0 0 1 .044-.547L9.728 8.378a.5 0 0 0-.238-.682z" />
      </svg>
      <motion.div> 
        {info?.name || info.email}
      </motion.div>
    </motion.div>
  );
}

export default FollowPointer;