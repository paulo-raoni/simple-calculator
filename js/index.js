$(function() {
  var total;
  var numberNow;
  var soma;
  var $screen = $(".screen");
  var $results = $(".results");
  var $processed = $(".processed");
  var $button = $("button");
  var buttonVal;

  //'numero()' check first the current number is too large and resize it util length of 15 characters. After this size, warns that the calculator will be redefined. 
  //'numero()' check then if 'total' is empty, if true 'total' receives current value and prints it. Else if 'value' is 0 and total's length is equal to 1, prevent to add another 0 to total by continuing. Else if 'total' is already filled with some value, increment it with the new current value.
  function numero(value) {
    if (value == '.' && numberNow.indexOf('.') > 0){
      Continue;
    } 
    
    if (total && (total.length > 12 && total.length <= 15)) {
      $results.css({ "font-size": "-=0.1em" });
      $processed.css({ "font-size": "-=0.1em" });
    } 
    if (total && total.length >= 16) {
      alert("Number or expression too long. Calculator will be reset.");
      total = undefined;
      soma = undefined;
      $results.css({ "font-size": "1.5em" }).text('');
      $processed.css({ "font-size": "1.2em" }).text('');
      Continue;
    }
    
    if (!total || total == '0') {
      total = value;
      numberNow = value;
      $results.text(total);
      $processed.text(total);
    } else if (value == "0" && total.length == 1) {
      Continue;
    } else {
      total += value;
      numberNow += value;
      $results.text(total);
      $processed.text(total);
    }
  }

  //'simbolo()' function takes the value and check if it isn't in the total expression yet, otherwise total is incremented by current value;
  function simbolo(value) {
    var test = total[total.length - 1];
   
    if (total === undefined) {
      Continue;
    } else if (
      test == "+" ||
      test == "-" ||
      test == "*" ||
      test == "/"       
    ) {
      Continue;
    } else {
      total += value;
      numberNow = undefined;
      $results.text(total);
      $processed.text(total);
    }
  }

  //'igual()' function takes the result and prints into the screen;
  function igual(value) {
    soma = eval(total);
    var somaResult = soma;
    soma = soma.toString();
    
     if (soma == "Infinity") {
      somaResult = "Impossible";
      total = undefined;
      somaResult = undefined;
      Continue;
    }
    
    console.log(typeof soma + '  ' + typeof somaResult + ' ' + typeof total);
      
    if (soma.length >= 15){
      somaResult = somaResult.toFixed(12);
      $results.css({ "font-size": "1.2em" }).text('');
      $processed.css({ "font-size": "0.9em" }).text('');
      $results.text(somaResult);
      $processed.text(total);
      total = somaResult;
      numberNow = somaResult;
      soma = undefined;
    }else if (soma.length <= 12) {
      $results.text(somaResult);
      $processed.text(total);
      total = somaResult;
      numberNow = somaResult;
    } else {
      $results.text(somaResult);
      $processed.text(total);
      total = somaResult;
      numberNow = somaResult;
    }
    console.log(soma);
  }

  //'calc()' checks conditions to 'value' and passes it to the proper function;
  function calc(value) {
    if (
      value !== "+" &&
      value !== "-" &&
      value !== "*" &&
      value !== "/" &&
      value !== "=" &&
      value !== "clear"
    ) {
      numero(value);
    } else if (
      total !== undefined &&
      (value == "+" ||
       value == "-" ||
       value == "*" ||
       value == "/") &&
      (value !== "=" && value !== "clear")
    ) {
      simbolo(value);
    } else if (value == "=" && total !== undefined) {
      igual(value);
    }
    //If 'value' doesn't meet any above conditions and it's 'value' is 'clear', then clean the screen;
    if (value == "clear") {
      $results.html("<p>0</p>").css({ "font-size": "1.5em" });
      $processed.html("<p></p>").css({ "font-size": "1.2em" });
      total = 0;
    }
  }

  //Listen to the buttons, and then pass the value to the 'calc()' function;
  $button.on("click", function() {
    buttonVal = $(this).val();
    calc(buttonVal);
  });

});