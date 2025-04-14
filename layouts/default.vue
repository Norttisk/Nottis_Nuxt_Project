<template>
    <div>
        <header>
            <nav
                class="navbar flex justify-between bg-[#343434] items-center p-4 text-white"
            >
                <NuxtLink to="/" class="text-lg font-bold"
                    >My Demo Nuxt</NuxtLink
                >
                <ul class="flex space-x-4">
                    <li><NuxtLink to="/">Home</NuxtLink></li>
                    <li><NuxtLink to="/products">Products</NuxtLink></li>
                    <li><NuxtLink to="/about">About</NuxtLink></li>
                </ul>
            </nav>
        </header>
    </div>
    <div>
        <slot />
    </div>
    <button
        @click="isVisible = !isVisible"
        class="fixed bottom-4 right-4 inline-flex items-center justify-center text-sm font-medium disabled:pointer-events-none disabled:opacity-50 border rounded-full w-16 h-16 bg-black hover:bg-gray-700 m-0 cursor-pointer border-gray-200 bg-none p-0 normal-case leading-5 hover:text-gray-900"
        type="button"
        aria-haspopup="dialog"
        aria-expanded="false"
        data-state="closed"
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="text-white block border-gray-200 align-middle"
        >
            <path
                d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"
                class="border-gray-200"
            ></path>
        </svg>
    </button>
    <Transition name="slide-fade">
        <div
            v-show="isVisible"
            style="
                box-shadow: 0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgb(0 0 0 / 0.05);
                transform: translateX(-7%);
            "
            class="fixed bottom-[calc(4rem+1.5rem)] right-0 top-[80px] mr-4 bg-[#2E3033] p-6 rounded-lg w-[85%] h-[634px]"
        >
            <!-- Heading -->
            <div class="flex flex-col space-y-1.5 pb-6">
                <h2 class="font-semibold text-lg tracking-tight text-[#cacaca]">
                    Chatbot
                </h2>
                <p class="text-sm text-[#c6c6c6] leading-3">
                    Powered by Norttis
                </p>
            </div>

            <!-- Chat Container -->
            <div
                ref="chatContainer"
                class="pr-4 h-[474px] custom-scrollbar"
                style="min-width: 100%; overflow-y: scroll"
            >
                <div
                    v-for="(message, index) in chatMessages"
                    :key="index"
                    class="flex gap-3 my-4 text-gray-600 text-sm flex-1"
                >
                    <span
                        class="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8"
                    >
                        <div class="rounded-full bg-gray-100 border p-1">
                            <svg
                                v-if="message.role === 'assistant'"
                                stroke="none"
                                fill="black"
                                stroke-width="1.5"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                                height="20"
                                width="20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                                ></path>
                            </svg>
                            <svg
                                v-else
                                stroke="none"
                                fill="black"
                                stroke-width="0"
                                viewBox="0 0 16 16"
                                height="20"
                                width="20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"
                                ></path>
                            </svg>
                        </div>
                    </span>
                    <p class="leading-relaxed">
                        <span class="block font-bold text-white">
                            {{
                                message.role === "assistant"
                                    ? "Assistant"
                                    : "You"
                            }}
                        </span>
                        <span
                            v-if="message.content === '...'"
                            class="dots-loading text-white"
                        ></span>
                        <span v-else style="color: #c5c5c5">
                            <!-- Hiển thị nội dung chính của tin nhắn -->
                            {{ message.mainContent || message.content }}
                            <!-- Hiển thị các lựa chọn nếu có -->
                            <div
                                v-if="message.options && message.options.length"
                                class="mt-2 flex flex-col gap-2"
                            >
                                <button
                                    v-for="(
                                        option, optIndex
                                    ) in message.options"
                                    :key="optIndex"
                                    @click="selectOption(option)"
                                    class="rounded-md bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 text-left"
                                >
                                    {{ option.text }}
                                </button>
                            </div>
                        </span>
                    </p>
                </div>
            </div>
            <!-- Input box -->
            <div class="flex items-center pt-0">
                <form
                    @submit.prevent="sendMessage"
                    class="flex items-center justify-center w-full space-x-2 py-5"
                >
                    <input
                        v-model="userInput"
                        class="flex h-10 w-[95%] rounded-md px-3 py-2 text-sm placeholder-[#6b7280] disabled:cursor-not-allowed disabled:opacity-50 text-[#030712] focus-visible:ring-offset-2"
                        placeholder="Type your message"
                        style="
                            background-color: transparent;
                            box-shadow: 1px 3px 17px 0px rgba(0, 0, 0, 0.75);
                            -webkit-box-shadow: 1px 3px 17px 0px
                                rgba(0, 0, 0, 0.75);
                            -moz-box-shadow: 1px 3px 17px 0px
                                rgba(0, 0, 0, 0.75);
                            border-left: 1px solid #c5c5c5;
                            color: #c5c5c5;
                            outline: none;
                        "
                    />
                    <button
                        type="submit"
                        class="inline-flex items-center justify-center rounded-md text-sm font-medium text-[#f9fafb] disabled:pointer-events-none disabled:opacity-50 bg-black hover:bg-[#111827E6] h-10 px-4 py-2"
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted } from "vue";
import { useGrokApi } from "@/utils/grokApi";
import {
    useFakeStoreApi,
    formatProductsForPrompt,
    type Product,
} from "@/utils/storeApi";

// Interfaces
interface Option {
    text: string;
    prompt: string;
}

