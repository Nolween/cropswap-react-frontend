import { useState } from 'react';

export function useLoading() {
    const [isLoading, setLoading] = useState(false);

    return { isLoading, setLoading };
}