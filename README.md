# References

Unlike any other article/ paper, we put the references part at the top. To let the other know this is not juts ANY repository. This is gonna be a multi package mono repo. Here is the list of the articles you can use to better understand this system:

-   https://www.developerway.com/posts/react-project-structure
-   https://legacy.reactjs.org/docs/faq-structure.html#avoid-too-much-nesting
-   https://medium.com/@nirbenyair/headless-components-in-react-and-why-i-stopped-using-ui-libraries-a8208197c268

Please always follow the commit messages from conventional commits.
Here is the link to that. https://www.conventionalcommits.org/en/v1.0.0/

# Icons

We mostly use the react-icons package for the icons. Most of the designers on the team are also using this package over Figma
Here is the link to the reference: https://fontawesome.com/ and also we are interested in FA6, which is the latest version and can be imported from "react-icons/fa6"

# Patterns

This project is using Compound patter for the template, Flux architecture, and Facade pattern this time instead of Provider Pattern.

# Zustand

-   Please make sure to use `Immer` for updating nested objects. read the docs
    https://docs.pmnd.rs/zustand/guides/updating-state#normal-approach

    NOTE: Please pay attention that when working with the array methods that do NOT mutate the array (map, filter , reduce, etc.) you'll need to set the new array yourself. like so

    Either you're using the immer middleware (mentioned below) or the produce function from immer directly, be aware of these kind of gotchas.

    ```javascript
    produce(state => {
        state.someArr = someArr.[ArrMethod]
    })
    ```

    when you're working with the ones that DO mutate the array you don't need to set the state. just do this:

    ```javascript
    produce(state => {
        state.someArr.[ArrMethod]
    })
    ```

-   No need for adding `{...state}` when updating the state since Zustand automatically does this. https://docs.pmnd.rs/zustand/guides/immutable-state-and-merging

-   When writing actions for a store, please separate the functions instead of writing it inside the `create()` function of Zustand. this is because the actions can get quite long and if we write it directly inside the `create()` function it'll get a lot of indentations, brackets, etc. and please write actions using `function` keyword to enable the hoisting in the module (also it has a nicer syntax compared to arrow functions)
-   Please use the `immer` middleware from `zustand/middleware/immer` when creat a new store. see the documentation for this here: https://docs.pmnd.rs/zustand/integrations/immer-middleware


# React compiler

The react compiler also available via: https://react.dev/learn/react-compiler
is in the RC mode, also known as the Release Candidate phase. Which is available right now but not a part of the stable release of the react, which will be helping us handling the memoization stuff way easier and automatically by the react compiler.

We keep an eye on this feature and wait until it becomes more stable and a part of the main branch of react.

# Important

Dear developer, // "eslint-plugin-tailwindcss": "^3.18.0", is removed from this project becaus it only support up to v3, and is highly reliable on the tailwind config file, as in v4 of tailwind, the config file is deleted, this is also not working the way it should and causes issues with other packages. It's deleted temporarily and we hope to bring it back once the v4 support is available.


Keep an eye over https://github.com/francoismassart/eslint-plugin-tailwindcss/issues/325 which they are discussing the potential methods to handle such a thing.


# Warning

To demo the plates, we are using the iran-license-plate package, please note that the newest version is not working and we are just using "0.3.12" version, make sure not to change this version at all.