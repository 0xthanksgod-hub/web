import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Calendar,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  ClipboardCheck,
  Clock3,
  Copy,
  Flame,
  Headphones,
  Heart,
  Home,
  LayoutDashboard,
  MapPin,
  Menu,
  MessageCircle,
  Minus,
  Package,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  ShoppingBag,
  Star,
  Store,
  TentTree,
  TrendingUp,
  UploadCloud,
  UserRound,
  Users,
  Warehouse,
  X,
} from "lucide-react";

type View = "beranda" | "katalog" | "pesanan" | "admin";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;
  popular?: boolean;
  description: string;
  specs: string[];
};

const products: Product[] = [
  {
    id: 1,
    name: "Tenda Summit Pro 4P",
    category: "Tenda",
    price: 85000,
    stock: 2,
    image:
      "https://images.unsplash.com/photo-1602079108581-4c5071154299?auto=format&fit=crop&w=900&q=85",
    popular: true,
    description:
      "Tenda double layer yang lega, tahan hujan, dan mudah dipasang untuk perjalanan keluarga atau kelompok kecil.",
    specs: ["4 orang", "3,8 kg", "Double layer"],
  },
  {
    id: 2,
    name: "Carrier Alpine 60L",
    category: "Carrier",
    price: 55000,
    stock: 5,
    image:
      "https://images.unsplash.com/photo-1592388748465-8c4dca8dd703?auto=format&fit=crop&w=900&q=85",
    popular: true,
    description:
      "Carrier ergonomis dengan rain cover, bantalan punggung berventilasi, dan kompartemen lengkap.",
    specs: ["60 liter", "1,9 kg", "Rain cover"],
  },
  {
    id: 3,
    name: "Sleeping Bag Polar",
    category: "Sleeping Bag",
    price: 35000,
    stock: 8,
    image:
      "https://images.unsplash.com/photo-1558477280-1bfed08ea5db?auto=format&fit=crop&w=900&q=85",
    description:
      "Sleeping bag hangat dan ringan untuk suhu pegunungan hingga 8°C dengan bahan yang lembut.",
    specs: ["Comfort 8°C", "900 gram", "Polyester"],
  },
  {
    id: 4,
    name: "Paket Masak Trail",
    category: "Kompor",
    price: 40000,
    stock: 1,
    image:
      "https://images.unsplash.com/photo-1596055746427-d5f61aa5df99?auto=format&fit=crop&w=900&q=85",
    description:
      "Set kompor portable dan nesting yang praktis untuk memasak makanan hangat di perjalanan.",
    specs: ["2–3 orang", "650 gram", "Piezo ignition"],
  },
];

const rupiah = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);

const navItems: { label: string; value: View }[] = [
  { label: "Beranda", value: "beranda" },
  { label: "Katalog", value: "katalog" },
  { label: "Pesanan Saya", value: "pesanan" },
];

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <div className="brand">
      <span className="brand-mark">
        <TentTree size={compact ? 20 : 24} strokeWidth={2.2} />
      </span>
      <span>
        <strong>Rimba</strong>Camp
      </span>
    </div>
  );
}

