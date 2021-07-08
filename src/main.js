const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
// 只有用户清理浏览器 cookie 时 localStorage 才会被删除
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [
    {logo: 'A', url: 'https://www.acfun.cn/'},
    {logo: 'B', url: 'https://www.bilibili.com/'},
]


const simplifyUrl = (url) => {
    return url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/, '')
}

const render = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node, index) => {
        const $li = $(`
        <li>
            <div class="site">
                <div class="logo">${node.logo[0]}</div>
                <div class="link">${simplifyUrl(node.url)}</div>
                <div class="close">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-close"></use>
                    </svg>
                </div>
            </div>
        </li>
        `).insertBefore($lastLi)
        $li.on('click', () => {
            window.open(node.url) // 打开新窗口跳转到 url
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation() // 阻止冒泡
            hashMap.splice(index, 1)
            render()
        })
    })
}

render()

$('.addButton')
    .on('click', () => {
        let url = window.prompt('输入要添加的网址')
        if (url.indexOf('http') !== 0) {
            url = 'https://' + url
        }
        hashMap.push({
            logo: simplifyUrl(url)[0].toUpperCase(),
            logoType: 'text',
            url: url
        })
        $siteList.find('li:not(.last)').remove()
        render()
    })

window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x', string)
}

// 通过alt + 数字组合键，实现打开第 n 个网站
$(document).on('keyup', (e) => {
    var e = e || window.e
    altKey1 = e.altKey
    key2 = e.key
    if (altKey1 && key2) {
        window.open(hashMap[parseInt(key2) - 1].url)
    }
})

// 随机更改背景图片
// const changeBackground = () => {
//     imgArr=["backgrounds/1.jpg",
//         "backgrounds/2.jpg",
//         "backgrounds/3.jpg"];
//     let index =parseInt(Math.random()*(imgArr.length))
//     let currentImage=imgArr[index]
//     console.log(currentImage)
//     $('body').css({"background-image":"url('backgrounds/3.jpg')"});
//     document.getElementById("BackgroundArea").style.backgroundImage="url("+currentImage+")";
// }
// changeBackground()
