export function tambahTugas(daftar, nama) {
    return [
        ...daftar,
        {
            id: Date.now(),
            nama: nama.trim(),
            selesai: false
        }
    ];
}


export function editTugas(daftar, id, namaBaru) {
    return daftar.map((tugas) => {
        if (tugas.id === id) {
            return {
                ...tugas,
                nama: namaBaru.trim()
            };
        }

        return tugas;
    });
}


export function hapusTugas(daftar, id) {
    return daftar.filter((tugas) => tugas.id !== id);
}


export function toggleTugas(daftar, id) {
    return daftar.map((tugas) => {
        if (tugas.id === id) {
            return {
                ...tugas,
                selesai: !tugas.selesai
            };
        }

        return tugas;
    });
}


export function pindahkanTugas(daftar, idSumber, idTarget) {

    const indexSumber =
        daftar.findIndex((tugas) => tugas.id === idSumber);

    const indexTarget =
        daftar.findIndex((tugas) => tugas.id === idTarget);

    if (indexSumber === -1 || indexTarget === -1) {
        return daftar;
    }

    const hasil = [...daftar];

    const [tugasDipindah] =
        hasil.splice(indexSumber, 1);

    hasil.splice(indexTarget, 0, tugasDipindah);

    return hasil;
}