const words = []
let search = ""
const wordSelect = ""
let $start = $("#start")
let $reStart = $("#reStart")
let $addWords = $("#add")
let $svg = $("#svg")
let $correct = $(".correctSearch")
let $incorrect = $(".incorrectSearch")
let $solution = $(".solution")
let count = 6

function $(elem) {
    return document.querySelector(elem)
}

function removeDiacritics(text) {
    return text
           .normalize('NFD')
           .replace(/([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,"$1")
           .normalize();
}

const addWords = () => {
    let word = prompt("Please enter a word. Max 18 characters, min 2 characters, no numbers or spaces")
    if(word && word.length <= 18 && word.length > 2) {
        for (let i = 0; i < word.length; i++) {
            if(Number(word[i]) || word[i] === " ") {
                alert("no numbers or spaces")
                return
            }
        }
        words.push(removeDiacritics(word).toUpperCase(word))
    } else {
        alert("You must enter one or more words")
    }
}

function onKeyDownHandler(event) {

    var code = event.which || event.keyCode;
    
    if(code >= 65 && code <= 90 || code === 192){
        if(search && count > 0) {
            if(search.includes(String.fromCharCode(code)) || search.includes("Ñ")) {
                str = ""
                for (let index = 0; index < search.length; index++) {
                    if(search[index] === String.fromCharCode(code) && $correct.innerText[index] === "_" || search[index] === "Ñ") {
                        str += search[index]
                    } else if($correct.innerText[index] !== "_") {
                        str += search[index]
                    } else {
                        str += "_"
                    }
                }
                $correct.innerText = str
                if(!$correct.innerText.includes("_")) {
                    $solution.style.display = "inline"
                    $solution.style.color = "blue"
                    $solution.innerText = "WIN CONGRATULATIONS!"
                    $correct.style.color = "blue"
                    $incorrect.style.display = "inline"
                    $incorrect.style.color = "blue"
                    $incorrect.innerText = "WIN CONGRATULATIONS!"
                    $incorrect.style.color = "blue"
                }
                console.log($correct.innerText)
            } else if ($incorrect.innerText.includes(String.fromCharCode(code))) {
                alert("Repeated Letter")
            } else {
                $incorrect.innerText += code === 192 ? ` Ñ ` : ` ${String.fromCharCode(code)} `
                count--
            }
        } else if(search && $correct.innerHTML !== "GAME OVER") {
            count--
        } else {
            return
        }
        
        if(count === 5) {
            $svg.innerHTML += '<path id="head" d="M444.178 148.051C423.266 148.748 403.402 154.591 388.232 169.761C381.583 176.41 377.532 189.338 382.805 198.235C388.127 207.216 400.93 220.157 410.527 224.371C420.306 228.664 435.697 226.468 445.597 223.786C454.339 221.419 462.772 214.24 466.723 206.001C470.907 197.274 473.133 177.719 464.886 170.596C448.02 156.03 424.628 137.539 403.596 155.566" stroke="white" stroke-width="12" stroke-linecap="round"/>'
            anime({
                targets: "#svg #head",
                strokeDashoffset: [anime.setDashoffset, 0],
                easing: "linear",
                duration: 1000,
            })
        } else if (count === 4) {
            $svg.innerHTML += '<path id="body" d="M420.129 233.723C419.293 258.192 414.323 281.681 408.606 305.45C398.232 348.586 388.895 391.178 382.972 435.21C380.359 454.631 377.815 474.326 381.051 493.744" stroke="white" stroke-width="12" stroke-linecap="round"/>'
            anime({
                targets: "#svg #body",
                strokeDashoffset: [anime.setDashoffset, 0],
                easing: "linear",
                duration: 1000,
            })
        } else if (count === 3) {
            $svg.innerHTML += '<path id="leftArm" d="M415.62 266.789C437.443 287.269 449 314.629 463.884 340.103C473.538 356.627 484.772 372.771 495.28 388.533" stroke="white" stroke-width="12" stroke-linecap="round"/>'
            anime({
                targets: "#svg #leftArm",
                strokeDashoffset: [anime.setDashoffset, 0],
                easing: "linear",
                duration: 1000,
            })
        } else if (count === 2) {
            $svg.innerHTML += '<path id="rightArm" d="M415.62 275.807C386.807 291.495 360.912 313.784 335.293 334.091C320.209 346.047 300.992 358.004 289.367 373.503" stroke="white" stroke-width="12" stroke-linecap="round"/>'
            anime({
                targets: "#svg #rightArm",
                strokeDashoffset: [anime.setDashoffset, 0],
                easing: "linear",
                duration: 1000,
            })
        } else if (count === 1) {
            $svg.innerHTML += '<path id="leftLeg" d="M382.554 498.253C402.32 518.539 417.894 542.169 435.661 564.135C448.535 580.053 461.182 597.803 480.25 606.47" stroke="white" stroke-width="12" stroke-linecap="round"/>'
            anime({
                targets: "#svg #leftLeg",
                strokeDashoffset: [anime.setDashoffset, 0],
                easing: "linear",
                duration: 1000,
            })
        } else if (count === 0) {
            $svg.innerHTML += '<path id="rightLeg" d="M382.554 496.75C351.997 520.032 323.37 546.009 293.542 570.231C278.216 582.676 262.961 595.24 248.452 608.641C245.411 611.45 243.273 613.654 241.271 616.991" stroke="white" stroke-width="12" stroke-linecap="round"/>'
            anime({
                targets: "#svg #rightLeg",
                strokeDashoffset: [anime.setDashoffset, 0],
                easing: "linear",
                duration: 1000,
            })
            $correct.innerHTML = "GAME OVER"
            $correct.style.color = "red"
            $solution.style.display = "inline"
            $solution.innerText += search
        }
    }
    
}

const startGame = () => {
    if(words.length <= 0) {
        addWords()
    } else {
        $correct.innerText = ""
        search = ""
        $incorrect.innerText = ""
        $correct.style.color = "white"
        $solution.style.display = "none"
        $solution.innerText = ""
        $solution.style.color = "white"
        $solution.innerText = ""
        $incorrect.style.display = "inline"
        $incorrect.style.color = "white"
        $incorrect.innerText = ""
        count = 6
        let i = Math.floor(Math.random() * words.length)
        for (let index = 0; index < words[i].length; index++) {
            $correct.innerText += "_"
        }
        search += words[i]
        $correct.style.display = "block"
        $start.style.display = "none"
        $reStart.style.display = "block"
        $svg.innerHTML = ""
        $svg.innerHTML += '<path id="structure" d="M6.80123 726.711C14.1397 673.048 24.5804 619.52 32.9369 565.972C52.1281 442.997 72.1529 320.233 89.6339 196.983C98.4808 134.607 105.995 72.0127 116.354 9.85769C117.049 5.6856 119.699 7.08718 123.702 7.43617C153.913 10.0699 184.082 12.4897 214.384 13.9492C254.415 15.8773 294.468 16.7768 334.541 17.1222C370.285 17.4304 406.664 18.7608 442.341 15.7027C455.532 14.5721 457.026 9.71601 455.534 25.3053C452.331 58.7537 448.241 92.1328 445.013 125.59C444.296 133.02 442.675 140.568 442.675 148.051" stroke="white" stroke-width="12" stroke-linecap="round"/>'
        anime({
            targets: "#svg #structure",
            strokeDashoffset: [anime.setDashoffset, 0],
            easing: "linear",
            duration: 1000,
        })
    }
}

const reStart = () => {
    if(words.length <= 0) {
        addWords()
    } else {
        $correct.innerText = ""
        search = ""
        $incorrect.innerText = ""
        $correct.style.color = "white"
        $solution.style.display = "none"
        $solution.innerText = ""
        $solution.style.color = "white"
        $solution.innerText = ""
        $incorrect.style.display = "inline"
        $incorrect.style.color = "white"
        $incorrect.innerText = ""
        count = 6
        let i = Math.floor(Math.random() * words.length)
        for (let index = 0; index < words[i].length; index++) {
            $correct.innerText += "_"
        }
        search += words[i]
        $correct.style.display = "block"
        $start.style.display = "none"
        $reStart.style.display = "block"
        $svg.innerHTML = ""
        $svg.innerHTML += '<path id="structure" d="M6.80123 726.711C14.1397 673.048 24.5804 619.52 32.9369 565.972C52.1281 442.997 72.1529 320.233 89.6339 196.983C98.4808 134.607 105.995 72.0127 116.354 9.85769C117.049 5.6856 119.699 7.08718 123.702 7.43617C153.913 10.0699 184.082 12.4897 214.384 13.9492C254.415 15.8773 294.468 16.7768 334.541 17.1222C370.285 17.4304 406.664 18.7608 442.341 15.7027C455.532 14.5721 457.026 9.71601 455.534 25.3053C452.331 58.7537 448.241 92.1328 445.013 125.59C444.296 133.02 442.675 140.568 442.675 148.051" stroke="white" stroke-width="12" stroke-linecap="round"/>'
        anime({
            targets: "#svg #structure",
            strokeDashoffset: [anime.setDashoffset, 0],
            easing: "linear",
            duration: 1000,
        })
    }
}

window.onload = () => {

    anime({
        targets: "#svg path",
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: "linear",
        duration: 1000,
    })

    anime({
        targets: "#start path",
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: "linear",
        duration: 2300,
    })

    anime({
        targets: "#add path",
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: "linear",
        duration: 3000,
    })
    
}