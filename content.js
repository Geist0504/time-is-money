var elements = document.getElementsByTagName('*');

function getWage(){

    ///Save value using the Chrom extension storage API
    chrome.storage.sync.set({'value':theValue}, function(){
        //Notify that we saved.
        message('Settings saved');
    })
}


function convert(price){
    return price * 2.00;
}

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
                    var timeStr = time.toString();
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
                element.replaceChild(document.createTextNode(replacedText1), node);
            }
        }
    }
}