'use strict';
let startBtn = document.getElementById("start"),
    budgetValue = document.getElementsByClassName("budget-value")[0],
    daybudgetValue = document.getElementsByClassName("daybudget-value")[0],
    levelValue = document.getElementsByClassName("level-value")[0],
    expensesValue = document.getElementsByClassName("expenses-value")[0],
    optionalExpensesValue = document.getElementsByClassName("optionalexpenses-value")[0],
    incomeValue = document.getElementsByClassName("income-value")[0],
    monthsavingsValue = document.getElementsByClassName("monthsavings-value")[0],
    yearsavingsValue = document.getElementsByClassName("yearsavings-value")[0],
    expensesIteBtn = document.getElementsByTagName("button")[0],
    optionalexpensesBtn = document.getElementsByTagName("button")[1],
    countBudgetBtn = document.getElementsByTagName("button")[2],
    expensesItem = document.getElementsByClassName("expenses-item"),
    optionalexpensesItem = document.getElementsByClassName("optionalexpenses-item"),
    chooseIncome = document.querySelector(".choose-income"),
    checksavings = document.querySelector(".checksavings"),
    chooseSum = document.querySelector(".choose-sum"),
    choosePercent = document.querySelector(".choose-percent"),
    yearValue = document.querySelector(".year-value"),
    monthValue = document.querySelector(".month-value"),
    dayValue = document.querySelector(".day-value"),
    money, time;

startBtn.addEventListener("click", function start() {
    appData.power = true;
    money = +prompt ("Ваш бюджет на месяц?", "");
    time = prompt ("Введите дату в формате YYYY-MM-DD", "");

    while (isNaN(money) || money == "" || money == null) {
        money = +prompt ("Ваш бюджет на месяц?", ""); 
    }

    appData.budget = money;
    appData.timeData = time;
    budgetValue.textContent = money.toFixed();
    yearValue.value = new Date(Date.parse(time)).getFullYear();
    monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
    dayValue.value = new Date(Date.parse(time)).getDay();
});
    
expensesIteBtn.addEventListener("click", function () {
    if (appData.power == true) {
        let sum = 0;
        for (let i = 0; i < expensesItem.length; i++) {
            let a = expensesItem[i].value,
                b = expensesItem[++i].value;
    
            if ( typeof(a)==='string' && typeof(a) != null && typeof(b) != null && a != "" && b != "" && a.length < 50) {
    
                console.log ("done");
                appData.expenses[a] = b;
                sum += +b;
            } else {
                console.log ("bad result");
                i--;
                }
         }
            expensesValue.textContent = sum.toFixed();
    } else {
        alert("Нажмите кнопку начать расчет")
    };
});

optionalexpensesBtn.addEventListener("click", function() {
    if (appData.power == true) {
        for (let i = 0; i < optionalexpensesItem.length; i++) {
            let opt = optionalexpensesItem[i].value;
            appData.optionalExpenses[i] = opt;
            optionalExpensesValue.textContent += appData.optionalExpenses[i] + ", ";
        }
    } else {
        alert("Нажмите кнопку начать расчет")
    };
});

countBudgetBtn.addEventListener("click", function() {
    if (appData.power == true) {
        if ( appData.budget != undefined) {
            appData.moneyPerDay = (appData.budget / 30).toFixed();
        daybudgetValue.textContent = appData.moneyPerDay;
            if (appData.moneyPerDay < 100) {
                levelValue.textContent = "Это минимальный уровень достатка!";
            } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
                levelValue.textContent = "Это средний уровень достатка!";
            } else if (appData.moneyPerDay > 2000) {
                levelValue.textContent = "Это высокий уровень достатка!";
            } else {
                levelValue.textContent = ("Ошибочка...!");
            }
        } else {
            daybudgetValue.textContent = "Error";
            levelValue.textContent = ("Error");
        }
    } else {
        alert("Нажмите кнопку начать расчет")
    };
});

chooseIncome.addEventListener("input", function () {
    if (appData.power == true) {
        let items = chooseIncome.value;
        appData.income = items.split(", ");
        incomeValue.textContent = appData.income;
    } else {
        alert("Нажмите кнопку начать расчет")
    };
});

checksavings.addEventListener("click", function() {
    if (appData.power == true) {
        if (appData == true) {
            // let save = +prompt("Какова сумма накоплений?"),
            //     percent = +prompt("Под какой процент?");
            //     appData.monthIncome = save/100/12*percent;
            appData.savings = false;
        } else {
            alert("УРА ЕСТЬНАКОПЛЕНИЯ!")
            appData.savings = true;
        }
        monthsavingsValue.textContent = appData.monthIncome;
    } else {
        alert("Нажмите кнопку начать расчет")
    };
});

chooseSum.addEventListener("input", function() {
    if (appData.power == true) {
        if (appData.savings == true) {
            let sum = +chooseSum.value,
                percent = +choosePercent.value;
            appData.monthIncome = sum/100/12*percent;
            appData.yearIncome = sum/100*percent;
    
            monthsavingsValue.textContent = appData.monthIncome;
            yearsavingsValue.textContent = appData.yearIncome;
        }
    } else {
        alert("Нажмите кнопку начать расчет")
    };
});

choosePercent.addEventListener("input", function() {
    if (appData.power == true) {
        if (appData.savings == true) {
            let sum = +chooseSum.value,
                percent = +choosePercent.value;
            appData.monthIncome = sum/100/12*percent;
            appData.yearIncome = sum/100*percent;
    
            monthsavingsValue.textContent = appData.monthIncome.toFixed(1);
            yearsavingsValue.textContent = appData.yearIncome.toFixed(1);
        }
    } else {
        alert("Нажмите кнопку начать расчет")
    };
});

let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false,
    power: false
}
