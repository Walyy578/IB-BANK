// script.js

// Fonction de connexion
function login() {
    const username = document.getElementById('username').value;
    if (username) {
        localStorage.setItem('username', username); // Enregistre le nom d'utilisateur
        localStorage.setItem('balance', '1000'); // Initialisation du solde à 1000 €
        localStorage.setItem('transactions', JSON.stringify([])); // Initialise les transactions vides
        window.location.href = 'dashboard.html'; // Redirige vers le tableau de bord
    } else {
        alert('Veuillez entrer un nom d\'utilisateur');
    }
}

// Fonction de déconnexion
function logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('balance');
    localStorage.removeItem('transactions');
    window.location.href = 'index.html'; // Redirige vers la page de connexion
}

// Fonction pour afficher les informations sur le tableau de bord
window.onload = function() {
    const username = localStorage.getItem('username');
    if (username) {
        document.getElementById('welcome').textContent = username;
        document.getElementById('balance').textContent = localStorage.getItem('balance');
        displayTransactions(); // Affiche les transactions existantes
    } else {
        window.location.href = 'index.html'; // Redirige vers la page de connexion si l'utilisateur n'est pas connecté
    }
};

// Fonction pour afficher le statut des transactions
function displayTransactions() {
    const transactions = JSON.parse(localStorage.getItem('transactions'));
    const transactionStatus = document.getElementById('transaction-status');
    transactionStatus.innerHTML = ''; // Réinitialise la liste des transactions

    transactions.forEach(transaction => {
        const li = document.createElement('li');
        li.textContent = `${transaction.type} de ${transaction.amount} € le ${transaction.date}`;
        transactionStatus.appendChild(li);
    });
}

// Fonction pour effectuer un dépôt
function deposit() {
    const amount = parseFloat(document.getElementById('amount').value);
    if (amount > 0) {
        let currentBalance = parseFloat(localStorage.getItem('balance'));
        currentBalance += amount;
        localStorage.setItem('balance', currentBalance);

        // Ajout de la transaction au tableau des transactions
        const transactions = JSON.parse(localStorage.getItem('transactions'));
        transactions.push({
            type: 'Dépôt',
            amount: amount,
            date: new Date().toLocaleString()
        });
        localStorage.setItem('transactions', JSON.stringify(transactions));

        document.getElementById('balance').textContent = currentBalance;
        document.getElementById('amount').value = ''; // Réinitialise le champ montant
        displayTransactions(); // Met à jour la liste des transactions
    } else {
        alert('Veuillez entrer un montant valide');
    }
}

// Fonction pour effectuer un retrait
function withdraw() {
    const amount = parseFloat(document.getElementById('amount').value);
    if (amount > 0) {
        let currentBalance = parseFloat(localStorage.getItem('balance'));
        if (amount <= currentBalance) {
            currentBalance -= amount;
            localStorage.setItem('balance', currentBalance);

            // Ajout de la transaction au tableau des transactions
            const transactions = JSON.parse(localStorage.getItem('transactions'));
            transactions.push({
                type: 'Retrait',
                amount: amount,
                date: new Date().toLocaleString()
            });
            localStorage.setItem('transactions', JSON.stringify(transactions));

            document.getElementById('balance').textContent = currentBalance;
            document.getElementById('amount').value = ''; // Réinitialise le champ montant
            displayTransactions(); // Met à jour la liste des transactions
        } else {
            alert('Solde insuffisant');
        }
    } else {
        alert('Veuillez entrer un montant valide');
    }
}
