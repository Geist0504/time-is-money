var elements = document.getElementsByTagName('*');

function convert(price){
    return price * 2;
}

for (var i = 0; i < elements.length; i++) {
    var element = elements[i];

    for (var j = 0; j < element.childNodes.length; j++) {
        var node = element.childNodes[j];

        if (node.nodeType === 3) {
            var text = node.nodeValue;
            if (text[0] == '$'){
                if (/\s/.test(text)){
                    var price = text.substring(1, text.indexOf(' '));
                    console.log('Found One!');
                    console.log(price);
                    var time = convert(1);
                    var timeStr = time.toString();
                    if (text.length > 5){
                        var remainder = text.substring(4);
                        console.log(remainder);
                        var nextPrice = remainder.indexOf('$');
                        console.log(nextPrice);
                        var priceTwo = remainder.substring(nextPrice);
                        console.log(remainder);
                    }
                }
                else {
                    var price = text.substring(1);
                    var time = convert(2);
                    var timeStr = time.toString();
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