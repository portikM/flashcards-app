<template>
  <div class="flex flex-col items-center py-20 space-y-4">
    <bubble-menu
      class="space-x-2"
      :editor="editor"
      :tippy-options="{ duration: 100 }"
      v-if="editor"
    >
      <button @click="editor.chain().focus().toggleBold().run()">bold</button>
      <button @click="editor.chain().focus().toggleItalic().run()">
        italic
      </button>
    </bubble-menu>
    <floating-menu
      class="space-x-2"
      :editor="editor"
      :tippy-options="{ duration: 100 }"
      v-if="editor"
    >
      <button @click="editor.chain().focus().toggleHeading({ level: 2 }).run()">
        Heading
      </button>
      <button @click="editor.chain().focus().toggleBulletList().run()">
        Bullet List
      </button>
      <button @click="editor.chain().focus().toggleCodeBlock().run()">
        Code Block
      </button>
    </floating-menu>
    <editor-content
      class="w-full max-w-xl p-2 border border-gray-300 rounded-lg min-h-medium"
      :editor="editor"
    />
    <button
      class="w-24 py-3 font-bold text-white rounded-lg shadow-lg bg-emerald-400 hover:bg-emerald-500"
      @click="$emit('add', editor.getHTML())"
    >
      Add
    </button>
  </div>
</template>

<script>
import {
  useEditor,
  EditorContent,
  BubbleMenu,
  FloatingMenu,
} from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";

export default {
  components: {
    EditorContent,
    BubbleMenu,
    FloatingMenu,
  },

  setup() {
    const defaultContent = `<p>Hello World!</p>`;
    const editor = useEditor({
      // content: defaultContent,
      content:
        "<h2>Heading</h2><ul><li><p>bullet one</p></li><li><p>bullet two</p></li></ul><p>Regular <strong>bold</strong>, <em>italic</em> and <strong><em>bold vitalic</em></strong></p><pre><code>const foo = 'bar'; </code></pre><p>Regular text with a <code>piece of code</code></p>",
      extensions: [StarterKit],
    });

    const resetContent = () => {
      editor.value.commands.setContent(defaultContent);
    };

    return { editor, resetContent };
  },
};
</script>

<style lang="scss">
.ProseMirror {
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

.ProseMirror.ProseMirror-focused {
  outline: none;
}

.min-h-medium {
  min-height: 7rem;
}
</style>
