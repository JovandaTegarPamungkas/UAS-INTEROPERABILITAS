# Insialisasi project
npm init -y
# install library
npm install express axios cors 
(aku butuh express (untuk server) dan axios (untuk ambil data teman))
CORS (Cross-Origin Resource Sharing) adalah aturan keamanan untuk orang luar yang mau masuk
CORS (Cross-Origin Resource Sharing) adalah aturan keamanan untuk orang luar yang mau masuk

req = request
res = response 

try = coba
catch = menangkap error

const = konstanta = paten = tidak bisa dirubah
# membuat server.js
# membuat vercel.json
{
    "version": 2,
    "builds": [
        {
            "src": "server.js", --- nama file
            "use": "@vercel/node"
        }
    ],
    "routes": [
        {
            "src": "/(.*)",
            "dest": "server.js" --- nama file
        }
    ]
}

# package.json
merubah main (file)
tambahkan "start": "node server.js"
