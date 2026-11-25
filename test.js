const append = [
    { id: 1, name: "Edik", age: 22 },
    { id: 2, name: "Anna", age: 25 },
    { id: 3, name: "Max", age: 19 },
    { id: 4, name: "Olga", age: 30 },
    { id: 5, name: "Ivan", age: 27 }
];

function Test(append) {
    const hasUnder19 = append.some(user => user.age < 19);

    if (hasUnder19) {
        console.log("Перехід дозволено");
    } else {
        console.log("Перехід заборонено");
    }
}

Test(append);