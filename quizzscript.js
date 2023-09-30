$(document).ready(function () {
  $("#questioncontainer").hide();
  $(".nextbtn").hide();
  $(".restart").hide();

  $(".startBtn").click(function () {
    $(".firstTab").css("display", "none");
    $(".secondTab").hide();
    $("#questioncontainer").show();
    $(".Firstpage").hide();
    $(".startBtn").hide();
    
  });
});

currentQuestionIndex = 0;

$(".startBtn").click(async function () {
  getQuestions();
});

let data = { question: [], answers: [], correct_ans: [] },
  categorySelect,
  points=0,
  DifficultySelect,
  category = {
    "General Knowledge": 9,
    "Science and Technical": 18,
    History: 23,
    Maths: 20,
  };
$(".dropdown-item1").click(function () {
  categorySelect = $(this).html();
  console.log(categorySelect);
});

$(".dropdown-item2").click(function () {
  DifficultySelect = $(this).html();
  console.log(DifficultySelect);
});

async function getQuestions() {
  let response = await $.get(
    `https://opentdb.com/api.php?amount=10&category=${category[categorySelect]}&difficulty=${DifficultySelect}&type=multiple`
  );
  console.log(
    `https://opentdb.com/api.php?amount=10&category=${category[categorySelect]}&difficulty=${DifficultySelect}&type=multiple`
  );
  let questionSet = await response.results;
  for (let i = 0; i < questionSet.length; i++) {
    const element = questionSet[i];

    data.question.push(element.question); //to add questions in data
    answers = [
      element.incorrect_answers[0],
      element.incorrect_answers[1],
      element.incorrect_answers[2],
      element.correct_answer,
    ]; // to create array of answers
    answers.sort(() => Math.random() - 0.5); //sort answer array randomly
    data.answers.push(answers); // to add answers in data
    data.correct_ans.push(element.correct_answer); // to add correct ans in data
  }
  showQuestions(data);
}

function showQuestions(data) {
  console.log(data);
  resetState();
  $("#Questions").html(data.question[currentQuestionIndex]);
  $(".btn1").html(data.answers[currentQuestionIndex][0]);
  $(".btn2").html(data.answers[currentQuestionIndex][1]);
  $(".btn3").html(data.answers[currentQuestionIndex][2]);
  $(".btn4").html(data.answers[currentQuestionIndex][3]);
}

$(".answer").click(function () {  
  if ($(this).html() == data.correct_ans[currentQuestionIndex]) {
    $(this).addClass("correct");
    $("button:not(.correct)").addClass("wrong");
    $(".nextbtn").show();
    points = points + 1;
  } else {
    $(this).addClass("wrong");
    $("buttton:not(.wrong)").attr("disabled",true);
    $(".nextbtn").show();
    $(".correctans").html(`answer:${data.correct_ans[currentQuestionIndex]}`);
  }
});

$(".nextbtn").click(function () {
  currentQuestionIndex++;
  showQuestions(data);
});

function resetState() {
  $(".btn").removeClass("correct");
  $(".btn").removeClass("wrong");
  $(".btn").removeClass("disabled");
  $(".nextbtn").hide();
  $(".correctans").html(``);

  if (data.question.length < currentQuestionIndex + 1) {
    $(".answer").hide();
    $("#Questions").hide();
    $('#answer-buttons').hide()
    $(".restart").show();
    $(".correctans").html(`Your Score : ${points} / 10`);
  } else {
    $(".answer").show();
    $("#Question").show();
  }
}

$('.restart').click(function(){
  window.location.reload()

})