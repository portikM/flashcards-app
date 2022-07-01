<template>
  <div class="w-full px-10">
    <div
      class="flex flex-col justify-center max-w-md min-h-screen mx-auto space-y-8"
    >
      <div
        class="cardContent"
        v-if="cards && currentCardId"
        v-html="cards[currentCardId].content"
      ></div>
      <div
        v-if="cards && currentCardId"
        class="relative inline-flex items-center w-full space-x-1"
      >
        <button
          class="w-full py-3 font-bold text-white bg-indigo-400 rounded-lg shadow-lg hover:bg-indigo-500"
          @click="setCurrentCardId()"
        >
          Next
        </button>
        <button
          @click="deleteCard"
          v-if="canDeleteCard"
          class="h-full p-2 text-red-500 rounded hover:text-red-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="stroke-current stroke-2"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <line x1="4" y1="7" x2="20" y2="7" />
            <line x1="10" y1="11" x2="10" y2="17" />
            <line x1="14" y1="11" x2="14" y2="17" />
            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
          </svg>
        </button>
      </div>
      <div v-else>
        <p class="text-center">Loading...</p>
      </div>
    </div>
    <div class="py-20">
      <h1 class="mb-6 text-2xl font-bold text-center">Add a new card</h1>
      <CardEditor ref="cardEditor" @add="addCard" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import CardEditor from "./components/CardEditor.vue";
import axios from "axios";

const cards = ref<any>(null);
const currentCardId = ref<string>(import.meta.env.VITE_DEFAULT_CARD_ID);
const testContent = ref<String>("");
const cardEditor = ref<InstanceType<typeof CardEditor>>(null);

onMounted(async () => {
  const response = await axios({
    method: "get",
    url: `${import.meta.env.VITE_BACKEND_BASE_URL}/cards`,
    headers: {},
  });
  cards.value = response.data;
});

const canDeleteCard = computed(() => {
  return currentCardId.value !== import.meta.env.VITE_DEFAULT_CARD_ID;
});

function setCurrentCardId(cardId?: string) {
  const randomIndex = Math.floor(
    Math.random() * Object.keys(cards.value).length
  );
  currentCardId.value = cardId
    ? cardId
    : Object.entries(cards.value)[randomIndex][0];
}

function authorizeAction(): boolean {
  let password = prompt("Please enter password", "");
  if (password !== null && password === import.meta.env.VITE_PASSWORD) {
    return true;
  }
  if (password !== null) {
    alert("You are not authorized to perform this action!");
  }
  return false;
}

function randomId(): string {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

async function addCard(content: string) {
  if (authorizeAction()) {
    const cardId: string = randomId();
    cards.value[cardId] = {
      content,
      hint: "",
    };
    try {
      const response = await axios({
        method: "post",
        url: `${import.meta.env.VITE_BACKEND_BASE_URL}/cards/${cardId}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          content,
          hint: "",
        },
      });
      setCurrentCardId(cardId);
      cardEditor.value.resetContent();
    } catch (error) {
      console.log(error);
    }
  }
}

async function deleteCard() {
  if (authorizeAction()) {
    const cardId = currentCardId.value;
    if (
      Object.keys(cards.value).includes(cardId) &&
      Object.keys(cards.value).length > 1
    ) {
      delete cards.value[cardId];
      setCurrentCardId();
      try {
        const response = await axios({
          method: "delete",
          url: `${import.meta.env.VITE_BACKEND_BASE_URL}/cards/${cardId}`,
        });
      } catch (error) {
        console.log(error);
      }
    } else
      throw new Error(
        "Problem with deleting card: card not found or only one card left"
      );
  }
}
</script>

<style lang="scss">
.cardContent {
  > * + * {
    margin-top: 0.75em;
  }

  h2 {
    @apply text-xl font-bold;
  }

  ul,
  ol {
    padding: 0 1rem;
    @apply list-disc;
  }

  p {
    code {
      @apply text-orange-600;
    }
  }

  a {
    @apply text-orange-600 underline hover:text-orange-700;
  }

  pre {
    code {
      @apply block rounded bg-gray-700 p-1 text-gray-100;
    }
  }
}
</style>
