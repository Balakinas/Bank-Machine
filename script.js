const userData = {
  'USD': 1000,
  'EUR': 900,
  'UAH': 15000,
  'BIF': 20000,
  'AOA': 100
};

const bankData = {
  'USD': {
    max: 3000,
    min: 100,
    img: '💵'
  },
  'EUR': {
    max: 1000,
    min: 50,
    img: '💶'
  },
  'UAH': {
    max: 0,
    min: 0,
    img: '💴'
  },
  'GBP': {
    max: 10000,
    min: 100,
    img: '💷'
  }
};


const getMoney = (userData, bankData) => {
  myPromise = new Promise(
    function(resolve, reject){
      confirm(`Посмотреть баланс на карте?`) ? resolve(userData) : reject({userData: userData, bankData: bankData});
    }
  )
  myPromise
    .then(
      function(userData){
        let userCurrencies = [];
        let currency = ``;
        for (let currency in userData) {
          userCurrencies.push(currency);
        }
        do {
          currency = prompt(`введите валюту в формате: ${userCurrencies.join(`, `)}`);
        } while (!userCurrencies.includes(currency))
        for (let key in userData) {
          if (key === currency) console.log(`Баланс составляет: ${userData[key]} ${key}.`);
        }
      },
       
      function({userData: userData, bankData: bankData}){
        let activation = confirm(`Вы желете снять валюту?\nНажмите OK для продолжения, либо CANCEL для выхода`)
        if (activation) {
          let bankCurrencies = [];
          let userCurrencies = [];
          let currency = ``;
          for (let currency in userData) {
            userCurrencies.push(currency);
          }
          for (let currency in bankData) {
            bankCurrencies.push(currency);
          }
          do {
            currency = prompt(`Выберите одну из доступных валют в формате: ${bankCurrencies.join(`, `)}`);
          } while (!bankCurrencies.includes(currency))
          let sum = 0;
          do {
           sum = +prompt(`введите сумму для снятия:`);
          } while (isNaN(sum))
          for (let key in bankData) {
            if (key === currency && bankData[key].max !== 0 ) {
              if (sum > bankData[key].max) console.log(`cумма больше допустимой. Максимальная сумма для снятия ${bankData[key].max} ${key}`);
              if (sum < bankData[key].min) console.log(`cумма меньше допустимой. Минимальная сумма для снятия ${bankData[key].min} ${key}`);
              if (sum >= bankData[key].min && sum <= bankData[key].max) console.log(`Вот Ваши денежки: ${sum} ${key} ${bankData[key].img} `);
            } else if (key === currency && bankData[key].max === 0) console.log(`Не осталось наличных для ${key}`);
          }
        }
      }
    )

    .then(
      function(){
        console.log(`Спасибо, хорошего дня!`);
      }
    )    
}

getMoney(userData, bankData);




