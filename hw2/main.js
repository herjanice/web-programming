function people_hover(people) {
    let style = people.children[1].children[1].style
    style.opacity = 1
    style.tranisiton = "opacity 0.3s"
}

function people_normal(people) {
    let style = people.children[1].children[1].style
    style.position = "absolute"
    style.opacity = "0"
    style.display = "flex"
    style.FlexDirection = "column"
    style.alignItems = "center" 
}

function check_last_person() {
    let last = document.getElementById("small-layout")
    let big_last = document.getElementById("big-layout")
    let top = document.getElementById("me")
    if(last.childElementCount == 0 && big_last.childElementCount == 1) {
        flex.style = `
            display: grid;
            grid-template-columns: 1fr;
            min-height: 90%;
        `
        last.style = `
            display: none;
        `
    }
    else if(last.childElementCount == 1 && big_last.childElementCount == 0) {
        flex.style = `
            display: grid;
            grid-template-columns: 1fr;
            min-height: 90%;
        `
        document.getElementById("big-layout").style = `
            display: visible;
        `
        last.style = `
            display: none;
        `

        top.classList.remove("people-small")
        top.classList.add("people-big")

        let children = top.children
        for (let i=0; i<children.length; i++){
            let child = children[i]
            if (child.classList.contains("people-small-profile")){
                child.classList.add("people-big-profile")
                child.classList.remove("people-small-profile")
            }
            else if (child.classList.contains("profile-name")){
                child.innerHTML = child.innerText
        }
    }

    let second = top.children[1].children[1].children[0]
    second.classList.remove("hover-small-button")
    second.classList.add("hover-big-button")

    let image = top.children[1].children[0]
    image.classList.add("big-profile-image")
    image.classList.remove("profile-image")

    let big_layout = document.getElementById("big-layout")
    big_layout.appendChild(top)
    }
}


function remove_people(people) {
    let id = people.parentNode.parentNode.id
    let to_delete = document.getElementById(id)

    if (to_delete.classList.contains("people-big")) {
        flex.style = `
        display: grid;
        grid-template-columns: 1fr;
        min-height: 90%;
    `
        document.getElementById("big-layout").style = `
            display: none;
        `
    }

    to_delete.remove()

    check_last_person()
    
}

function minimize_people(top) {

    flex.style = `
        display: grid;
        grid-template-columns: 1fr;
        min-height: 90%;
    `
    document.getElementById("big-layout").style = `
        display: none;
    `

    top.classList.add("people-small")
    top.classList.remove("people-big")

    let children = top.children
    for (let i=0; i<children.length; i++){
        let child = children[i]
        if (child.classList.contains("people-big-profile")){
            child.classList.add("people-small-profile")
            child.classList.remove("people-big-profile")
        }
        else if (child.classList.contains("profile-name")){
            child.innerHTML = child.innerText
        }
    }

    let second = top.children[1].children[1].children[0]
    second.classList.remove("hover-big-button")
    second.classList.add("hover-small-button")

    let image = top.children[1].children[0]
    image.classList.add("profile-image")
    image.classList.remove("big-profile-image")

    let small_layout = document.getElementById("small-layout")
    small_layout.appendChild(top)
}

function maximize_people(top) {

    flex.style = `
        display: grid;
        grid-template-columns: 2.5 1fr;
        min-height: 90%;
    `
    document.getElementById("big-layout").style = `
        display: visible;
    `

    top.classList.remove("people-small")
    top.classList.add("people-big")

    let children = top.children
    for (let i=0; i<children.length; i++){
        let child = children[i]
        if (child.classList.contains("people-small-profile")){
            child.classList.add("people-big-profile")
            child.classList.remove("people-small-profile")
        }
        else if (child.classList.contains("profile-name")){
            child.innerHTML = child.innerText
        }
    }

    let second = top.children[1].children[1].children[0]
    second.classList.remove("hover-small-button")
    second.classList.add("hover-big-button")

    let image = top.children[1].children[0]
    image.classList.add("big-profile-image")
    image.classList.remove("profile-image")

    let big_layout = document.getElementById("big-layout")
    big_layout.appendChild(top)
}

function pin_people(people) {
    let flex =  document.getElementById("flex")
    let id_check = people.id

    let top_id = people.parentNode.parentNode.parentNode.parentNode.parentNode.id
    let top = document.getElementById(top_id)

    let last = document.getElementById("small-layout")
    let big_last = document.getElementById("big-layout")

    if(last.childElementCount == 0 && big_last.childElementCount == 1) {
        return 
    }
    else if(last.childElementCount == 1 && big_last.childElementCount == 0) {
        return
    }

    if(top.classList.contains("people-big")){
        document.getElementById(id_check).checked = false
        console.log("smaller")
        minimize_people(top)
    }

    else {
        document.getElementById(id_check).checked = true
        let main = document.getElementById("big-layout")
        if(main.childElementCount != 0)
        {
            minimize_people(main.children[0])
        }
        maximize_people(top)
    }
}
