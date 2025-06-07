// script.js

// Fonction de connexion
function login() {
    const username = document.getElementById('username').value; // Récupère le nom d'utilisateur depuis le champ de saisie
    if (username) {
        localStorage.setItem('username', username); // Enregistre le nom d'utilisateur dans le localStorage
        localStorage.setItem('balance', '1000'); // Initialisation du solde à 1000 €
        localStorage.setItem('transactions', JSON.stringify([])); // Initialise une liste vide pour les transactions
        window.location.href = 'dashboard.html'; // Redirige vers le tableau de bord
    } else {
        alert('Veuillez entrer un nom d\'utilisateur'); // Si le champ est vide, alerte l'utilisateur
    }
}

// Fonction pour afficher les informations du tableau de bord
window.onload = function() {
    const username = localStorage.getItem('username');
    if (username) {
        document.getElementById('welcome').textContent = username; // Affiche le nom d'utilisateur sur le tableau de bord
        document.getElementById('balance').textContent = localStorage.getItem('balance'); // Affiche le solde actuel
        displayTransactions(); // Affiche les transactions précédentes
    } else {
        window.location.href = 'index.html'; // Si l'utilisateur n'est pas connecté, redirige vers la page de connexion
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
        transactionStatus.appendChild(li); // Ajoute chaque transaction à la liste
    });
}

// Fonction pour effectuer un dépôt
function deposit() {
    const amount = parseFloat(document.getElementById('amount').value); // Récupère le montant du dépôt
    if (amount > 0) {
        let currentBalance = parseFloat(localStorage.getItem('balance')); // Récupère le solde actuel
        currentBalance += amount; // Ajoute le montant du dépôt au solde
        localStorage.setItem('balance', currentBalance); // Mets à jour le solde dans le localStorage

        // Ajoute la transaction au tableau des transactions
        const transactions = JSON.parse(localStorage.getItem('transactions'));
        transactions.push({
            type: 'Dépôt',
            amount: amount,
            date: new Date().toLocaleString()
        });
        localStorage.setItem('transactions', JSON.stringify(transactions)); // Mets à jour la liste des transactions dans localStorage

        document.getElementById('balance').textContent = currentBalance; // Affiche le nouveau solde
        document.getElementById('amount').value = ''; // Réinitialise le champ de saisie du montant
        displayTransactions(); // Mets à jour la liste des transactions affichées
    } else {
        alert('Veuillez entrer un montant valide');
    }
}

// Fonction pour effectuer un retrait
function withdraw() {
    const amount = parseFloat(document.getElementById('amount').value); // Récupère le montant du retrait
    if (amount > 0) {
        let currentBalance = parseFloat(localStorage.getItem('balance')); // Récupère le solde actuel
        if (amount <= currentBalance) {
            currentBalance -= amount; // Soustrait le montant du retrait du solde
            localStorage.setItem('balance', currentBalance); // Mets à jour le solde dans le localStorage

            // Ajoute la transaction au tableau des transactions
            const transactions = JSON.parse(localStorage.getItem('transactions'));
            transactions.push({
                type: 'Retrait',
                amount: amount,
                date: new Date().toLocaleString()
            });
            localStorage.setItem('transactions', JSON.stringify(transactions)); // Mets à jour la liste des transactions dans localStorage

            document.getElementById('balance').textContent = currentBalance; // Affiche le nouveau solde
            document.getElementById('amount').value = ''; // Réinitialise le champ de saisie du montant
            displayTransactions(); // Mets à jour la liste des transactions affichées
        } else {
            alert('Solde insuffisant');
        }
    } else {
        alert('Veuillez entrer un montant valide');
    }
}

// Fonction de déconnexion
function logout() {
    localStorage.removeItem('username'); // Supprime le nom d'utilisateur du localStorage
    localStorage.removeItem('balance'); // Supprime le solde du localStorage
    localStorage.removeItem('transactions'); // Supprime les transactions du localStorage
    window.location.href = 'index.html'; // Redirige vers la page de connexion
}
