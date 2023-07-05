//
const accounts = [
    {
        numberCard: "00616605",
        headline: "Mali Romero",
        balance: 200,
        password: "123456"
    },
    {
        numberCard: "00482879",
        headline: "Maui Fernandez",
        balance: 67,
        password: "123451"
    },
    {
        numberCard: "00619192",
        headline: "Gera Contreras",
        balance: 290,
        password: "123452"
    },
];
//valiareble del diseño de la tarjeta
const creditCardWrapper = document.getElementById("credit-card-wrapper");
//variable de la seccion de los botones
const section = document.getElementById("section-buttom");
//Variable del bottom salir
const logout = document.getElementById("logout");
// Variable para cuando coincide la tarjeta
let matchesCard;
//Variable para cuando coincida la contraseña
let matchesPassword;
//Variable para imprimir el saldo
const balanceClient = document.getElementById("balance-client");
//Variable del saldo
const yourBalance = document.getElementById("your-balance");
//Varible que valida si la tarjeta ingresa existe en el array
let card;
//Varible que toma la tarjeta ingresada en el input
var cardNumber;
//Variable del monto que ingresan para depositar
let amount = document.getElementById("amount");
//Variable del monto que ingresan para retirar 
let amountWithdraw = document.getElementById("amount-withdraw");
//Variable para traer el valor ingresado en amount
var enteredAmount;

//funcion para imprimir el numero de la tarjeta ingresado
function getNumber() {
    cardNumber = document.getElementById("numberInput").value;
    console.log(cardNumber);
    card = accounts.find(account => account.numberCard === cardNumber);
    if (card) {
        console.log("Tarjeta coincide");
        matchesCard = true;
    } else {
        alert("Tarjeta no registrada");
        window.location.reload();
    };
};

//funcion para imprimir el password ingresado
function getPassword() {
    var passwordClient = document.getElementById("login-password").value;
    console.log(passwordClient);
    let clientPassword = accounts.find(account => account.password === passwordClient);
    if (clientPassword) {
        console.log("Contraseña correcta");
        matchesPassword = true;
    } else {
        alert("Contraseña incorrecta. Intente nuevamente.");
        console.log(passwordClient);
        document.getElementById("login-password").value = "";
    };
    getNumber();
    if (matchesCard === true && matchesPassword === true) {
        creditCardWrapper.classList.add("d-none");
        section.classList.remove("d-none");
        section.classList.add("text-center");
        balanceClient.classList.remove("d-none");
        yourBalance.innerHTML = "Saldo: $" + card.balance;
        console.log("Saldo: $" + card.balance);
    };
};

//Funcion para depositar
function deposit() {
    enteredAmount = Number(document.getElementById("amount").value);
    console.log(enteredAmount);
    if (card && !isNaN(enteredAmount)) {
        if (card.balance + enteredAmount > 990) {
            alert("Superaste el limite permitido.");
            document.getElementById("amount").value = "";
        } else {
            card.balance += enteredAmount;
            alert("Deposito exitoso");
            yourBalance.innerHTML = "Saldo: $" + card.balance;
            console.log(card.balance);
            document.getElementById("amount").value = "";
        };
    };
};

//Funcion para retirar
function withdraw() {
    amountWithdraw = Number(document.getElementById("amount-withdraw").value);
    console.log(amountWithdraw);
    if (card && !isNaN(amountWithdraw)) {
        if (card.balance < amountWithdraw) {
            alert("Monto insuficiente.");
            document.getElementById("amount-withdraw").value = "";
        } else if (card.balance - amountWithdraw < 10) {
            alert("No se puede retirar. El saldo de su cuenta no puede quedar en menos de $10");
            document.getElementById("amount-withdraw").value = "";
        } else {
            card.balance -= amountWithdraw;
            yourBalance.innerHTML = "Saldo: $" + card.balance;
            console.log(card.balance);
            document.getElementById("amount-withdraw").value = "";
            alert("Retiro exitoso");
        };
    };
};

//Evento del bottom de salir
logout.addEventListener("click", e => {
    e.preventDefault();
    const close = e.target;
    if (close) {
        section.classList.add("d-none");
        creditCardWrapper.classList.remove("d-none");
        balanceClient.classList.add("d-none");
        document.getElementById("numberInput").value = "";
    };
});
