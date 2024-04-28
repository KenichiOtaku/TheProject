function calculateModifiers(){
    const inputs = document.querySelectorAll('.abilities input');
    inputs.forEach(input => {
        const score = parseInt(input.value);
        const modifier = Math.floor((score -10) / 2);
        input.nextElementSibling.textContent = modifier >= 0? '+' + modifier:modifier;
    });
}

document.querySelector('.abilities').addEventListener('input', calculateModifiers);


const skills = ['Acrobatics',
    'Animal Handling',
    'Arcana',
    'Athletics',
    'Deception',
    'History',
    'Insight',
    'Intimidation',
    'Investigation',
    'Medicine',
    'Nature',
    'Perception',
    'Performance',
    'Persuasion',
    'Religion',
    'Sleight of Hand',
    'Stealth',
    'Survival'];

function generateSkillInputs() {
    const skillContainer = document.querySelector('.skills');

    skills.forEach(skill => {
        const skillDiv = document.createElement('div');
        skillDiv.classList.add('skill');

        const label = document.createElement('label');
        label.textContent = skill + ':';
        skillDiv.appendChild(label);

        const input = document.createElement('input');
        input.type = 'checkbox';
        skillDiv.appendChild(input);

        skillContainer.appendChild(skillDiv);
    });

    const proficiencyDiv = document.createElement('div');
    proficiencyDiv.classList.add('proficiency');

    const label = document.createElement('label');
    label.textContent = 'Proficiency Bonus';
    proficiencyDiv.appendChild(label);

    const input = document.createElement('input');
    input.type = 'number';
    input.min = `${0}`;
    input.value = `${2}`;
    proficiencyDiv.appendChild(input);

    skillContainer.appendChild(proficiencyDiv);
}

generateSkillInputs();

function generateInventoryInputs() {
    const inventoryContainer = document.querySelector('.inventory');

    const addItemButton = document.createElement('button');
    addItemButton.textContent = 'Add Item';
    addItemButton.addEventListener('click', addItem);
    inventoryContainer.appendChild(addItemButton);
}

function addItem() {
    const inventoryContainer = document.querySelector('.inventory');

    const itemDiv = document.createElement('div');
    itemDiv.classList.add('item');

    const nameLabel = document.createElement('label');
    nameLabel.textContent = 'Item Name:';
    itemDiv.appendChild(nameLabel);

    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    itemDiv.appendChild(nameInput);

    const quantityLabel = document.createElement('label');
    quantityLabel.textContent = 'Quantity:';
    itemDiv.appendChild(quantityLabel);

    const quantityInput = document.createElement('input');
    quantityInput.type = 'number';
    quantityInput.min = `${1}`;
    quantityInput.value = `${1}`;
    itemDiv.appendChild(quantityInput);

    const weightLabel = document.createElement('label');
    weightLabel.textContent = 'Weight';
    itemDiv.appendChild(weightLabel);

    const weightInput = document.createElement('input');
    weightInput.type = 'number';
    weightInput.step = `${0.01}`;
    weightInput.min = `${0}`;
    weightInput.value = `${0}`;
    itemDiv.appendChild(weightInput);

    inventoryContainer.appendChild(itemDiv);
}

generateInventoryInputs();

function generateSpellInputs() {
    const spellsContainer = document.querySelector('.spells');

    const addSpellButton = document.createElement('button');
    addSpellButton.textContent = 'Add Spell';
    addSpellButton.addEventListener('click', addSpell);
    spellsContainer.appendChild(addSpellButton);
}

function addSpell() {
    const spellsContainer = document.querySelector('.spells');

    const spellDiv = document.createElement('div');
    spellDiv.classList.add('spell');

    const nameLabel = document.createElement('label');
    nameLabel.textContent = 'Spell Name:';
    spellDiv.appendChild(nameLabel);

    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    spellDiv.appendChild(nameInput);

    const levelLabel = document.createElement('label');
    levelLabel.textContent = ' Spell Level:';
    spellDiv.appendChild(levelLabel);

    const levelInput = document.createElement('input');
    levelInput.type = 'number';
    levelInput.min = `${0}`;
    levelInput.value = `${1}`;
    spellDiv.appendChild(levelInput);

    const descriptionLabel = document.createElement('label');
    descriptionLabel.textContent = 'Description:';
    spellDiv.appendChild(descriptionLabel);

    const descriptionInput = document.createElement('textarea');
    descriptionInput.rows = 3;
    spellDiv.appendChild(descriptionInput);

    spellsContainer.appendChild(spellDiv);
}

