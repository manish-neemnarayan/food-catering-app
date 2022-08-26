const itemContainer = document.querySelector("#item-container");
const buttons = document.querySelector("#buttons");

// functions
const displayItems = async () => {
    const res = await fetch("/food-items.json")
    const data = await res.json()
    const menu = data;
    const allArr = menu.items.map(item => {
        let ret = `<div class="sm:w-1/2 mb-10 px-4">
                    <div class="rounded-lg h-64 overflow-hidden">
                        <img alt=${item.title} class="object-cover object-center h-full w-full" src=${item.img}>
                    </div>
                    <h2 class="title-font text-2xl font-medium text-gray-900 mt-6 mb-3">${item.title.toUpperCase()}</h2>
                    <p class="leading-relaxed text-base">${item.desc}</p>
                    <span
                        class="flex mx-auto mt-6 text-white justify-center bg-indigo-500 border-0 py-2 px-5 focus:outline-none hover:bg-indigo-600 rounded">Price: ${item.price}</span>
                </div>`
        return ret;
    });

    itemContainer.innerHTML = allArr.join("");

}


const app = async () => {
    const res = await fetch("/food-items.json")
    const data = await res.json()
    const menu = data;

    let uniqueCate = [];

    const cate = menu.items.map(item => {
        return item.category
    })

    uniqueCate = new Set(cate).add("all");
    const arr = Array.from(uniqueCate).map(item => {
        return `
        <button class="px-8  py-2 bg-[#F4BE2C] m-2 rounded-xl text-gray-600  active:scale-50 duration-500 ease-out"
            data-category=${item}>${item.toUpperCase()}</button>
    `
    }).join("")

    buttons.innerHTML = arr;
    const buttonArr = document.querySelectorAll("button");

    // button click listener for filtering
    buttonArr.forEach(btn => {
        btn.addEventListener("click", (e) => {

            if (e.target.dataset.category === "all") {
                displayItems();
            }

            const cateArr = menu.items.filter(item => {
                return item.category === e.target.dataset.category
            })
            console.log(cateArr)
            const allArr = cateArr.map(item => {

                let ret = `<div class="sm:w-1/2 mb-10 px-4">
                            <div class="rounded-lg h-64 overflow-hidden">
                                <img alt=${item.title} class="object-cover object-center h-full w-full" src=${item.img}>
                            </div>
                            <h2 class="title-font text-2xl font-medium text-gray-900 mt-6 mb-3">${item.title}</h2>
                            <p class="leading-relaxed text-base">${item.desc}</p>
                            <span
                                class="flex mx-auto mt-6 text-white justify-center bg-indigo-500 border-0 py-2 px-5 focus:outline-none hover:bg-indigo-600 rounded">Price: ${item.price}</span>
                        </div>`
                return ret;
            });

            itemContainer.innerHTML = allArr.join("");
        })
    })
}
// add event listener to show buttons
window.addEventListener("DOMContentLoaded", app)


// event listeners
window.addEventListener("DOMContentLoaded", displayItems)