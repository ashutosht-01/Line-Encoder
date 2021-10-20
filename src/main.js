let input_string_arr = {};    //input charecter array
let encoding_technique;
let generation_type;
//Sub Sequence Generation                       
function fixedSubSequence(nums) {
    let arr = [];
    nums = parseInt(nums);
    for (let i = 0; i <= 4; i++) {
        arr.push(Math.floor(Math.random() * Math.floor(2)));
    }
    console.log('arr.sz', arr.length);

    //fixed sub-sequences
    for (let i = 5; i < (5 + nums); i++) {
        arr.push(0);
    }
    console.log(arr.length);
    for (let i = (5 + nums); i <= 14; i++) {
        arr.push(Math.floor(Math.random() * Math.floor(2)));
    }
    console.log(arr.length);
    return arr;
}

<<<<<<< HEAD

function randomBinaryArrayGen(){
    let arr = [];
    for(let i=1;i<=15;i++){
      arr.push(Math.floor((Math.random() * 1.99)));
    }
    return arr;
  }
  function consZeroPosGen() {
    start = (Math.floor(Math.random() * 5.99));
    return start;
  }


  function nrzIencoder(arr){
    let nrzI = [];
    if(arr[0]==1){
      nrzI[0] = 1;
    }else{
      nrzI[0] = -1;
    }
    let currState = nrzI[0];
    for(let i=1;i<=arr.length;i++){
      if(arr[i]==0){
        nrzI[i] = currState;
      }else{
        if(currState==-1){
          currState = 1;
        }else{
          currState = -1;
        }
        nrzI[i] = currState;
      }
    }
    return nrzI; 
  }
//on click event Generate button
=======
function updated_string(s) {
    let s2 = [];
    s2.push('#');
    for (let i = 0; i < s.length; i++) {
        s2.push(s[i]);
        s2.push('#');
    }
    console.log('s2 ', s2);
    console.log('s2 ', s2.length);
    return s2;
}
function longest_palindromic_substring(s) {

    // Brute Force Algorithm
    // 1.) find out all the substring of a given substring     //O(n^2)
    // 2.) for each substring check if the substring is palindrome or not   //O(n)
    // 3.) calculte the maximum length of a substring among the substrings that are palindrome i.e our longest palindromic substring
    // 4.) Time Complexity = O(N^3)

    //Saving values in algorithms is usually applying dynamic programming

    //Dynamic Programming Solution
    //1.)  bool dp[L][R] => here dp state represents that substring starting at index L & ending at index R is palindrome or NOT having length (R-L+1)
    //2.)  Recurrance Relation => dp[L][R]=(dp[L+1][R-1] && S[L]==S[R])?true:false
    //3.)  Maintain a variable for max_length (LPS) which will store the LPS length from the dp states that having true boolean value
    //4.)  Time Complexity = O(N^2)

    //Manacher algorithm 
    //Time Complexity = O(N)
    let s2 = [];
    s2 = updated_string(s);
    let m = s2.length;     //m= 2*n+1
    let LPS = new Array(m);
    for (let i = 0; i < m; i++) {
        LPS[i] = 0;
    }
    //Here LPS[i] reprsents max  length of the longest palindromic substring centered at index i.
    let cx = 0;   // cx is the index of the center of the palindromic substring
    let r = 0;
    for (let i = 1; i < m; i++) {
        let mirror = cx - (i - cx);
        if (i < r)
            LPS[i] = Math.min(LPS[mirror], r - i);

        while (s2[i + LPS[i] + 1] == s2[i - 1 - LPS[i]]) {
            LPS[i] = LPS[i] + 1;
        }
        if (i + LPS[i] > r) {     //this will execute always after updation of LPS[i] form while loop
            cx = i;
            r = i + LPS[i];
        }
    }
    //Iterating over LPS[] array to find max length of palindromic string & its center
    let max_length = 0;
    let index = 0;
    for (let i = 1; i < m; i++) {
        if (LPS[i] > max_length) {
            max_length = LPS[i];
            index = i;
        }
    }
    let first_index = index - max_length + 1;
    let actual_index = (first_index - 1) / 2;
    let lps = [];
    for (let i = actual_index; i < (actual_index + max_length); i++)
        lps.push(s[i]);
    return lps;
}

