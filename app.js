let keysLowerneeeee = $['#keyboard-lower-container'];
let keysUpper = $['#keyboard-upper-container'];
let sentences = [
    'ate neten ite ate nee enet ite ate inet ent eate',
    'Too ato too nOt enot one totA not anot tOO aNot',
    'oat itain oat tain nate eate tea anne inant nean',
    'itant eate anot eat nato inate eat anot tain eat',
    'nee ene ate ite tent tiet ent ine ene ete ene ate'];
let sentencesIndex = 0;
let letterIndex = 0;

// index position
let currentSentence = sentences[sentencesIndex];
let currentLetter = currentSentence[letterIndex];

let mistakes = 0;
let startTime = Date.now()

// actual value of letter
$('#sentence').text(currentSentence);
$('#target-letter').text(currentLetter);

$('#feedback').text();
$('#keyboard-upper-container').hide();

$('body').keydown(function (e) {
    if (e.which === 16) {
        $('#keyboard-upper-container').show();
        $('#keyboard-lower-container').hide();
    }
});

$('body').keyup(function (e) {
    if (e.which === 16) {
        $('#keyboard-upper-container').hide();
        $('#keyboard-lower-container').show();
    }
    $('.highlight').removeClass('highlight');
});

$('body').keypress(function (e) {
    $('#' + e.which).addClass('highlight');
    if (e.which === currentSentence.charCodeAt(letterIndex)) {
        letterIndex++
        $('#feedback').append('<div class="glyphicon glyphicon-ok"></div>');
    } else {
        letterIndex++
        $('#feedback').append('<div class="glyphicon glyphicon-remove"></div>');
        mistakes++;
    }
    if (letterIndex >= currentSentence.length) {
        console.log('no more letters')
        $('.glyphicon').remove();
        $('#yellow-block').css('left', '0px')
        sentencesIndex++;
        currentSentence = sentences[sentencesIndex]
        $('#sentence').text(currentSentence);
        letterIndex = 0;
        if (sentencesIndex >= sentences.length) {
            $('body').off();
            let endTime = Date.now();
            let minutes = (endTime - startTime) / 1000 / 60
            console.log(endTime - startTime);
            let wpm = 56 / minutes - 2 * mistakes;
            $('#sentence').text('GAME OVER your WPM is' + wpm);
            $('#target-letter').empty().append('<button>Play again?</button>').click(function(){
                window.location.reload();
            })
            return
        }
    }
    currentLetter = currentSentence[letterIndex];
    $('#target-letter').text(currentLetter);
    $('#yellow-block').css('left', '+=17.5px');

});
