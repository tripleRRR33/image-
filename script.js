// script.js
document.addEventListener('DOMContentLoaded', (event) => {
    loadFormData();

    document.getElementById('characterForm').addEventListener('input', function() {
        saveFormData();
    });

    document.getElementById('characterForm').addEventListener('submit', function(event) {
        event.preventDefault();
        generatePDF();
    });
});

function saveFormData() {
    const form = document.getElementById('characterForm');
    const formData = new FormData(form);
    const character = {};
    formData.forEach((value, key) => {
        character[key] = value;
    });

    localStorage.setItem('characterData', JSON.stringify(character));
}

function loadFormData() {
    const savedData = localStorage.getItem('characterData');
    if (savedData) {
        const character = JSON.parse(savedData);
        for (const key in character) {
            if (character.hasOwnProperty(key)) {
                const element = document.getElementById(key);
                if (element) {
                    element.value = character[key];
                }
            }
        }
    }
}

function generatePDF() {
    const form = document.getElementById('characterForm');
    const formData = new FormData(form);
    const character = {};
    formData.forEach((value, key) => {
        character[key] = value;
    });

    const preview = document.getElementById('preview');
    preview.innerHTML = `
        <h2>${character.name}</h2>
        <p><strong>Âge :</strong> ${character.age}</p>
        <p><strong>Sexe :</strong> ${character.gender}</p>
        <p><strong>Apparence physique :</strong> ${character.appearance}</p>
        <p><strong>Profession :</strong> ${character.profession}</p>
        <p><strong>Citée ou surnom :</strong> ${character.nickname}</p>
        <h3>Personnalité</h3>
        <p><strong>Traits de caractère :</strong> ${character.personality}</p>
        <p><strong>Forces :</strong> ${character.strengths}</p>
        <p><strong>Faiblesses :</strong> ${character.weaknesses}</p>
        <p><strong>Objectifs et motivations :</strong> ${character.goals}</p>
        <p><strong>Peurs et faiblesses :</strong> ${character.fears}</p>
        <p><strong>Valeurs et croyances :</strong> ${character.values}</p>
        <h3>Histoire personnelle</h3>
        <p><strong>Passé :</strong> ${character.backstory}</p>
        <p><strong>Événements clés :</strong> ${character.keyEvents}</p>
        <p><strong>Conflits internes ou extérieurs :</strong> ${character.conflicts}</p>
        <h3>Relations</h3>
        <p><strong>Amis, ennemis :</strong> ${character.relationships}</p>
        <p><strong>Dynamique :</strong> ${character.dynamics}</p>
        <p><strong>Relations amoureuses ou familiales :</strong> ${character.loveFamily}</p>
        <h3>Développement et arc narratif</h3>
        <p><strong>Évolution :</strong> ${character.development}</p>
        <p><strong>Objectifs à long terme :</strong> ${character.longTermGoals}</p>
        <p><strong>Citation ou réplique clé :</strong> ${character.keyQuotes}</p>
        <h3>Autres détails</h3>
        <p><strong>Apparence ou comportement distinctif :</strong> ${character.distinctive}</p>
        <p><strong>Passions ou hobbies :</strong> ${character.hobbies}</p>
        <p><strong>Souvenirs ou objets significatifs :</strong> ${character.significantObjects}</p>
        ${character.image ? `<img src="${URL.createObjectURL(character.image)}" alt="Image du personnage">` : ''}
    `;

    // Utilisez une bibliothèque telle que jsPDF pour générer le PDF
    const doc = new jsPDF();
    doc.fromHTML(preview, 10, 10);
    doc.save(`${character.name}.pdf`);
}
