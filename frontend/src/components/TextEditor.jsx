import React from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { getWordAtCursor } from '../utils/getWordAtCursor'
import Placeholder from '@tiptap/extension-placeholder'
import { useSuggestionsStore, useFototenyStore, useAutocompleteStore } from '../utils/state'
import { correctionAPI, lemmatizationAPI, verificationAPI, autocompleteAPI } from '../services/services'
import { getTiptapParagraphs, makeUnderlined, toParagraph } from '../utils/tiptapUtils'


const TextEditor = () => {

    const setSuggestions = useSuggestionsStore((state) => state.setSuggestions)
    const setFototeny = useFototenyStore((state) => state.setFototeny)
    const setAutocomplete = useAutocompleteStore((state) => state.setAutocomplete) 

    const editor = useEditor({
        extensions: [
            StarterKit,
        ],
        editorProps: {
            attributes: {
                class: 'prose prose-sm focus:outline-none min-h-[300px] p-8', // Tailwind + custom
                // spellcheck: 'true',
                // lang: 'mg',                    // for Malagasy
                // translate: 'no',
                // You can add any valid HTML attribute here
            },
        },

        content: '<p>Manorata teny malagasy eto...</p>',

        // gestion des modifications textuelles
        onUpdate: ({ editor }) => {
            console.log(editor.getText())
        },

        //gestion des mouvements du curseur
        onSelectionUpdate: async ({ editor }) => {
            const word = getWordAtCursor(editor);
            
            const paragraphList = getTiptapParagraphs(editor);
            // let text = "123456ab1\n345"
            let text = paragraphList.join('\n');

            // const zeroOneList = await verificationAPI(text)
            // setSuggestions();
            const tsyaiko = await autocompleteAPI(text)
            setAutocomplete(tsyaiko);

            const lemma = await lemmatizationAPI(word)
            // text = makeUnderlined(text, zeroOneList);
            setFototeny(lemma);

            const sugg = await correctionAPI(word)
            setSuggestions(sugg);

            console.log(sugg)
            text = toParagraph(text);
            
            console.log(lemma)
            console.log('Current word:', word);
            console.log('HTML with underlines:', text);
            // editor.commands.setContent(text, false)
            // editor.commands.setTextSelection(selection); 
        },
    })


    if (!editor) return null

    return (
        <div className="w-9/12 h-screen p-3">
            <EditorContent editor={editor} />
        </div>
    )
}

export default TextEditor