# RimbaCamp

Prototipe aplikasi penyewaan alat camping berbahasa Indonesia untuk customer dan
admin toko. Repository Figma Make ini menggunakan **React 19 + Vite + Tailwind
CSS v4** sesuai scaffold dan server preview yang tersedia.

## Yang dapat dicoba di preview

- Landing page lengkap, pencarian tanggal, katalog, filter kategori, dan pencarian.
- Detail produk dan indikator stok.
- Wizard booking lima langkah: tanggal, identitas, slot, pembayaran, dan sukses.
- Simulasi hold pembayaran 15 menit serta ringkasan harga.
- Halaman Pesanan Saya dengan jadwal dan timeline status.
- Dashboard admin dengan statistik, grafik, daftar tindakan, dan navigasi modul.
- Tampilan responsif dengan bottom navigation untuk ponsel.

Data dan transaksi pada preview masih berupa state lokal agar aplikasi dapat
berjalan di lingkungan Vite Figma Make tanpa layanan eksternal.

## Menjalankan proyek

Server pengembangan Figma Make sudah berjalan otomatis. Untuk instalasi lokal:

```bash
pnpm install
pnpm dev
```

Build produksi:

```bash
pnpm build
```

## Fondasi backend

`prisma/schema.prisma` memodelkan:

- Auth customer/admin yang kompatibel dengan adapter NextAuth.
- Produk, kategori, foto privat, dan blok stok perawatan.
- Booking, item, status, audit status, dan hold pembayaran.
- Data identitas terenkripsi dan storage key privat.
- Aturan serta kuota slot pengambilan.
- Transaksi Midtrans dan event webhook idempoten.

Salin `.env.example` menjadi `.env` saat backend Next.js/PostgreSQL sudah
disiapkan. Jangan pernah memasukkan `.env` atau kunci produksi ke Git.

## Aturan ketersediaan untuk implementasi server

Untuk setiap produk dan setiap hari pada rentang sewa:

```text
tersedia =
  totalStock
  - SUM(qty booking BOOKED/PICKED_UP yang overlap)
  - SUM(qty PENDING_PAYMENT dengan holdExpiresAt > now() yang overlap)
  - SUM(qty StockBlock yang overlap)
```

Jumlah yang dapat disewa adalah nilai minimum `tersedia` dari seluruh tanggal
yang dipilih. Pembuatan booking harus dilakukan dalam transaction PostgreSQL
dengan row lock produk terkait, lalu validasi stok dan slot diulang di dalam
transaction sebelum menulis booking.

## Persyaratan backend produksi

Sebelum dipakai dengan transaksi nyata:

1. Migrasikan shell Vite ini ke Next.js App Router atau pasang API terpisah.
2. Tambahkan Prisma Client dan migrasi PostgreSQL dari skema yang tersedia.
3. Implementasikan NextAuth (Google/email customer, credentials admin).
4. Simpan foto identitas ke bucket privat; akses admin harus melalui signed URL
   berumur pendek. Enkripsi nomor identitas dengan AES-256-GCM.
5. Buat transaksi Midtrans Snap di server. Verifikasi `signature_key` webhook,
   simpan event dengan unique key, dan proses secara idempoten.
6. Jalankan job expiry untuk booking pending yang melewati `holdExpiresAt`.
7. Gunakan zona waktu `Asia/Jakarta`, validasi semua input di server, dan audit
   setiap perubahan status.

Integrasi di atas sengaja tidak disimulasikan sebagai backend palsu di browser:
secret Midtrans, password, identitas, dan keputusan stok wajib diproses server.