interface Message {
    role: "system" | "user" | "assistant";
    content: string;
    mainContent?: string; // Nội dung chính của tin nhắn (không bao gồm lựa chọn)
    options?: Option[]; // Danh sách các lựa chọn
}

// Constants
const SYSTEM_PROMPT: Message = {
    role: "system",
    content:
        "You are a helpful assistant. Answer the user's questions as best as you can, response in the range of 100 words(include options) . When providing multiple options (max 4), format them as a numbered list (e.g., 1. Option text) using vietnamese as response.",
};
//using fakeStoreApi to get products
// Fetch products using the composable
// const { products, error: fetchError } = useFakeStoreApi();

// // Initialize system prompt with product data
// if (fetchError.value) {
//     console.error("Failed to fetch products:", fetchError.value);
// } else if (products.value) {
//     const productSummary = formatProductsForPrompt(products.value);
//     SYSTEM_PROMPT.content = `You are a helpful assistant with access to product data: ${productSummary}. Answer the user's questions as best as you can, incorporating product information when relevant.`;
// }

const DEFAULT_MESSAGES: Message[] = [
    { role: "assistant", content: "Hi, how can I help you today?" },
];

// Reactive state
const isVisible = ref(false);
const chatMessages = ref<Message[]>([]);
const chatContainer = ref<HTMLElement | null>(null);
const userInput = ref("");
const promptPayload = ref<Message[]>([SYSTEM_PROMPT]);

// Utility functions
const scrollToBottom = () => {
    if (chatContainer.value) {
        chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
    }
};

const saveToLocalStorage = () => {
    try {
        localStorage.setItem(
            "chatHistory",
            JSON.stringify(promptPayload.value)
        );
    } catch (error) {
        console.error("Failed to save to localStorage:", error);
    }
};

const loadFromLocalStorage = () => {
    try {
        const storedData = localStorage.getItem("chatHistory");
        if (storedData) {
            const parsedData: Message[] = JSON.parse(storedData);
            promptPayload.value = parsedData;
            chatMessages.value = parsedData
                .filter((msg) => msg.role !== "system")
                .map((msg) => parseMessageOptions(msg));
        } else {
            throw new Error("No stored data");
        }
    } catch (error) {
        console.warn("Loading default messages:", error);
        promptPayload.value = [SYSTEM_PROMPT, ...DEFAULT_MESSAGES];
        chatMessages.value = [...DEFAULT_MESSAGES];
    }
    saveToLocalStorage();
    nextTick(scrollToBottom);
};

// Parse options from assistant message
const parseMessageOptions = (message: Message): Message => {
    if (message.role !== "assistant") return message;

    const lines = message.content.split("\n");
    const options: Option[] = [];
    let mainContent = "";
    let isOptionSection = false;

    for (const line of lines) {
        const trimmedLine = line.trim();
        if (
            trimmedLine.match(/^\d+\.\s+/) ||
            trimmedLine.match(/^-\s+/) ||
            trimmedLine.match(/^\*\s+/)
        ) {
            isOptionSection = true;
            const optionText = trimmedLine.replace(/^\d+\.\s+|^-\s+|\*\s+/, "");
            options.push({
                text: optionText,
                prompt: optionText, // Prompt mặc định là nội dung của lựa chọn
            });
        } else if (!isOptionSection) {
            mainContent += (mainContent ? "\n" : "") + line;
        }
    }

    if (options.length > 0) {
        return {
            ...message,
            mainContent: mainContent.trim() || undefined,
            options,
        };
    }
    return message;
};

// Handle option selection
const selectOption = async (option: Option) => {
    // Simulate user input
    userInput.value = option.prompt;
    await sendMessage();
};

// Main functions
const sendMessage = async () => {
    if (!userInput.value.trim()) return;

    // Add user message
    const userMessage: Message = {
        role: "user",
        content: userInput.value.trim(),
    };
    chatMessages.value.push(userMessage);
    promptPayload.value.push(userMessage);
    userInput.value = "";

    // Add loading message
    const loadingMessage: Message = { role: "assistant", content: "..." };
    chatMessages.value.push(loadingMessage);
    const loadingIndex = chatMessages.value.length - 1;

    await nextTick();
    scrollToBottom();
    saveToLocalStorage();

    try {
        const grokApi = useGrokApi();
        const response = (await grokApi.getResponse(promptPayload.value)) as {
            choices?: { message?: { content?: string } }[];
        };

        const assistantContent =
            response.choices?.[0]?.message?.content || "No response";
        const assistantMessage: Message = parseMessageOptions({
            role: "assistant",
            content: assistantContent,
        });

        // Update messages
        chatMessages.value[loadingIndex] = assistantMessage;
        promptPayload.value.push({
            role: "assistant",
            content: assistantContent,
        });
    } catch (error) {
        console.error("Failed to fetch response:", error);
        chatMessages.value[loadingIndex] = {
            role: "assistant",
            content: "Error: Unable to fetch response",
        };
        promptPayload.value.push({
            role: "assistant",
            content: "Error: Unable to fetch response",
        });
    } finally {
        saveToLocalStorage();
        await nextTick();
        scrollToBottom();
    }
};

// Lifecycle
onMounted(loadFromLocalStorage);
</script>

<style scoped>
.router-link-active {
    color: white;
    font-weight: bold;
}
</style>

<style scoped>
.router-link-active {
    color: white;
    font-weight: bold;
}
</style>
