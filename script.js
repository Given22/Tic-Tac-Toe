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
    console.log(flat)
    for(const key of plane){
        const box = document.querySelector(`.box_${key}`)
        if(box.hasChildNodes()) box.removeChild(document.querySelector('.img'))
    }
}

const hidden = (player, draw = false) => {
    page.classList.toggle('hidden')
    overlay.classList.toggle('hidden')
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
            box.appendChild(el)
            el.src = player ? './Assets/close.PNG' : './Assets/o.PNG'
            el.classList.add('img')
            round += 1;
        }
        checkWin(player, flat, round)
        changePlayer()
    })
}

function checkWin(player, f, r){
    const winningConditions = [
        ['one','two','three'],
        ['four','five','six'],
        ['seven','eight','nine'],
        ['one','four','seven'],
        ['two','five','eight'],
        ['three','eight','nine'],
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
    hidden()
})
document.querySelector('.close-page').addEventListener('click', ()=>{
    restart()
    hidden()
})


document.addEventListener('keydown', function(e){
    if(e.key === 'Escape' && !page.classList.contains('hidden')){
        restart()
        hidden()
    }
})

