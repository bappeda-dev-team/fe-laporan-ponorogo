export interface TimGetResponse {
    id: number;
    is_sekretariat: boolean;
    kode_tim: string;
    nama_tim: string;
    keterangan: string;
    susunan_tims: AnggotaGetResponse[];
}

export interface AnggotaGetResponse {
    id: number;
    nip: string;
    nama_jabatan: string;
    nama_pegawai: string;
    level_jabatan: number;
    keterangan: string;
    is_active: boolean
}
export interface JabatanGetResponse {
    id: number;
    level_jabatan: number;
    nama_jabatan: string;
    created_at: string;
    updated_at: string
}
export interface PegawaiGetResponse {
    id: string;
    namaPegawai: string;
    nip: string;
    kodeOpd: string;
    namaOpd: string
    namaJabatan: string;
    statusJabatan: string;
    jenisJabatan: string;
    eselon: string;
    pangkat: string
    golongan: string;
    namaRole: string;
    isActive: boolean;
    tanggalMulai: Date;
    tanggalBerakhir: Date;
}