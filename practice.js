////////////////////// Lecture 142 - 145 //////////////////////

/*
const arr = ['a', 'b', 'c', 'd', 'e', 'f'];
console.log(arr.slice());


const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

for (const [i, movement] of movements.entries()) {
    if (movement > 0) {
        console.log(`${i + 1}: You deposited ${movement}.`);
    }
    else if (movement < 0) {
        console.log(`${i + 1}: You withdrew ${Math.abs(movement)}.`);
    }
}

console.log('----FOR EACH----');
// Using the forEach method for looping
movements.forEach((movement, i, array) => {
    if (movement > 0) {
        console.log(`Movement ${i}: You deposited ${movement}.`);
    }
    else if (movement < 0) {
        console.log(`Movement ${i}: You withdrew ${Math.abs(movement)}.`);
    }
});


const currencies = new Map([
    ['USD', 'United States dollar'],
    ['EUR', 'Euro'],
    ['GBP', 'Pound sterling'],
]);

currencies.forEach((value, key, map) => {
    console.log(`${key}: ${value}`);
});

const currenciesUnq = new Set(['GBP', 'USD', 'GBP', 'PKR', 'INR', 'PKR']);
currenciesUnq.forEach((value, _, map) => {
    console.log(`${value}: ${value}`);
})
*/

////////////////////// Lecture 148 - Coding Challenge #1 //////////////////////
/*
const dogsJulia1 = [3, 5, 2, 12, 7];
const dogsJulia2 = [9, 16, 6, 8, 3];

const dogsKate1 = [4, 1, 15, 8, 3];
const dogsKate2 = [10, 5, 6, 1, 4];

const checkDogs = function (dogsJulia, dogsKate) {
    const dogsCorrected = [...dogsJulia].slice(1, -2);

    const allDogs = [...dogsCorrected, ...dogsKate];
    allDogs.forEach((age, i) => {
        if (age >= 3) {
            console.log(`Dog ${i + 1} is adult with an age ${age}.`);
        }
        else {
            console.log(`Dog ${i + 1} is still a puppy 🐶.`);
        }
    });
}

console.log('---- DATA ONE ----');

checkDogs(dogsJulia1, dogsKate1);

console.log('---- DATA TWO ----');

checkDogs(dogsJulia2, dogsKate2);
*/

////////////////////// Lecture 149 - Map Array Method //////////////////////
/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const eurToUSD = 1.1;

const movementsUSD = movements.map(mov => eurToUSD * mov);

console.log(movementsUSD);

