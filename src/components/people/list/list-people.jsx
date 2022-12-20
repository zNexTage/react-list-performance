import { useCallback, useLayoutEffect, useState } from "react";
import ListItemPerson from "../list-item";
import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';


faker.locale = "pt_BR";

const ListPeople = () => {
    const [people, setPeople] = useState([]);

    useLayoutEffect(() => {
        const names = [];

        Array.from({ length: 5 })
            .forEach(() => names.push({
                name: faker.name.fullName(),
                id: faker.datatype.uuid()
            }));

        setPeople(names);
    }, []);

    const handleSubmit = event => {
        event.preventDefault();

        const formData = new FormData(event.target);

        const personName = formData.get('name');

        if (!personName) {
            alert('Informe o nome da pessoa');
            
            return;
        }

        /**
         * NOTE: After setPeople, `which item of the list` will renderize again;
         * Every re-render in this component (ListPeople) will cause the list to render each item again.
         */
        setPeople([...people, {
            name: personName,
            id: uuidv4()
        }]);
    }

    //useCallback -> save function in memory;
    const handleDelete = useCallback((id) => {
        setPeople(people => people.filter((person) => person.id !== id));
    }, []);

    return (
        <div className="has-text-centered">
            <form onSubmit={handleSubmit}>
                <div className="columns">
                    <div className="column is-four-fifths">
                        <label htmlFor="txtName">
                            Nome:
                        </label>
                        <input name="name" className="input is-medium" id="txtName" type="text" />
                    </div>

                </div>
                <button className="button is-primary is-outline mb-3" type="submit">
                    Adicionar pessoa
                </button>
            </form>

            <ul>
                {people.map(person => (
                    <ListItemPerson
                        key={person.id}
                        name={person.name}
                        id={person.id}
                        handleDelete={handleDelete}
                    />
                ))}
            </ul>
        </div>
    )
}

export default ListPeople;