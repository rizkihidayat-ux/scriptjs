
const app = document.getElementById("app");

const judul = document.createElement("h2");
judul.textContent = "Selamat Datang di DailyBoard!";
app.appendChild(judul);

const statusText = document.createElement("p");
statusText.id = "status";
app.appendChild(statusText);

// WIDGET KUTIPAN 

const kutipanSection = document.createElement("section");
const kutipanHeader = document.createElement("div");
const judulKutipan = document.createElement("h2");
const kutipanHarian = document.createElement("p");
const btnGantiKutipan = document.createElement("button");

judulKutipan.textContent = "Motivasi";
kutipanHarian.id = "kutipan-harian";
kutipanHarian.textContent = "Memuat motivasi...";
btnGantiKutipan.textContent = "Reflesh";
btnGantiKutipan.type = "button";
kutipanHeader.className = "kutipan-header";
kutipanHeader.append(judulKutipan, btnGantiKutipan);
kutipanSection.append(kutipanHeader, kutipanHarian);
app.appendChild(kutipanSection);

btnGantiKutipan.onclick = ambilKutipan;




async function ambilKutipan() {
    const elKutipan = document.getElementById("kutipan-harian");
    try {
        const res = await fetch("https://randominspirationalquotes.onrender.com");
        
        if (!res.ok) {
            throw new Error("Gagal terhubung ke server kutipan.");
        }
        
        const data = await res.json();
        elKutipan.innerHTML = `<em>"${data.quote}"</em> — <strong>${data.author}</strong>`;
    } catch (error) {
        console.error("Gagal mengambil kutipan:", error);
        elKutipan.textContent = "⚠️ Gagal memuat kutipan harian. Periksa koneksi internet Anda.";
        elKutipan.style.color = "red";
    }
}

ambilKutipan();

const toggleTema = document.createElement("button");
toggleTema.id = "toggleTema";
app.appendChild(toggleTema);

function perbaruiLabelTema() {
    const modeAktif = document.body.classList.contains("dark-mode");
    toggleTema.textContent = modeAktif ? "☀️ Mode Terang" : "🌙 Mode Gelap";
}

toggleTema.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    const modeAktif = document.body.classList.contains("dark-mode");
    localStorage.setItem("tema", modeAktif ? "dark" : "light");

    perbaruiLabelTema();
});

perbaruiLabelTema();

// SECTION TUGAS
const sectionTugas = document.createElement("section");
sectionTugas.innerHTML = "<h3>Tugas</h3>";
app.appendChild(sectionTugas);

const inputCari = document.createElement("input");
inputCari.placeholder = "Cari tugas...";
inputCari.id = "input-cari-tugas";
sectionTugas.appendChild(inputCari);
sectionTugas.appendChild(document.createElement("br"));

const input1 = document.createElement("input");
input1.placeholder = "Tambah tugas baru...";
sectionTugas.appendChild(input1);

const tombol1 = document.createElement("button");
tombol1.textContent = "Tambah";
sectionTugas.appendChild(tombol1);

tombol1.addEventListener("click", () => {
    if (validasiInput(input1.value)) {
        tambahTugas(input1.value);
        input1.value = "";
    }
});

// Tambahkan tugas juga dengan menekan Enter di input
input1.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        if (validasiInput(input1.value)) {
            tambahTugas(input1.value);
            input1.value = "";
        }
    }
});

sectionTugas.appendChild(document.createElement("br"));

const containerFilter = document.createElement("div");
containerFilter.style.marginTop = "10px";

const filterSemua = document.createElement("button");
filterSemua.textContent = "Semua";
filterSemua.addEventListener("click", () => renderTugas("semua"));

const filterSelesai = document.createElement("button");
filterSelesai.textContent = "Selesai";
filterSelesai.addEventListener("click", () => renderTugas("selesai"));

const filterBelum = document.createElement("button");
filterBelum.textContent = "Belum Selesai";
filterBelum.addEventListener("click", () => renderTugas("belum"));

containerFilter.appendChild(filterSemua);
containerFilter.appendChild(filterSelesai);
containerFilter.appendChild(filterBelum);
sectionTugas.appendChild(containerFilter);

