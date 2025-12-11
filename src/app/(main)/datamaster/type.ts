export interface GetResponseFindallPegawai {
    id: number;
    nip: string;
    namaPegawai: string;
    namaJabatan: string;
    kodeOpd: string;
    statusJabatan: string;
    jenisJabatan: string;
    eselon: string;
    pangkat: string;
    golongan: string;
    bacicTpp: number;
    tanggalMulai: string;
    tanggalAkhir: string | null;
    createdDate: string;
    lastModifiedDate: string;
}