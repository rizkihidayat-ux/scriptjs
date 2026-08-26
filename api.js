const API_KEY = "MASUKKAN_API_KEY_KAMU";


export async function ambilCuaca(kota) {

    const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${kota}&appid=${API_KEY}&units=metric`;

    try {

        const response =
            await fetch(url);

        if (!response.ok) {
            throw new Error("Kota tidak ditemukan");
        }

        const data =
            await response.json();

        return data;

    } catch (error) {

        console.error(
            "Gagal mengambil cuaca:",
            error
        );

        return null;
    }
}



export async function ambilKutipanAPI() {

    try {

        const response =
            await fetch(
                "https://randominspirationalquotes.onrender.com"
            );

        if (!response.ok) {
            throw new Error(
                "Gagal mengambil kutipan"
            );
        }

        const data =
            await response.json();

        return data;

    } catch (error) {

        console.error(
            "Gagal mengambil kutipan:",
            error
        );

        return null;
    }
}