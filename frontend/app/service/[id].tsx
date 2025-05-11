import React, { useState } from "react";

const services = {
  haircut: [
    {
      title: "Vip Svhee",
      description: "tom hvn 50 hvvhed 35 shvv bros ???!!!",
      price: "50,000₮",
      duration: "40 мин",
    },
    {
      title: "Заалны засалт",
      description: "насны ангилалаар үнэ өөр өөр байна",
      price: "35,000₮",
      duration: "45 мин",
    },
    {
      title: "Vip Доржоо",
      description: "2024 Солонгос Монголын хамтарсан...",
      price: "40,000₮",
      duration: "40 мин",
    },
    {
      title: "Vip Эрхмээ",
      description: "2024 оны Солонгос Монголын хам...",
      price: "40,000₮",
      duration: "40 мин",
    },
    {
      title: "Vip Bek",
      description: "2k24 оны шилдэг барбер",
      price: "40,000₮",
      duration: "40 мин",
    },
    {
      title: "Vip Өгөөдэй",
      description: "2024 Солонгос Монголын хамтарсан...",
      price: "40,000₮",
      duration: "40 мин",
    },
  ],
  coloring: [
    {
      title: "Эмэгтэй үс тайралт будаг",
      description: "Үсийг гэмтээхгүйгээр өнгө гаргалт...",
      price: "45,000₮",
      duration: "45 мин",
    },
  ],
};

export default function HairServices() {
  const [activeTab, setActiveTab] = useState("haircut");

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-xl font-semibold mb-4 text-center">Үйлчилгээ</h1>
      <div className="flex justify-center mb-4 space-x-4">
        <button
          className={`px-4 py-2 rounded-full ${
            activeTab === "haircut" ? "bg-green-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("haircut")}
        >
          Үс засалт
        </button>
        <button
          className={`px-4 py-2 rounded-full ${
            activeTab === "coloring" ? "bg-green-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("coloring")}
        >
          Үс будалт
        </button>
      </div>

      <div className="space-y-4">
        {services[activeTab].map((item, index) => (
          <div
            key={index}
            className="bg-white shadow rounded-xl p-4 flex justify-between items-center"
          >
            <div>
              <h2 className="font-semibold">{item.title}</h2>
              <p className="text-sm text-gray-500 truncate">{item.description}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold">{item.price}</p>
              <p className="text-sm text-gray-400">{item.duration}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
