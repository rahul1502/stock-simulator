
let price = 1000.22;
let status = '+';

const acc = 2.5;

const RAND_MIN = 2;
const RAND_MAX = -2;

// value of pullback after each price change (MIN: 0 MAX: 1)
const PULLBACK_PARAM = 0.1; 

// price - current stock price
// status - green (+) or red (-)
// acc - acceleration parameter 
const generatePrice = (price, status, acc) => {

    // randomize the acceleration parameter 
    const randAcc = (Math.random() * (RAND_MAX - RAND_MIN) + RAND_MIN) * acc;
    let newPrice;

    if(acc > 0) {
        // +ve acc: uptrend
        newPrice = (status == '+') ? price - (randAcc * PULLBACK_PARAM): price + randAcc ;
    }
    else {
        // -ve acc: downtrend
        newPrice = (status == '+') ? price + randAcc : price - (randAcc * PULLBACK_PARAM) ;
    }

    console.log(`price: ${(newPrice > 0) ? newPrice : 0 } | status: ${status} | acc: ${acc} | randAcc: ${randAcc} | newPrice: ${newPrice}`);

    newPrice = Math.round(newPrice * 10000) / 10000;
    
    return (newPrice > 0) ? newPrice : 0 ;
};

const simulateStock = (acc) => {
    
    let newPrice = generatePrice(price, status, acc);

    status = ((newPrice - price) > 0) ? '+' : '-';
    price = newPrice;
};

// define chart 
let chart = new Chart(document.getElementById("line-chart"), {
    type: 'line',
    data: {
        label: [],
        datasets: [{data: [], borderColor: "#AEEA00"}]
    },
    options: {
        legend: {display: false},
        elements: {line: {tension: 0}},
        scales: {
            yAxes: [{ticks: {fontColor: "#AEEA00"}}],
            xAxes: [{ticks: {fontColor: "#AEEA00"}}]
        }
    }
});


setInterval(function() { 
    console.log(price);
    
    // update chart 
    chart.data.labels.push(price);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(price);
    });
    chart.update();
    simulateStock(acc);
}, 500);
