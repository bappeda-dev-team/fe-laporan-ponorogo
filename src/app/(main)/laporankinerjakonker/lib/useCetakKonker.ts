"use client";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { KinerjaKonkerGetResponse, PohonKinerjaKonker, IndikatorRencanaKinerja, Pelaksanas, PetugasTims, RencanaKinerjaPelaksanas } from "@/types";
import { useBrandingContext } from "@/provider/BrandingProvider";

export function useCetakKonker(data: KinerjaKonkerGetResponse[], nama_tim: string, keterangan_tim: string) {
    const { branding } = useBrandingContext();
    const cetakPdf = () => {
        if (!data) return;

        const doc = new jsPDF({
            orientation: "landscape",
            unit: "mm",
            format: "a3",
        });

        doc.text(`Susunan Tim: ${nama_tim || ""} (${branding?.tahun?.value}) - ${keterangan_tim || ""}`, 14, 12);

        const body: any[] = [];

        data.map((item: KinerjaKonkerGetResponse, index: number) => {
            item.pohon_kinerja.map((pohon: PohonKinerjaKonker, pohonIndex: number) => {

                const indikatorText =
                    pohon.indikator && pohon.indikator.length > 0
                        ? pohon.indikator
                            .map((i: IndikatorRencanaKinerja, idx: number) =>
                                `${idx + 1}. ${i.nama_indikator}`
                            )
                            .join("\n")
                        : "-";

                const PelaksanaText =
                    pohon.pelaksanas && pohon.pelaksanas.length > 0
                        ? pohon.pelaksanas
                            .map((p: Pelaksanas, idx: number) =>
                                `${idx + 1}. ${p.nama_pelaksana} (${p.nip_pelaksana})`
                            )
                            .join("\n")
                        : "-";

                const PetugasText =
                    item.petugas_tims && item.petugas_tims.length > 0
                        ? item.petugas_tims
                            .map((p: PetugasTims, idx: number) =>
                                `${idx + 1}. ${p.nama_pegawai} (${p.pegawai_id})`
                            )
                            .join("\n")
                        : "-";


                const RekinText =
                    pohon.pelaksanas && pohon.pelaksanas.length > 0
                        ? pohon.pelaksanas
                            .map((p: Pelaksanas, idx: number) =>
                                p.rencana_kinerjas && p.rencana_kinerjas.length > 0 ? 
                                    p.rencana_kinerjas.map((r: RencanaKinerjaPelaksanas, p_index) => 
                                        `${idx + 1}. ${r.rencana_kinerja}`
                                    )
                                    .join("\n")
                            : "-"
                            )
                        : "-";

                body.push([
                    // Nomer
                    pohonIndex === 0
                        ? { content: index + 1, rowSpan: item.pohon_kinerja.length }
                        : { content: pohon.nama_opd, rowSpan: 0 },

                    // Program Unggulan
                    pohonIndex === 0
                        ? { content: item.program_unggulan, rowSpan: item.pohon_kinerja.length }
                        : { content: pohon.nama_pohon, rowSpan: 0 },

                    // OPD
                    pohonIndex === 0
                        ? { content: pohon.nama_opd, rowSpan: 0 }
                        : { content: indikatorText, rowSpan: 0 },

                    // Nama Pohon
                    pohonIndex === 0
                        ? { content: pohon.nama_pohon, rowSpan: 0 }
                        : { content: PelaksanaText, rowSpan: 0 },

                    // Indikator
                    pohonIndex === 0
                        ? { content: indikatorText, rowSpan: 0 }
                        : { content: PetugasText, rowSpan: 0 },

                    // Pelaksana
                    pohonIndex === 0
                        ? { content: PelaksanaText, rowSpan: 0 }
                        : { content: RekinText, rowSpan: 0 },

                    // Petugas Tim
                    pohonIndex === 0
                        ? { content: PetugasText, rowSpan: 0 }
                        : { content: "", rowSpan: 0 },

                    // Rencana Kinerja
                    pohonIndex === 0
                        ? { content: RekinText, rowSpan: 0 }
                        : { content: "", rowSpan: 0 },
                ]);
            });
        });

        autoTable(doc, {
            startY: 16,
            theme: "grid",
            head: [[
                "No",
                "Program Unggulan",
                "OPD",
                "Nama Pohon",
                "Indikator",
                "Pelaksana",
                "Petugas Tim",
                "Rencana Kinerja",
                // "Target",
                // "Satuan",
            ]],
            body,
            styles: {
                fontSize: 9,
                valign: "middle",
            },
            headStyles: {
                fillColor: [220, 220, 220],
                fontStyle: "bold",
            },
        });

        doc.save(`cetak-konker-${branding?.tahun?.value || 0}.pdf`);
    };

    return { cetakPdf };
}
