/* Um OBJETO com DUAS FUNCIONALIDADES ou 
PROPRIEDADES DO OBJETO (Abrir e Fechar) dentro do Objeto 
são chamadas de MÉTODO  */
const Modal = {
    open(){
        // Abrir modal
        // Adicionar a class active ao modal
        document
            .querySelector('.modal-overlay')
            .classList
            .add('active')
    },
    close(){
        // Fechar modal
        // Remover a class active no modal
        document
            .querySelector('.modal-overlay')
            .classList
            .remove('active')
    }
} 

// Bancos de dados local do navegador

const Storage = {
    get() {
        return JSON.parse(localStorage.getItem("dev.finances:transactions")) || []
    },

    set(transactions) {
        localStorage.setItem("dev.finances:transactions", 
        JSON.stringify(transactions))
    }
}

// Variável para as equações das transações
const Transaction = {
    all: Storage.get(),

    add(transaction) {
        Transaction.all.push(transaction)

        App.reload()
    },

    remove(index) {
        Transaction.all.splice(index, 1)

        App.reload()
    },

    incomes() {
        /* pegar todas transações e se cada uma for maior que zero,
        somar a uma variável e retornar a variável */
        let income = 0;
        Transaction.all.forEach(transaction => {
            if(transaction.amount > 0) {
                income = income + transaction.amount;
            }

        })
        return income;
    },

    expenses() {
        // somar as saídas
        let expense = 0;
        Transaction.all.forEach(transaction => {
            if (transaction.amount < 0) {
                expense = expense + transaction.amount;
            }

        })
        return expense;
    },

    total() {
        // entradas - saídas
        return Transaction.incomes() + Transaction.expenses();
    },
}

// Pegar as transações aqui do JS e mandar pro HTML
const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),
    addTransaction(transaction, index) {
        // Ele vem pra cá
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction, index)
        tr.dataset.index = index

        DOM.transactionsContainer.appendChild(tr)

    },

    innerHTMLTransaction(transaction, index) {
        const CSSclass = transaction.amount > 0 ? "income" : "expense"

        const amount = Utils.formartCurrency(transaction.amount)

        const html = `
            <td class="description">${transaction.description}</td>
            <td class="${CSSclass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td>
                <img id="minus" onclick="Transaction.remove(${index})" src="./assets/minus.svg" alt="Remover transação">
            </td>
        `

        return html
    },

    updateBalance() {
        document
            .getElementById('incomeDisplay')
            .innerHTML = Utils.formartCurrency(Transaction.incomes())
        document
            .getElementById('expenseDisplay')
            .innerHTML = Utils.formartCurrency(Transaction.expenses())
        document
            .getElementById('totalDisplay')
            .innerHTML = Utils.formartCurrency(Transaction.total())
    },

    clearTransactions() {
        DOM.transactionsContainer.innerHTML = ""
    },
}

const Utils = {

    formatAmount(value) {
        value = Number(value.replace(/\,\./g, "")) * 100
        
        return value
    },

    formatDate(date) {
        const splittedDate = date.split("-")

        return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`

    },

    formartCurrency(value) {
        const signal = Number(value) < 0 ? '-' : ""
        
        value = String(value).replace(/\D/g, "")

        value = Number(value) / 100

        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        })

        return signal + value
    }
}

const Form = {

    description: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date'),

    getValues() {
        return {
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value
        }
    },

    validateFields() {
        const { description, amount, date } = Form.getValues()
        
        if ( description.trim() === "" ||
             amount.trim() === "" ||
             date.trim() === "" ) {
                throw new Error("Por favor, preencha todos os campos!")
        }
    },

    formatValues() {
        let { description, amount, date } = Form.getValues()
        amount = Utils.formatAmount(amount)
        date = Utils.formatDate(date)

        return {
            description,
            amount,
            date
        }

    },

    clearFields() {
        Form.description.value = ""
        Form.amount.value = ""
        Form.date.value = ""
    },

    submit(event) {
        // Tirar o comportamento padrão
        event.preventDefault()

        try {
            // verificar se todas as informações foram preenchidas
            Form.validateFields()
            // formatar os dados para salvar
            const transaction = Form.formatValues()
            // salvar/adicionar transação nova
            Transaction.add(transaction)
            // limpar/apagar os dados do formulário
            Form.clearFields()
            // fechar o modal e atualizar a página
            Modal.close()
            // Já tem um App.reload() ao adicionar um novo elemento

        } catch (error) {
            alert(error.message)
        }
    }
}

const App = {
    init() {        
        // Enviando dados do transactions para o addTransactions
        Transaction.all.forEach(DOM.addTransaction)
        
        DOM.updateBalance()

        Storage.set(Transaction.all)
    },

    reload() {
        DOM.clearTransactions()
        App.init()
    }
}

App.init()

