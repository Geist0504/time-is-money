var salary;
var hourly;


//accesses stored wages and populates them in popup window if applicable
function wages(){

    chrome.storage.sync.get('salary', function(result){
        salary = result.salary;
        if(salary != undefined){
            chrome.storage.sync.get('salary', function(result){
                $('#salary').attr('placeholder', '$'+result.salary+'/year');
            });
            chrome.storage.sync.get('hourly', function(result){
                $('#hourly').attr('placeholder', '$'+result.hourly.toFixed(2)+'/hour');
        });
        }
    });
}

$(document).ready(function(){ 

    wages();

    $("#btn").click(function(){
        var hourly = parseFloat($('#hourly').val());
        var salary = parseFloat($('#salary').val());

        if(hourly){
            salary = 2080.00 * hourly;
        }

        else if (salary){
            hourly = salary/2080.00;
        }
        chrome.storage.sync.set({'salary':salary}, function(){
            console.log('Settings saved');
        });
        chrome.storage.sync.set({'hourly':hourly});
        console.log(hourly);
        $('#salary').attr('placeholder', '$' + salary);
        wages();
    });
});

//converts a supplied price into hours of work
function convert(price, hourly){
    return price / hourly;
}


//iterate through page converting and replacing values as you find them
var elements = document.getElementsByTagName('*');
chrome.storage.sync.get('hourly', function(result){
        hourly = result.hourly;
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];

            for (var j = 0; j < element.childNodes.length; j++) {
                var node = element.childNodes[j];

                if (node.nodeType === 3) {
                    var text = node.nodeValue;
                    if (text[0] == '$'){
                        if (/\s/.test(text)){
                            var price = text.substring(0, text.indexOf(' '));
                            var priceNum = text.substring(1, text.indexOf(' '));
                            console.log(convert(parseFloat(price), hourly));
                            var time = convert(parseFloat(priceNum), hourly);
                            var timeStr = time.toFixed(2) + ' hours';
                            if (text.length > 5){
                                var remainder = text.substring(4);
                                console.log(remainder);
                                var nextPrice = remainder.indexOf('$');
                                console.log(nextPrice);
                                if (nextPrice != -1){
                                    var newPrice = remainder.substring(nextPrice, remainder.indexOf(' '));
                                }
                                console.log(nextPrice);
                                var timeStrTwo = convert(parseFloat(newPrice),hourly).toFixed(2);
                            }
                        }
                        else {
                            var price = text.substring(0);
                            console.log("Solo element " +  price);
                            var priceNum = text.substring(1);
                            var time = convert(parseFloat(priceNum), hourly);
                            var timeStr = time.toFixed(2) + ' hours';
                        }
                    }
                    else if (text.indexOf('$') != -1) {
                            var start = text.indexOf('$');
                            console.log(start);
                            var price = text.substring(start, text.indexOf(' ', start));
                            console.log(price);
                            var priceNum = parseFloat(text.substring(start+1));
                            var time = convert(priceNum, hourly);
                            var timeStr = time.toFixed(2) + ' hours';
                            console.log(timeStr);
                            if (text.length > 5){
                                var newStart = text.indexOf('$', start+1);
                                var newPrice = text.substring(newStart, text.indexOf(' ', newStart));
                                console.log(newPrice);
                                var priceNumTwo = parseFloat(text.substring(newStart+1));
                                var timeTwo = convert(priceNumTwo, hourly);
                                var timeStrTwo = timeTwo.toFixed(2) + ' hours';
                            }

                        }

                    var replacedText1 = text.replace(price, timeStr);
                    // NOT WORKING var replacedText1 = replacedText1.replace(newPrice, timeStrTwo); //

                    if (replacedText1 !== text && hourly != undefined  && price.indexOf('$')==0) {
                        element.replaceChild(document.createTextNode(replacedText1), node);
                    }
                }
            }
        }
    });

