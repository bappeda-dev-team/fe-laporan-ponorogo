'use client'

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { logout } from "@/lib/auth"
import { usePathname } from "next/navigation";
import { TbUsersGroup, TbFileSettings, TbAlertTriangle, TbDeviceAnalytics, TbDeviceImacDollar, TbLogout } from "react-icons/tb";

interface OptionType {
  label: string;
  value: number;
}
interface OptionTypeString {
  label: string;
  value: string;
}

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState<number>(0);
  const [visible, setVisible] = useState<boolean>(true);
  const [KinerjaMobileMenu, setKinerjaMobileMenu] = useState<boolean>(false);

  const [showManriskKinerjaDropdown, setShowManriskKinerjaDropdown] = useState<boolean>(false);
  const [Tahun, setTahun] = useState<OptionType | null>(null);

  const [SelectedOpd, setSelectedOpd] = useState<OptionTypeString | null>(null);

  const [Nip, setNip] = useState<string>("");
  const url = usePathname();
  const logo = process.env.NEXT_PUBLIC_LOGO_URL || "";

  //handle header scroll animation 
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isVisible = prevScrollPos > currentScrollPos;

      setPrevScrollPos(currentScrollPos);
      setVisible(isVisible);
      setShowManriskKinerjaDropdown(false);
    };
    window.addEventListener('scroll', handleScroll);

    // Close mobile menu when URL changes
    setIsMobileMenuOpen(false);

    // Clean up the event listener
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos, url]);

  // handle close menu kinerja w/ esc button
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowManriskKinerjaDropdown(false);
        setIsMobileMenuOpen(false);
      }
    };

    // Tambahkan event listener saat komponen di-mount
    document.addEventListener('keydown', handleEscapeKey);

    // Hapus event listener saat komponen di-unmount (cleanup)
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  const getActiveClass = (isActive: boolean, type = 'default') => {
    const activeClasses = "text-white bg-sky-500";
    let defaultClasses = "hover:text-white text-sky-500 hover:bg-sky-700";

    if (type === 'default') {
      defaultClasses += " border border-sky-500";
    } else if (type === 'dropdown') {
      defaultClasses += " border border-sky-300";
    }

    return isActive ? activeClasses : defaultClasses;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setShowManriskKinerjaDropdown(false);
  };

  return (
    <nav className={`inset-x-1 m-1 ml-2 bg-white border border-sky-200 shadow-lg shadow-slate-400 rounded-xl fixed left-0 top-0 z-50 transition duration-300 ${visible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="mx-auto flex justify-between gap-5 items-center px-4 py-3">
        <div className="flex justify-start gap-5">
          <Link href="/">
            <Image
              src={logo || "/placeholder-logo.png"}
              alt="logo"
              width={40}
              height={40}
            />
          </Link>
          <ul className="hidden lg:flex space-x-2 items-center">
            <Link
              href='/susunantim'
              className={`flex items-center gap-1 font-medium rounded-lg cursor-pointer py-1 px-5 ${getActiveClass(
                url.startsWith('/susunantim'), 'default'
              )}`}
            >
              <TbUsersGroup />
              Susunan Tim
            </Link>
            <Link
              href='/laporankinerjakonker'
              className={`flex items-center gap-1 font-medium rounded-lg cursor-pointer py-1 px-5 ${getActiveClass(
                url.startsWith('/laporankinerjakonker'), 'default'
              )}`}
            >
              <TbDeviceAnalytics />
              Laporan Kinerja Konker
            </Link>
            <Link
              href='/laporankinerjasekretariat'
              className={`flex items-center gap-1 font-medium rounded-lg cursor-pointer py-1 px-5 ${getActiveClass(
                url.startsWith('/laporankinerjasekretariat'), 'default'
              )}`}
            >
              <TbDeviceAnalytics />
              Laporan Kinerja Sekretariat
            </Link>
            <Link
              href='/penilaiankinerjatim'
              className={`flex items-center gap-1 font-medium rounded-lg cursor-pointer py-1 px-5 ${getActiveClass(
                url.startsWith('/penilaiankinerjatim'), 'default'
              )}`}
            >
              <TbFileSettings />
              Penilaian Kinerja Tim
            </Link>
            <Link
              href='/laporantpp'
              className={`flex items-center gap-1 font-medium rounded-lg cursor-pointer py-1 px-5 ${getActiveClass(
                url.startsWith('/laporantpp'), 'default'
              )}`}
            >
              <TbDeviceImacDollar />
              Laporan TPP Konker
            </Link>
          </ul>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={logout}
            className="flex items-center text-white shadow gap-1 font-medium border-1 bg-red-700 rounded-lg cursor-pointer py-1 px-5 hover:bg-gray-100"
          >
            <TbLogout />
            Logout
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden">
          <button
            onClick={toggleMobileMenu}
            className={`focus:outline-none cursor-pointer rounded-lg p-1 border border-sky-500 text-sky-500 hover:text-sky-500 hover:bg-white`}
          >
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Content */}
      <div className={`lg:hidden rounded-lg border border-gray-300 bg-white py-2 mt-1 absolute top-full left-0 w-full shadow-md transition ease-in-out duration-300 ${isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}>
        <ul className="flex flex-col items-center space-y-2 mx-2">
          <Link
            href='/susunantim'
            className={`w-full flex items-center justify-center gap-1 font-bold rounded-lg cursor-pointer py-1 px-5 ${getActiveClass(
              url.startsWith('/susunantim')
            )}`}
          >
            <TbAlertTriangle />
            Susunan Tim
          </Link>
          <Link
            href='/penilaiankinerjatim'
            className={`w-full flex items-center justify-center gap-1 font-bold rounded-lg cursor-pointer py-1 px-5 ${getActiveClass(
              url.startsWith('/penilaiankinerjatim')
            )}`}
          >
            <TbDeviceAnalytics />
            Penilaian Kinerja Tim
          </Link>
          <Link
            href='/laporankinerja'
            className={`w-full flex items-center justify-center gap-1 font-bold rounded-lg cursor-pointer py-1 px-5 ${getActiveClass(
              url.startsWith('/laporankinerja')
            )}`}
          >
            <TbDeviceAnalytics />
            Laporan Kinerja Konker
          </Link>
        </ul>
      </div>
    </nav>
  );
};
