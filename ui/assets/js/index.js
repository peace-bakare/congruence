// document.querySelectorAll('div > button').forEach((e) => {
//     e.addEventListener('click',function (){
//         if(document.querySelector('.dropdown.active')){
//             document.querySelector('.dropdown.active').classList.remove('active')
//         }
//         toggleClass('active',this.nextElementSibling);
//     })
// })

// const toggleClass = (className,element) => {
//     if(element.classList.contains(className)){
//         element.classList.remove(className)
//     }else{
//         element.classList.add(className)
//     }
// }

// document.querySelectorAll('.dropdown button').forEach(e => {
//     e.addEventListener('click', function(){
//         document.querySelector('.modal-background').classList.add('active');
//         document.querySelector(`.${this.dataset.target}`).classList.add('active');
//         document.querySelector('.dropdown.active').classList.remove('active')
//     })
// })

document.querySelector('.get-started').addEventListener('click', () => {
    if(document.querySelector('form.active')){
        document.querySelector('form.active').classList.remove('active')
        setTimeout(() => {
            document.querySelector('.signup-artisan').classList.add('active')
            setTimeout(() => {
                document.querySelector('.signup-artisan').classList.add('show')
            },200)
        },300)
    }else{
        document.querySelector('.signup-artisan').classList.add('active')
        setTimeout(() => {
            document.querySelector('.signup-artisan').classList.add('show')
        },200)
    }
})