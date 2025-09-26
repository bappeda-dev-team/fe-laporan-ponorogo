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

export interface TimKerja{
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
