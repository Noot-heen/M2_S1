let DOMAIN = "http://localhost:8000"

export async function fetchAPI(url, options = {}) {
    try {
        const response = await fetch(`${DOMAIN}${url}`, {
            method: options.method || 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

export async function verificationAPI(text) {
    try {
        const response = await fetchAPI('/api/verification:', {
            method: 'POST',
            body: JSON.stringify({ text }),
        });
        return response;
    } catch (error) {
        console.error('Verification error:', error);
        throw error;
    }
}

export async function lemmatizationAPI(word) {
    try {
        const response = await fetchAPI('/api/lemmatisation', {
            method: 'POST',
            body: JSON.stringify({ 'word': word }),
        });
        return response;
    } catch (error) {
        console.error('Lemmatization error:', error);
        throw error;
    }
}

export async function autocompleteAPI(input) {
    try {
        const response = await fetchAPI('/api/autocompletion', {
            method: 'POST',
            body: JSON.stringify({ 'sentence': input }),
        });
        return response;
    }
    catch (error) {
        console.error('Autocomplete error:', error);
        throw error;
    }
}

export async function correctionAPI(word) {
    try {
        const response = await fetchAPI('/api/correction', {
            method: 'POST',
            body: JSON.stringify({ 'word': word }),
        });
        return response;
    }
    catch (error) {
        console.error('Correction error:', error);
        throw error;
    }   
}