const ulTugas = document.createElement("ul");
ulTugas.id = "daftar-tugas";
sectionTugas.appendChild(ulTugas);

let filterAktif = "semua";

inputCari.addEventListener("input", () => {
    renderTugas(filterAktif);
});
const sectionCatatan = document.createElement("section");
sectionCatatan.innerHTML = "<h3>Catatan</h3>";
app.appendChild(sectionCatatan);

const textareaCatatan = document.createElement("textarea");
textareaCatatan.id = "input-catatan";
textareaCatatan.placeholder = "Tulis catatan singkat...";
textareaCatatan.rows = 3;
sectionCatatan.appendChild(textareaCatatan);

const tombol2 = document.createElement("button");
tombol2.textContent = "Tambah";
sectionCatatan.appendChild(tombol2);

tombol2.addEventListener("click", () => {
    if (validasiInput(textareaCatatan.value)) {
        tambahCatatan(textareaCatatan.value);
        textareaCatatan.value = "";
    }
    
});

const containerCatatan = document.createElement("div");
containerCatatan.id = "daftar-catatan";
sectionCatatan.appendChild(containerCatatan);

// CUACA
const sectionCuaca = document.createElement("section");
sectionCuaca.innerHTML = "<h3>Cuaca</h3>";
app.appendChild(sectionCuaca);

const input3 = document.createElement("input");
input3.placeholder = "Masukkan kota...";
sectionCuaca.appendChild(input3);

const tombol3 = document.createElement("button");
tombol3.textContent = "Cari Cuaca";
sectionCuaca.appendChild(tombol3);

const divCuaca = document.createElement("div");
divCuaca.id = "cuaca-harian";
divCuaca.textContent = "Memuat cuaca...";
sectionCuaca.appendChild(divCuaca);

tombol3.addEventListener("click", () => {
    if (validasiInput(input3.value)) {
        ambilCuaca(input3.value);
        input3.value = "";
    }
});

//  TUGAS
let daftarTugas = [];
let nextId = 1;
let tugasSedangDiedit = null;
let idTugasDiseret = null;

function renderTugas(filter = filterAktif) {
    filterAktif = filter;
    const list = document.getElementById("daftar-tugas");
    const inputCari = document.getElementById("input-cari-tugas");
    const kataKunci = inputCari ? inputCari.value.toLowerCase() : "";

    list.innerHTML = "";

    const tugasTersaring = daftarTugas.filter((t) => {
        let cocokStatus = true;
        if (filter === "selesai") cocokStatus = t.selesai;
        if (filter === "belum") cocokStatus = !t.selesai;

        const cocokTeks = t.nama.toLowerCase().includes(kataKunci);
        return cocokStatus && cocokTeks;
    });

    tugasTersaring.forEach((tugas) => {
        const li = document.createElement("li");

        if (tugasSedangDiedit === tugas.id) {
            // edit inline db klik
            const inputEdit = document.createElement("input");
            inputEdit.type = "text";
            inputEdit.value = tugas.nama;
            inputEdit.className = "input-edit-inline";

            const simpanEdit = () => {
                if (validasiInput(inputEdit.value)) {
                    editTugas(tugas.id, inputEdit.value);
                    tugasSedangDiedit = null;
                    renderTugas();
                }
                // Jika input kosong, validasiInput sudah menampilkan peringatan
            };

            inputEdit.addEventListener("keydown", (e) => {
                if (e.key === "Enter") simpanEdit();
                if (e.key === "Escape") {
                    tugasSedangDiedit = null;
                    renderTugas();
                }
            });
            inputEdit.addEventListener("blur", simpanEdit);

            li.appendChild(inputEdit);
            list.appendChild(li);
            inputEdit.focus();
            inputEdit.select();
            return;
        }

        // mengubah urutan prioritas
        li.draggable = true;
        li.dataset.id = tugas.id;
        li.style.cursor = "grab";

        const handleSeret = document.createElement("span");
        handleSeret.textContent = "☰ ";
        handleSeret.title = "Seret untuk mengubah urutan";
        handleSeret.style.cursor = "grab";
        li.appendChild(handleSeret);

        const spanNama = document.createElement("span");
        spanNama.textContent = tugas.nama + " ";
        spanNama.style.textDecoration = tugas.selesai ? "line-through" : "none";
        li.appendChild(spanNama);

        li.addEventListener("click", () => toggleSelesai(tugas.id));
        li.addEventListener("dblclick", (e) => {
            e.stopPropagation();
            tugasSedangDiedit = tugas.id;
            renderTugas();
        });

        li.addEventListener("dragstart", (e) => {
            idTugasDiseret = tugas.id;
            li.style.opacity = "0.5";
            e.dataTransfer.effectAllowed = "move";
            e.dataTransfer.setData("text/plain", String(tugas.id));
        });

        li.addEventListener("dragend", () => {
            li.style.opacity = "1";
            idTugasDiseret = null;
        });

        li.addEventListener("dragover", (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = "move";
            li.style.borderTop = "2px solid #4a90e2";
        });

        li.addEventListener("dragleave", () => {
            li.style.borderTop = "";
        });

        li.addEventListener("drop", (e) => {
            e.preventDefault();
            li.style.borderTop = "";
            if (idTugasDiseret === null || idTugasDiseret === tugas.id) return;
            pindahkanUrutanTugas(idTugasDiseret, tugas.id);
        });

        const tombolEdit = document.createElement("button");
        tombolEdit.textContent = "Edit";
        tombolEdit.addEventListener("click", (e) => {
            e.stopPropagation();
            tugasSedangDiedit = tugas.id;
            renderTugas();
        });
        li.appendChild(tombolEdit);

        const tombolHapus = document.createElement("button");
        tombolHapus.textContent = "Hapus";
        tombolHapus.addEventListener("click", (e) => {
            e.stopPropagation();
            hapusTugas(tugas.id);
        });

        li.appendChild(tombolHapus);
        list.appendChild(li);
    });
}

