// script.js

// Fonction de connexion
function login() {
    const username = document.getElementById('username').value;
    
    // Vérifier si un nom d'utilisateur est fourni
    if (username) {
        // Enregistrer l'utilisateur dans le localStorage
        localStorage.setItem('username', username); 
        localStorage.setItem('balance', '0'); // Initialise le solde à 0
        // Rediriger vers la page tableau de bord
        window.location.href = 'dashboard.html'; 
    } else {
        alert('Veuillez entrer un nom d\'utilisateur');
    }
}

// Fonction pour afficher le nom d'utilisateur et le solde dans le tableau de bord
window.onload = function() {
    const username = localStorage.getItem('username');
    if (username) {
        document.getElementById('welcome').textContent = username;
        document.getElementById('balance').textContent = localStorage.getItem('balance');
    } else {
        // Redirige vers la page de connexion si l'utilisateur n'est pas connecté
        window.location.href = 'index.html'; 
    }
};

// Fonction pour effectuer un dépôt
function deposit() {
    const amount = parseFloat(document.getElementById('amount').value);
    if (amount > 0) {
        let currentBalance = parseFloat(localStorage.getItem('balance'));
        currentBalance += amount;
        localStorage.setItem('balance', currentBalance);
        document.getElementById('balance').textContent = currentBalance;
        document.getElementById('amount').value = ''; // Réinitialise le champ montant
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
            document.getElementById('balance').textContent = currentBalance;
            document.getElementById('amount').value = ''; // Réinitialise le champ montant
        } else {
            alert('Solde insuffisant');
        }
    } else {
        alert('Veuillez entrer un montant valide');
    }
}

// Fonction pour se déconnecter
function logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('balance');
    window.location.href = 'index.html'; // Redirige vers la page de connexion
}

