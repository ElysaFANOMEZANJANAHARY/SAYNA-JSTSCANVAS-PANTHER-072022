// debut de fadeIn
window.addEventListener('scroll', reveal)

function reveal() {
    var faders = document.querySelectorAll('.fade-in');

    for(let i = 0; i < faders.length; i++) {
        let windowHeight = window.innerHeight;
        let revealTop = faders[i].getBoundingClientRect().top;
        let revealPoint = 150;

        if(revealTop < windowHeight - revealPoint) {
            faders[i].classList.add('show-content');
        }
        else {
            faders[i].classList.remove('show-content');
        }
    }
};

$(document).ready(function() {

    // debut de slide des lignes et reseaux sociaux
    $(".barre").hide();
    setTimeout(() => {
        $(".barre").slideDown(5000);
    }, 2000);

    // debut des zomm des h1, h2
    $("h1").mouseover(function() {
        $(this).css("transform", "scale(1.2)");
    });
    $("h1").mouseleave(function() {
        $(this).css("transform", "scale(1)");
    });
    $("h2").mouseover(function() {
        $(this).css("transform", "scale(1.2)");
    });
    $("h2").mouseleave(function() {
        $(this).css("transform", "scale(1)");
    });
});



window.onload = function() {

    // #initialement le popup est cache
    $('#box-popup').hide();
    $('#chrono').hide();
    // variable de l'enigme courante
    let current_enigme = 0;
    // Fin
    let badResponse = true; // dans le cas d'une mauvaise reponse
    // l'ensemble des enigme stocké dans une variable
    let data_enigme = [{
            "enonce": "Prouve ton talent d’espion et déchiffre cette réplique d’Okoyé écrite en Wakandais, et apprend par la même occasion la première valeur d’ une Dora Milaje!",
            "enigme": " <span class='panthera-letter'>SI JE SUIS FIDELE C’EST A CE TRONE PEU IMPORTE QUI MONTE DESSUS </span>",
            "reponse": "SI JE SUIS FIDELE C’EST A CE TRONE PEU IMPORTE QUI MONTE DESSUS",
            "asavoir": "<p>Voici la transicription de l’alphabet :</p> <p class='alphabet> A = < span > A < /span> ; B = <span> B </span > ;C = < span > C < /span> ; D = <span> D </span > ;E = < span > E < /span> ; F = <span> F </span > ;G = < span > G < /span> ; H = <span> H </span > ;I = < span > I < /span> ; J = <span> J </span > ;K = < span > K < /span> ; L = <span> L </span > ;M = < span > M < /span> ; N = <span> N </span > ;O = < span > O < /span> ; P = <span> P </span > ;Q = < span > Q < /span> ; R = <span> R </span > ;S = < span > S < /span> ; T =<span> T </span > ;U = < span > U < /span> ; W = <span> W </span > ;X = < span > X < /span> ; Y = <span> Y </span > ;Z = < span > Z < /span> </p > "
        },
        {
            "enonce": "Une anecdote intéressante est écrite juste en dessous mais elle est codée par un code césar également appelé code de chiffrement par décalage . L’alphabet a été décalé, trouve la clé de chiffrement qui te permettrait de retrouver les lettres et retranscris la phrase :",
            "enigme": "Tm nqtu lmjcbm i Wikstivl mv Kitqnwzvqm. Qt a'ioqb lm ti dqttm lwvb mab wzqoqviqzm Zgiv Kwwotmz mb moitmumvb ti dqttm ycq i dc viqbzm tm uwcdmumvb xwtqbqycm lma jtiks xivbpmza",
            "reponse": "1",
            "asavoir": "Plusieurs sources s’entendent pour dire que la lettre la plus utilisée en français est la lettre E.En pourcentage de fréquence, la lettre est utilisée à 14 % dans une phrase.Et si tu regardais quel symbole revient le plus souvent ? "
        },
        {
            "enonce": "Lorsque T’Challa mange l’herbe en forme de coeur pour recevoir les pouvoirs du Black Panther, il voit son père afin de lui demander conseil afin de devenir un bon roi. Cette scène rappelle la même scène d’un certain film où un père dit à son fils de ne pas oublier qui il est et d’où il vient. Quel est ce film ?",
            "enigme": "01001100 01000101 00100000 01010010 01001111 01001001 00100000 01001100 01001001 01001111 01001110 00001101 00001010",
            "reponse": "1",
            "asavoir": "Le philosophe Francis Bacon inventa en 1605 un alphabet bilitère, uniquement composé des deux lettres A et B. Cest en quelque sorte lancêtre du système binaire des ordinateurs actuels car toute lettre pouvait être construite avec un enchainement précis de ces deux lettres, tandis que le système binaire informatique utilise 0 et 1."
        }
    ];

    // reglage de la deadline du compte à rebours [FONCTION DE DEADLINE]

    let deadline = new Date('2023/07/25').getTime();
    let compte_rebours = setInterval(() => {
        let todays = new Date().getTime();
        let diffTime = deadline - todays;
        let hours = Math.floor(diffTime / (1000 * 60 * 60));
        let minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((diffTime % (1000 * 60)) / 1000);
        let affHours = hours < 10 ? '0' + hours : hours;
        let affMinutes = minutes < 10 ? '0' + minutes : minutes;
        let affSeconds = seconds < 10 ? '0' + seconds : seconds;
        $('#hour').text(affHours + ' : ' + affMinutes + ' : ' + affSeconds);
    }, 1000);
    compte_rebours;
  

    // lors de l'envoi du formulaire
    $('#enigme-form').submit(function(e) {
        e.preventDefault();
        if (current_enigme < data_enigme.length) {
            let quiz_enigme = data_enigme[current_enigme];
            let userResponse = $('#reponse').val();
            if (quiz_enigme.reponse == $('#reponse').val()) {
                $('#titre_popup').text('Bonne reponse ! Vous semblez connaitre le jeux').css('color', 'white');
                $('#btn-popup').text('Enigme suivante >');
                $('#box-popup').show();
                current_enigme++;
                badResponse = false;
            } else {
                $('#titre_popup').text('Mauvaise reponse! reflechissez encore').css('color', 'red');
                $('#btn-popup').text('réessayez encore');
                $('#box-popup').show();
                badResponse = true
            }
            if (current_enigme == data_enigme.length) {
                $('#titre_popup').text('Ton initiation est terminée !').css('color', 'white');
                $('#btn-popup').text('Revenir à l\'accueil').attr('href', 'index.html');
                $('#chrono').show();
                $('#box-popup').show();
            }
        }
    });
    // Fin envoi formulaire
    $('#btn-popup').click(function() {
        if (badResponse) {
            $('#reponse').val("");
            $('#box-popup').hide();
        } else {
            $('#number_enigme').html("ENIGME NUMERO " + (current_enigme + 1));
            $('#reponse').val("");
            $('#enonce').html(data_enigme[current_enigme].enonce);
            $('#enigme-text').html(data_enigme[current_enigme].enigme);
            $('#a_savoir').html(data_enigme[current_enigme].asavoir);
            $('#box-popup').hide();
        }
    })




}
