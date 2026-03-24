import React from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

const TextEditor = () => {
    const editor = useEditor({
        extensions: [
            StarterKit,
        ],
        content: '<p>Manorata teny malagasy</p>',

        onUpdate: ({ editor }) => {
            console.log(editor.getText())
        }
    })

    return (
        <div>
            <EditorContent editor={editor} />
        </div>
    )
}

export default TextEditor