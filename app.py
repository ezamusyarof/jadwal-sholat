import requests, json, random
from datetime import date
from flask import Flask, request, redirect, render_template, url_for

app = Flask(__name__)

# random ayat
ayat2 = [
    "Dan dirikanlah salat, tunaikanlah zakat, dan rukuklah beserta orang-orang yang rukuk.",
    "Peliharalah semua salat(mu), dan (peliharalah) salat wusthaa (salat lima waktu) ...",
    "Sesungguhnya salat itu adalah kewajiban yang ditentukan waktunya atas orang-orang yang beriman,",
    "Dan mohonlah pertolongan (kepada Allah) dengan sabar dan salat. Dan (salat) itu sungguh berat, kecuali bagi orang-orang yang khusyuk,",
    "Dan Aku tidak menciptakan jin dan manusia melainkan supaya mereka mengabdi kepada-Ku.",
    "Dirikanlah salat dan tunaikanlah zakat. Segala kebaikan yang kamu kerjakan untuk dirimu akan kamu dapatkan (pahalanya) di sisi Allah.",
    "Dirikanlah salat pada kedua ujung hari (pagi dan petang) dan pada bagian-bagian malam.",
    "Sesungguhnya batas antara seseorang dengan syirik dan kekafiran itu adalah meninggalkan salat",
    "... dan dirikanlah salat. Sesungguhnya salat itu mencegah dari (perbuatan-perbuatan) keji dan munkar."
]

surah2 = [
    "Al Baqarah : 43",
    "Al Baqarah : 238",
    "An Nisa : 103",
    "Al Baqarah : 45",
    "Az Zariyat : 56",
    "Al Baqarah : 110",
    "Hud : 114",
    "H.R. Muslim",
    "Al Ankabut : 45"
]

@app.route('/', methods=['GET', 'POST'])
def index():
    return redirect('/jadwal_sholat/1225')

# untuk halaman beranda
@app.route('/jadwal_sholat/<string:id>', methods=['GET', 'POST'])
def jadwal_sholat(id):
    global ayat2, surah2
    try :
        # get data lokasi
        get_data_lokasi = requests.get("https://api.myquran.com/v1/sholat/kota/semua")
        data_lokasi_str = ""
        for i in get_data_lokasi:
            i = i.decode('utf-8')
            data_lokasi_str = data_lokasi_str + str(i)
        data_lokasi = json.loads(data_lokasi_str)

        # get data jadwal sholat
        url = "https://api.myquran.com/v1/sholat/jadwal/"+id+"/"
        today = date.today()
        d1 = today.strftime("%Y/%m/%d")
        a = url + str(d1)
        get_data_jadwal  = requests.get(a)
        data_jadwal_str = ""
        for i in get_data_jadwal:
            i = i.decode('utf-8')
            data_jadwal_str = data_jadwal_str + str(i)
        data_jadwal = json.loads(data_jadwal_str)

        lokasi = ''
        for i in data_lokasi:
            if i['id'] == id:
                lokasi = i['lokasi']
                break

        num = random.randint(0, 8)
        ayat = ayat2[num]
        surah = surah2[num]

        print(request.method)
        if request.method == 'GET':
            today = date.today()
            print("Today's date:", today)
            return render_template('index.html', data_lokasi=data_lokasi, data_jadwal=data_jadwal, lokasi=lokasi, ayat=ayat, surah=surah)
        elif request.method == 'POST':
            lokasi = request.form['lokasi']
            key = ""
            for item in data_lokasi:
                if lokasi == item["lokasi"]:
                    key = item["id"]
            if key == '':
                return redirect('../')
            else:
                return redirect('/jadwal_sholat/' + key)
    except:
        return redirect('../')

if __name__ == '__main__':
    app.run(debug=True)
