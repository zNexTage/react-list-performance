import { memo } from "react";

const ListItemPerson = ({ name, id, handleDelete }) => {
    console.log(`Render ${name}`);

    return (
        <li
            className="box mb-3">
            <p>
                {name}
            </p>

            <button className="button is-danger ml-2 block" onClick={() => handleDelete(id)}>
                Remover
            </button>
        </li>
    )
}

/**
 * Using memo to avoid unnecessary re-render;
 * Memo will get the state of component before the update and the actual status of the component, so
 * memo will compare this states, verify if a change has occurred and will re-render (or not) the component.
 * 
 * Let's presume the initial state of component is: name = 'Enya'; 
 * In the place where the component is called, when an update occurs there, memo will check if
 * the state before the update, in this case: name = 'Enya', has been changed after the update.
 * 
 * Memo not working if a function has been passed in props; functions are passed by reference, so it will never be the same;
 * When we have to pass functions, must be attribute for this functions the hook `useCallback`;
 * There is an example in ListPeople:
 *  const handleDelete = useCallback((id) => {
        setPeople(people => people.filter((person, index) => index !== id));
    }, []);
 * 
 */
export default memo(ListItemPerson);