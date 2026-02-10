'use client'

import { Table } from "./comp/Table";
import { useGet } from "@/app/hooks/useGet";
import { TimGetResponse } from "@/types/tim";
import { useBrandingContext } from "@/provider/BrandingProvider";
import { useState, useEffect, useMemo } from "react";

const LaporanKinerjaKonker = () => {

  const [FetchTrigger, setFetchTrigger] = useState<number>(0);
  const { branding } = useBrandingContext();

  const bulan = branding?.bulan?.value ?? null;
  const tahun = branding?.tahun?.value ?? null;

  const isReady = Number.isInteger(bulan) && Number.isInteger(tahun);

  if (!isReady) {
    return <h1>Menyiapkan periode...</h1>;
  } else {
    return (
      <div className="flex flex-col p-2 mb-2 border-2 border-blue-500 rounded-lg">
        <Table />
      </div>
    )
  }
}

export default LaporanKinerjaKonker;
