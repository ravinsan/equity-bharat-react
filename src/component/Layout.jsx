import React from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { MyRoute } from "./MyRoute";

export const Layout = () => {
  return (
    <>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <MyRoute />
        </div>
      </div>
    </>
  );
};
