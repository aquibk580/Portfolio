"use client";

import React, { useState, useEffect } from "react";
import { AdminPanelSideBar } from "./_components/AdminPanelSideBar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import Confetti from "react-confetti";
import { hideConfetti } from "@/redux/slices/ConfettiSlice";

interface windowTypes {
  width: number;
  height: number;
}

const AdminLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const confetti = useSelector((state: RootState) => state.confetti);
  const dispatch = useDispatch<AppDispatch>();

  const [windowSize, setWindowSize] = useState<windowTypes>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });

      const handleResize = () => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      };
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);
  
  useEffect(() => {
    if (confetti) {
      const timer = setTimeout(() => dispatch(hideConfetti()), 10000);
      return () => clearTimeout(timer);
    }
  }, [confetti, dispatch]);
  return (
    <>
      {confetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          numberOfPieces={200}
          gravity={0.1}
          wind={0.01}
        />
      )}
      <div className="bg-Mytheme min-h-screen flex flex-col">
        <header className="bg-Mytheme fixed top-0 left-0 right-0 z-10 shadow-lg">
          <div className="container mx-auto px-5 py-5 flex items-center justify-between">
            <div className="flex items-center">
              <AdminPanelSideBar />
            </div>
            <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
            <div className="w-10 sm:w-[35px]" aria-hidden="true"></div>
          </div>
        </header>
        <main className="flex-grow pt-20">{children}</main>
      </div>
    </>
  );
};

export default AdminLayout;
