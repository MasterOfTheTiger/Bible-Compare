function getVerses(reference, version, place) {
    document.getElementById('result' + place).display = 'none';
    url = 'https://api.biblia.com/v1/bible/content/' + version + '.txt?passage=' + reference + '&callback=myCallbackFunction&key=626c526fb489a7fbe1ad4a757e8f8f73';
    console.log(url);
    fetch(url)
        .then(response => response.text())
        .then(result => {
            if (result != '') {
                document.getElementById('script' + place).innerHTML = result;
                document.getElementById('ref' + place).innerHTML = reference;
                document.getElementById('error' + place).style.display = 'none';
                var words = words = result.split(' ').length;
                
                var chars = result.split(' ');
                chars = chars.join('').length;

                var stats = document.getElementById('stats' + place);
                stats.style.display = 'initial';

                document.getElementById('words' + place).innerHTML = words;
                document.getElementById('chars' + place).innerHTML = chars;
            } else {
                document.getElementById('error' + place).style.display = 'block';
                document.getElementById('error' + place).innerHTML = 'It looks like there is a problem with your query.';
                setTimeout(function () { document.getElementById('error' + place).style.display = "none" }, 5000);
            }
            document.getElementById('result' + place).display = 'block';
            return result;
        });
}
function start(place) {
    input = document.getElementById('search' + place).value;
    if (input != '') {
        var version = document.getElementById('translation' + place).value;
        getVerses(input, version, place);
    }
}
if (!navigator.onLine) {
    document.getElementById('error1').style.display = 'block';
    document.getElementById('error1').innerHTML = 'Check your internet connection';
} else {
    document.getElementById('error1').style.display = 'none';
}

document.getElementById("button1").addEventListener("click", function() {
    start(1);
    start(2);
});
