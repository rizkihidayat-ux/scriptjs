export function simpanTugas(data) {
    localStorage.setItem(
        "daftarTugas",
        JSON.stringify(data)
    );
}

export function muatTugas() {

    const data =
        localStorage.getItem("daftarTugas");

    return data ? JSON.parse(data) : [];
}

export function simpanCatatan(data) {

    localStorage.setItem(
        "daftarCatatan",
        JSON.stringify(data)
    );
}

export function muatCatatan() {

    const data =
        localStorage.getItem("daftarCatatan");

    return data ? JSON.parse(data) : [];
}

export function simpanTema(tema) {

    localStorage.setItem(
        "tema",
        tema
    );
}

export function muatTema() {

    return localStorage.getItem("tema");
}