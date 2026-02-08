'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

// 3. Logout yang Benar di Server
export async function logout(): Promise<void> {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("sessionId")?.value;

  if (sessionId) {
    // Panggil API logout jika diperlukan
    await fetch(`/auth/logout`, {
      method: "POST",
      credentials: "include",
      headers: { "X-Session-Id": sessionId }
    });
  }

  // Hapus cookie
  cookieStore.delete("timkerja-sessionId");
  cookieStore.delete("sessionId"); // Sesuai nama cookie di browser Anda

  // hapus localstorage
  localStorage.removeItem("timkerja-sessionId");

  // Navigasi di server menggunakan redirect
  redirect("/login");
}