function tambahTugas(nama) {
    daftarTugas.push({ id: nextId++, nama: nama.trim(), selesai: false });
    simpanKeStorage();
    renderTugas();
}

function toggleSelesai(id) {
    daftarTugas = daftarTugas.map((t) =>
        t.id === id ? { ...t, selesai: !t.selesai } : t
    );
    simpanKeStorage();
    renderTugas();
}

function editTugas(id, namaBaru) {
    daftarTugas = daftarTugas.map((t) =>
        t.id === id ? { ...t, nama: namaBaru.trim() } : t
    );
    simpanKeStorage();
    renderTugas();
}

function hapusTugas(id) {
    daftarTugas = daftarTugas.filter((t) => t.id !== id);
    if (tugasSedangDiedit === id) tugasSedangDiedit = null;
    simpanKeStorage();
    renderTugas();
}

function pindahkanUrutanTugas(idSumber, idTarget) {
    const indexSumber = daftarTugas.findIndex((t) => t.id === idSumber);
    const indexTarget = daftarTugas.findIndex((t) => t.id === idTarget);
    if (indexSumber === -1 || indexTarget === -1) return;

    const [tugasDipindah] = daftarTugas.splice(indexSumber, 1);
    daftarTugas.splice(indexTarget, 0, tugasDipindah);

    simpanKeStorage();
    renderTugas();
}

function simpanKeStorage() {
    localStorage.setItem("daftarTugas", JSON.stringify(daftarTugas));
}

function muatDariStorage() {
    const data = localStorage.getItem("daftarTugas");
    daftarTugas = data ? JSON.parse(data) : [];
    if (daftarTugas.length > 0) {
        nextId = Math.max(...daftarTugas.map((t) => t.id)) + 1;
    }
}

// LOGIKA CATATAN
let daftarCatatan = [];
let catatanSedangDiedit = null;

function tambahCatatan(isi) {
    daftarCatatan.push({ id: Date.now(), isi: isi.trim(), tanggal: new Date().toLocaleDateString() });
    simpanCatatanKeStorage();
    renderCatatan();
}

function editCatatan(id, isiBaru) {
    daftarCatatan = daftarCatatan.map((c) =>
        c.id === id ? { ...c, isi: isiBaru.trim() } : c
    );
    simpanCatatanKeStorage();
    renderCatatan();
}

function hapusCatatan(id) {
    daftarCatatan = daftarCatatan.filter((c) => c.id !== id);
    if (catatanSedangDiedit === id) catatanSedangDiedit = null;
    simpanCatatanKeStorage();
    renderCatatan();
}

