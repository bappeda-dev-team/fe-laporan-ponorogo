"use client";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useBrandingContext } from "@/provider/BrandingProvider";
import { PenilaianKinerjas } from "../type";
import { formatRupiah } from "@/app/hooks/formatRupiah";

export function useCetakPenilaianPerson(
    data: PenilaianKinerjas,
) {
    const { branding } = useBrandingContext();
    // console.log("tanggal :", tanggal);
    const cetakPdfPerson = () => {
        if (!data) return;

        const doc = new jsPDF({
            orientation: "landscape",
            unit: "mm",
            format: "a3",
        });

        const pageWidth = doc.internal.pageSize.getWidth();

        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);

        doc.text(
            "LAPORAN KINERJA TPP KONDISI KERJA",
            pageWidth / 2,
            12,
            { align: "center" }
        );

        doc.setFontSize(14);
        doc.text(
            `BULAN ${(branding?.bulan?.label)?.toUpperCase() || ""}`,
            pageWidth / 2,
            18,
            { align: "center" }
        );

        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        doc.text(
            `NAMA                                       : ${data.nama_pegawai || "-"}`,
            14,
            34,
        );
        doc.text(
            `NIP                                           : ${data.id_pegawai || "-"}`,
            14,
            40,
        );
        doc.text(
            `JABATAN DALAM DINAS       : ${data.jenis_jabatan || "-"}`,
            14,
            46,
        );
        doc.text(
            `JABATAN DALAM TIM            : ${data.nama_jabatan_tim || "-"}`,
            14,
            52,
        );

        doc.setFontSize(11);
        doc.text(
            `Telah melakukan analisa faktor pendorong dan penghambat atas pelaksanaan program prioritas daerah sebagai berikut :`,
            14,
            60,
        );

        const handleHeadTable = (jabatan: string) => {
            if (jabatan === "Penanggung Jawab" || jabatan === "Koordinator") {
                return (
                    [
                        "No",
                        "Program Prioritas Daerah",
                        "Rencana Kinerja Operational",
                        "Indikator",
                        "Target",
                        "Satuan",
                        "Sub Kegiatan",
                        "Pagu Anggaran",
                        "Realisasi Anggaran",
                        "Rencana Aksi",
                        "Faktor Pendorong",
                        "Faktor Penghambat",
                        "Risiko Hukum",
                        "Rekomendasi Rencana Tindak Lanjut",
                    ]
                )
            } else if(jabatan === "Sekretaris Tim Monev Pembangunan") {
                return (
                    [
                        "No",
                        "Program Prioritas Daerah",
                        "Rencana Kinerja Operational",
                        "Indikator",
                        "Target",
                        "Satuan",
                        "Sub Kegiatan",
                        "Pagu Anggaran",
                        "Realisasi Anggaran",
                        "Rencana Aksi",
                        "Faktor Pendorong",
                        "Faktor Penghambat",
                        "Risiko Hukum",
                        "Rekomendasi Rencana Tindak Lanjut",
                    ]
                )
            } else if(jabatan === "Ketua Tim" || jabatan === "Ketua Tim 1" || jabatan === "Ketua Tim 2" || jabatan === "Ketua Tim 3") {
                return (
                    [
                        "No",
                        "Program Prioritas Daerah",
                        "Rencana Kinerja Operational",
                        "Indikator",
                        "Target",
                        "Satuan",
                        "Sub Kegiatan",
                        "Pagu Anggaran",
                        "Realisasi Anggaran",
                        "Rencana Aksi",
                        "Faktor Pendorong",
                        "Faktor Penghambat",
                    ]
                )
            } else if(jabatan === "Anggota") {
                return (
                    [
                        "No",
                        "Program Prioritas Daerah",
                        "Rencana Kinerja Operational",
                        "Indikator",
                        "Target",
                        "Satuan",
                        "Sub Kegiatan",
                        "Pagu Anggaran",
                        "Realisasi Anggaran",
                        "Rencana Aksi",
                    ]
                )
            } else {
                return (
                    [
                        "No",
                        "Program Prioritas Daerah",
                        "Rencana Kinerja Operational",
                        "Indikator",
                        "Target",
                        "Satuan",
                        "Sub Kegiatan",
                        "Pagu Anggaran",
                        "Realisasi Anggaran",
                        "Rencana Aksi",
                        "Faktor Pendorong",
                        "Faktor Penghambat",
                        "Risiko Hukum",
                        "Rekomendasi",
                    ]
                )
            }
        }

        const body: any[] = [];
        body.push([
            // No
            1,

            // Program Prioritas Daerah
            { content: `Program Priorotas Daerah` },

            // Rencana Kinerja Operational
            { content: `Rencana Kinerja Operational` },
            
            // Indikator
            { content: `Indikator` },
            
            // Target
            { content: `Target` },

            // Satuan
            { content: `Satuan` },

            // Sub Kegiatan
            { content: `Sub Kegiatan` },

            // Pagu Anggaran
            { content: `Pagu Anggaran` },

            // Realisasi Anggaran
            { content: `Realisasi Anggaran` },

            // Rencana Aksi
            { content: `Rencana Aksi` },

            // Faktor Pendorong
            { content: `Faktor Pendorong` },

            // Faktor Penghambat
            { content: `Faktor Penghambat` },

            // Risiko Hukum
            { content: `Risiko Hukum` },

            // Rekomendasi Tindak Lanjut
            { content: `Rekomendasi Tindak Lanjut` },

        ]);

        const Head1 = handleHeadTable(data.jenis_jabatan);
        const Head2 = Head1.map((_, idx) => `${idx + 1}`);

        autoTable(doc, {
            startY: 68,
            theme: "grid",
            head: [Head1, Head2],
            body,
            styles: {
                fontSize: 9,
                valign: "middle",
                lineWidth: 0.1,
                lineColor: [0, 0, 0],
            },
            headStyles: {
                fillColor: [41, 128, 185], // biru
                textColor: [255, 255, 255], // putih
                fontStyle: "bold",
                halign: "center",
                lineWidth: 0.1,
                lineColor: [0, 0, 0],
            },
        });

        doc.save(`laporan-kinerja-tpp-kondisi-kerja-${data.nama_pegawai || "tanpa nama"}-${branding?.bulan?.label}-${branding?.tahun?.value || 0}.pdf`);
    };

    return { cetakPdfPerson };
}
