<template>
  <div class="w-full px-10">
    <div
      class="flex flex-col justify-center max-w-md min-h-screen mx-auto space-y-8"
    >
      <div
        class="cardContent"
        v-if="cards && currentCardId"
        v-html="cards.cards[currentCardId].content"
      ></div>
      <div class="relative w-full">
        <button
          @click="deleteCard"
          class="absolute h-full p-2 text-red-500 rounded -left-12 hover:text-red-600"
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
        <button
          class="w-full py-3 font-bold text-white bg-indigo-400 rounded-lg shadow-lg hover:bg-indigo-500"
          @click="setCurrentCardId"
        >
          Next
        </button>
      </div>
    </div>
    <div>
      <CardEditor ref="cardEditor" @add="addCard" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Cards from "./cards";
import CardEditor from "./components/CardEditor.vue";

const cards = ref(null);
const currentCardId = ref<String>("");
const testContent = ref<String>("");
const cardEditor = ref(null);

onMounted(async () => {
  cards.value = await Cards.build();
  setCurrentCardId();
});

function setCurrentCardId() {
  const randomIndex = Math.floor(
    Math.random() * Object.keys(cards.value.cards).length
  );
  currentCardId.value = Object.entries(cards.value.cards)[randomIndex][0];
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

function addCard(content) {
  if (authorizeAction()) {
    cards.value.saveCard(content);
    cardEditor.value.resetContent();
  }
}

function deleteCard() {
  if (authorizeAction()) {
    try {
      cards.value.deleteCard(currentCardId.value);
      setCurrentCardId();
    } catch (error) {
      alert(error);
    }
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

  pre {
    code {
      @apply block rounded bg-gray-700 p-1 text-gray-100;
    }
  }
}
</style>