const movementsDescription = movements.map((mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(mov)}.`
)

console.log(movementsDescription);
*/

////////////////////// Lecture 152 - Using Filter //////////////////////
/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const deposits = movements.filter(mov => mov > 0);
const withdrawals = movements.filter(mov => mov < 0);

console.log(deposits, withdrawals);
*/


////////////////////// Lecture 153 - Using Reduce Method //////////////////////
/*c
onst movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const balance = movements.reduce((acc, cur) => acc + cur, 0);
console.log(balance);

const maximum = movements.reduce(function (acc, cur) {
    if (acc > cur) {
        return acc;
    }
    else {
        return cur;
    }
}, movements[0]);

console.log(`${maximum} is the maximum value here.`);
*/

////////////////////// Lecture 154 - Coding Challenge #2 //////////////////////
/*
const calcAverageHumanAge = function (ages) {
    const humanAge = ages.map((dogAge) => dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4)
    const adults = humanAge.filter((age) => age >= 18 ? age : '')
    const avgAge = adults.reduce((acc, age, i, arr) => acc + age / arr.length, 0);
    return avgAge;
}

console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));
*/

////////////////////// Lecture 155 - Coding Challenge #3 //////////////////////
/*
const calcAverageHumanAge = (ages) =>
    humanAge = ages.map((dogAge) => dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4).filter((age) => age >= 18 ? age : '').reduce((acc, age, i, arr) => acc + age / arr.length, 0);


const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3])
const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
console.log(avg1, avg2);
*/

////////////////////// Lecture 155 - Coding Challenge #3 //////////////////////
/*
const account = accounts.find(acc => acc.owner === 'Jonas Schmedtmann');
console.log(account);

accounts.forEach(account => {
    if (account.owner === 'Jonas Schmedtmann') {
        console.log(account);
    }
});
*/

////////////////////// Lecture 162 - flat and flatMap methods //////////////////////
/*
const overalBalance = accounts.map(acc => acc.movements).flat().reduce((acc, mov) => acc + mov, 0);
const overalBalanceMap = accounts.flatMap(acc => acc.movements).reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance);
*/

////////////////////// Lecture 163 - sort method //////////////////////
/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

movements.sort((a, b) => b - a);
console.log(movements);

movements.sort((a, b) => a - b);
console.log(movements);
*/
////////////////////// Lecture 164 - Other useful array methods //////////////////////
/*
const x = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(x);

// ARRAY of 100 DICE ROLLS

const diceRolls = Array.from({ length: 100 }, () => {
    return Math.trunc(Math.random() * 7);
});

console.log(diceRolls);

// CALCULATE SUM FROM UI

const labelBalanceUI = document.querySelector('.balance__value');
// const movementValue = document.querySelector('.movements__value');

labelBalanceUI.addEventListener('click', function () {
    const movementsUI = Array.from(document.querySelectorAll('.movements__value'), (el) => Number(el.textContent.replace('€', '')));
    console.log(movementsUI.reduce((acc, mov) => acc + mov, 0));
})
*/

////////////////////// Lecture 167 - CODING CHALLENGE #4 //////////////////////
const dogs = [
    { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
    { weight: 8, curFood: 200, owners: ['Matilda'] },
    { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
    { weight: 32, curFood: 340, owners: ['Michael'] },
]

// RECOMMENDED FOOD 
dogs.forEach(dog => {
    dog.recommendedFood = Math.trunc(dog.weight ** 0.75 * 28);
});

// FIND SARRAH's DOG
const sarahsDog = dogs.find(dog => {
    return dog.owners.includes('Sarah');
});
const currentFood = sarahsDog.curFood;
const recommendedFood = sarahsDog.recommendedFood;

// COMAPRE RECOMMENDATIONS 
const compareRecom = function (dog) {
    const min = dog.recommendedFood * 0.90;
    const max = dog.recommendedFood * 1.10;
    const curr = dog.curFood;

    if (dog.curFood > (dog.recommendedFood * 0.90) && dog.curFood < (dog.recommendedFood *
        1.10)) return 'equal';
    else if (curr > max) return 'more';
    else if (curr < min) return 'less';
}

dogs.forEach(dog => {
    console.log(compareRecom(dog));
});

// EAT TOO MUCH 
const ownersEatTooMuch = dogs
    .filter((dog) => {
        return compareRecom(dog) === 'more';
    })
    .flatMap((dog) => {
        return dog.owners;
    }).join(' and ');

console.log(ownersEatTooMuch);

// EAT TOO LESS
const ownersEatTooLittle = dogs
    .filter((dog) => {
        return compareRecom(dog) === 'less';
    })
    .flatMap((dog) => {
        return dog.owners;
    }).join(' and ');

console.log(ownersEatTooLittle);

// PRINT LITTLE AND MORE EATING 
console.log(`${ownersEatTooMuch}'s dog eat too much`);
console.log(`${ownersEatTooLittle}'s dog eat too much`);

const dogFunc = dog => {
    return dog.curFood > (dog.recommendedFood * 0.90) && dog.curFood < (dog.recommendedFood * 1.10);
}
// EATING === RECOMMENDED
const checkDog = dogs.some(dogFunc);

console.log(checkDog);
// console.log(checkDog.length > 0 ? true : false);

const okayDog = dogs.filter(dogFunc);;

console.log(okayDog);

const shallowDogs = dogs.slice();
console.log(shallowDogs);

// SORTING BY RECOMMENDED FOOD 
shallowDogs.sort((a, b) => a.recommendedFood - b.recommendedFood);

console.log(shallowDogs);