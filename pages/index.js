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
      <a
        href="https://github.com/alfredoptarigan/rox-simulator"
        class="mb-3"
        target="_blank"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      </a>
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
