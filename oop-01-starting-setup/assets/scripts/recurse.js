const person = {
    name: "Dron",
    friends: [
        {
            name: "Julia",
            friends: [
                {
                    name: "Victor",
                    friends: [
                        {
                            name: "Ivan"
                        }
                    ]
                },
                {
                    name: "George",
                    friends: [
                        {
                            name: "Brad"
                        },
                        {
                            name: "Gregor"
                        }
                    ]
                }
            ]
        },
        {
            name: "Bob",
            friends: [
                {
                    name: "Clara"
                },
                {
                    name: "Semen"
                }
            ]
        }
    ]
}

function getFriends(person, currField) {
    const result = [];

    if (!person[currField]) {
        return [];
    }

    for (const friend of person[currField]) {
        result.push(friend.name);

        result.push(...getFriends(friend, currField));
    }

    return result;
}

console.log(getFriends(person, "friends"));
