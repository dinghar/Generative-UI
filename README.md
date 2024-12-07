# Generative UI

This is a thought experiment on using generative AI to update website content based on user actions.

To start, it's pretty simple. There are two interactions implemented.

1. Render user input
   The user dictates what they want to be rendered, and it is displayed in the page.

2. Style based on sentiment of user input
   The user writes a diary entry. As they write, the sentiment is determined and the styling of the site updates.

## Tech

For now, I'm using [WebLLM](https://github.com/mlc-ai/web-llm) for inference since it's free and requires no setup, but latency is a problem.