function Header({
  view,
  setView,
}: {
  view: View;
  setView: (view: View) => void;
}) {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <button className="brand-button" onClick={() => setView("beranda")}>
          <Brand />
        </button>
        <nav className="desktop-nav" aria-label="Navigasi utama">
          {navItems.map((item) => (
            <button
              key={item.value}
              className={view === item.value ? "active" : ""}
              onClick={() => setView(item.value)}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="header-actions">
          <button className="admin-link" onClick={() => setView("admin")}>
            <LayoutDashboard size={18} />
            Admin
          </button>
          <button className="profile-button" aria-label="Akun saya">
            <UserRound size={19} />
          </button>
        </div>
      </div>
    </header>
  );
}

function DateSearch({ onSearch }: { onSearch: () => void }) {
  return (
    <div className="date-search">
      <div className="date-field">
        <CalendarDays size={21} />
        <div>
          <label htmlFor="mulai">Mulai sewa</label>
          <input id="mulai" type="date" defaultValue="2025-08-15" />
        </div>
      </div>
      <div className="search-divider" />
      <div className="date-field">
        <CalendarDays size={21} />
        <div>
          <label htmlFor="selesai">Selesai sewa</label>
          <input id="selesai" type="date" defaultValue="2025-08-17" />
        </div>
      </div>
      <button className="primary-button search-button" onClick={onSearch}>
        <Search size={19} />
        Cek Ketersediaan
      </button>
    </div>
  );
}

function ProductCard({
  product,
  onBook,
  onDetail,
}: {
  product: Product;
  onBook: (product: Product) => void;
  onDetail: (product: Product) => void;
}) {
  return (
    <article className="product-card">
      <button className="product-image-wrap" onClick={() => onDetail(product)}>
        <img src={product.image} alt={product.name} />
        {product.popular && (
          <span className="popular-badge">
            <Flame size={14} fill="currentColor" />
            Populer
          </span>
        )}
        <span className="heart-button">
          <Heart size={18} />
        </span>
      </button>
      <div className="product-content">
        <div className="stock-row">
          <span className={`stock-dot ${product.stock <= 2 ? "low" : ""}`} />
          {product.stock <= 2
            ? `Tinggal ${product.stock} unit`
            : `${product.stock} unit tersedia`}
        </div>
        <button className="product-title" onClick={() => onDetail(product)}>
          {product.name}
        </button>
        <span className="category-label">{product.category}</span>
        <div className="product-footer">
          <div>
            <strong>{rupiah(product.price)}</strong>
            <span>/hari</span>
          </div>
          <button className="rent-button" onClick={() => onBook(product)}>
            Sewa
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </article>
  );
}

function Landing({
  setView,
  onBook,
  onDetail,
}: {
  setView: (view: View) => void;
  onBook: (product: Product) => void;
  onDetail: (product: Product) => void;
}) {
  const [faq, setFaq] = useState(0);
  const steps = [
    [Search, "Pilih alat", "Cari perlengkapan sesuai kebutuhan petualanganmu."],
    [Calendar, "Pilih tanggal", "Tentukan tanggal sewa dan cek stok langsung."],
    [ShieldCheck, "Isi data", "Lengkapi data dan foto identitas dengan aman."],
    [CircleDollarSign, "Bayar", "Bayar praktis lewat QRIS, VA, atau e-wallet."],
    [ShoppingBag, "Ambil di toko", "Tunjukkan kode booking dan identitas asli."],
  ] as const;
  const faqs = [
    [
      "Apa saja syarat untuk menyewa alat?",
      "Cukup siapkan identitas aktif, nomor WhatsApp, dan bawa kartu identitas asli saat pengambilan.",
    ],
    [
      "Apakah bisa membatalkan pesanan?",
      "Bisa. Hubungi tim kami paling lambat 2 hari sebelum tanggal sewa untuk bantuan pembatalan.",
    ],
    [
      "Bagaimana jika alat rusak saat dipakai?",
      "Jangan khawatir, segera kabari kami. Tim akan memeriksa dan menjelaskan penanganannya secara transparan.",
    ],
  ];

  return (
    <>
      <main>
        <section className="hero">
          <div className="hero-overlay" />
          <div className="container hero-content">
            <span className="eyebrow light">
              <Star size={16} fill="currentColor" />
              Dipercaya 2.000+ petualang
            </span>
            <h1>
              Sewa alat camping,
              <br />
              <em>tinggal berangkat.</em>
            </h1>
            <p>
              Perlengkapan bersih, terawat, dan siap menemani ceritamu di alam.
              Tanpa ribet, tanpa harus beli.
            </p>
            <DateSearch onSearch={() => setView("katalog")} />
            <div className="hero-trust">
              <span>
                <BadgeCheck size={18} /> Alat terjamin bersih
              </span>
              <span>
                <Clock3 size={18} /> Booking dalam 5 menit
              </span>
              <span>
                <Headphones size={18} /> Bantuan setiap hari
              </span>
            </div>
          </div>
        </section>

        <section className="trust-strip">
          <div className="container trust-grid">
            <div>
              <strong>2.000+</strong>
              <span>Petualang senang</span>
            </div>
            <div>
              <strong>4,9</strong>
              <span>
                <Star size={14} fill="currentColor" /> dari 580 ulasan
              </span>
            </div>
            <div>
              <strong>80+</strong>
              <span>Pilihan alat</span>
            </div>
            <div>
              <strong>100%</strong>
              <span>Bersih & terawat</span>
            </div>
          </div>
        </section>

        <section className="section products-section">
          <div className="container">
            <div className="section-heading">
              <div>
                <span className="eyebrow">Favorit petualang</span>
                <h2>Perlengkapan paling sering disewa</h2>
                <p>Andalan para pendaki, sudah dicek dan siap dipakai.</p>
              </div>
              <button className="text-button" onClick={() => setView("katalog")}>
                Lihat semua alat <ArrowRight size={18} />
              </button>
            </div>
            <div className="product-grid">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onBook={onBook}
                  onDetail={onDetail}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="section how-section">
          <div className="container">
            <div className="center-heading">
              <span className="eyebrow">Gampang, kok</span>
              <h2>Lima langkah, lalu siap berpetualang</h2>
              <p>Kami bikin proses sewa sesederhana merencanakan tujuanmu.</p>
            </div>
            <div className="steps">
              {steps.map(([Icon, title, copy], index) => (
                <div className="step" key={title}>
                  <div className="step-icon">
                    <Icon size={25} />
                    <span>{index + 1}</span>
                  </div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                  {index < steps.length - 1 && (
                    <ChevronRight className="step-arrow" size={20} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section benefit-section">
          <div className="container benefit-grid">
            <div className="benefit-image">
              <img
                src="https://images.unsplash.com/photo-1613758084438-1f89889b2ce7?auto=format&fit=crop&w=1200&q=85"
                alt="Tenda di area camping yang hijau"
              />
              <div className="review-float">
                <div className="avatar-stack">
                  <span>DA</span>
                  <span>RN</span>
                  <span>FA</span>
                </div>
                <div>
                  <strong>580+ ulasan</strong>
                  <span>Rata-rata 4,9 dari 5</span>
                </div>
              </div>
            </div>
            <div className="benefit-copy">
              <span className="eyebrow">Lebih tenang di perjalanan</span>
              <h2>Bukan sekadar sewa alat. Kami jaga pengalamanmu.</h2>
              <p>
                Setiap barang melewati pemeriksaan menyeluruh setelah kembali
                dan sebelum berangkat lagi.
              </p>
              <div className="benefit-list">
                {[
                  ["Dicuci & disanitasi", "Peralatan selalu bersih dan segar."],
                  ["Dicek sebelum berangkat", "Fungsi dan kelengkapan terjamin."],
                  ["Bantuan yang responsif", "Ada teman bertanya saat dibutuhkan."],
                ].map(([title, copy]) => (
                  <div key={title}>
                    <span className="check-icon">
                      <Check size={18} />
                    </span>
                    <p>
                      <strong>{title}</strong>
                      <span>{copy}</span>
                    </p>
                  </div>
                ))}
              </div>
              <button className="secondary-button" onClick={() => setView("katalog")}>
                Mulai pilih alat <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </section>

        <section className="section location-section">
          <div className="container location-card">
            <div className="location-copy">
              <span className="eyebrow light">Datang dan kenalan</span>
              <h2>Ambil alatmu langsung di RimbaCamp</h2>
              <p>
                Jl. Kaliurang KM 9, Sleman, Yogyakarta
                <br />
                Buka setiap hari, 08.00–20.00 WIB
              </p>
              <div className="location-actions">
                <button className="primary-button">
                  <MapPin size={18} /> Buka di Maps
                </button>
                <button className="ghost-light">
                  <MessageCircle size={18} /> Chat WhatsApp
                </button>
              </div>
            </div>
            <div className="map-art" aria-label="Ilustrasi peta lokasi toko">
              <span className="road road-one" />
              <span className="road road-two" />
              <span className="map-pin">
                <Store size={25} />
              </span>
              <div className="map-label">
                <Brand compact />
                <span>Jl. Kaliurang KM 9</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section faq-section">
          <div className="container faq-grid">
            <div>
              <span className="eyebrow">Masih penasaran?</span>
              <h2>Pertanyaan yang sering ditanyakan</h2>
              <p>
                Belum menemukan jawabanmu? Tim kami siap bantu lewat WhatsApp.
              </p>
              <button className="text-button">
                Tanya tim RimbaCamp <ArrowRight size={18} />
              </button>
            </div>
            <div className="faq-list">
              {faqs.map(([question, answer], index) => (
                <div className={`faq-item ${faq === index ? "open" : ""}`} key={question}>
                  <button onClick={() => setFaq(faq === index ? -1 : index)}>
                    {question}
                    <ChevronDown size={20} />
                  </button>
                  {faq === index && <p>{answer}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer setView={setView} />
    </>
  );
}

function Catalog({
  onBook,
  onDetail,
}: {
  onBook: (product: Product) => void;
  onDetail: (product: Product) => void;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Semua");
  const categories = ["Semua", "Tenda", "Carrier", "Sleeping Bag", "Kompor"];
  const filtered = products.filter(
    (item) =>
      (category === "Semua" || item.category === category) &&
      item.name.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <main className="page-shell">
      <section className="catalog-hero">
        <div className="container">
          <span className="eyebrow">Katalog RimbaCamp</span>
          <h1>Temukan teman terbaik untuk petualanganmu</h1>
          <p>Pilih tanggal untuk melihat stok yang benar-benar tersedia.</p>
          <DateSearch onSearch={() => undefined} />
        </div>
      </section>
      <section className="section container">
        <div className="catalog-toolbar">
          <div className="search-input">
            <Search size={19} />
            <input
              placeholder="Cari tenda, carrier, kompor..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <select aria-label="Urutkan produk">
            <option>Urutkan: Paling populer</option>
            <option>Harga terendah</option>
            <option>Harga tertinggi</option>
          </select>
        </div>
        <div className="chips">
          {categories.map((item) => (
            <button
              key={item}
              className={category === item ? "selected" : ""}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="catalog-result">
          <p>
            Menampilkan <strong>{filtered.length} alat</strong> yang tersedia
          </p>
        </div>
        <div className="product-grid">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onBook={onBook}
              onDetail={onDetail}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

function Orders() {
  return (
    <main className="page-shell orders-page">
      <div className="container">
        <div className="page-heading">
          <span className="eyebrow">Akun saya</span>
          <h1>Pesanan Saya</h1>
          <p>Pantau jadwal dan status perlengkapan yang kamu sewa.</p>
        </div>
        <div className="order-card">
          <div className="order-top">
            <div>
              <span className="status-badge booked">
                <BadgeCheck size={15} /> Sudah dibayar
              </span>
              <h2>#RMC-250815-042</h2>
              <p>Dibuat 10 Agustus 2025, 14.32 WIB</p>
            </div>
            <button className="outline-button">Lihat invoice</button>
          </div>
          <div className="order-body">
            <img src={products[0].image} alt={products[0].name} />
            <div>
              <strong>Tenda Summit Pro 4P</strong>
              <span>2 unit · 3 hari</span>
            </div>
            <strong>{rupiah(510000)}</strong>
          </div>
          <div className="pickup-note">
            <CalendarDays size={21} />
            <div>
              <strong>Ambil Kamis, 14 Agustus · 16.00–17.00</strong>
              <span>RimbaCamp, Jl. Kaliurang KM 9, Sleman</span>
            </div>
            <ChevronRight size={20} />
          </div>
          <div className="timeline">
            {["Booked", "Diambil", "Dikembalikan", "Selesai"].map((step, index) => (
              <div className={index === 0 ? "done" : ""} key={step}>
                <span>{index === 0 ? <Check size={14} /> : index + 1}</span>
                <p>{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

function ProductDetail({
  product,
  onClose,
  onBook,
}: {
  product: Product;
  onClose: () => void;
  onBook: (product: Product) => void;
}) {
  return (
    <div className="modal-backdrop" role="presentation">
      <div className="detail-modal" role="dialog" aria-modal="true">
        <button className="modal-close" onClick={onClose} aria-label="Tutup detail">
          <X size={21} />
        </button>
        <div className="detail-image">
          <img src={product.image} alt={product.name} />
          {product.popular && <span className="popular-badge">Paling populer</span>}
        </div>
        <div className="detail-content">
          <span className="eyebrow">{product.category}</span>
          <h2>{product.name}</h2>
          <div className="detail-price">
            {rupiah(product.price)} <span>/hari</span>
          </div>
          <p>{product.description}</p>
          <div className="spec-grid">
            {product.specs.map((spec) => (
              <div key={spec}>
                <BadgeCheck size={18} />
                <span>{spec}</span>
              </div>
            ))}
          </div>
          <div className="availability">
            <div>
              <strong>Ketersediaan</strong>
              <span>15–17 Agustus 2025</span>
            </div>
            <span className="available">
              <Check size={15} /> {product.stock} unit tersedia
            </span>
          </div>
          <button className="primary-button wide" onClick={() => onBook(product)}>
            Sewa Sekarang <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

function BookingWizard({
  product,
  onClose,
  onDone,
}: {
  product: Product;
  onClose: () => void;
  onDone: () => void;
}) {
  const [step, setStep] = useState(1);
  const [qty, setQty] = useState(1);
  const [agreed, setAgreed] = useState(false);
  const stepLabels = ["Alat & Tanggal", "Data & Jaminan", "Jadwal Ambil", "Bayar", "Selesai"];
  const total = product.price * 3 * qty;
  return (
    <div className="modal-backdrop booking-backdrop">
      <div className="booking-modal" role="dialog" aria-modal="true">
        <div className="booking-header">
          <button onClick={step === 1 ? onClose : () => setStep(step - 1)} aria-label="Kembali">
            <ArrowLeft size={21} />
          </button>
          <strong>Booking alat</strong>
          <button onClick={onClose} aria-label="Tutup">
            <X size={21} />
          </button>
        </div>
        <div className="booking-steps">
          {stepLabels.map((label, index) => (
            <div className={step >= index + 1 ? "active" : ""} key={label}>
              <span>{step > index + 1 ? <Check size={13} /> : index + 1}</span>
              <small>{label}</small>
            </div>
          ))}
        </div>
        <div className="booking-layout">
          <div className="booking-main">
            {step === 1 && (
              <div className="step-panel">
                <span className="eyebrow">Langkah 1 dari 5</span>
                <h2>Kapan kamu mau berangkat?</h2>
                <p>Pilih rentang tanggal, lalu tentukan jumlah alat.</p>
                <div className="form-grid">
                  <label>
                    Tanggal mulai
                    <input type="date" defaultValue="2025-08-15" />
                  </label>
                  <label>
                    Tanggal selesai
                    <input type="date" defaultValue="2025-08-17" />
                  </label>
                </div>
                <div className="quantity-row">
                  <div>
                    <strong>Jumlah unit</strong>
                    <span>Maksimal {product.stock} unit pada tanggal ini</span>
                  </div>
                  <div className="quantity">
                    <button onClick={() => setQty(Math.max(1, qty - 1))}>
                      <Minus size={17} />
                    </button>
                    <strong>{qty}</strong>
                    <button onClick={() => setQty(Math.min(product.stock, qty + 1))}>
                      <Plus size={17} />
                    </button>
                  </div>
                </div>
              </div>
            )}
            {step === 2 && (
              <div className="step-panel">
                <span className="eyebrow">Langkah 2 dari 5</span>
                <h2>Data jaminan identitas</h2>
                <div className="identity-alert">
                  <ShieldCheck size={25} />
                  <p>
                    <strong>Bawa KTP/SIM ASLI saat ambil barang.</strong>
                    Data harus sama dengan yang kamu isi di sini. Kartu dikembalikan
                    saat alat dikembalikan.
                  </p>
                </div>
                <div className="form-grid">
                  <label>
                    Nama sesuai identitas
                    <input placeholder="Contoh: Aditya Pratama" />
                  </label>
                  <label>
                    Jenis identitas
                    <select defaultValue="KTP">
                      <option>KTP</option>
                      <option>SIM</option>
                      <option>Paspor</option>
                    </select>
                  </label>
                  <label>
                    Nomor identitas
                    <input placeholder="Masukkan nomor identitas" />
                  </label>
                  <label>
                    Nomor WhatsApp
                    <input placeholder="08xxxxxxxxxx" />
                  </label>
                </div>
                <button className="upload-box">
                  <UploadCloud size={25} />
                  <strong>Unggah foto kartu identitas</strong>
                  <span>JPG atau PNG, maksimal 5 MB. Data tersimpan privat.</span>
                </button>
                <label className="agree-row">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(event) => setAgreed(event.target.checked)}
                  />
                  <span>Saya menyetujui syarat sewa dan kebijakan privasi.</span>
                </label>
              </div>
            )}
            {step === 3 && (
              <div className="step-panel">
                <span className="eyebrow">Langkah 3 dari 5</span>
                <h2>Pilih jadwal pengambilan</h2>
                <p>Alat dapat diambil H-1 sebelum tanggal sewa.</p>
                <div className="pickup-date">
                  <CalendarDays size={24} />
                  <div>
                    <strong>Kamis, 14 Agustus 2025</strong>
                    <span>RimbaCamp · Jl. Kaliurang KM 9</span>
                  </div>
                </div>
                <strong className="field-title">Pilih jam yang tersedia</strong>
                <div className="slot-grid">
                  {["08.00", "09.00", "10.00", "14.00", "15.00", "16.00", "17.00", "18.00"].map(
                    (slot, index) => (
                      <button
                        key={slot}
                        disabled={index === 2}
                        className={index === 5 ? "selected" : ""}
                      >
                        {slot}
                        {index === 2 && <small>Penuh</small>}
                      </button>
                    ),
                  )}
                </div>
              </div>
            )}
            {step === 4 && (
              <div className="step-panel payment-panel">
                <span className="timer">
                  <Clock3 size={18} /> Stok ditahan selama 14:38
                </span>
                <h2>Pilih metode pembayaran</h2>
                <p>Pembayaran aman diproses oleh Midtrans.</p>
                <div className="payment-list">
                  {["QRIS", "Virtual Account Bank", "GoPay / ShopeePay"].map(
                    (method, index) => (
                      <label key={method}>
                        <span className="payment-logo">
                          <CircleDollarSign size={20} />
                        </span>
                        <strong>{method}</strong>
                        <input type="radio" name="payment" defaultChecked={index === 0} />
                      </label>
                    ),
                  )}
                </div>
              </div>
            )}
            {step === 5 && (
              <div className="success-panel">
                <span className="success-icon">
                  <Check size={38} />
                </span>
                <span className="eyebrow">Pembayaran berhasil</span>
                <h2>Alatmu siap untuk petualangan!</h2>
                <p>Simpan kode booking ini untuk ditunjukkan saat pengambilan.</p>
                <button className="booking-code">
                  <span>#RMC-250815-042</span>
                  <Copy size={18} />
                </button>
                <div className="must-bring">
                  <strong>Yang harus dibawa</strong>
                  <span><Check size={16} /> Kartu identitas asli</span>
                  <span><Check size={16} /> Kode booking</span>
                  <span><Check size={16} /> Bukti pembayaran</span>
                </div>
              </div>
            )}
            <div className="booking-footer">
              {step < 5 ? (
                <button
                  className="primary-button wide"
                  onClick={() => setStep(step + 1)}
                  disabled={step === 2 && !agreed}
                >
                  {step === 4 ? `Bayar ${rupiah(total)}` : "Lanjutkan"}
                  <ArrowRight size={18} />
                </button>
              ) : (
                <button className="primary-button wide" onClick={onDone}>
                  Lihat Pesanan Saya <ArrowRight size={18} />
                </button>
              )}
            </div>
          </div>
          <aside className="booking-summary">
            <span className="eyebrow">Ringkasan pesanan</span>
            <div className="summary-product">
              <img src={product.image} alt={product.name} />
              <div>
                <strong>{product.name}</strong>
                <span>{qty} unit · 3 hari</span>
              </div>
            </div>
            <div className="summary-row">
              <span>Tanggal sewa</span>
              <strong>15–17 Agustus</strong>
            </div>
            <div className="summary-row">
              <span>{rupiah(product.price)} × 3 hari × {qty}</span>
              <strong>{rupiah(total)}</strong>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <strong>{rupiah(total)}</strong>
            </div>
            <small>Jaminan berupa kartu identitas asli, tanpa uang deposit.</small>
          </aside>
        </div>
      </div>
    </div>
  );
}

function AdminDashboard({ onExit }: { onExit: () => void }) {
  const [section, setSection] = useState("Dashboard");
  const menu = [
    [LayoutDashboard, "Dashboard"],
    [ClipboardCheck, "Booking"],
    [Package, "Katalog"],
    [CalendarDays, "Jadwal Ambil"],
    [Warehouse, "Kalender Stok"],
    [Settings, "Pengaturan"],
  ] as const;
  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <button className="brand-button" onClick={onExit}>
          <Brand />
        </button>
        <div className="admin-store">
          <span>RT</span>
          <div>
            <strong>RimbaCamp Kaliurang</strong>
            <small>Admin toko</small>
          </div>
          <ChevronDown size={16} />
        </div>
        <nav>
          {menu.map(([Icon, label]) => (
            <button
              key={label}
              className={section === label ? "active" : ""}
              onClick={() => setSection(label)}
            >
              <Icon size={19} />
              {label}
              {label === "Booking" && <span className="menu-count">8</span>}
            </button>
          ))}
        </nav>
        <div className="admin-profile">
          <span>AP</span>
          <div>
            <strong>Adi Prasetyo</strong>
            <small>admin@rimbacamp.id</small>
          </div>
        </div>
      </aside>
      <main className="admin-main">
        <header className="admin-header">
          <div>
            <span>Selasa, 12 Agustus 2025</span>
            <h1>{section}</h1>
          </div>
          <div className="admin-header-actions">
            <button className="notification-button">
              <span>3</span>
              <Clock3 size={20} />
            </button>
            <button className="primary-button">
              <Plus size={18} /> Tambah Booking
            </button>
          </div>
        </header>
        <div className="admin-content">
          {section === "Dashboard" ? <DashboardHome /> : <AdminSection title={section} />}
        </div>
      </main>
    </div>
  );
}

function DashboardHome() {
  const stats = [
    [ShoppingBag, "Booking hari ini", "12", "+18% dari kemarin", "green"],
    [CalendarDays, "Pengambilan hari ini", "8", "3 perlu diverifikasi", "orange"],
    [Package, "Pengembalian hari ini", "6", "2 terlambat", "blue"],
    [CircleDollarSign, "Pendapatan bulan ini", "Rp 18,4 jt", "+12,5% dari Juli", "purple"],
  ] as const;
  const bookings = [
    ["#RMC-042", "Nadia Putri", "16.00", "Tenda Summit Pro", "Perlu verifikasi", "warning"],
    ["#RMC-039", "Bagas Aji", "17.00", "Carrier Alpine 60L", "Sudah dibayar", "success"],
    ["#RMC-036", "Raka Farhan", "18.00", "Paket camping 2P", "Belum bayar", "neutral"],
  ];
  return (
    <>
      <div className="welcome-row">
        <div>
          <h2>Selamat pagi, Adi</h2>
          <p>Ini yang perlu diperhatikan di toko hari ini.</p>
        </div>
        <button className="outline-button">
          <Calendar size={17} /> Lihat kalender stok
        </button>
      </div>
      <div className="admin-stats">
        {stats.map(([Icon, label, value, sub, color]) => (
          <div className="stat-card" key={label}>
            <span className={`stat-icon ${color}`}>
              <Icon size={20} />
            </span>
            <p>{label}</p>
            <strong>{value}</strong>
            <small><TrendingUp size={13} /> {sub}</small>
          </div>
        ))}
      </div>
      <div className="admin-grid">
        <section className="admin-card revenue-card">
          <div className="card-title">
            <div>
              <h3>Pendapatan</h3>
              <p>6 bulan terakhir</p>
            </div>
            <select>
              <option>6 bulan</option>
            </select>
          </div>
          <div className="chart">
            {[42, 58, 51, 70, 61, 86].map((height, index) => (
              <div key={height}>
                <span style={{ height: `${height}%` }} />
                <small>{["Mar", "Apr", "Mei", "Jun", "Jul", "Agu"][index]}</small>
              </div>
            ))}
          </div>
        </section>
        <section className="admin-card popular-list">
          <div className="card-title">
            <div>
              <h3>Alat terlaris</h3>
              <p>Bulan Agustus</p>
            </div>
            <button>Semua <ChevronRight size={16} /></button>
          </div>
          {products.slice(0, 3).map((product, index) => (
            <div className="popular-item" key={product.id}>
              <span>{index + 1}</span>
              <img src={product.image} alt="" />
              <div>
                <strong>{product.name}</strong>
                <small>{18 - index * 4} kali disewa</small>
              </div>
              <strong>{rupiah(product.price * (18 - index * 4))}</strong>
            </div>
          ))}
        </section>
      </div>
      <section className="admin-card action-card">
        <div className="card-title">
          <div>
            <h3>Perlu tindakan hari ini</h3>
            <p>3 booking perlu segera ditangani</p>
          </div>
          <button>Lihat semua <ArrowRight size={16} /></button>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Kode</th>
                <th>Customer</th>
                <th>Jadwal ambil</th>
                <th>Pesanan</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {bookings.map(([code, name, time, item, status, type]) => (
                <tr key={code}>
                  <td><strong>{code}</strong></td>
                  <td>{name}</td>
                  <td>Hari ini, {time}</td>
                  <td>{item}</td>
                  <td><span className={`status-badge ${type}`}>{status}</span></td>
                  <td><button className="row-action">Buka <ChevronRight size={15} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

function AdminSection({ title }: { title: string }) {
  return (
    <div className="admin-empty admin-card">
      <span><Package size={32} /></span>
      <h2>Kelola {title.toLowerCase()}</h2>
      <p>
        Semua data tersinkron otomatis. Gunakan pencarian dan filter untuk
        menemukan informasi yang kamu perlukan.
      </p>
      <div className="empty-actions">
        <div className="search-input">
          <Search size={18} />
          <input placeholder={`Cari ${title.toLowerCase()}...`} />
        </div>
        <button className="primary-button"><Plus size={18} /> Tambah baru</button>
      </div>
    </div>
  );
}

function Footer({ setView }: { setView: (view: View) => void }) {
  return (
    <footer>
      <div className="container footer-grid">
        <div>
          <Brand />
          <p>Teman perjalanan untuk petualangan yang lebih ringan dan berkesan.</p>
        </div>
        <div>
          <strong>Jelajahi</strong>
          <button onClick={() => setView("katalog")}>Katalog alat</button>
          <button onClick={() => setView("pesanan")}>Pesanan saya</button>
          <button>Tentang kami</button>
        </div>
        <div>
          <strong>Bantuan</strong>
          <button>Cara sewa</button>
          <button>Syarat & ketentuan</button>
          <button>Kebijakan privasi</button>
        </div>
        <div>
          <strong>Hubungi kami</strong>
          <span>+62 812 3456 7890</span>
          <span>halo@rimbacamp.id</span>
          <span>Setiap hari, 08.00–20.00</span>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2025 RimbaCamp. Dibuat untuk petualang Indonesia.</span>
        <span>Pembayaran aman oleh Midtrans</span>
      </div>
    </footer>
  );
}

function MobileNav({ view, setView }: { view: View; setView: (view: View) => void }) {
  const items = [
    [Home, "Beranda", "beranda"],
    [Search, "Katalog", "katalog"],
    [ShoppingBag, "Pesanan", "pesanan"],
    [UserRound, "Akun", "admin"],
  ] as const;
  return (
    <nav className="mobile-nav">
      {items.map(([Icon, label, value]) => (
        <button
          key={value}
          className={view === value ? "active" : ""}
          onClick={() => setView(value)}
        >
          <Icon size={20} />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
}

export default function App() {
  const [view, setView] = useState<View>("beranda");
  const [bookingProduct, setBookingProduct] = useState<Product | null>(null);
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);
  const current = useMemo(() => view, [view]);

  const openBooking = (product: Product) => {
    setDetailProduct(null);
    setBookingProduct(product);
  };

  if (current === "admin") {
    return <AdminDashboard onExit={() => setView("beranda")} />;
  }

  return (
    <div className="app">
      <Header view={view} setView={setView} />
      {view === "beranda" && (
        <Landing setView={setView} onBook={openBooking} onDetail={setDetailProduct} />
      )}
      {view === "katalog" && (
        <Catalog onBook={openBooking} onDetail={setDetailProduct} />
      )}
      {view === "pesanan" && <Orders />}
      <button className="whatsapp-float" aria-label="Chat lewat WhatsApp">
        <MessageCircle size={24} fill="currentColor" />
      </button>
      <MobileNav view={view} setView={setView} />
      {detailProduct && (
        <ProductDetail
          product={detailProduct}
          onClose={() => setDetailProduct(null)}
          onBook={openBooking}
        />
      )}
      {bookingProduct && (
        <BookingWizard
          product={bookingProduct}
          onClose={() => setBookingProduct(null)}
          onDone={() => {
            setBookingProduct(null);
            setView("pesanan");
          }}
        />
      )}
    </div>
  );
}
