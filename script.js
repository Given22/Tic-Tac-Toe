const plane = ['one','two','three','four','five','six','seven','eight','nine']

const page = document.querySelector('.page');
const overlay = document.querySelector('.overlay')
const btnClosePage = document.querySelector('.close-page')
const p = document.querySelector('.p-page')

const again = document.querySelector('.again')

let flat = {}

let player = 0

let round = 0

let win = false

function changePlayer(){
    player = player ? 0 : 1
}

function restart(){
    flat = {}
    win = false
    round = 0
    player = 0
    for(const key of plane){
        const box = document.querySelector(`.box_${key}`)
        if(box.hasChildNodes()) box.removeChild(document.querySelector('svg'))
    }
}

const hiddenAdd = () => {
    page.classList.add('hidden')
    overlay.classList.add('hidden')
}

const hidden = (player, draw = false) => {
    page.classList.remove('hidden')
    overlay.classList.remove('hidden')
    if(!draw){
        p.textContent = !player ? 'Congratulations! Player O Win!' : 'Congratulations! Player X Win!'
    }else{
        p.textContent = 'Draw!'
    }
}

for(const key of plane){
    const box = document.querySelector(`.box_${key}`)
    box.addEventListener('click', () => {
        if(!(`${key}` in flat)){
            flat[`${key}`] = player
            const el = document.createElement("img");
            box.innerHTML = player ? '<span class="iconify" data-icon="emojione-v1:heavy-multiplication-x"></span>' : '<span class="iconify" data-icon="charm:circle"></span>'
            // el.classList.add('img')
            round += 1;
            checkWin(player, flat, round)
            changePlayer()
        }else{
            checkWin(player, flat, round)
        }
        
    })
}

function checkWin(player, f, r){
    const winningConditions = [
        ['one','two','three'],
        ['four','five','six'],
        ['seven','eight','nine'],
        ['one','four','seven'],
        ['two','five','eight'],
        ['three','six','nine'],
        ['one','five','nine'],
        ['three','five','seven']
    ]

    for(const i of winningConditions){
        if(i[0] in f && i[1] in f && i[2] in f){
            if(f?.[`${i[0]}`] === f?.[`${i[1]}`] && f?.[`${i[1]}`] === f?.[`${i[2]}`]){
                win = true
                hidden(player)
            }
        }
    }
    if(round === 9 && !win) hidden(player, true)
}

again.addEventListener('click', restart)

overlay.addEventListener('click', ()=>{
    restart()
    hiddenAdd()
})
document.querySelector('.close-page').addEventListener('click', ()=>{
    restart()
    hiddenAdd()
})


document.addEventListener('keydown', function(e){
    if(e.key === 'Escape' && !page.classList.contains('hidden')){
        restart()
        hiddenAdd()
    }
})

