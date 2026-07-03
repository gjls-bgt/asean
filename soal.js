const aseanData = [
    { id: "ID" , nama:  "Indonesia", bendera: "assets/bendera/id.svg", ibu_kota:  "Jakarta", mata_uang:  "Rupiah (IDR)" , luas:  "1.904.569 km²", tanggal_merdeka:  "17 Agustus 1945", lambang: "assets/lambang/id.svg", peta: "assets/peta/id.svg" },
    { id: "MY" , nama:  "Malaysia", bendera:  "assets/bendera/my.svg", ibu_kota:  "Kuala Lumpur", mata_uang:  "Ringgit (MYR)" , luas:  "330.803 km²", tanggal_merdeka:  "31 Agustus 1957", lambang: "assets/lambang/my.svg", peta: "assets/peta/my.svg" },
    { id: "SG" , nama:  "Singapura", bendera:  "assets/bendera/sg.svg", ibu_kota:  "Singapura", mata_uang:  "Dolar Singapura" , luas:  "728,6 km²", tanggal_merdeka:  "9 Agustus 1965", lambang: "assets/lambang/sg.svg", peta: "assets/peta/sg.svg" },
    { id: "TH" , nama:  "Thailand", bendera:  "assets/bendera/th.svg", ibu_kota:  "Bangkok", mata_uang:  "Baht (THB)" , luas:  "513.120 km²", tanggal_merdeka:  "Tidak pernah dijajah", lambang: "assets/lambang/th.svg", peta: "assets/peta/th.svg" },
    { id: "PH" , nama:  "Filipina", bendera:  "assets/bendera/ph.svg", ibu_kota:  "Manila", mata_uang:  "Peso (PHP)" , luas:  "342.353 km²", tanggal_merdeka:  "12 Juni 1898", lambang: "assets/lambang/ph.svg", peta: "assets/peta/ph.svg" },
    { id: "VN" , nama:  "Vietnam", bendera:  "assets/bendera/vn.svg", ibu_kota:  "Hanoi", mata_uang:  "Dong (VND)" , luas:  "331.212 km²", tanggal_merdeka:  "2 September 1945", lambang: "assets/lambang/vn.svg", peta: "assets/peta/vn.svg" },
    { id: "MM" , nama:  "Myanmar", bendera:  "assets/bendera/mm.svg", ibu_kota:  "Naypyidaw", mata_uang:  "Kyat (MMK)" , luas:  "676.578 km²", tanggal_merdeka:  "4 Januari 1948", lambang: "assets/lambang/mm.svg", peta: "assets/peta/mm.svg" },
    { id: "KH" , nama:  "Kamboja", bendera:  "assets/bendera/kh.svg", ibu_kota:  "Phnom Penh", mata_uang:  "Riel (KHR)" , luas:  "181.035 km²", tanggal_merdeka:  "9 November 1953", lambang: "assets/lambang/kh.svg", peta: "assets/peta/kh.svg" },
    { id: "LA" , nama:  "Laos", bendera:  "assets/bendera/la.svg", ibu_kota:  "Vientiane", mata_uang:  "Kip (LAK)" , luas:  "236.800 km²", tanggal_merdeka:  "2 Desember 1975", lambang: "assets/lambang/la.svg", peta: "assets/peta/la.svg" },
    { id: "BN" , nama:  "Brunei Darussalam", bendera: "assets/bendera/bn.svg", ibu_kota:  "Bandar Seri Begawan", mata_uang:  "Dolar Brunei" , luas:  "5.765 km²", tanggal_merdeka:  "23 Februari 1984", lambang: "assets/lambang/bn.svg", peta: "assets/peta/bn.svg" },
    { id: "TL" , nama:  "Timor Leste", bendera: "assets/bendera/tl.svg", ibu_kota:  "Dili", mata_uang:  "Dolar AS (USD)" , luas:  "14.874 km²", tanggal_merdeka:  "20 Mei 2002", lambang: "assets/lambang/tl.svg", peta: "assets/peta/tl.svg" }
];

const levels = [
    { no: 1, topik: "Bendera", properti: "bendera", isEmoji: false, isImage: true },
    { no: 2, topik: "Ibu Kota", properti: "ibu_kota", isEmoji: false, isImage: false },
    { no: 3, topik: "Mata Uang", properti: "mata_uang", isEmoji: false, isImage: false },
    { no: 4, topik: "Luas Wilayah", properti: "luas", isEmoji: false, isImage: false },
    { no: 5, topik: "Tanggal Merdeka", properti: "tanggal_merdeka", isEmoji: false, isImage: false },
    { no: 6, topik: "Lambang", properti: "lambang", isEmoji: false, isImage: true },
    { no: 7, topik: "Peta", properti: "peta", isEmoji: false, isImage: true }
];