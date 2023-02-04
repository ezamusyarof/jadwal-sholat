function updateClock(){
    var now = new Date();
    var hou = now.getHours(),
        min = now.getMinutes(),
        sec = now.getSeconds();

    if (hou == 24) { hou = 0; }

    function pad(num){
        var result;
        if (num < 10){ result = '0' + num; }
        else { result = num; }
        return result;
    }

    var ids = ["hour","minutes","seconds"];
    values = [pad(hou),pad(min),pad(sec)]
    for (var i = 0; i < ids.length; i++) {
        document.getElementById(ids[i]).innerHTML = values[i];
    }

    // tandai waktu sholat sekarang
    function hitung (jam_a, min_a, jam_b, min_b, sholat, sholat1) {
        if ((hou >= (parseInt(jam_a))) && ((hou <= parseInt(jam_b)) || ((hou <= parseInt(jam_b)+24) && parseInt(jam_b) < 6))) {
            if (((parseInt(jam_a) == hou) && (parseInt(min_a) < min)) || ((parseInt(jam_b) == hou) && (parseInt(min_b) > min)) || ((parseInt(jam_a) != hou) && (parseInt(jam_b) != hou))) {
                document.getElementById(sholat).className = "now";
                document.getElementById(sholat1).className = "now";
                return true;
            }
        }
    }

    // cari waktu sholat yang mendekati
    function cari (a) {
        switch (a) {
            case 1 :
                var jam_a = '{{ data_jadwal["data"]["jadwal"]["subuh"][0] }}' + '{{ data_jadwal["data"]["jadwal"]["subuh"][1] }}';
                var min_a = '{{ data_jadwal["data"]["jadwal"]["subuh"][3] }}' + '{{ data_jadwal["data"]["jadwal"]["subuh"][4] }}';
                var jam_b = '{{ data_jadwal["data"]["jadwal"]["dhuha"][0] }}' + '{{ data_jadwal["data"]["jadwal"]["dhuha"][1] }}';
                var min_b = '{{ data_jadwal["data"]["jadwal"]["dhuha"][3] }}' + '{{ data_jadwal["data"]["jadwal"]["dhuha"][4] }}';
                if (hitung(jam_a, min_a, jam_b, min_b, "dhuha", "dhuha1") == true) { break; }
            case 2 :
                var jam_a = '{{ data_jadwal["data"]["jadwal"]["dhuha"][0] }}' + '{{ data_jadwal["data"]["jadwal"]["dhuha"][1] }}';
                var min_a = '{{ data_jadwal["data"]["jadwal"]["dhuha"][3] }}' + '{{ data_jadwal["data"]["jadwal"]["dhuha"][4] }}';
                var jam_b = '{{ data_jadwal["data"]["jadwal"]["dzuhur"][0] }}' + '{{ data_jadwal["data"]["jadwal"]["dzuhur"][1] }}';
                var min_b = '{{ data_jadwal["data"]["jadwal"]["dzuhur"][3] }}' + '{{ data_jadwal["data"]["jadwal"]["dzuhur"][4] }}';
                if (hitung(jam_a, min_a, jam_b, min_b, "dzuhur", "dzuhur1") == true) { break; }
            case 3 :
                var jam_a = '{{ data_jadwal["data"]["jadwal"]["dzuhur"][0] }}' + '{{ data_jadwal["data"]["jadwal"]["dzuhur"][1] }}';
                var min_a = '{{ data_jadwal["data"]["jadwal"]["dzuhur"][3] }}' + '{{ data_jadwal["data"]["jadwal"]["dzuhur"][4] }}';
                var jam_b = '{{ data_jadwal["data"]["jadwal"]["ashar"][0] }}' + '{{ data_jadwal["data"]["jadwal"]["ashar"][1] }}';
                var min_b = '{{ data_jadwal["data"]["jadwal"]["ashar"][3] }}' + '{{ data_jadwal["data"]["jadwal"]["ashar"][4] }}';
                if (hitung(jam_a, min_a, jam_b, min_b, "ashar", "ashar1") == true) { break; }
            case 4 :
                var jam_a = '{{ data_jadwal["data"]["jadwal"]["ashar"][0] }}' + '{{ data_jadwal["data"]["jadwal"]["ashar"][1] }}';
                var min_a = '{{ data_jadwal["data"]["jadwal"]["ashar"][3] }}' + '{{ data_jadwal["data"]["jadwal"]["ashar"][4] }}';
                var jam_b = '{{ data_jadwal["data"]["jadwal"]["maghrib"][0] }}' + '{{ data_jadwal["data"]["jadwal"]["maghrib"][1] }}';
                var min_b = '{{ data_jadwal["data"]["jadwal"]["maghrib"][3] }}' + '{{ data_jadwal["data"]["jadwal"]["maghrib"][4] }}';
                if (hitung(jam_a, min_a, jam_b, min_b, "maghrib", "maghrib1") == true) { break; }
            case 5 :
                var jam_a = '{{ data_jadwal["data"]["jadwal"]["maghrib"][0] }}' + '{{ data_jadwal["data"]["jadwal"]["maghrib"][1] }}';
                var min_a = '{{ data_jadwal["data"]["jadwal"]["maghrib"][3] }}' + '{{ data_jadwal["data"]["jadwal"]["maghrib"][4] }}';
                var jam_b = '{{ data_jadwal["data"]["jadwal"]["isya"][0] }}' + '{{ data_jadwal["data"]["jadwal"]["isya"][1] }}';
                var min_b = '{{ data_jadwal["data"]["jadwal"]["isya"][3] }}' + '{{ data_jadwal["data"]["jadwal"]["isya"][4] }}';
                if (hitung(jam_a, min_a, jam_b, min_b, "isya", "isya1") == true) { break; }
            case 6 :
                var jam_a = '{{ data_jadwal["data"]["jadwal"]["isya"][0] }}' + '{{ data_jadwal["data"]["jadwal"]["isya"][1] }}';
                var min_a = '{{ data_jadwal["data"]["jadwal"]["isya"][3] }}' + '{{ data_jadwal["data"]["jadwal"]["isya"][4] }}';
                var jam_b = '{{ data_jadwal["data"]["jadwal"]["subuh"][0] }}' + '{{ data_jadwal["data"]["jadwal"]["subuh"][1] }}';
                var min_b = '{{ data_jadwal["data"]["jadwal"]["subuh"][3] }}' + '{{ data_jadwal["data"]["jadwal"]["subuh"][4] }}';
                if (hitung(jam_a, min_a, jam_b, min_b, "subuh", "subuh1") == true) { break; }
                break;
        }
    }
    cari(1);
    cari(2);
    cari(3);
    cari(4);
    cari(5);
    cari(6);
}

function initClock(){
    updateClock();
    window.setInterval("updateClock()", 1);
}