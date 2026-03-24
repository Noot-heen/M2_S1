/**
 * Returns an array of clean text from each paragraph in the Tiptap editor
 * Example: ["manorata teny malagasy", "Ity dia teny malagasy faharoa"]
 */
export function getTiptapParagraphs(editor) {
  if (!editor?.view?.dom) return [];

  // Find the ProseMirror contenteditable div
  const prosemirrorDiv = editor.view.dom;

  // Get all <p> elements inside it
  const paragraphs = prosemirrorDiv.querySelectorAll('p');

  const result = [];

  paragraphs.forEach(p => {
    let text = p.textContent.trim();

    // Clean multiple spaces/newlines
    text = text.replace(/\s+/g, ' ');

    if (text) {
      result.push(text);
    }
  });

  return result;
}

export function makeUnderlined(text, zeroOneList) {
  return text
    .split('')
    .map((char, index) => {
      return zeroOneList[index] === 0 ? `<span class='underline decoration-wavy decoration-red-500'>${char}</span>` : char;
    })
    .join('');
}

export function toParagraph(text) {
  return text
    .split('\n')
    .map(line => `<p>${line}</p>`)
    .join('');
}