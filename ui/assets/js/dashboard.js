document.querySelectorAll('.tabs-button').forEach(e => {
    e.addEventListener('click', () => {
        if(e.dataset.target == 'projects'){
            document.querySelector('.indicator').classList.remove('right')
            document.querySelector('.tab.active').classList.remove('active')
            document.querySelector('.projects').classList.add('active')
            document.querySelector('.tabs-button.active').classList.remove('active')
            document.querySelector('.tabs-button:first-of-type').classList.add('active')
        }else{
            document.querySelector('.indicator').classList.add('right')
            document.querySelector('.tab.active').classList.remove('active')
            document.querySelector('.reviews').classList.add('active')
            document.querySelector('.tabs-button.active').classList.remove('active')
            document.querySelector('.tabs-button:last-of-type').classList.add('active')
        }
    })
})