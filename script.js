//make sure localStorage exists
if(localStorage.reminders === undefined){
    localStorage.reminders = JSON.stringify(["", "", "", "", "", "", "", "", ""]);
}

//variable of current hour
let currentHour = parseInt(moment().format('h'));
if(moment().format('a') === "pm" && currentHour != 12){
    currentHour += 12;
}

//set top text saying hour
$("#currentDay").text(moment().format("dddd") + ", " + moment().format("MMMM Do"));

//set past present or future class on all textareas(and set values)
$(".row").each(function(){

    //reset class for so we can apply a new one
    $(this).children(".textarea").removeClass("past present future");

    //compare each row to the the current hour and apply class accordingly
    if($(this).data("time") < currentHour){
        $(this).children(".textarea").addClass("past");
    }
    else if($(this).data("time") === currentHour){
        $(this).children(".textarea").addClass("present");
    }
    else{
        $(this).children(".textarea").addClass("future");
    }

    //set localStorage value
    $(this).children(".textarea").val(JSON.parse(localStorage.reminders)[$(this).data("time") - 9]);
});

//button handler
$(".saveBtn").click(function(){
    const $textarea = $(this).siblings(".textarea");
    const $time = $(this).parent().data("time");
    var tempArr = JSON.parse(localStorage.reminders);

    tempArr[$time - 9] = $textarea.val();

    localStorage.reminders = JSON.stringify(tempArr);
});