//on click event for Generate button
>>>>>>> 421c7e5185f9c22fd7ae618ece9769a61d396b26
$("#init").click(function (event) {

    encoding_technique = $("#list-encoding").val();
    generation_type = $("#list-type").val();

    $("#bottom-panel").remove();
    $("#dc").removeClass("data-container1");
    $("#dc").addClass("data-container2");

    if (generation_type == "completely-random") {
        $("#numzeros").remove();
    }
    else if (generation_type == "sub-sequence") {
        $("#binary-data").remove();
    }

    //Encoding Techniques
    if (encoding_technique == "NRZ-UniNRZ") {
        $("#txt").text("NRZ (NON - RETRUN - TO - ZERO UNIPOLAR) ");
    }
    else if (encoding_technique == "NRZ-L") {
        $("#txt").text("NRZ-L (NON-RETURN-TO-ZERO-LEVEL) ");
    }
    else if (encoding_technique == "NRZ-I") {
        $("#txt").text("NRZ-I (NON-RETURN-TO-ZERO-INVERT) ");
    }
    else if (encoding_technique == "RZ") {
        $("#txt").text("RZ (RETURN-TO-ZERO)");
    }
    else if (encoding_technique == "Mench") {
        $("#txt").text("MANCHESTER");
    }
    else if (encoding_technique == "Diff-Mench") {
        $("#txt").text(" DIFFERENTAIL MANCHESTER  ");
    }
    else if (encoding_technique == "AMI") {
        $("#txt").text("ALTERNATE MARK INVERSION (AMI)");
    }
    else if (encoding_technique == "B8ZS") {
        $("#txt").text("BIPLOAR WITH 8-ZERO SUBSTITUTION (B8ZS)");
    }
    else if (encoding_technique == "HDB3") {
        $("#txt").text("HIGH-DENSITY-BIPOLAR 3-ZERO (HDB3)");
    }
});



