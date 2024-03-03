### Notion Clone

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

- Watch 5th N 8th video of codewithantonio for the following:
    - Use of convex for backend. REVISE: How to make schemas and how to add to database.[docs](https://docs.convex.dev/home)

    - Use of clerk for auth.[docs](https://clerk.com/docs)

    - Use of lucide react library.

- TODO ->Event handling: Like event:Ract.MouseEvent<HTMLDivElement,MouseEvent>. This helps in defining the type of the evene. Still need to look into this.

- TODO ->use of asChild prop. It is used to delegate something as a child of its parent element? I don't get this one. Need to figure it out.

- Use of sonner library for a toaster.(pop up)

- {!!id} -> turns this into a boolean expression. Basically this will return true or false based on if their is id or not.

- [documentId] method to index the notes pages and its use. Basically square brackets make it dynamic.

- Skeleton is basically to show like an outline of a thing that is going to load.

- Implemented zustand. Need to learn a lot about it. [docs](https://docs.pmnd.rs/zustand/getting-started/introduction)

- Learned about edgestore for file upload on nextJs.

- Error: hostname "files.edgestore.dev" is not configured under images in your `next.config.js`. This error comes when hostname for the image file is not there in next.config.js