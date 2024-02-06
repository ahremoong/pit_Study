document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".findDiv input").value = '우린';
    document.querySelector(".findDiv textarea").textContent = `불안한 마음은 언제나 가슴 한켠에 있잖아 내일이 어떤 모양일지 우리는 모르니까 계속 떨고 있는 거야 맘 편히 못 있는 거야 환하게 웃지도 못하고 그저 두려움만 가득하지 검은 파도가 (Never) 덮치게 되면 (No) 그 자리에 서서 두 손을 꼭 쥐겠지만 절대로 잊지 마 밤이 널 삼키려 해도 (Remember) 새벽은 찾아와 (Always) Sometimes we fall and then we rise 늘 반복해 끝도 없이 희망이 떠오르면 절망은 저무니까 기쁨만 기억하고 살자 우린 우린 눈앞이 다 깜깜해도 어둠이 짙어 보여도 틀림없는 사실은 다시 빛은 돌아와 모든 걸 바라보며 살자 우린 우린 우린 노력으로는 안 되는 (Never) 불현듯 찾아오는 아픔 (No) 아무리 미리 막아도 (Never) 아무리 원치 않았어도 언젠가는 찾아오기 마련인 거니까 (Remember) 그냥 그런 거야 (Always) Sometimes we fall and then we rise 늘 반복해 끝도 없이 희망이 떠오르면 절망은 저무니까 기쁨만 기억하고 살자 우린 우린 우린 When the night Dims the sky Don't you forget 무슨 일이 있더라도 새벽은 찾아와 Sometimes we fall and then we rise 늘 반복해 끝도 없이 희망이 떠오르면 절망은 저무니까 기쁨만 기억하고 살자 우린 우린 눈앞이 다 깜깜해도 어둠이 짙어 보여도 틀림없는 사실은 다시 빛은 돌아와 모든 걸 바라보며 살자 우린 우린 우린`;

    // 검색하기 버튼 클릭 시
    document.querySelector(".goFindText").addEventListener("click", () => {
        // 내용을 가져와서 띄어쓰기 단위로 배열에 저장
        let inputText = document.querySelector(".findDiv textarea").textContent;
        let wordBreak = inputText.split(" ");
        
        // 총 변경된 개수를 저장할 변수
        let changeNum = 0;
        
        // 저장된 배열을 순차적으로 돌면서 찾는 텍스트와 같은 단어일 경우 p 태그를 포함한 값으로 저장하고, 아닐 경우 넘어감
        for (let i = 0; i < wordBreak.length; i++) {
            let findText = document.querySelector(".findDiv input").value;

            if (findText === wordBreak[i]) {
                let replaceText = `<p class="findedText_${i} textEmphasize">${findText}</p>`;
                wordBreak[i] = replaceText;
                changeNum = changeNum + 1;
            }
        }

        // 원래의 문단으로 돌리기 위해 사용할 변수 초기화
        let fullText = "";

        // 위에 만들어둔 단어 배열을 돌면서 문장으로 합침
        for (let i = 0; i <wordBreak.length; i++) {
            fullText += wordBreak[i];

            if(i != (wordBreak - 1)){
                fullText += " ";
            }
        }

        // 합친 단어를 결과 영역에 뿌려줌
        document.querySelector(".showDiv div .returnArea").innerHTML = fullText;

        // 결과를 셀렉트 태그에 넣기 위해 초기화
        document.querySelector(".selectList").innerHTML =  `<option selected="selected">결과</option>`;
        
        // 바꾼 값의 수만큼 돌면서 옵션에 내용 추가
        for (let i = 0; i < changeNum; i++) {
            let optionElement = document.createElement("option");
            optionElement.value = i;
            optionElement.textContent = document.querySelector(".findDiv input").value;
            document.querySelector(".selectList").appendChild(optionElement);
        }

    });


    // 셀렉트에서 선택한 값이 변경되었을 경우 발생하는 이벤트
    document.querySelector(".selectList").addEventListener("change", (e) => {

        // 선택한 셀렉트의 value 조회
        let selectNum = e.target.value;
        // 변경된 텍스트가 있는 클래스로 조회
        const findedList = document.querySelectorAll(".textEmphasize");

        // 조회한 셀렉트 옵션을 돌면서 찾은 셀렉트의 value와 같을 경우 색상을 변경
        for (let i = 0; i < findedList.length; i++) {
            if (i == selectNum) {
                findedList[i].style.color = "blue";
            } else {
                findedList[i].style.color = "red";
            }
        }
    });
})