$("#digitaldata").click(function (event) {
    //method prevent submitting of a form
    event.preventDefault();
    $('#data-container2').remove();
    var input = $('#digital-data').val();
    input_string_arr = input.split("");
    //These function will do encoding & print    longest palindromic subsequence(lps)  & signal show  
    if (encoding_technique == "NRZ-UniNRZ") {
        $('#UNINRZ').removeClass("uninrz");
        $('#UNINRZ').addClass("NRZ-UniNRZ");
        let LPS = [];
        LPS = longest_palindromic_substring(input_string_arr);
        console.log(LPS);
        LPS = LPS.join('');
        console.log(LPS);
        $('#LPSuni').text(LPS);
        //uniNrz()                    
    }
    else if (encoding_technique == "NRZ-L") {
        $('#NRZL').removeClass("nrzl");
        $('#NRZL').addClass("NRZL");
        let LPS = [];
        LPS = longest_palindromic_substring(input_string_arr);
        LPS = LPS.join('');
        console.log(LPS);
        $('#LPSnrzl').text(LPS);
        //NRZL()

        function nrzLencoder(arr){
            let nrzL = [];
            for(let i=0;i<=arr.length;i++){
              if(arr[i]==0){
                nrzL[i] = -1
              }else{
                nrzL[i] = 1;
              }
            }
            return nrzL; 
          }
          if(generation_type="compleately-ramdom"){
            function nrzLRandomGen() {
                let arr = randomBinaryArrayGen();
                let input = document.getElementById("nrzLInputCons0");
                let start = consZeroPosGen();
                let cons0 = Number(input.value);
                for (let i = start; i < cons0 + start; i++) {
                  arr[i] = 0;
                }
                let encodedSignal = nrzLencoder(arr);
                nrzLCanvasGenerator(encodedSignal,arr);
              }
          }else{
            function nrzLCustomGen(){
                let input = document.getElementById("nrzLInputDs");
                let string = input.value;
                if (validate(string)) {
                  let arr = parserInt(string);
                  let encodedSignal = nrzLencoder(arr);
                  nrzLCanvasGenerator(encodedSignal, arr);
                } else {
                  alert("Please Enter a valid digital signal");
                }
              }
          }
         
          function nrzLCanvasGenerator(encodedSignal,arr){



          }
          
          
         
    }
    else if (encoding_technique == "NRZ-I") {
<<<<<<< HEAD
        if(generation_type=="completely-random"){
            function nrzIRandomGen() {
                let arr = randomBinaryArrayGen();
                let input = document.getElementById("nrzIInputCons0");
                let start = consZeroPosGen();
                let cons0 = Number(input.value);
                for (let i = start; i < cons0 + start; i++) {
                  arr[i] = 0;
                }
                console.log(arr);
                let encodedSignal = nrzIencoder(arr);
                nrzICanvasGenerator(encodedSignal,arr);
              }
        }else{
            function nrzICustomGen(){
                let input = document.getElementById("nrzIInputDs");
                let string = input.value;
                if (validate(string)) {
                  let arr = parserInt(string);
                  console.log(arr);
                  let encodedSignal = nrzIencoder(arr);
                  nrzICanvasGenerator(encodedSignal, arr);
                } else {
                  alert("Please Enter a valid digital signal");
                }
              }
        }
          
          function nrzICanvasGenerator(dataArray,labelArray) {
            
          }
    }
    else if (encoding_technique == "RZ") {



=======
        $('#NRZL').removeClass("nrzi");
        $('#NRZI').addClass("NRZI");
        let LPS = [];
        LPS = longest_palindromic_substring(input_string_arr);
        LPS = LPS.join('');
        console.log(LPS);
        $('#LPSnrzi').text(LPS);
        //NRZI()
    }
    else if (encoding_technique == "RZ") {
        $('#RZ').removeClass("rz");
        $('#RZ').addClass("RZ");
        let LPS = [];
        LPS = longest_palindromic_substring(input_string_arr);
        LPS = LPS.join('');
        console.log(LPS);
        $('#LPSrz').text(LPS);
        //rz()
>>>>>>> 421c7e5185f9c22fd7ae618ece9769a61d396b26
    }
    else if (encoding_technique == "Mench") {
        $('#MENCH').removeClass("mench");
        $('#MENCH').addClass("MENCH");
        let LPS = [];
        LPS = longest_palindromic_substring(input_string_arr);
        LPS = LPS.join('');
        console.log(LPS);
        $('#LPSmench').text(LPS);
        //Mech()
    }
    else if (encoding_technique == "Diff-Mench") {
        $('#DIFFMENCH').removeClass("diffmench");
        $('#DIFFMENCH').addClass("DIFFMENCH");
        let LPS = [];
        LPS = longest_palindromic_substring(input_string_arr);
        LPS = LPS.join('');
        console.log(LPS);
        $('#LPSdiffmench').text(LPS);
        //Diff Mench()
    }
    else if (encoding_technique == "AMI") {
        $('#AMI').removeClass("ami");
        $('#RZ').addClass("AMI");
        let LPS = [];
        LPS = longest_palindromic_substring(input_string_arr);
        LPS = LPS.join('');
        console.log(LPS);
        $('#LPSami').text(LPS);
        //AMI()
    }
    else if (encoding_technique == "B8ZS") {
        $('#B8ZS').removeClass("b8zs");
        $('#B8ZS').addClass("b8zs");
        let LPS = [];
        LPS = longest_palindromic_substring(input_string_arr);
        LPS = LPS.join('');
        console.log(LPS);
        $('#LPSb8zs').text(LPS);
        //B8ZS()
    }
    else if (encoding_technique == "HDB3") {
        $('#HDB3').removeClass("hdb3");
        $('#HDB3').addClass("HDB3");
        let LPS = [];
        LPS = longest_palindromic_substring(input_string_arr);
        LPS = LPS.join('');
        console.log(LPS);
        $('#LPShdb3').text(LPS);
        //HDB3()
    }
});


