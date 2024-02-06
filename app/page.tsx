"use client";

import { animate, motion, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  let [duration, setDuration] = useState(0.8); // max of 10
  let [bounce, setBounce] = useState(0.25); // [0, 1]

  let [damping, setDamping] = useState(10); // 0 is infinite
  let [mass, setMass] = useState(1);
  let [stiffness, setStiffness] = useState(100);

  let [left, setLeft] = useState(1);
  let x = useMotionValue(-100);

  useInterval(() => {
    setLeft(-1 * left);
    x.stop();
    // animate(x, left * 100, { type: "spring", bounce });
    animate(x, left * 100, { type: "spring", damping, mass, stiffness });
  }, 1250);

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center">
      <motion.div
        style={{ x }}
        transition={{ type: "spring", bounce, repeat: Infinity }}
        className="size-10 rounded-full bg-sky-500"
      />

      <div className="mt-10">
        {/* <p>Bounce: {bounce}</p>
        <input
          min={0}
          max={1}
          step={0.1}
          value={bounce}
          onChange={(e) => setBounce(+e.target.value)}
          type="range"
        /> */}
        <p>Damping: {damping}</p>
        <input
          min={0}
          max={40}
          value={damping}
          onChange={(e) => setDamping(+e.target.value)}
          type="range"
        />
        <p>Mass: {mass}</p>
        <input
          min={0.1}
          max={5}
          step={0.1}
          value={mass}
          onChange={(e) => setMass(+e.target.value)}
          type="range"
        />
        <p>Stiffness: {stiffness}</p>
        <input
          min={10}
          max={1000}
          step={10}
          value={stiffness}
          onChange={(e) => setStiffness(+e.target.value)}
          type="range"
        />
      </div>

      <div className="mt-10 flex flex-wrap gap-2">
        <button
          className="rounded border-t border-gray-600 bg-gray-700 px-3 py-1 font-medium"
          onClick={() => {
            setMass(1);
            setDamping(20);
            setStiffness(170);
          }}
        >
          Standard
        </button>
        <button
          className="rounded border-t border-gray-600 bg-gray-700 px-3 py-1 font-medium"
          onClick={() => {
            setMass(2);
            setDamping(15);
            setStiffness(100);
          }}
        >
          Gentle
        </button>
        <button
          className="rounded border-t border-gray-600 bg-gray-700 px-3 py-1 font-medium"
          onClick={() => {
            setMass(0.5);
            setDamping(25);
            setStiffness(300);
          }}
        >
          Quick
        </button>
        <button
          className="rounded border-t border-gray-600 bg-gray-700 px-3 py-1 font-medium"
          onClick={() => {
            setMass(1);
            setDamping(12);
            setStiffness(150);
          }}
        >
          Soft bounce
        </button>
        <button
          className="rounded border-t border-gray-600 bg-gray-700 px-3 py-1 font-medium"
          onClick={() => {
            setMass(2);
            setDamping(10);
            setStiffness(60);
          }}
        >
          Lazy Drift
        </button>
        <button
          className="rounded border-t border-gray-600 bg-gray-700 px-3 py-1 font-medium"
          onClick={() => {
            setMass(0.5);
            setDamping(20);
            setStiffness(500);
          }}
        >
          Springy pop
        </button>
        <button
          className="rounded border-t border-gray-600 bg-gray-700 px-3 py-1 font-medium"
          onClick={() => {
            setMass(1);
            setDamping(25);
            setStiffness(120);
          }}
        >
          Gentle ease
        </button>
        <button
          className="rounded border-t border-gray-600 bg-gray-700 px-3 py-1 font-medium"
          onClick={() => {
            setMass(1);
            setDamping(20);
            setStiffness(300);
          }}
        >
          Critical damping
        </button>
        <button
          className="rounded border-t border-gray-600 bg-gray-700 px-3 py-1 font-medium"
          onClick={() => {
            setMass(3);
            setDamping(26);
            setStiffness(80);
          }}
        >
          Molasses flow
        </button>
        <button
          className="rounded border-t border-gray-600 bg-gray-700 px-3 py-1 font-medium"
          onClick={() => {
            setMass(0.3);
            setDamping(8);
            setStiffness(200);
          }}
        >
          Rubber band snap
        </button>
        <button
          className="rounded border-t border-gray-600 bg-gray-700 px-3 py-1 font-medium"
          onClick={() => {
            setMass(1);
            setDamping(30);
            setStiffness(400);
          }}
        >
          Precision stop
        </button>
      </div>
    </div>
  );
}

function useInterval(callback: () => void, delay: number) {
  const intervalRef = useRef(null);
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => savedCallback.current();
    if (typeof delay === "number") {
      intervalRef.current = window.setInterval(tick, delay);
      return () => window.clearInterval(intervalRef.current);
    }
  }, [delay]);
  return intervalRef;
}