function simpanCatatanKeStorage() {
    localStorage.setItem("daftarCatatan", JSON.stringify(daftarCatatan));
}

function muatCatatanDariStorage() {
    const data = localStorage.getItem("daftarCatatan");
    daftarCatatan = data ? JSON.parse(data) : [];
}

function renderCatatan() {
    const container = document.getElementById("daftar-catatan");
    container.innerHTML = "";

    daftarCatatan.forEach((catatan) => {
        const div = document.createElement("div");
        div.className = "catatan-item";

        if (catatanSedangDiedit === catatan.id) {
            //(db klik))
            const textareaEdit = document.createElement("textarea");
            textareaEdit.className = "textarea-edit-inline";
            textareaEdit.rows = 3;
            textareaEdit.value = catatan.isi;

            const simpanEdit = () => {
                if (validasiInput(textareaEdit.value)) {
                    editCatatan(catatan.id, textareaEdit.value);
                    catatanSedangDiedit = null;
                    renderCatatan();
                }
                // Jika input kosong, validasiInput sudah menampilkan peringatan
             
            };

            textareaEdit.addEventListener("keydown", (e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    simpanEdit();
                }
                if (e.key === "Escape") {
                    catatanSedangDiedit = null;
                    renderCatatan();
                }
            });
            textareaEdit.addEventListener("blur", simpanEdit);

            div.appendChild(textareaEdit);
            container.appendChild(div);
            textareaEdit.focus();
            textareaEdit.select();
            return;
        }

        const p = document.createElement("p");
        p.textContent = catatan.isi;
        p.addEventListener("dblclick", () => {
            catatanSedangDiedit = catatan.id;
            renderCatatan();
        });

        const small = document.createElement("small");
        small.textContent = catatan.tanggal;

        div.appendChild(p);
        div.appendChild(small);

        const tombolEdit = document.createElement("button");
        tombolEdit.textContent = "Edit";
        tombolEdit.addEventListener("click", () => {
            catatanSedangDiedit = catatan.id;
            renderCatatan();
        });
        div.appendChild(tombolEdit);

        const tombolHapus = document.createElement("button");
        tombolHapus.textContent = "Hapus";
        tombolHapus.addEventListener("click", () => {
            hapusCatatan(catatan.id);
        });

        div.appendChild(tombolHapus);
        container.appendChild(div);
    });
}

// VALIDASI & API
function validasiInput(nilai) {
    if (nilai.trim() === "") {
        alert("Input tidak boleh kosong!");
        return false;
    }
    if (nilai.length > 100) {
        alert("Input tidak boleh lebih dari 100 karakter!");
        return false;
    }
    return true;
}

async function ambilCuaca(kota) {
    const apiKey = "f3266bdf7064b8c7c3a924ab5e9deb82";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${kota}&appid=${apiKey}&units=metric`;
    const divCuaca = document.getElementById("cuaca-harian");

    divCuaca.textContent = "Memuat cuaca...";

    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error("Kota tidak ditemukan");
        }
        const data = await res.json();
        divCuaca.innerHTML = `
            <h4>${data.name}</h4>
            <p>Suhu: ${data.main.temp}°C</p>
            <p>Kelembapan: ${data.main.humidity}%</p>
        `;
    } catch (error) {
        divCuaca.textContent = error.message;
    }
}

async function muatSemuaWidget() {
    document.getElementById("status").textContent = "Memuat data...";
    await Promise.all([ambilKutipan(), ambilCuaca("Jakarta")]);
    document.getElementById("status").textContent = "Data berhasil dimuat!";
}


window.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("tema") === "dark") {
        document.body.classList.add("dark-mode");
    }
    muatDariStorage();
    muatCatatanDariStorage();
    renderTugas();
    renderCatatan();
    muatSemuaWidget();
});

import { tambahTugas as tambahTugasModul } from "./tugas.js";


function debounce(fn, delay = 300) {
    let timer;

    return (...args) => {
        clearTimeout(timer);

        timer = setTimeout(() => fn(...args), delay);
    };
}

const cariTugasDebounced = debounce((katakunci) => {
    renderTugas("semua");
}, 300);