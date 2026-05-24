export const navItems = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Education', id: 'education' },
  { label: 'Contact', id: 'contact' },
]

export const stats = [
  { value: '13+', label: 'Core skills' },
  { value: '3', label: 'Featured projects' },
  { value: '2026', label: 'Focus since' },
]

export const skills = [
  { name: 'HTML5', icon: 'logos:html-5' },
  { name: 'CSS3', icon: 'logos:css-3' },
  { name: 'JavaScript', icon: 'logos:javascript' },
  { name: 'Vue.js', icon: 'logos:vue' },
  { name: 'Node.js', icon: 'logos:nodejs-icon' },
  { name: 'MySQL', icon: 'logos:mysql-icon' },
  { name: 'Git & GitHub', icon: 'logos:git-icon' },
  { name: 'Laravel', icon: 'logos:laravel' },
  { name: 'Tailwind CSS', icon: 'logos:tailwindcss-icon' },
  { name: 'Vercel', icon: 'logos:vercel-icon' },
  { name: 'Figma', icon: 'logos:figma' },
  { name: 'Responsive Design', icon: 'mdi:responsive' },
  { name: 'UI/UX Design', icon: 'mdi:palette-outline' },
]

export const projects = [
  {
    name: 'Website Pengaduan Sekolah',
    description:
      'Website yang bertujuan agar siswa bisa membuat pengaduan dengan cepat, terarah, dan efisien.',
    stack: ['HTML', 'CSS', 'JavaScript', 'Laravel'],
    featured: true,
    liveUrl: 'https://example.com/school-complaint',
    githubUrl: 'https://github.com/username/website-pengaduan-sekolah',
    image: '/projects/pengaduan-sekolah.png',
    tone: 'from-slate-100 via-white to-blue-50',
  },
  {
    name: 'Website Sistem Absen RFID',
    description:
      'Website untuk pengelolaan data absen menggunakan kartu RFID. Data absensi akan masuk dan tersimpan ke dalam website.',
    stack: ['HTML', 'CSS', 'JavaScript', 'C++'],
    featured: false,
    liveUrl: 'https://example.com/rfid-attendance',
    githubUrl: 'https://github.com/username/website-absen-rfid',
    image: '/projects/sistem-absen-rfid.png',
    tone: 'from-zinc-100 via-white to-slate-50',
  },
  {
    name: 'Personal Portfolio Website',
    description:
      'Website portfolio modern dengan desain minimalist premium dan animasi smooth.',
    stack: ['Vue.js', 'Tailwind CSS', 'Vercel'],
    featured: false,
    liveUrl: 'https://example.com/portfolio',
    githubUrl: 'https://github.com/username/personal-portfolio',
    image: '/projects/portofolio-web.png',
    tone: 'from-blue-50 via-white to-zinc-100',
  },
  {
    name: 'Website Pemesanan Dimsum PJS',
    description:
      'Website kolaborasi SMKN 7 Batam Dengan Dimsum PJS berisi Pesanan online untuk pembeli.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    featured: true,
    liveUrl: 'https://dimsumpjs-skaju.vercel.app/',
    githubUrl: 'https://github.com/Gavinnaufal/dimsumpjs-skaju',
    image: '/projects/dimsum-pjs.png',
    tone: 'from-blue-50 via-white to-zinc-100',
  },
]

export const contacts = [
  // { label: 'Email', value: 'gavin@example.com', href: 'mailto:gavin@example.com' },
  // { label: 'WhatsApp', value: '+62 812 3456 7890', href: 'https://wa.me/6281234567890' },
  { label: 'GitHub', value: 'github.com/gavinnaufal', href: 'https://github.com/gavinnaufal' },
  { label: 'Instagram', value: '@gavinnaufall_', href: 'https://instagram.com/gavinnaufall_' },
  { label: 'LinkedIn', value: 'linkedin.com/in/gavin-naufal-karnedi-841080330/', href: 'https://www.linkedin.com/in/gavin-naufal-karnedi-841080330/' },
]
