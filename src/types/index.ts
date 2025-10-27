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
  pohon_kinerja: PohonKinerjaKonker[];
}

export interface PohonKinerjaKonker {
  kode_program_unggulan: string;
  nama_program_unggulan: string;
  rencana_implementasi: string;
  id_tagging: number;
  id_pohon: number;
  tahun: number;
  nama_pohon: string;
  kode_opd: string;
  nama_opd: string;
  jenis_pohon: string;
  keterangan_tagging: string;
  status: string;
  pelaksanas: any | null; // Use a specific type if structure is known, otherwise 'any' or 'null'
  keterangan: string;
  indikator: IndikatorRencanaKinerja[];
}

export interface RencanaKinerjaGetResponse {
  id_rencana_kinerja: string;
  id_pohon: number;
  nama_rencana_kinerja: string;
  tahun: string;
  status_rencana_kinerja: string;
  catatan: string;
  operasional_daerah: OperasionalDaerah;
  pegawai_id: string;
  nama_pegawai: string;
  indikator: IndikatorRencanaKinerja[];
}
interface OperasionalDaerah {
  kode_opd: string;
  nama_opd: string;
}
export interface Target {
  id_target: string;
  indikator_id: string;
  target: string;
  satuan: string;
}
export interface SubKegiatanResponse {
  subkegiatanterpilih_id: string;
  id: string;
  rekin_id: string;
  kode_subkegiatan: string;
  nama_sub_kegiatan: string;
}
interface TimRencanaKinerja {
  id: number;
  kode_tim: string;
  id_rencana_kinerja: string;
  id_pegawai: string;
  rencana_kinerja: string;
  tahun: string;
  kode_opd: string;
  indikators: IndikatorRencanaKinerja[];
  subkegiatan: SubKegiatanResponse[];
}
export interface IndikatorRencanaKinerja {
  id_indikator: string;
  rencana_kinerja_id: string;
  nama_indikator: string;
  targets: Target[];
  manual_ik_exist: boolean;
}

export interface RencanaKinerjaSekretariatResponse {
  id: number;
  kode_tim: string;
  id_rencana_kinerja: string;
  id_pegawai: string;
  rencana_kinerja: string;
  tahun: string;
  kode_opd: string;
  indikators: IndikatorRencanaKinerja[];
  subkegiatan: SubKegiatanResponse[];
}
