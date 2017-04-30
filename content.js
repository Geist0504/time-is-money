var salary;
var hourly;

function wages(){

    chrome.storage.sync.get('salary', function(result){
        salary = result.salary;
        console.log(salary);
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

function convert(price, hourly){
    return price / hourly;
}

var elements = document.getElementsByTagName('*');
chrome.storage.sync.get('hourly', function(result){
        console.log(result.hourly);
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
                            var timeStr = time.toFixed(2);
                            if (text.length > 5){
                                var remainder = text.substring(4);
                                console.log(remainder);
                                var nextPrice = remainder.indexOf('$');
                                console.log(nextPrice);
                                if (nextPrice != -1){
                                    var priceTwo = remainder.substring(nextPrice);
                                }
                                var priceTwo = null;
                                console.log(priceTwo);
                            }
                        }
                        else {
                            var price = text.substring(0);
                            var priceNum = text.substring(1);
                            var time = convert(parseFloat(priceNum), hourly);
                            var timeStr = time.toFixed(2);
                        }
                    }
                    var replacedText1 = text.replace(price, timeStr);
                    var replacedText1 = replacedText1.replace(priceTwo, 'Free');

                    if (replacedText1 !== text && hourly != undefined) {
                        element.replaceChild(document.createTextNode(replacedText1 + ' hours'), node);
                    }
                }
            }
        }
    });