$("#conszeros").click(function (event) {
    event.preventDefault();
    $('#data-container2').remove();
    var nums = $("#numzr").val();
    console.log(nums);
    let Arr = [];   //temp array
    Arr = fixedSubSequence(nums);
    console.log(Arr);
    if (encoding_technique == "NRZ-UniNRZ") {
        $('#UNINRZ').removeClass("uninrz");
        $('#UNINRZ').addClass("NRZ-UniNRZ");
        let LPS = [];
        LPS = longest_palindromic_substring(Arr);
        console.log(LPS);
        LPS = LPS.join('');
        console.log(LPS);
        $('#LPSuni').text(LPS);
        //uniNrz()      
    }
    else if (encoding_technique == "NRZ-L") {
        $('#NRZL').removeClass("nrzl");
        $('#NRZL').addClass("NRZL");
        let LPS = [];
        LPS = longest_palindromic_substring(Arr);
        LPS = LPS.join('');
        console.log(LPS);
        $('#LPSnrzl').text(LPS);
        //NRZL()
    }
    else if (encoding_technique == "NRZ-I") {
        $('#NRZI').removeClass("nrzi");
        $('#NRZI').addClass("NRZI");
        let LPS = [];
        LPS = longest_palindromic_substring(Arr);
        LPS = LPS.join('');
        console.log(LPS);
        $('#LPSnrzi').text(LPS);
        //NRZI()
    }
    else if (encoding_technique == "RZ") {
        $('#RZ').removeClass("rz");
        $('#RZ').addClass("RZ");
        let LPS = [];
        LPS = longest_palindromic_substring(Arr);
        LPS = LPS.join('');
        console.log(LPS);
        $('#LPSnrzl').text(LPS);
        //RZ()
    }
    else if (encoding_technique == "Mench") {
        $('#MENCH').removeClass("mench");
        $('#MENCH').addClass("MENCH");
        let LPS = [];
        LPS = longest_palindromic_substring(Arr);
        LPS = LPS.join('');
        console.log(LPS);
        $('#LPSmech').text(LPS);
        //Mench()
    }
    else if (encoding_technique == "Diff-Mench") {
        $('#DIFFMENCH').removeClass("diffmench");
        $('#DIFFMENCH').addClass("DIFFMENCH");
        let LPS = [];
        LPS = longest_palindromic_substring(Arr);
        LPS = LPS.join('');
        console.log(LPS);
        $('#LPSdiffmech').text(LPS);
        //Diff Mench()
    }
    else if (encoding_technique == "AMI") {
        $('#AMI').removeClass("ami");
        $('#RZ').addClass("AMI");
        let LPS = [];
        LPS = longest_palindromic_substring(Arr);
        LPS = LPS.join('');
        console.log(LPS);
        $('#LPSami').text(LPS);
        //AMI()
    }
    else if (encoding_technique == "B8ZS") {
        $('#B8ZS').removeClass("b8zs");
        $('#B8ZS').addClass("b8zs");
        let LPS = [];
        LPS = longest_palindromic_substring(Arr);
        LPS = LPS.join('');
        console.log(LPS);
        $('#LPSdiffmech').text(LPS);
        //B8ZS()
    }
    else if (encoding_technique == "HDB3") {
        $('#HDB3').removeClass("hdb3");
        $('#HDB3').addClass("HDB3");
        let LPS = [];
        LPS = longest_palindromic_substring(input_string_arr);
        LPS = LPS.join('');
        console.log(LPS);
        $('#LPSHDB3').text(LPS);
        //Diff Mench()
    }
})