generateSpellInputs();

function generateFeatureInputs() {
    const featuresContainer = document.querySelector('.features');

    const addFeatureButton = document.createElement('button');
    addFeatureButton.textContent = 'Add Feature';
    addFeatureButton.addEventListener('click', addFeature);
    featuresContainer.appendChild(addFeatureButton);
}

function addFeature() {
    const featuresContainer = document.querySelector('.features');

    const featureDiv = document.createElement('div');
    featureDiv.classList.add('feature');

    const nameLabel = document.createElement('label');
    nameLabel.textContent = 'Feature Name:';
    featureDiv.appendChild(nameLabel);

    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    featureDiv.appendChild(nameInput);

    const descriptionLabel = document.createElement('label');
    descriptionLabel.textContent = 'Description:';
    featureDiv.appendChild(descriptionLabel);

    const descriptionInput = document.createElement('textarea');
    descriptionInput.rows = 3;
    featureDiv.appendChild(descriptionInput);

    featuresContainer.appendChild(featureDiv);
}

generateFeatureInputs();

function saveCharacter() {
    const characterData = {
        name: document.getElementById('charName').value,
        class: document.getElementById('className').value,
    };

    localStorage.setItem('character', JSON.stringify(characterData));
}

function loadCharacter() {
    const characterData = JSON.parse(localStorage.getItem('character'));

    if (characterData) {
        document.getElementById('charName').value = characterData.name;
    }
}

window.addEventListener('load', loadCharacter);

document.getElementById('saveButton').addEventListener('click', saveCharacter);
document.getElementById('loadButton').addEventListener('click', loadCharacter);

function calculateArmourClass() {
    const constitutionModifier = getAbilityModifier('Constitution');
    const baseAC = 10;

    document.getElementById('armourClass').value = baseAC + constitutionModifier;
}

function getAbilityModifier(abilityName) {
    const input = document.querySelector(`.abilities input[name="${abilityName}"]`);
    const score = parseInt(input.value);
    return Math.floor((score - 10) / 2);
}

window.addEventListener('load', calculateArmourClass);
document.querySelector('.abilities').addEventListener('input', calculateArmourClass);

function calculateAbilityFeedback() {
    const abilitiesContainer = document.querySelector('.abilities');

    const feedbackCategories = {
        low: { min: 1, max: 8, feedback: 'Low' },
        average: { min: 9, max: 15, feedback: 'Average' },
        high: { min: 16, max: 20, feedback: 'High' }
    };

    abilitiesContainer.querySelectorAll('.ability').forEach(ability => {
        const input = ability.querySelector('input[type="number"]');
        const abilityFeedbackContainer = ability.querySelector('.ability-feedback');
        const updateFeedback = () => {
            const score = parseInt(input.value);
            let feedback = '';

            for (const category in feedbackCategories) {
                if (score >= feedbackCategories[category].min && score <= feedbackCategories[category].max) {
                    feedback = `${feedbackCategories[category].feedback}`;
                    break;
                }
            }

            if (abilityFeedbackContainer) {
                abilityFeedbackContainer.textContent = feedback;
            } else {
                const newFeedbackElement = document.createElement('span');
                newFeedbackElement.classList.add('ability-feedback');
                newFeedbackElement.textContent = feedback;
                ability.appendChild(newFeedbackElement);
            }
        };

        input.addEventListener('input', updateFeedback);
        updateFeedback();
    });
}

calculateAbilityFeedback();

function validateAbilityScore() {
    const abilitiesContainer = document.querySelector('.abilities');
    const errorMessages = {
        Strength: 'Strength must be between 1 and 20!',
        Constitution: 'Constitution must be between 1 and 20!',
        Dexterity: 'Dexterity must be between 1 and 20!',
        Intelligence: 'Intelligence must be between 1 and 20!',
        Wisdom: 'Wisdom must be between 1 and 20!',
        Charisma: 'Charisma must be between 1 and 20!',
    };
    abilitiesContainer.querySelectorAll('input[type="number"]').forEach(input => {
        const abilityName = input.getAttribute('name');
        const errorMessageElement = document.getElementById(`${abilityName.toLowerCase()}Error`);

        errorMessageElement.textContent = '';

        const score = parseInt(input.value);
        if (isNaN(score) || score<1 || score>20) {
            errorMessageElement.textContent = errorMessages[abilityName];
        }
    });
}

document.querySelector('.abilities').addEventListener('input', validateAbilityScore);

