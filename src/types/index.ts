export interface OptionTypeString {
  value: string;
  label: string;
}
export interface OptionType {
  value: number;
  label: string;
}
export interface SusunanTim {
  id: number;
  is_active: boolean;
  keterangan: string;
  level_jabatan: number;
  nama_jabatan: string;
  nip: string;
}

export interface TimKerja {
  id: number;
  kode_tim: string;
  nama_tim: string;
  susunan_tims: SusunanTim[];
  status: string;
}

export interface ApiResp<T> {
  code: number;
  data: T[];
}
export interface OpdGetResponse {
  id: string;
  kode_opd: string;
  nama_opd: string;
  singkatan: string;
  alamat: string;
  telepon: string;
  fax: string;
  email: string;
  website: string;
  nama_kepala_opd: string;
  nip_kepala_opd: string;
  pangkat_kepala: string;
  id_lembaga: {
    id: string;
    kode_lembaga: string;
    nama_lembaga: string;
    is_active: boolean;
  }
}
export interface ProgramUnggulanGetResponse {
  id: number;
  kode_program_unggulan: string;
  nama_program_unggulan: string;
  rencana_implementasi: string;
  keterangan: string;
  tahun_awal: string;
  tahun_akhir: string;
  is_active: boolean;
}
export interface KinerjaKonkerGetResponse {
  id: number;
  kode_tim: string;
  id_program_unggulan: number;
  program_unggulan: string;
  tahun: string;
  kode_opd: string;
}