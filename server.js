const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3300;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Server (Mahasiswa 4)');
});

app.get('/status', (req, res) => {
    res.json({ ok: true, service: 'marketplace lead integrator' });
});

app.get('/api/marketplace-products', async (req, res, next) => {
    try {
        const linkM1 = "https://vendor-a-two.vercel.app/api/vendorA"; // Rinces Anggie Permana
        const linkM2 = "https://api-vendor-b.vercel.app/vendor-b/products"; // Mahrus Surur
        const linkM3 = "https://api-vendor-c.vercel.app/api/products"; // Deva David Dharmaesa

        const [res1, res2, res3] = await Promise.all([
            axios.get(linkM1),
            axios.get(linkM2),
            axios.get(linkM3)
        ]);

        const dataM1 = res1.data;
        const dataM2 = res2.data;
        const dataM3 = res3.data;

        // M1
        const processedA = dataM1.map(item => {
            const hargaInt = parseInt(item.hrg); // String ke Int
            const hargaDiskon = hargaInt - (hargaInt * 0.10); // Diskon 10%
            
            return {
                id: item.kd_produk,
                nama: item.nm_brg,
                harga: hargaDiskon,
                status: item.ket_stok,
                sumber: "Vendor A (Warung)"
            };
        });

        // M2
        const processedB = dataM2.map(item => {
            return {
                id: item.sku,
                nama: item.productName,
                harga: item.price,
                status: (item.isAvailable === true || item.isAvailable === "true") ? "Tersedia" : "Tidak Tersedia", // Boolean ke String
                sumber: "Vendor B (Distro)"
            };
        });

        // M3
        const processedC = dataM3.map(item => {
            const hargaTotal = item.pricing.base_price + item.pricing.tax; // Penjumlahan
            let namaFinal = item.details.name;
            
            if (item.details.category === 'Food') {
                namaFinal += " (Recommended)"; // Tambah recomended
            }

            return {
                id: String(item.id),
                nama: namaFinal,
                harga: hargaTotal,
                status: `Tersedia (${item.stock})`,
                sumber: "Vendor C (Resto)"
            };
        });

        // GABUNGKAN DATA
        const finalOutput = [...processedA, ...processedB, ...processedC];

        res.json({
            status: 'success',
            total_data: finalOutput.length,
            data: finalOutput
        });

    } catch (err) {
        console.error('[integration error]', err.message);
        next(err);
    }
});

app.use((req, res) => {
    res.status(404).json({ error: 'Rute tidak ditemukan' });
});

app.use((err, req, res, next) => {
    console.error('[SERVER ERROR]', err.stack);
    res.status(500).json({ 
        error: 'Terjadi kesalahan saat mengambil data vendor',
        detail: err.message 
    });
});

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server Integrator berjalan di port ${PORT}`);
    });
}

module.exports = app;