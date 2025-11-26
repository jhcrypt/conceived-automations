// client/src/lib/queryClient.ts

// Defines the structure for the payload sent to the API
type ApiPayload = {
    [key: string]: any; 
};

/**
 * Executes a fetch request with JSON serialization and automatic error checking.
 * This function serves as the underlying engine for your chatbot's API calls.
 */
export async function apiRequest<T = any>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    url: string,
    body?: ApiPayload,
): Promise<T> {
    const isMutation = method !== 'GET';
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };
    
    const options: RequestInit = {
        method,
        headers,
        body: isMutation && body ? JSON.stringify(body) : undefined,
    };

    const response = await fetch(url, options);

    if (!response.ok) {
        // Try to parse the error message from the response body
        let errorData = await response.json().catch(() => ({ message: 'Unknown API error occurred.' }));
        const errorMessage = errorData.message || `API request failed with status ${response.status}`;
        
        // Throw an error to be caught by the frontend component
        throw new Error(errorMessage);
    }

    // Return the parsed JSON response
    return response.json();
}