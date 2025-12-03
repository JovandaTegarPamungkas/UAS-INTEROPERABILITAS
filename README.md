# Insialisasi project
npm init -y
# install library
npm install express axios cors 
(aku butuh express (untuk server) dan axios (untuk ambil data teman))

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