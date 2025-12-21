"use client";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useBrandingContext } from "@/provider/BrandingProvider";
import { PenilaianGroupedResponse, PenilaianTimResponse } from "@/types/penilaian_tpp";
import { formatRupiah } from "@/app/hooks/formatRupiah";

export function useCetakTpp(data: PenilaianTimResponse, nama_tim: string, keterangan_tim: string) {
    const { branding } = useBrandingContext();
    const cetakPdf = () => {
        if (!data) return;

        const doc = new jsPDF({
            orientation: "landscape",
            unit: "mm",
            format: "a3",
        });

        doc.text(`TPP Konker: ${nama_tim || ""} (${branding?.tahun?.value}) - ${keterangan_tim || ""}`, 14, 12);

        const body: any[] = [];
        
        data.penilaian_kinerjas.map((item: PenilaianGroupedResponse, index: number) => {
            const pajak = Number(item.tpp_pegawai?.pajak);
            body.push([
                // Nomer
                index + 1,

                // Nama NIP
                { content: `${item.nama_pegawai} (${item.id_pegawai})` },

                // Pangkat Golongan Jabatan
                { content: `${item.pangkat || "no pangkat"} -  ${item.golongan || "no golongan"} - ${item.nama_jabatan_tim || "no jabatan tim"}` },

                // Jabatan Dalam Tim
                item.nama_jabatan_tim,

                // Basic TPP Konker
                { content: `Rp.${item.tpp_basic || 0}` },

                // Nilai Kinerja Bappeda
                { content: `${item.kinerja_bappeda || 0}` },

                // Nilai Kinerja Tim
                { content: `${item.kinerja_tim || 0}` },

                // Nilai Kinerja Person
                { content: `${item.kinerja_person || 0}` },

                // Nilai Akhir
                { content: `${item.nilai_akhir || 0}` },

                // Persentase Penerimaan
                { content: `${item.persentase_penerimaan || "-"}` },

                // Jumlah Kotor
                { content: `Rp.${formatRupiah(item.tpp_pegawai?.jumlah_kotor) || 0}` },

                // Pajak
                { content: `${Number.isFinite(pajak) ? `${pajak * 100}%` : "-"}` },

                // Jumlah Pajak
                { content: `Rp.${formatRupiah(item.tpp_pegawai?.jumlah_pajak) || 0}` },

                // POT BPJS
                { content: `Rp.${formatRupiah(item.tpp_pegawai?.potongan_bpjs) || 0}` },

                // Jumlah Bersih
                { content: `Rp.${formatRupiah(item.tpp_pegawai?.jumlah_bersih) || 0}` },
            ]);
        });

        const Head1 = [
            "No",
            "Nama/NIP",
            "Pangkat/Golongan/Jabatan",
            "Jabatan Dalam Tim",
            "Basic TPP Konker",
            "Nilai Kinerja Bappeda",
            "Nilai Kinerja Tim",
            "Nilai Kinerja Person",
            "Nilai Akhir",
            "Persentase Penerimaan",
            "Jumlah Kotor",
            "Pajak",
            "Jumlah Pajak",
            "POT BPJS(1%)",
            "Jumlah Bersih",
        ]
        const Head2 = Head1.map((_, idx) => `${idx + 1}`);

        autoTable(doc, {
            startY: 16,
            theme: "grid",
            head: [Head1, Head2],
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

        doc.save(`TPP-Konker-${nama_tim}-${branding?.tahun?.value || 0}-${keterangan_tim}.pdf`);
    };

    return { cetakPdf };
}
