import { useState, useEffect } from "react";
import Head from "next/head";

const materialSmelting = [
  {
    id: "secret_enchancement_stone",
    name: "Secret Enchancement Stone",
    type: "Enchance Accessory",
    staminaCost: 10,
    "material-needed": [
      {
        name: "Muspellium Lv 1",
        quantity: 15,
      },
      {
        name: "Arcane Flower",
        quantity: 2,
      },
    ],
  },
  {
    id: "toughening_enchancement_stone",
    name: "Toughening Enchancement Stone",
    type: "Enchance Armor",
    staminaCost: 10,
    "material-needed": [
      {
        name: "Muspellium Lv 1",
        quantity: 15,
      },
      {
        name: "Tough Vine",
        quantity: 2,
      },
    ],
  },
];

function SmeltingComponent(props) {
  const smelting = materialSmelting.find(
    (items) => items.id === props.material
  );

  let notification = "";
  let sisa = "";

  const jumlahStaminaDihabiskan =
    props.stamina - props.jumlahSmelt * smelting.staminaCost;

  if (jumlahStaminaDihabiskan < 0) {
    notification = <p className="mb-3">Stamina tidak mencukupi</p>;
  } else if (jumlahStaminaDihabiskan == 0) {
    notification = <p className="mb-3">Stamnina Habis</p>;
    sisa = 0;
  } else {
    notification = <p className="mb-3">{jumlahStaminaDihabiskan}</p>;
    sisa = props.stamina - jumlahStaminaDihabiskan;
  }
  return (
    <div>
      <label htmlFor="total-material" className="font-medium"></label>
      <div className="grid grid-cols-2 gap-4 mb-3">
        {smelting["material-needed"].map((item, i) => (
          <div key={i}>
            <div className="font-medium">
              {item.quantity * props.jumlahSmelt} {item.name}
            </div>
          </div>
        ))}
      </div>
      <label htmlFor="jumlah-stamina-dihabiskan" className="font-medium">
        Jumlah Stamina Dihabiskan
      </label>
      {notification}
      <label htmlFor="material-didapatkan" className="font-medium">
        Material Didapatkan
      </label>
      <p className="mb-3">
        {props.jumlahSmelt} {smelting.name}
      </p>
      <label htmlFor="material-didapatkan" className="font-medium">
        Sisa Stamina
      </label>
      <p className="mb-3">{sisa} Stamina</p>
    </div>
  );
}

export default function Home() {
  const [stamina, setStamina] = useState(0);
  const [material, setMaterial] = useState();
  const [jumlahSmelt, setJumlahSmelt] = useState(0);

  function resetSimulation() {
    setStamina(0);
    setJumlahSmelt(0);
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Smelting Simulator Ragnarok X Generations</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <img src="/logo.png" alt="Ragnarok X Logo" width={250} className="mb-5" />
      <h1 className="text-2xl mb-5 font-medium">
        Ragnarok X Smelting Simulator (Unofficial)
      </h1>
      <div className="border border-sky-600 w-96 p-5">
        <label htmlFor="stamina" className="font-medium ">
          Stamina
        </label>
        <input
          type="number"
          id="stamina"
          className="w-full rounded border border-teal-500 hover:border-teal-600 outline-none mb-3"
          onChange={(e) => setStamina(e.target.value)}
        />
        <label htmlFor="material" className="font-medium ">
          Material Smelting
        </label>
        <select
          name="material-smelting"
          id="material"
          className="w-full outline-none border border-teal-500 rounded mb-3"
          onChange={(e) => setMaterial(e.target.value)}
        >
          {materialSmelting.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        <label htmlFor="total" className="font-medium">
          Jumlah Smelting
        </label>
        <input
          type="number"
          id="smelt"
          className="w-full rounded border border-teal-500 hover:border-teal-600 outline-none mb-3"
          onChange={(e) => setJumlahSmelt(e.target.value)}
        />

        {material !== undefined && jumlahSmelt >= 0 && (
          <>
            <SmeltingComponent
              material={material}
              stamina={stamina}
              jumlahSmelt={jumlahSmelt}
            />
            <a
              onClick={resetSimulation}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
            >
              Reset Simulation
            </a>
          </>
        )}
      </div>
    </div>
  );
}
