let data = ["","","",""]
const linkBtn = document.getElementById("link-btn")
const tagBtn = document.getElementById("tag-btn")
const linkInp = document.getElementById("link-inp")
const tagInp = document.getElementById("tag-inp")
const title = document.getElementById("name")
const comment = document.getElementById("comment")
const mainBtn =document.getElementById("main-btn")
// console.log(document.location.href) return address from the address bar
// console.log("Hello")
linkBtn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    data[0]= tabs[0].url
    linkInp.value = data[0]
    })
})

tagBtn.addEventListener("click", function () {
    data[1] = tagInp.value
})

title.addEventListener("click", function () {
    title.value =""    
})

comment.addEventListener("click", function () {
    comment.value =""    
})

mainBtn.addEventListener("click", async function () {
    data[2] = title.value
    data[3] = comment.value
    // console.log(data)
    await createEntry({ title: data[2] , comment: data[3], link: data[0], tags: data[1]});

})
