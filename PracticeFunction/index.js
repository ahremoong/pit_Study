document.querySelector(".setMaxNumberButton").addEventListener("click", () => {
    let nMaxNumber = document.querySelector(".inputMaxNumber").value;
    document.querySelectorAll(".setAmountMaxNumber").forEach(element => {
        element.textContent = "+" + nMaxNumber;
        element.style.display = "block";
    });
});

let Amounts = Array.from(document.querySelectorAll(".amount").textContent)

// + 버튼 클릭 시
document.querySelector(".setAmountPlus").addEventListener("click", () => {
    console.log(Amounts)
    let nowTotalAmount = parseInt(document.querySelector(".amountResult").textContent, 10);
    nowTotalAmount += 5000;
    document.querySelector(".amountResult").textContent = nowTotalAmount;
})

// - 버튼 클릭 시
document.querySelector(".setAmountMinus").addEventListener("click", () => {
    let nowTotalAmount = parseInt(document.querySelector(".amountResult").textContent, 10);
    nowTotalAmount -= 5000;
    document.querySelector(".amountResult").textContent = nowTotalAmount;
})

// 5,000원 MaxButton 버튼 클릭 시
document.querySelector(".setAmountMaxNumber").addEventListener("click", () => {
    let nowTotalAmount = parseInt(document.querySelector(".amountResult").textContent, 10);
    let nMaxNumber = document.querySelector(".inputMaxNumber").value;
    nowTotalAmount += (5000 * nMaxNumber);
    document.querySelector(".amountResult").textContent = nowTotalAmount;
})