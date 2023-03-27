document.addEventListener("DOMContentLoaded", function () {

    let zoo = [{
            id: 1,
            animal: "鼠"
        },
        {
            id: 2,
            animal: "牛"
        },
        {
            id: 3,
            animal: "虎"
        },
        {
            id: 4,
            animal: "兔"
        },
        {
            id: 5,
            animal: "龍"
        },
        {
            id: 6,
            animal: "蛇"
        },
        {
            id: 7,
            animal: "馬"
        },
        {
            id: 8,
            animal: "羊"
        },
        {
            id: 9,
            animal: "猴"
        },
        {
            id: 10,
            animal: "雞"
        },
        {
            id: 11,
            animal: "狗"
        },
        {
            id: 12,
            animal: "豬"
        },
        {
            id: 13,
            animal: "貓"
        }
    ];

    let firstOpen = null;
    let secondOpen = null;
    let randomAnimal = [];
    let randomAnimalId = [];
    let completeCardId = [];
    let getSum = 12;
    let point = 0;

    createDiv();

    function getAnimal() {
        let random;
        let random2;
        let randomArr = [];
        let randomAnimalNum = [];
        while (true) {
            random = Math.floor(Math.random() * zoo.length);
            let isSame = false;
            for (let i = 0; i < randomArr.length; i++) {
                if (randomArr[i] == zoo[random].animal) {
                    isSame = true;
                    break;
                }
            }
            if (!isSame) {
                randomArr.push(`${zoo[random].animal}`);
            }
            if (randomArr.length == getSum) {
                break;
            }
        }

        for (let i = 0; i < randomArr.length; i++) {
            randomAnimalNum.push(0);
        }

        while (true) {
            random2 = Math.floor(Math.random() * randomArr.length);
            if (randomAnimalNum[random2] < 2) {
                randomAnimalNum[random2]++;
                randomAnimal.push(randomArr[random2]);
                zoo.forEach(e => {
                    if (e.animal == randomArr[random2]) {
                        randomAnimalId.push(e.id);
                    }
                })
            }
            if (randomAnimal.length >= getSum * 2) {
                break;
            }
        }
        // console.log(randomAnimal);
        // console.log(randomAnimalId);
    }

    function createDiv() {
        getAnimal();
        let str = "";
        for (let i = 0; i < randomAnimal.length; i++) {
            str += `<div class="game-card-box" data-id="${randomAnimalId[i]}">
            <div class="card-style card-font">
                <span>${randomAnimal[i]}</span>
            </div>
            <div class="card-style card-back">

            </div>
        </div>`;
        }
        $(".gmae-site").html(str);
    }

    $(".game-card-box").on("click", cardClick);

    function cardClick() {
        let getId = parseInt($(this).attr("data-id"));
        let num = completeCardId.indexOf(getId);
        let isOpen = $(this).hasClass("actived");
        if (num == -1) {
            if (!isOpen) {
                $(this).addClass("actived");
                if (firstOpen === null) {
                    firstOpen = $(this);
                } else {
                    secondOpen = $(this);
                    isSame();
                }
            }
        }
    }

    function isSame() {
        $(".game-card-box").off("click")
        if (firstOpen.attr("data-id") == secondOpen.attr("data-id")) {
            point++;
            firstOpen = null;
            secondOpen = null;
            $(".game-card-box").on("click", cardClick)
        } else {
            setTimeout(function () {
                firstOpen.removeClass("actived");
                secondOpen.removeClass("actived");
                firstOpen = null;
                secondOpen = null;
                $(".game-card-box").on("click", cardClick);
            }, 500);
        }
    }


})