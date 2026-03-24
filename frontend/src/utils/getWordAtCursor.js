/**
 * Returns the word under the cursor (or the word the cursor is inside).
 * Works with Malagasy text like "manorata teny malagasy"
 * Handles cursor anywhere inside the word.
 */
export function getWordAtCursor(editor) {
  if (!editor || !editor.state) return '';

  const { state } = editor;
  const { selection } = state;

  // We only care about cursor position (collapsed selection)
  if (!selection.$cursor) return '';

  const pos = selection.$cursor.pos;           // Current absolute position
  const $pos = state.doc.resolve(pos);         // Resolved position

  // Get the parent text node (the paragraph or text block)
  const parent = $pos.parent;
  if (!parent.isTextblock) return '';

  // Get the full text content of the current textblock
  const text = parent.textContent || '';

  // Find the relative offset inside this textblock
  const offset = $pos.parentOffset;

  // If we're at the very end or beginning and no text, return empty
  if (text.length === 0) return '';

  // Find start of the word (go backwards until non-word character)
  let start = offset;
  while (start > 0 && isWordChar(text[start - 1])) {
    start--;
  }

  // Find end of the word (go forwards until non-word character)
  let end = offset;
  while (end < text.length && isWordChar(text[end])) {
    end++;
  }

  return text.slice(start, end);
}

// Helper: What characters count as part of a word?
// For Malagasy + English + common punctuation
function isWordChar(char) {
  // Letters (including Malagasy accented letters), numbers, and apostrophe
  return /[\p{L}\p{N}']/u.test(char);
}