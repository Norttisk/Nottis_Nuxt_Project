export const useGrokApi = () => {
    const config = useRuntimeConfig();

    const api = $fetch.create({
        baseURL: config.public.grokApiUrl as string,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${config.public.grokApiKey}`,
        },
    });
    interface Message {
        role: "system" | "user" | "assistant";
        content: string;
    }

    return {
        async getResponse(defaultMessage: Message[]) {
            return api("", {
                method: "POST",
                body: {
                    messages: defaultMessage,
                    model: "grok-2-latest",
                    stream: false,
                    temperature: 0,
                },
            });
        },
    };
};
