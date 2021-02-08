const start = document.getElementById('start');
const help = document.getElementById('help');
const infoPlayer = document.getElementById('info_player');
const simon = document.getElementById('simon')
const restart = document.getElementById('restart')

let machineColors = [];
let playerColors = [];
let round = 0;

help.addEventListener('click', showAlerte);
start.addEventListener('click', startGame);
restart.addEventListener('click', restartGame)
simon.addEventListener('click', event => {
    console.log('Human click')
    const colorHuman = event.target.id

    if(colorHuman) {
        lightColor(colorHuman)
        checkSuiteofColors(colorHuman)
    }
})

function checkSuiteofColors(colorHuman) {
    const index = playerColors.push(colorHuman) - 1;

    if (playerColors[index] !== machineColors[index]) {
        gameOver();
        return;
      }

    if( machineColors.length === playerColors.length) {
        playerColors = [];
        infoPlayer.innerText = ''
        displayInfoPlayer('Round validé ! Passez au prochain !')

        setTimeout(() => {
            nextRound()
        }, 1000)
        return;
    }
}

function gameOver() {
    Swal.fire({
        title: 'Game Over ! Do you want to replay ?',
        icon: 'error',
        showCancelButton: true,
        confirmButtonText: `Replay`,
        denyButtonText: `Don't replay`,
      }).then((result) => {
        if (result.isConfirmed) {
            restartGame()
        } else if (result.isDenied) {
          Swal.fire('Merci d\'avoir participé !', '', 'error')
        }
      })
}

function restartGame() {
    console.log("restart")
    machineColors = [];
    playerColors = [];
    round = 0;
    start.classList.remove('hidden');
    infoPlayer.classList.add('hidden');
    Swal.fire({
        title: 'Restart !',
        icon: 'success',
        timer: 300,
        showConfirmButton: false,
    })
    setTimeout(() => {
        startGame()
    }, 1000) 
}

function showAlerte(event) {
        event.preventDefault$
        Swal.fire({
            title: '<strong>Règle du <u>Grand Simon</u></strong> </br>',
            icon: 'info',
            html:
                'START pour commencer une partie. </br> ' +
                'RESTART pour recommer en partie </br>' +
                '<h3>Etape 1 : </h3>' +
                'A chaque tour, l\'ordinateur éclaire de manière aléatoire une couleur et produit un son associée a cette couleur. </br>' +
                '<h3>Etape 2 : </h3>' +
                'Vous devez alors appuyez sur la case de la couleur qui vient de s\'allumer dans délai assez court.' +
                '<h3>Etape 3 :</h3>' + 
                'A chaque couleur valide, l\'ordinateur ajoute une nouvelle couleur. </br>' +
                'Le but du jeu étant de reproduire la plus longue suite de couleurs',
            showCloseButton: true,
            confirmButtonText:
                '<i class="fa fa-thumbs-up"></i> Compris!',
            allowOutsideClick: false
    });
    console.log('show');    
}

function lightColor(color = null) {
    console.log('ligh color')
    if(color !== null) {
        var color = document.getElementById(color);
        color.style.opacity = '0.6';
        setTimeout(() => { color.style.opacity = '0.8'} , 300);  
    }
}

function startGame() {
    console.log("start");
    start.classList.add('hidden');
    restart.style.display = 'block'
    simon.style.pointerEvents = 'auto'
    displayInfoPlayer('Au tour de l\'ordinateur');
    nextRound();
}

function nextRound() {
    infoPlayer.innerText = ''
    displayInfoPlayer('Au tour de l\'ordinateur');
    console.log('Next round')
    round++;

    const nextMachineColors = [];
    nextMachineColors.push(nextColor());
    machineRound(nextMachineColors);

    machineColors = [];
    setTimeout(() => {
        playerRound(round)}, round * 600 + 1000)
}


function nextColor() {
    console.log('Next color');
    const colors = ['red', 'blue', 'yellow', 'green'];
    const colorIs = colors[Math.floor(Math.random() * colors.length) ];

    return colorIs;
}

function machineRound(nextMachineColors) {
    console.log("Machine round")
    nextMachineColors.forEach((color, index) => {
        setTimeout(() => {
            lightColor(color)
        }, (index + 1) * 600)
    });
}

function displayInfoPlayer(texte) {
    console.log('display');
    infoPlayer.classList.remove('hidden');
    infoPlayer.innerText += texte;

    Popper.createPopper(game, infoPlayer, {
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, 8],
            },
          },
        ],
      });
}

function playerRound(round) {
    console.log('Player ROUND')
    infoPlayer.innerText = ''
    displayInfoPlayer('A votre tour')

}
