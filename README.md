## Notion Clone

Things I learned:

- use of clerk auth. ToDo:Read [docs](https://clerk.com/docs) again.

- use of shadcn. [docs](https://ui.shadcn.com/docs)
    - pre-defined ui components can be customized by going in the components folder. Usually by adding a custom variant.

- Use of trunch check for linting(not yet done).

- Difference between organizational folder: (example) and the underscore folder: _example.
    - (example): this is just for better organization and routes in this will work once they reach normal folder. You can also create layouts inside of these folders.
    -_example: routes in this won't work. This just completely eliminate everything inside it from routing.

- Making custom hooks for things to do with navbar while scrolling.

- dynamic classname using cn (@/lib/utils). I need to read more about this. This is basically like the classnames library that can be installed using npm. Using this I can put conditions to render a specific thing.

- learned about next-themes and theme-provider using [shadcn](https://ui.shadcn.com/docs)
- 