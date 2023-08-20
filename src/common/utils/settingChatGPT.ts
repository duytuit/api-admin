export default {
  // Options for the Keyv cache, see https://www.npmjs.com/package/keyv.
  // This is used for storing conversations, and supports additional drivers (conversations are stored in memory by default).
  // Only applies when using `ChatGPTClient`.
  cacheOptions: {},
  // If set, `ChatGPTClient` will use `keyv-file` to store conversations to this JSON file instead of in memory.
  // However, `cacheOptions.store` will override this if set
  storageFilePath: process.env.STORAGE_FILE_PATH || './cache.json',
  // Your OpenAI API key (for `ChatGPTClient`)
  openaiApiKey:
    process.env.OPENAI_API_KEY ||
    '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',
  chatGptClient: {
    // (Optional) Support for a reverse proxy for the completions endpoint (private API server).
    // Warning: This will expose your `openaiApiKey` to a third party. Consider the risks before using this.
    // reverseProxyUrl: 'https://chatgpt.hato.ai/completions',
    // (Optional) Parameters as described in https://platform.openai.com/docs/api-reference/completions
    modelOptions: {
      // Bạn có thể ghi đè tên mô hình và bất kỳ tham số nào khác ở đây.
      model: 'text-davinci-003',
      // Set max_tokens here to override the default max_tokens of 1000 for the completion.
      max_tokens: 1000,
    },
    // (Optional) Davinci models have a max context length of 4097 tokens, but you may need to change this for other models.
    maxContextTokens: 4097,
    // (Optional) You might want to lower this to save money if using a paid model like `text-davinci-003`.
    // Earlier messages will be dropped until the prompt is within the limit.
    maxPromptTokens: 3097,
    // (Optional) Set custom instructions instead of "You are ChatGPT...".
    promptPrefix: 'You are Bob, a cowboy in Western times...',
    // (Optional) Set a custom name for the user
    userLabel: 'User',
    // (Optional) Set a custom name for ChatGPT
    chatGptLabel: 'ChatGPT',
    // (Optional) Set to true to enable `console.debug()` logging
    debug: false,
  },
};
