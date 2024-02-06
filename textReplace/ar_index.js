document.addEventListener("DOMContentLoaded", () => {

  document.querySelector(".findDiv input").value = '우린';
  document.querySelector(".findDiv textarea").textContent = `불안한 마음은 언제나 가슴 한켠에 있잖아 내일이 어떤 모양일지 우리는 모르니까 계속 떨고 있는 거야 맘 편히 못 있는 거야 환하게 웃지도 못하고 그저 두려움만 가득하지 검은 파도가 (Never) 덮치게 되면 (No) 그 자리에 서서 두 손을 꼭 쥐겠지만 절대로 잊지 마 밤이 널 삼키려 해도 (Remember) 새벽은 찾아와 (Always) Sometimes we fall and then we rise 늘 반복해 끝도 없이 희망이 떠오르면 절망은 저무니까 기쁨만 기억하고 살자 우린 우린 눈앞이 다 깜깜해도 어둠이 짙어 보여도 틀림없는 사실은 다시 빛은 돌아와 모든 걸 바라보며 살자 우린 우린 우린 노력으로는 안 되는 (Never) 불현듯 찾아오는 아픔 (No) 아무리 미리 막아도 (Never) 아무리 원치 않았어도 언젠가는 찾아오기 마련인 거니까 (Remember) 그냥 그런 거야 (Always) Sometimes we fall and then we rise 늘 반복해 끝도 없이 희망이 떠오르면 절망은 저무니까 기쁨만 기억하고 살자 우린 우린 우린 When the night Dims the sky Don't you forget 무슨 일이 있더라도 새벽은 찾아와 Sometimes we fall and then we rise 늘 반복해 끝도 없이 희망이 떠오르면 절망은 저무니까 기쁨만 기억하고 살자 우린 우린 눈앞이 다 깜깜해도 어둠이 짙어 보여도 틀림없는 사실은 다시 빛은 돌아와 모든 걸 바라보며 살자 우린 우린 우린`;

    // 검색하기 버튼 클릭 시
    document.querySelector(".goFindText").addEventListener("click", () => {
      let inputWdVal = document.querySelector(".findDiv input").value; //입력한 문자 가져오기
      let inputTxVal = document.querySelector(".findDiv textarea").value; //입력한 문장 가져오기
      

      // 문장에서 띄어쓰기 단위로 배열에 저장
      let wordBreak = inputTxVal.split(" ");
      // 배열 안에서 찾는 텍스트와 일치한 문장 찾기
      let i = 0;
      let changeNum = 0;

      for(i = 0; i< wordBreak.length; i++){
        if(inputWdVal === wordBreak[i]){  //찾는 텍스트와 문장안에 텍스트와 일치 할 때
          //해당 텍스트 p 태그로 감싸기
          let replaceText = `<p class="findedText_${i} textEmphasize">${inputWdVal}</p>`;
          wordBreak[i] = replaceText;
          changeNum = changeNum + 1;
        }
      }

      //p태그 문자 갯수 만큼 셀렉트에 넣어주기
      for (i = 0; i < changeNum; i++) {
        let optionElement = document.createElement("option");
            optionElement.value = i;
            optionElement.textContent = document.querySelector(".findDiv input").value;
            document.querySelector(".selectList").appendChild(optionElement);

            console.log(optionElement)
      }

      //p태그 문자를 넣어서 전체 문장 만들기
      let fullText = "";
      for (i = 0; i <wordBreak.length; i++) {
        fullText += wordBreak[i];

        if(i != (wordBreak - 1)){
            fullText += " ";
        }
      }
      
      //전체문장을 결과 영역에 뿌려줌
      document.querySelector(".showDiv div .returnArea").innerHTML = fullText;
      
    });

    // 셀렉트에서 선택한 값이 변경되었을 경우 발생하는 이벤트
    document.querySelector(".selectList").addEventListener("change", (e) => {

      // 선택한 셀렉트의 value 조회
      let selectNum = e.target.value;
      // 변경된 텍스트가 있는 클래스로 조회
      const findedList = document.querySelectorAll(".textEmphasize");

      // 조회한 셀렉트 옵션을 돌면서 찾은 셀렉트의 value와 같을 경우 색상을 변경
      for (i = 0; i < findedList.length; i++) {
          if (i == selectNum) {
              findedList[i].style.color = "blue";
          } else {
              findedList[i].style.color = "red";
          }
      }
    });
})

