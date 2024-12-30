"use client"

import { Tablero } from "@/components/tablero4";
import useWindowDimensions from "@/components/useWindowDimensions";

export default function Home() {
  const { height, width } = useWindowDimensions();

  return (
    <>
      <div className="text-2xl text-center absolute">
        width: {width} ~ height: {height}
      </div>
      <Tablero width={width} height={height} />
    </>
  );
}
