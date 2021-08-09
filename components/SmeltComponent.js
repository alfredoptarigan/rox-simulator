import React from "react";

export default function SmeltComponent(props) {
  return (
    <>
      <label htmlFor="total-material" className="font-medium">
        Total Material Diperlukan
      </label>
      <div className="grid grid-cols-2 gap-4 mb-3">
        <div className="font-medium">15 Muspellium</div>
        <div className="font-medium">2 Arcane Flower</div>
      </div>
      <label htmlFor="jumlah-stamina-dihabiskan" className="font-medium">
        Jumlah Stamina Dihabiskan
      </label>
      <p className="mb-3">150 Stamina</p>
      <label htmlFor="material-didapatkan" className="font-medium">
        Material Didapatkan
      </label>
      <p className="mb-3">50 Enchancment Stone</p>
      <label htmlFor="material-didapatkan" className="font-medium">
        Sisa Stamina
      </label>
      <p className="mb-3">10 Stamina</p>
      <a className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded">
        Reset Simulation
      </a>
    </>
  );
}
