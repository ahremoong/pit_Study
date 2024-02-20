document.querySelector(".setMaxNumberButton").addEventListener("click", () => {
    let nMaxNumber = document.querySelector(".inputMaxNumber").value;
    document.querySelector(".setAmount1MaxNumber").textContent = "+" + nMaxNumber;
    document.querySelector(".setAmount1MaxNumber").style.display = "block";
    document.querySelector(".setAmount2MaxNumber").textContent = "+" + nMaxNumber;
    document.querySelector(".setAmount2MaxNumber").style.display = "block";
    document.querySelector(".setAmount3MaxNumber").textContent = "+" + nMaxNumber;
    document.querySelector(".setAmount3MaxNumber").style.display = "block";
});


// 5,000원 + 버튼 클릭 시
document.querySelector(".setAmount1Plus").addEventListener("click", () => {
    let nowTotalAmountR = document.querySelector(".amountResult").textContent; //총 금액이 문자인걸 숫자로 변환한 값
    let nowTotalAmount = parseInt(nowTotalAmountR.replace(/,/g, ""), 10); //총 금액이 문자인걸 숫자로 변환한 값
    
    if(nowTotalAmount >= 100000){
        nowTotalAmount = 100000
    }else{

        nowTotalAmount += 5000; //숫자 돈
    }
    console.log(nowTotalAmount)
    
    let nowTotalAmountRC = nowTotalAmount.toLocaleString(); // 숫자 돈에 콤마 찍고 총 금액에 넣어주기
    document.querySelector(".amountResult").textContent = nowTotalAmountRC; // 숫자 돈에 콤마 찍고 총 금액에 넣어주기

})


// 5,000원 - 버튼 클릭 시
document.querySelector(".setAmount1Minus").addEventListener("click", () => {
    let nowTotalAmountR = document.querySelector(".amountResult").textContent; //총 금액이 문자인걸 숫자로 변환한 값
    let nowTotalAmount = parseInt(nowTotalAmountR.replace(/,/g, ""), 10); //총 금액이 문자인걸 숫자로 변환한 값
    if(nowTotalAmountR <= 0){
        nowTotalAmountR = 0
        document.querySelector(".amountResult").textContent = nowTotalAmountR;
    }else{
        nowTotalAmount -= 5000; //숫자 돈
        console.log(nowTotalAmount)
        
        let nowTotalAmountRC = nowTotalAmount.toLocaleString(); // 숫자 돈에 콤마 찍고 총 금액에 넣어주기
        document.querySelector(".amountResult").textContent = nowTotalAmountRC; // 숫자 돈에 콤마 찍고 총 금액에 넣어주기
    }
})




/***********************************************************************************************************/
// 10,000원 + 버튼 클릭 시
document.querySelector(".setAmount2Plus").addEventListener("click", () => {
    let nowTotalAmount = parseInt(document.querySelector(".amountResult").textContent, 10);
    nowTotalAmount += 10000;
    document.querySelector(".amountResult").textContent = nowTotalAmount;

})

// 50,000원 + 버튼 클릭 시
document.querySelector(".setAmount3Plus").addEventListener("click", () => {
    let nowTotalAmount = parseInt(document.querySelector(".amountResult").textContent, 10);
    nowTotalAmount += 50000;
    document.querySelector(".amountResult").textContent = nowTotalAmount;
})

// 10,000원 - 버튼 클릭 시
document.querySelector(".setAmount2Minus").addEventListener("click", () => {
    let nowTotalAmount = parseInt(document.querySelector(".amountResult").textContent, 10);
    nowTotalAmount -= 10000;
    document.querySelector(".amountResult").textContent = nowTotalAmount;

})

// 50,000원 - 버튼 클릭 시
document.querySelector(".setAmount3Minus").addEventListener("click", () => {
    let nowTotalAmount = parseInt(document.querySelector(".amountResult").textContent, 10);
    nowTotalAmount -= 50000;
    document.querySelector(".amountResult").textContent = nowTotalAmount;
})

// 5,000원 MaxButton 버튼 클릭 시
document.querySelector(".setAmount1MaxNumber").addEventListener("click", () => {
    let nowTotalAmount = parseInt(document.querySelector(".amountResult").textContent, 10);
    let nMaxNumber = document.querySelector(".inputMaxNumber").value;
    nowTotalAmount += (5000 * nMaxNumber);
    document.querySelector(".amountResult").textContent = nowTotalAmount;
})

// 10,000원 MaxButton 버튼 클릭 시
document.querySelector(".setAmount2MaxNumber").addEventListener("click", () => {
    let nowTotalAmount = parseInt(document.querySelector(".amountResult").textContent, 10);
    let nMaxNumber = document.querySelector(".inputMaxNumber").value;
    nowTotalAmount += (10000 * nMaxNumber);
    document.querySelector(".amountResult").textContent = nowTotalAmount;

})

// 50,000원 MaxButton 버튼 클릭 시
document.querySelector(".setAmount3MaxNumber").addEventListener("click", () => {
    let nowTotalAmount = parseInt(document.querySelector(".amountResult").textContent, 10);
    let nMaxNumber = document.querySelector(".inputMaxNumber").value;
    nowTotalAmount += (50000 * nMaxNumber);
    document.querySelector(".amountResult").textContent = nowTotalAmount;
})