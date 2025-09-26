export interface TimGetResponse {
    id: number,
    kode_tim: string,
    nama_tim: string,
    susunan_tims: AnggotaGetResponse[];
}

export interface AnggotaGetResponse {
    id: number,
    nip: string,
    nama_jabatan: string,
    level_jabatan: number,
    keterangan: string,
    is_active: boolean
}