function calculateLevelProgress() {
    const charLevel = parseInt(document.getElementById('charLevel').value);
    const charXP = parseInt(document.getElementById('charXP').value);

    const nextLevel1XP = charLevel * 1000;
    const progress = charXP / nextLevel1XP * 100;

    const levelProgressElement = document.getElementById('levelProgress');
    if (!isNaN(progress)) {
        levelProgressElement.textContent = `Level Progress: ${progress.toFixed(2)}%`;
    } else {
        levelProgressElement.textContent = '';
    }
}

document.getElementById('charLevel').addEventListener('input', calculateLevelProgress);
document.getElementById('charXP').addEventListener('input', calculateLevelProgress);

function saveCharacterData() {
    const characterData = {
        level: parseInt(document.getElementById('charLevel').value),
        experiencePoints: parseInt(document.getElementById('charXP').value),
    };

    localStorage.setItem('characterData', JSON.stringify(characterData));
}

document.getElementById('saveButton').addEventListener('click', saveCharacterData);

function loadCharacterData() {
    const saveData = localStorage.getItem('characterData');
    if (saveData) {
        const characterData = JSON.parse(saveData);
        document.getElementById("charLevel").value = characterData.level || '';
        document.getElementById('charXP').value = characterData.experiencePoints || '';
    }
}

window.addEventListener('load', loadCharacterData);

function applyTheme() {
    const themeColor = document.getElementById('themeColor').value;
    document.documentElement.style.setProperty('--primary-color', themeColor);
    localStorage.setItem('themeColor', themeColor);
}

document.getElementById('themeColor').addEventListener('input', applyTheme);
function loadThemeSettings () {
    const savedThemeColor = localStorage.getItem('themeColor');

    if (savedThemeColor) {
        document.getElementById('themeColor').value = savedThemeColor;
        applyTheme();
    }
}

window.addEventListener('load', loadThemeSettings);

function printCharacterSheet() {
    window.print();
}
document.getElementById('printButton').addEventListener('click', printCharacterSheet);

document.addEventListener('DOMContentLoaded', function() {
    function rollD20() {
        const min = 1;
        const max = 20;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function handleRollD20ButtonClick() {
        const d20ResultElement = document.getElementById('d20Result');
        const rollResult = rollD20();
        d20ResultElement.textContent = `You rolled ${rollResult}!`;
    }

    document.getElementById('rollD20Button').addEventListener('click', handleRollD20ButtonClick);
});

document.addEventListener('DOMContentLoaded', function() {
function rollD12() {
    const min = 1;
    const max = 12;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function handleRollD12ButtonClick() {
    const d12ResultElement = document.getElementById('d12Result');
    const rollResult = rollD12();
    d12ResultElement.textContent = `You rolled ${rollResult}!`;
}

document.getElementById('rollD12Button').addEventListener('click', handleRollD12ButtonClick);
});

document.addEventListener('DOMContentLoaded', function() {
    function rollD10() {
        const min = 1;
        const max = 10;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function handleRollD10ButtonClick() {
        const d10ResultElement = document.getElementById('d10Result');
        const rollResult = rollD10();
        d10ResultElement.textContent = `You rolled ${rollResult}!`;
    }

    document.getElementById('rollD10Button').addEventListener('click', handleRollD10ButtonClick);
});

document.addEventListener('DOMContentLoaded', function() {
    function rollD8() {
        const min = 1;
        const max = 8;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function handleRollD8ButtonClick() {
        const d8ResultElement = document.getElementById('d8Result');
        const rollResult = rollD8();
        d8ResultElement.textContent = `You rolled ${rollResult}!`;
    }

    document.getElementById('rollD8Button').addEventListener('click', handleRollD8ButtonClick);
});

document.addEventListener('DOMContentLoaded', function() {
    function rollD6() {
        const min = 1;
        const max = 6;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function handleRollD6ButtonClick() {
        const d6ResultElement = document.getElementById('d6Result');
        const rollResult = rollD6();
        d6ResultElement.textContent = `You rolled ${rollResult}!`;
    }

    document.getElementById('rollD6Button').addEventListener('click', handleRollD6ButtonClick);
});

document.addEventListener('DOMContentLoaded', function() {
    function rollD4() {
        const min = 1;
        const max = 4;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function handleRollD4ButtonClick() {
        const d4ResultElement = document.getElementById('d4Result');
        const rollResult = rollD4();
        d4ResultElement.textContent = `You rolled ${rollResult}!`;
    }

    document.getElementById('rollD4Button').addEventListener('click', handleRollD4ButtonClick);
});