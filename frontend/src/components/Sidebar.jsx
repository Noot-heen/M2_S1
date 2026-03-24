import { useFototenyStore, useSuggestionsStore, useAutocompleteStore } from '../utils/state';

export default function Sidebar() {
    const fototeny = useFototenyStore((state) => state.fototeny);
    const suggestions = useSuggestionsStore((state) => state.suggestions);
    const autocomplete = useAutocompleteStore((state) => state.autocomplete);

    let suggExist = false;
    let fototenyExist = false;
    let autocompleteExist = false;
    if (fototeny && fototeny.root) {
        console.log('Fototeny:', fototeny);
        fototenyExist = true;
    }
        console.log('Suggestions:', suggestions);

    if (suggestions && suggestions.suggestions.length > 0) {
        console.log('Suggestions:', suggestions);
        suggExist = true;
    }
    if (autocomplete && autocomplete.completion.length > 0) {
        console.log('Autocomplete:', autocomplete);
        autocompleteExist = true;
    }
    return (
        <aside className="p-3 pt-3">
            <div className="sidebar-content">
                <div className="flex flex-col gap-8">
                    <div>
                        <h3 className="font-bold">Racine (fototeny):</h3>
                        <p>{fototenyExist && fototeny.root}</p>
                    </div>
                    <div>
                        <h3 className="font-bold">Autocomplete:</h3>
                        <p>{autocompleteExist && autocomplete.completion.join(', ')}</p>
                    </div>
                    <div>
                        <h3 className="font-bold">Suggestions / corrections:</h3>
                        <ul>
                            {suggExist && suggestions.suggestions.map((sugg, index) => (
                                <li key={index}>{sugg}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </aside>
    );
}