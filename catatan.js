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
