$(document).ready(function(){ 

    var salary;
    var hourly;

    chrome.storage.sync.get('salary', function(result){
        test = result.salary;
        console.log(test);
        if(test != undefined){
        chrome.storage.sync.get('salary', function(result){
            $('#salary').attr('placeholder', '$'+result.salary+'/year');
        console.log(result.salary);
        });
        chrome.storage.sync.get('hourly', function(result){
            $('#hourly').attr('placeholder', '$'+result.hourly+'/hour');
        });
    }
    });

    $("#btn").click(function(){
        var hourly = parseFloat($('#hourly').val());
        var salary = 2080.00 * hourly;
        chrome.storage.sync.set({'salary':salary}, function(){
            console.log('Settings saved')
        });
        chrome.storage.sync.set({'hourly':hourly});
        console.log(hourly);
        $('#salary').attr('placeholder', '$' + salary);
    });
});

function getWage(theValue){

    var theValue = textarea.value;

    if(!theValue) {
        message('Error: No value specified');
        return;
    }

    ///Save value using the Chrom extension storage API
    chrome.storage.sync.set({'value':theValue}, function(){
        //Notify that we saved.
        message('Settings saved');
    });
}

function convert(price){
    return price / 19.50;
}

var elements = document.getElementsByTagName('*');

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
                    console.log('Found One!');
                    console.log(convert(parseFloat(price)));
                    var time = convert(parseFloat(priceNum));
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
                    var time = convert(parseFloat(priceNum));
                    var timeStr = time.toFixed(2);
                    console.log('Found One!');
                    console.log(price); 
                }
            }
            var replacedText1 = text.replace(price, timeStr);
            var replacedText1 = replacedText1.replace(priceTwo, 'Free');

            if (replacedText1 !== text) {
                element.replaceChild(document.createTextNode(replacedText1 + ' hours'), node);
            }
        }
    }
}

